import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, Modal} from 'react-native';
import {Button, Text, Form, Item, Label, Input, DatePicker} from 'native-base';

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

export default function TCARDetail({
  show,
  setShow,
  editedValue,
  updateItem,
  addItem,
  detailForm,
  setDetailForm,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const saveDetail = () => {
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
        <Text style={styles.sectionTitle}>TCAR Detail</Text>
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
            <Item stackedLabel>
              <Label>Transport Method</Label>
              <Input
                onChangeText={(text) => setFormValue(text, 'transportMethod')}
                value={detailForm.transportMethod}
              />
            </Item>
            {isSaved && detailForm.transportMethod === '' ? (
              <Text style={styles.errorText}>Please fill this field</Text>
            ) : null}
            <Item stackedLabel>
              <Label>Description</Label>
              <Input
                onChangeText={(text) => setFormValue(text, 'description')}
                value={detailForm.description}
              />
            </Item>
            {isSaved && detailForm.description === '' ? (
              <Text style={styles.errorText}>Please fill this field</Text>
            ) : null}
            <Item stackedLabel>
              <Label>Purpose</Label>
              <Input
                onChangeText={(text) => setFormValue(text, 'purpose')}
                value={detailForm.purpose}
              />
            </Item>
            {isSaved && detailForm.purpose === '' ? (
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
