import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function TodoScreen(props) {
    return (
        <View>
            <Text>{props.route.params.date}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
