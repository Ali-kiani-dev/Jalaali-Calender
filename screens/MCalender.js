import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { ChevronLeft, ChevronRight } from 'react-native-iconly';
import styles from './styles';

export default function Calender(props) {
  const [flag, setFlag] = useState(false);
  const [activeDate, setActiveDate] = useState(new Date());
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const nDays = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];

  const generateMatrix = () => {
    let matrix = [];
    matrix[0] = weekDays;
    let year = activeDate.getFullYear();
    let month = activeDate.getMonth();
    let firstDay = new Date(year, month, 1).getDay();
    let maxDays = nDays[month]
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
                        style={[styles.colItem, {backgroundColor : rowIndex != 0 ? item == activeDate.getDate() ? '#fff' : '#fd7759' : '#555555'}]}
                    >
                    <Text
                        style={[styles.colItemText, {color : item == activeDate.getDate()? '#fd7759' : '#fff'}]}
                        onPress={() => {
                            if(!item.match && item != -1) {
                                activeDate.setDate(item)
                                setFlag(!flag)
                            }
                        }}
                        onLongPress={() => {
                            if(!item.match && item != -1) {
                                activeDate.setDate(item)
                                setFlag(!flag)
                            }
                            props.navigation.navigate('Todo', {date : `${activeDate.getFullYear()}/${activeDate.getMonth()}/${activeDate.getDate()}`})
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
            {rowItems}
        </View>
    )
  })

  const changeMonth = (n) => {
      activeDate.setMonth(activeDate.getMonth() + n)
      setFlag(!flag)
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Pressable
                onPress={() => {
                    changeMonth(-1)
                }}
                style={styles.leftHeaderSection}
            >
                <Text style={styles.leftHeaderSectionText}>last</Text>
                <ChevronLeft set="bold" primaryColor="#f2fcff" size="large"/>
            </Pressable>
            <Text
                style={styles.headerCenterText}
            >
                {months[activeDate.getMonth()]} &nbsp;
                {activeDate.getFullYear()}
            </Text>
            <Pressable
                onPress={() => {
                    changeMonth(1)
                }}
                style={styles.rightHeaderSection}
            >
                <ChevronRight set="bold" primaryColor="#f2fcff" size="large"/>
                <Text style={styles.rightHeaderSectionText}>next</Text>
            </Pressable>
        </View>
        {rows}
        <Pressable
            onPress={() => {
                props.navigation.navigate('Shamsi')
            }}
            style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', backgroundColor : '#fff', paddingHorizontal : 20, paddingVertical : 10, width : '60%', alignSelf : 'center', borderRadius : 10}}
        >
            <Text style={[styles.rightHeaderSectionText, {color : '#000'}]}>Jalaali</Text>
            <ChevronRight set="bold" primaryColor="#000" size="large"/>
        </Pressable>
    </View>
  );
};
