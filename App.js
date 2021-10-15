import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Animated,
  TextInput, Button
} from 'react-native';
import Header from './components/header';
import NoteItem from './components/noteItem';
import AddNote from './components/addNote';

export default function App() {
  const [notes, setNotes] = useState([
    { text: 'buy laptop', description: "buy a new Macbook Pro 2021", index: 1 },
    { text: 'buy phone', description: "buy a new IPhone 13 Pro", index: 2 },
    { text: 'buy watch', description: "buy a new AppleWatch Series 7", index: 3 },
  ]);

  const [visible, setVisible] = useState(false);

  const submitHandler = (text, description) => {
    if(text.length > 3){
      setText('');
      setNotes(prevNotes => {
        return [
          ...prevNotes,
          { text:text, description:description, index: prevNotes.length+1 }
        ];
      });
    } else {
      Alert.alert('Error', 'Note must be over 3 characters long', [
        {text: 'OK', onPress: () => console.log('alert closed') }
      ]);
    }
  };
  const [editData, setEditData] = useState([{index:0,text:'',description:''}]);
  const editHandler = (index, text, description) => {
    setNotes(notes => {
      notes[index-1] = {text: text, description: description, index: index}
      let arr = [...notes]
      console.log(index)
      console.log(arr)
      return arr
    })
  }

  const pressHandler = () => {
    setVisible(true)
  }



  const ModalPoup = ({visible, children}) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };

    const [edittext, setText] = useState(editData[0].text);
    const [editdescription, setTextDescr] = useState(editData[0].description);

    const changeHandlerTextEdit = (val) => {
      setText(val);
    };
    const changeHandlerDescriptionEdit = (val) => {
      setTextDescr(val);
    }
    return (
        <Modal transparent visible={showModal}>
          <View style={styles.modalBackGround}>
            <Animated.View
                style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
              <View style={{alignItems: 'center'}}>
                <View style={styles.header}>
                  <TextInput
                      style={styles.input}
                      placeholder='enter note...'
                      onChangeText={changeHandlerTextEdit}
                      defaultValue={editData[0].text}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder='enter description...'
                      onChangeText={changeHandlerDescriptionEdit}
                      defaultValue={editData[0].description}
                  />
                  <Button color='coral' onPress={() => {
                    editHandler(editData[0].index,edittext,editdescription,)
                    setVisible(false)
                  }} title='Edit note' />
                  {children}
                </View>
              </View>

            </Animated.View>
          </View>
        </Modal>
    );
  };



  return (
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            <AddNote submitHandler={submitHandler} />
            <View style={styles.list}>
              <FlatList
                  data={notes}
                  renderItem={({ item }) => (
                      <NoteItem item={item} pressHandler={pressHandler} setEditData={setEditData}/>
                  )}
              />
            </View>
          </View>
          <ModalPoup visible={visible}>
          </ModalPoup>
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});
