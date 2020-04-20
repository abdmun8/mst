import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, Modal, ToastAndroid} from 'react-native';
import {Button, Text, Form, Item, Label, Input, DatePicker} from 'native-base';
import DocumentPicker from 'react-native-document-picker';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#888888',
  },
  buttonDetailContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
  },
  buttonHeader: {
    justifyContent: 'center',
    flexGrow: 1,
    borderRadius: 25,
    marginTop: 10,
  },
  content: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginLeft: 15,
    fontSize: 10,
  },
});

const allowedFile = ['pdf', 'xls', 'xlsx', 'doc', 'docx'];

export default function Notes({
  show,
  setShow,
  addItem,
  editedValue,
  updateItem,
  detailForm,
  setDetailForm,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const saveDetail = () => {
    // console.log(detailForm);
    // return;
    let valid = true;
    setIsSaved(true);
    for (let [key, value] of Object.entries(detailForm)) {
      if (value === '') {
        valid = false;
      }
    }
    if (!valid) {
      return;
    }
    if (editedValue.type !== '') {
      updateItem(detailForm);
    } else {
      addItem(detailForm);
    }
    setShow(false);
    setIsSaved(false);
  };

  const setFormValue = (value, key) => {
    setDetailForm({...detailForm, [key]: value});
  };

  const chooseFile = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (res.size > 10000000) {
        ToastAndroid.showWithGravity(
          'Max size 10 MB!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        return;
      }

      const extArr = res.name.split('.');
      const ext = extArr[extArr.length - 1];
      let fileAllowed = false;
      for (let i = 0; i < allowedFile.length; i++) {
        const allowed = allowedFile[i];
        if (allowed === ext) {
          fileAllowed = true;
        }
      }
      if (!fileAllowed) {
        ToastAndroid.showWithGravity(
          'Only pdf, word, and excel file allowed!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        return;
      }
      setFormValue(res.name, 'filename');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  useEffect(() => {}, [detailForm]);
  return (
    <Modal
      backgroundColor="#dddddd"
      style={styles.container}
      presentationStyle="pageSheet"
      animationType="fade"
      animated="true"
      visible={show}>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Attachment</Text>
        <View style={styles.buttonDetailContainer}>
          <Form>
            <Item stackedLabel>
              <Label>Date</Label>
              <DatePicker
                defaultDate={new Date()}
                value={detailForm.date}
                locale={'en'}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                onDateChange={(date) =>
                  setFormValue({...detailForm, date: date})
                }
                disabled={false}
              />
            </Item>
            <Item stackedLabel disabled>
              <Label>File</Label>
              <Input disabled value={detailForm.filename} />
              <Button
                small
                light
                style={[styles.buttonHeader, {marginBottom: 10}]}
                onPress={chooseFile}>
                <Text>Choose File</Text>
              </Button>
            </Item>
            {isSaved && detailForm.filename === '' ? (
              <Text style={styles.errorText}>Please fill this field</Text>
            ) : null}
          </Form>
          <Button style={styles.buttonHeader} info onPress={() => saveDetail()}>
            <Text>SAVE</Text>
          </Button>
          <Button
            style={styles.buttonHeader}
            warning
            onPress={() => {
              setIsSaved(false);
              setShow(false);
            }}>
            <Text>CANCEL</Text>
          </Button>
        </View>
      </ScrollView>
    </Modal>
  );
}
