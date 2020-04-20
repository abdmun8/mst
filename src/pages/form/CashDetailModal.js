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

export default function CashDetail({
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
    // number only
    if (key === 'cashRequested' && isNaN(Number(value))) {
      value = value.substr(0, value.length - 1);
    }
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
        <Text style={styles.sectionTitle}>Cash Detail</Text>
        <View style={styles.buttonDetailContainer}>
          <Form>
            <Item stackedLabel>
              <Label>Expense Type</Label>
              <Input
                onChangeText={(text) => setFormValue(text, 'expenseType')}
                value={detailForm.expenseType}
              />
            </Item>
            {isSaved && detailForm.expenseType === '' ? (
              <Text style={styles.errorText}>Please fill this field</Text>
            ) : null}
            <Item stackedLabel>
              <Label>Currency</Label>
              <Input
                onChangeText={(text) => setFormValue(text, 'currency')}
                value={detailForm.currency}
              />
            </Item>
            {isSaved && detailForm.currency === '' ? (
              <Text style={styles.errorText}>Please fill this field</Text>
            ) : null}
            <Item stackedLabel>
              <Label>Cash requested</Label>
              <Input
                keyboardType={'numeric'}
                onChangeText={(text) => setFormValue(text, 'cashRequested')}
                value={String(detailForm.cashRequested)}
              />
            </Item>
            {isSaved && detailForm.cashRequested === '' ? (
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
