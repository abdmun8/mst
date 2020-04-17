import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Button, Text, Form, Label, Item, DatePicker, Input} from 'native-base';
import moment from 'moment';
import TCARDetail from './TCARDetailModal';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  content: {
    padding: 15,
    // backgroundColor: '#FFFFFF',
  },
  buttoncontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonContent: {
    flexGrow: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    alignSelf: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
    paddingTop: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
  },
  divider: {height: 20, width: '100%'},
  buttonHeader: {justifyContent: 'center'},
  tcarDetailContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    alignContent: 'center',
  },
  noTcarDetail: {alignSelf: 'center'},
  buttonDetailContainer: {paddingHorizontal: 10},
  buttonContainerRadio: {
    marginVertical: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    height: 20,
    marginLeft: 5,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    height: 20,
    marginLeft: 5,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#62B1F6',
  },
  radioContainer: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  errorText: {
    color: 'red',
    marginLeft: 15,
    fontSize: 10,
  },
  itemContainer: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    marginLeft: 10,
  },
  buttonItemContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginBottom: 10,
  },
  buttonItem: {marginHorizontal: 5},
});

const Divider = () => <View style={styles.divider} />;

export default function TCARHeader() {
  const [isSaved, setIsSaved] = useState(false);
  const [tcarHeader, setTcarHeader] = useState({
    no: null,
    status: null,
    name: null,
    date: new Date(),
    department: null,
    branch: null,
    employeeSN: null,
    deptHead: null,
    division: null,
  });
  const [tcarDetail, setTcarDetail] = useState({
    travelType: 'Domestic',
    items: [
      {
        date: new Date(),
        transportMethod: 'Air',
        description: 'Balikpapan - Jakarta',
        purpose: 'IT Workshop',
      },
    ],
  });
  const [notesRemarks, setNotesRemarks] = useState([
    {date: new Date(), notes: 'tes notes', by: 'Anonymous'},
  ]);
  const [cashdetail, setCashdetail] = useState([
    {
      expenseType: 'Domestic Travel - Airport Tax',
      currency: 'IDR',
      cashRequested: 120000,
    },
  ]);
  const [attachment, setAttachment] = useState([
    {date: new Date(), filename: 'tes.xlsx'},
  ]);

  const handleSave = () => {
    setIsSaved(true);
    let header = true;
    for (let [key, value] of Object.entries(tcarHeader)) {
      if (value !== '' || value !== null) {
        header = false;
      }
    }
    if (!header) {
      ToastAndroid.showWithGravity(
        'Please Check Header Form',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }
    if (TCARDetail.items.length === 0) {
      ToastAndroid.showWithGravity(
        'Please add Cash detail',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }
    if (cashdetail.length === 0) {
      ToastAndroid.showWithGravity(
        'Please add Cash detail',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }
    if (!attachment.length) {
      ToastAndroid.showWithGravity(
        'Please add Attachment',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    ToastAndroid.showWithGravity(
      'Save Success',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  // set travel type
  const setTravelType = (value) =>
    setTcarDetail({...tcarDetail, travelType: value});
  // set Header Form
  const setHeaderForm = (value, key) => {
    // employee SN number only
    if (key === 'employeeSN' && isNaN(Number(value))) {
      value = value.substr(0, value.length - 1);
    }
    setTcarHeader({...tcarHeader, [key]: value});
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.formContainer}>
          {/* section title */}
          <Text style={styles.sectionTitle}>TCAR Header</Text>
          {/* form */}
          <Form>
            <Item stackedLabel>
              <Label>TCAR No</Label>
              <Input
                onChangeText={(text) => setHeaderForm(text, 'no')}
                value={tcarHeader.no}
              />
            </Item>
            {isSaved && (tcarHeader.no == null || tcarHeader.no === '') && (
              <Text style={styles.errorText}>Please fill this field</Text>
            )}

            <Item stackedLabel>
              <Label>TCAR Status</Label>
              <Input
                onChangeText={(text) => setHeaderForm(text, 'status')}
                value={tcarHeader.status}
              />
            </Item>
            {isSaved &&
              (tcarHeader.status == null || tcarHeader.status === '') && (
                <Text style={styles.errorText}>Please fill this field</Text>
              )}
            <Item stackedLabel>
              <Label>Employee Name</Label>
              <Input
                onChangeText={(text) => setHeaderForm(text, 'name')}
                value={tcarHeader.name}
              />
            </Item>
            {isSaved && (tcarHeader.name == null || tcarHeader.name === '') && (
              <Text style={styles.errorText}>Please fill this field</Text>
            )}
            <Item stackedLabel>
              <Label>Departement</Label>
              <Input
                onChangeText={(text) => setHeaderForm(text, 'department')}
              />
            </Item>
            {isSaved &&
              (tcarHeader.department == null ||
                tcarHeader.department === '') && (
                <Text style={styles.errorText}>Please fill this field</Text>
              )}
            <Item stackedLabel>
              <Label>Branch</Label>
              <Input
                onChangeText={(text) => setHeaderForm(text, 'branch')}
                value={tcarHeader.branch}
              />
            </Item>
            {isSaved &&
              (tcarHeader.branch == null || tcarHeader.branch === '') && (
                <Text style={styles.errorText}>Please fill this field</Text>
              )}
            <Item stackedLabel>
              <Label>TCAR Date</Label>
              <DatePicker
                defaultDate={new Date()}
                value={tcarHeader.date}
                locale={'en'}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                onDateChange={(date) => setHeaderForm(date, 'date')}
                disabled={false}
              />
            </Item>
            <Item stackedLabel>
              <Label>Employee S/N</Label>
              <Input
                keyboardType={'numeric'}
                onChangeText={(text) => setHeaderForm(text, 'employeeSN')}
                value={tcarHeader.employeeSN}
              />
            </Item>
            {isSaved &&
              (tcarHeader.employeeSN == null ||
                tcarHeader.employeeSN === '') && (
                <Text style={styles.errorText}>Please fill this field</Text>
              )}
            <Item stackedLabel>
              <Label>Dept. head</Label>
              <Input
                onChangeText={(text) => setHeaderForm(text, 'deptHead')}
                value={tcarHeader.deptHead}
              />
            </Item>
            {isSaved &&
              (tcarHeader.deptHead == null || tcarHeader.deptHead === '') && (
                <Text style={styles.errorText}>Please fill this field</Text>
              )}
            <Item stackedLabel>
              <Label>Division</Label>
              <Input
                onChangeText={(text) => setHeaderForm(text, 'division')}
                value={tcarHeader.division}
              />
            </Item>
            {isSaved &&
              (tcarHeader.division == null || tcarHeader.division === '') && (
                <Text style={styles.errorText}>Please fill this field</Text>
              )}
          </Form>
        </View>
        <Divider />
        {/* TCAR Detail */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>TCAR Detail</Text>
          <View style={styles.radioContainer}>
            <View style={styles.buttonContainerRadio}>
              <Text>Travel Type:</Text>
            </View>
            <View style={styles.buttonContainerRadio}>
              <Text>Domestic</Text>
              <TouchableOpacity
                style={
                  tcarDetail.travelType === 'Domestic'
                    ? styles.checkedCircle
                    : styles.circle
                }
                onPress={() => setTravelType('Domestic')}
              />
            </View>
            <View style={styles.buttonContainerRadio}>
              <Text>Overseas</Text>
              <TouchableOpacity
                style={
                  tcarDetail.travelType === 'Overseas'
                    ? styles.checkedCircle
                    : styles.circle
                }
                onPress={() => setTravelType('Overseas')}
              />
            </View>
          </View>
          {tcarDetail.items.length === 0 ? (
            <View style={styles.tcarDetailContainer}>
              <Text style={styles.noTcarDetail}>Please add TCAR Detail</Text>
            </View>
          ) : (
            <View style={styles.tcarDetailContainer}>
              {tcarDetail.items.map((item, index) => {
                // return <Text>Date: {item.date}</Text>;
                const date = moment(item.date).format('DD/MM/YYYY');
                return (
                  <View style={styles.itemContainer} key={index}>
                    <Text>Date: {date}</Text>
                    <Text>TransportMethod: {item.transportMethod}</Text>
                    <Text>Description: {item.description}</Text>
                    <Text>Purpose: {item.purpose}</Text>
                    <View style={styles.buttonItemContainer}>
                      <View style={styles.buttonItem}>
                        <Button small rounded danger>
                          <Text>Delete</Text>
                        </Button>
                      </View>
                      <View style={styles.buttonItem}>
                        <Button small rounded success>
                          <Text>Edit</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          <View style={styles.buttonDetailContainer}>
            <Button style={styles.buttonHeader} info rounded>
              <Text>ADD</Text>
            </Button>
          </View>
        </View>
        <Divider />
        {/* CASH Detail */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>CASH Detail</Text>
          {cashdetail.length === 0 ? (
            <View style={styles.tcarDetailContainer}>
              <Text style={styles.noTcarDetail}>Please add Cash Detail</Text>
            </View>
          ) : (
            <View style={styles.tcarDetailContainer}>
              {cashdetail.map((item, index) => {
                return (
                  <View style={styles.itemContainer} key={index}>
                    <Text>Expense Type: {item.expenseType}</Text>
                    <Text>TransportMethod: {item.currency}</Text>
                    <Text>Description: {item.cashRequested}</Text>
                    <View style={styles.buttonItemContainer}>
                      <View style={styles.buttonItem}>
                        <Button small rounded danger>
                          <Text>Delete</Text>
                        </Button>
                      </View>
                      <View style={styles.buttonItem}>
                        <Button small rounded success>
                          <Text>Edit</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          <View style={styles.buttonDetailContainer}>
            <Button style={styles.buttonHeader} info rounded>
              <Text>ADD</Text>
            </Button>
          </View>
        </View>
        <Divider />
        {/* Notes /remarks */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Notes/Remarks</Text>
          {notesRemarks.length === 0 ? (
            <View style={styles.tcarDetailContainer}>
              <Text style={styles.noTcarDetail}>Please add Notes/Remarks</Text>
            </View>
          ) : (
            <View style={styles.tcarDetailContainer}>
              {notesRemarks.map((item, index) => {
                const date = moment(item.date).format('DD/MM/YYYY');
                return (
                  <View style={styles.itemContainer} key={index}>
                    <Text>Date: {date}</Text>
                    <Text>Notes: {item.notes}</Text>
                    <Text>By: {item.by}</Text>
                    <View style={styles.buttonItemContainer}>
                      <View style={styles.buttonItem}>
                        <Button small rounded danger>
                          <Text>Delete</Text>
                        </Button>
                      </View>
                      <View style={styles.buttonItem}>
                        <Button small rounded success>
                          <Text>Edit</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          <View style={styles.buttonDetailContainer}>
            <Button style={styles.buttonHeader} info rounded>
              <Text>ADD</Text>
            </Button>
          </View>
        </View>
        <Divider />
        {/* File Attachment */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>File Attachment</Text>
          {attachment.length === 0 ? (
            <View style={styles.tcarDetailContainer}>
              <Text style={styles.noTcarDetail}>
                Please add File Attachment
              </Text>
            </View>
          ) : (
            <View style={styles.tcarDetailContainer}>
              {attachment.map((item, index) => {
                const date = moment(item.date).format('DD/MM/YYYY');
                return (
                  <View style={styles.itemContainer} key={index}>
                    <Text>Date: {date}</Text>
                    <Text>Filename: {item.filename}</Text>
                    <View style={styles.buttonItemContainer}>
                      <View style={styles.buttonItem}>
                        <Button small rounded danger>
                          <Text>Delete</Text>
                        </Button>
                      </View>
                      <View style={styles.buttonItem}>
                        <Button small rounded success>
                          <Text>Edit</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          <View style={styles.buttonDetailContainer}>
            <Button style={styles.buttonHeader} info rounded>
              <Text>ADD</Text>
            </Button>
          </View>
        </View>
        <Divider />
        {/* button */}
        <View style={styles.buttoncontainer}>
          <View style={styles.buttonContent}>
            <Button
              onPress={handleSave}
              style={styles.buttonHeader}
              info
              rounded>
              <Text>SAVE</Text>
            </Button>
          </View>
          <View style={styles.buttonContent}>
            <Button style={styles.buttonHeader} warning rounded>
              <Text>CLEAR</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
