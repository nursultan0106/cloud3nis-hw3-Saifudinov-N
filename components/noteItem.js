import React from 'react'
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default function NoteItem({ pressHandler, item, setEditData }) {

    return (
        <TouchableOpacity onPress={() => {
            pressHandler()
            setEditData([{index: item.index,text:item.text,description:item.description}])
        }}>
            <View style={styles.item}>
                <Text style={styles.title}>{item.text}</Text>
                <Text>{item.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold'
    }
});