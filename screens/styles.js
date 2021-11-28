import React from 'react'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fd7759'
    },

    header : {
        backgroundColor : '#535d65',
        paddingVertical : 30,
        flexDirection : 'row',
        justifyContent : 'space-evenly'
    },

    leftHeaderSection : {
        flexDirection : 'row',
        alignItems : 'center'
    },

    leftHeaderSectionText : {
        fontSize : 16, 
        color : '#fff', 
        fontWeight : 'bold'
    },

    rightHeaderSection : {
        flexDirection : 'row',
        alignItems : 'center'
    },

    rightHeaderSectionText : {
        fontSize : 16, 
        color : '#fff', 
        fontWeight : 'bold',
        fontFamily : "iranyekanwebblack.ttf"
    },

    headerCenterText : {
        fontWeight : 'bold',
        fontSize : 20,
        textAlign : 'center',
        color : '#f2fcff'
    },

    col : {
        justifyContent : 'center',
        alignItems : 'center'
    },

    colItem : {
        width : 40,
        height : 40,
        borderRadius : 20,
        justifyContent : 'center',
        alignItems : 'center'
    },

    colItemText : {
        fontSize : 18,
        fontWeight : 'bold'
    }, 

    row : {
        flexDirection : 'row',
        marginHorizontal : 10,
        marginVertical : 20,
        justifyContent : 'space-around',
        alignItems : 'center'
    }
})

export default styles