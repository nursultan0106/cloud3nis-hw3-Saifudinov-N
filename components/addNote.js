import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function AddNote({ submitHandler }) {
    const [text, setText] = useState('');
    const [description, setTextDescr] = useState('');

    const changeHandlerText = (val) => {
        setText(val);
    };
    const changeHandlerDescription = (val) => {
        setTextDescr(val);
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='new note...'
                onChangeText={changeHandlerText}
                value={text}
            />
            <TextInput
                style={styles.input}
                placeholder='new description...'
                onChangeText={changeHandlerDescription}
                value={description}
            />
            <Button color='coral' onPress={() => submitHandler(text, description)} title='add note' />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});