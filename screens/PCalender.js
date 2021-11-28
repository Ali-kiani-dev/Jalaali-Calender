import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { ChevronLeft, ChevronRight } from 'react-native-iconly';
import moment from 'react-native-moment-jalaali'
import styles from './styles';

moment.loadPersian([{usePersianDigits: true}, {dialect: 'persian-modern'}])
export default function Calender(props) {
    const [flag, setFlag] = useState(false);
    const [activeDate, setActiveDate] = useState(moment(new Date()));
    const [date, setDate] = useState(activeDate.jDate())
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    const nDays = ['31', '31', '31', '31', '31', '31', '30', '30', '30', '30', '30', '29'];

    const generateMatrix = () => {
        let matrix = [];
        matrix[0] = weekDays;
        let year = activeDate.jYear();
        let month = activeDate.jMonth();
        let firstDay = moment(`${year}/${month+1}/1`, 'jYYYY/jM/jD').weekday();
        let maxDays = moment.jDaysInMonth(year, month)

        if(month == 1) {
            if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }
        
        let counter = 1;
        for (let row = 1; row < 7; row++) {
            matrix[row] = [];
            for (let col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if(row == 1 && col >= firstDay) {
                    matrix[row][col] = counter++;
                } else if(row > 1 && counter <= maxDays) {
                    matrix[row][col] = counter++;
                }
            }
        }
        return matrix;
    }

    let Fmatrix = generateMatrix();

    let rows = Fmatrix.map((row, rowIndex) => {
        let rowItems = row.map((item, colIndex) => {
            return(
                <View key={colIndex} style={styles.col}>
                    <View
                        style={[styles.colItem, {backgroundColor : rowIndex != 0 ? item == date ? '#fff' : '#fd7759' : '#555555'}]}
                    >
                        <Text
                            style={[styles.colItemText, {color : item == date ? '#fd7759' : '#fff'}]}
                            onPress={() => {
                                if(!item.match && item != -1) {
                                    setDate(item)
                                    setFlag(!flag)
                                }
                            }}
                            onLongPress={() => {
                                if(!item.match && item != -1) {
                                    setDate(item)
                                    setFlag(!flag)
                                }
                                props.navigation.navigate('Todo', {date : `${activeDate.jYear()}/${activeDate.jMonth()+1}/${item}`})
                            }}
                        >
                            {item != -1 ? item : ''}
                        </Text>
                    </View>
                </View>
            )
        }) 
        return(
            <View
                key={rowIndex}
                style={[styles.row, {backgroundColor : rowIndex == 0 ? '#555555' : '#fd7759', borderRadius : rowIndex == 0 ? 10 : 0}]}
            >
                {rowItems.reverse()}
            </View>
        )
    })

    const changeMonth = (n) => {
        activeDate.add(n, 'jMonth')
        setFlag(!flag)
    }

    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.header}
            >
                <Pressable
                    onPress={() => {
                        changeMonth(-1)
                    }}
                    style={styles.leftHeaderSection}
                >
                    <Text style={styles.leftHeaderSectionText}>ماه قبل</Text>
                    <ChevronLeft set="bold" primaryColor="#f2fcff" size="large"/>
                </Pressable>
                <Text
                    style={styles.headerCenterText}
                >
                    {months[activeDate.jMonth()]} &nbsp;
                    {activeDate.jYear()}
                </Text>
                <Pressable
                    onPress={() => {
                        changeMonth(1)
                    }}
                    style={styles.rightHeaderSection}
                >
                    <ChevronRight set="bold" primaryColor="#f2fcff" size="large"/>
                    <Text style={styles.rightHeaderSectionText}>ماه بعد</Text>
                </Pressable>
            </View>
            {rows}
            <Pressable
                onPress={() => {
                    props.navigation.navigate('Miladi')
                }}
                style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', backgroundColor : '#fff', paddingHorizontal : 20, paddingVertical : 10, width : '60%', alignSelf : 'center', borderRadius : 10}}
            >
                <ChevronLeft set="bold" primaryColor="#000" size="large"/>
                <Text style={[styles.rightHeaderSectionText, {color : '#000'}]}>میلادی</Text>
            </Pressable>
        </View>
    );
};