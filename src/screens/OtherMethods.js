import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';

const OtherMethods = props => {
  const {userSigned} = props.user;

  return (
    <View style={styles.parent}>
      <View style={styles.topUpParent}>
        <View style={styles.topUpContainer}>
          <Text style={styles.topUpText}>Top Up Saldo Ke</Text>
          <View style={styles.topUpContent}>
            <Text style={styles.topUp}>AVA Cash</Text>
          </View>
        </View>
        <View style={styles.balanceContainer}>
          <View style={styles.balanceContent}>
            <Text style={styles.balanceText1}>SALDO AVA CASH</Text>
            <Text style={styles.balanceText2}>
              Rp{Number(userSigned.balance).toLocaleString('ind')}
            </Text>
          </View>
          <Text style={styles.balanceMax}>
            Maks. Saldo AVA Cash Rp10.000.000
          </Text>
        </View>
      </View>
      <View style={styles.otherTopUps}>
        <View style={styles.topUpTextContainer}>
          <Text style={styles.topUpTitle}>
            Top up makin mudah dengan metode berikut:
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.otherMethodsContainer}>
          <View style={styles.otherMethodsContent}>
            <View style={styles.chooseMethodContainer}>
              <View style={styles.chooseMethod}>
                <AntDesign style={styles.antDesign} name="creditcard" />
                <Text style={styles.topUpText2}>Kartu Debit</Text>
              </View>
              <TouchableOpacity style={styles.primaryIconContainer}>
                <Entypo style={styles.primaryIcon} name="chevron-right" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.otherMethodsContent}>
            <View style={styles.chooseMethodContainer}>
              <View style={styles.chooseMethod}>
                <AntDesign style={styles.antDesign} name="creditcard" />
                <Text style={styles.topUpText2}>Kartu Debit</Text>
              </View>
              <TouchableOpacity style={styles.primaryIconContainer}>
                <Entypo style={styles.primaryIcon} name="chevron-right" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.otherMethodsContent}>
            <View style={styles.chooseMethodContainer}>
              <View style={styles.chooseMethod}>
                <AntDesign style={styles.antDesign} name="creditcard" />
                <Text style={styles.topUpText2}>Kartu Debit</Text>
              </View>
              <TouchableOpacity style={styles.primaryIconContainer}>
                <Entypo style={styles.primaryIcon} name="chevron-right" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.otherMethodsContent}>
            <View style={styles.chooseMethodContainer}>
              <View style={styles.chooseMethod}>
                <AntDesign style={styles.antDesign} name="creditcard" />
                <Text style={styles.topUpText2}>Kartu Debit</Text>
              </View>
              <TouchableOpacity style={styles.primaryIconContainer}>
                <Entypo style={styles.primaryIcon} name="chevron-right" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.otherMethodsContent}>
            <View style={styles.chooseMethodContainer}>
              <View style={styles.chooseMethod}>
                <AntDesign style={styles.antDesign} name="creditcard" />
                <Text style={styles.topUpText2}>Kartu Debit</Text>
              </View>
              <TouchableOpacity style={styles.primaryIconContainer}>
                <Entypo style={styles.primaryIcon} name="chevron-right" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.otherMethodsContent}>
            <View style={styles.chooseMethodContainer}>
              <View style={styles.chooseMethod}>
                <AntDesign style={styles.antDesign} name="creditcard" />
                <Text style={styles.topUpText2}>Kartu Debit</Text>
              </View>
              <TouchableOpacity style={styles.primaryIconContainer}>
                <Entypo style={styles.primaryIcon} name="chevron-right" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
  },
  topUpParent: {
    backgroundColor: '#fff',
  },
  topUpContainer: {
    marginVertical: 20,
    marginHorizontal: 35,
  },
  topUpText: {
    fontSize: 15,
    color: 'rgb(66, 66, 66)',
  },
  topUpContent: {
    borderBottomWidth: 1,
  },
  topUp: {
    fontSize: 20,
  },
  balanceContainer: {
    marginVertical: 15,
    marginHorizontal: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceContent: {
    borderWidth: 1,
    height: 70,
    borderRadius: 7,
    width: '100%',
    backgroundColor: 'rgb(250, 250, 250)',
    borderColor: 'rgb(66, 66, 66)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText1: {
    fontSize: 20,
    color: 'rgb(66, 66, 66)',
  },
  balanceText2: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  balanceMax: {
    fontSize: 15,
    top: 5,
    marginBottom: 15,
  },
  materialCom: {
    color: 'rgb(72, 240, 161)',
    fontSize: 30,
  },
  topUpText2: {
    fontSize: 17,
    textAlign: 'center',
  },
  topUpTextContainer: {
    marginVertical: 20,
    marginHorizontal: 35,
  },
  topUpTitle: {
    fontSize: 17,
    textAlign: 'center',
    color: 'rgb(66, 66, 66)',
  },
  otherMethodsContainer: {
    marginHorizontal: 35,
    marginBottom: '50%',
  },
  otherMethodsContent: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 2,
    marginBottom: 10,
    height: 100,
    elevation: 2,
  },
  chooseMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  chooseMethod: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  antDesign: {
    color: 'rgb(69, 247, 191)',
    marginRight: 15,
    fontSize: 40,
  },
  primaryIconContainer: {
    justifyContent: 'center',
  },
  primaryIcon: {
    fontSize: 20,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(OtherMethods);
