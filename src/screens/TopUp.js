import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OtherMethods from './OtherMethods';
import {createTopUp} from './redux/actions/private';
import {connect} from 'react-redux';
import {getUserSigned} from './redux/actions/user';

const TopUp = props => {
  const {token} = props.auth.token;
  const {userSigned} = props.user;
  const [clicked, setClicked] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [typed, setTyped] = useState(false);
  const [touched, setTouched] = useState(false);
  const [balance, setBalance] = useState(0);
  const tabArr = ['Instan Top Up', 'Metode Lain'];
  const balanceArr = [100000, 200000, 500000];

  const moveScreen = move => {
    setClicked(move);
  };

  const handleTopUp = () => {
    const newBalance = {
      balance: balance,
    };
    props.createTopUp(token, newBalance).then(() => {
      props.getUserSigned(token);
      setSpinner(true);
      setBalance(0);
    });
  };

  const addBalance = data => {
    setBalance(data);
  };

  useEffect(() => {
    if (spinner) {
      setTimeout(() => {
        setSpinner(false);
      }, 2000);
      setTimeout(() => {
        setSuccess(true);
      }, 2000);
    }
  }, [spinner, success]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSpinner(false);
        props.navigation.goBack();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  console.log(balance, 'test balance');

  return (
    <View style={styles.parent}>
      {spinner && (
        <View style={styles.loading}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="rgb(54, 255, 181)" />
          </View>
        </View>
      )}
      {success && (
        <View style={styles.loading}>
          <View style={styles.loadingContainer}>
            <Text style={styles.successText}>Top Up Success</Text>
          </View>
        </View>
      )}
      <View style={styles.headerParent}>
        <FlatList
          horizontal
          data={tabArr}
          renderItem={({item}) => (
            <View style={styles.btnContent}>
              <TouchableOpacity
                onPress={() => moveScreen(item)}
                style={styles.headerNavigation}>
                {console.log(item)}
                <Text style={styles.headerText}>{item}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      {clicked === tabArr[1] ? (
        <OtherMethods />
      ) : (
        <ScrollView>
          <View style={styles.topUp}>
            <View style={styles.topUpContainer}>
              <Text style={styles.primaryText}>Top Up ke</Text>
              <View style={styles.topUpContent}>
                <View style={styles.companyContainer}>
                  <Text style={styles.companyName}>AVA</Text>
                </View>
                <View style={styles.balanceContainer}>
                  <Text style={styles.avaCash}>AVA Cash</Text>
                  <Text style={styles.balance}>
                    Balance Rp{''}
                    {Number(userSigned.balance).toLocaleString('ind')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.topUpParent}>
            <View style={styles.topUpParentContainer}>
              <Text style={styles.primaryText}>Pilih Nominal Top Up</Text>
              <FlatList
                horizontal
                style={styles.nominalItems}
                data={balanceArr}
                renderItem={({item}) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        addBalance(item);
                        setTouched(false);
                      }}
                      style={
                        !touched && balance === item
                          ? styles.nominalBtn1
                          : styles.nominalBtn
                      }>
                      <Text style={styles.nominalText}>
                        Rp.{Number(item).toLocaleString('ind')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(_, index) => index}
              />
              <Text style={styles.enterNominalText}>
                Atau masukan nominal top up disini
              </Text>
              <SafeAreaView
                onTouchStart={() => setTouched(true)}
                style={styles.topUpinput}>
                <TextInput
                  style={styles.input}
                  onChangeText={val => {
                    if (val < 10000) {
                      setTyped(true);
                    } else {
                      setTyped(false);
                      setBalance(val);
                    }
                  }}
                  placeholder="Minimal Rp.10.000"
                />
              </SafeAreaView>
              <View style={styles.errorMsgContainer}>
                {typed && (
                  <Text style={styles.errorMsgText}>Minimal 10.000</Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.addCardParent}>
            <View style={styles.addCardContainer}>
              <Text style={styles.primaryText}>Kartu Debit</Text>
              <View style={styles.addCardContent}>
                <TouchableOpacity style={styles.addCard}>
                  <AntDesign style={styles.cardIcon} name="creditcard" />
                  <Text style={styles.addCardText}>Tambah Kartu Debit BCA</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.topUpBtnContainer}>
            {!typed ? (
              <TouchableOpacity onPress={handleTopUp} style={styles.topUpBtn}>
                <Text style={styles.topUpText}>Top Up Sekarang</Text>
              </TouchableOpacity>
            ) : (
              <View onPress={handleTopUp} style={styles.topUpBtn2}>
                <Text style={styles.topUpText}>Top Up Sekarang</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
  },
  loading: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#000000a0',
    height: '100%',
  },
  loadingContainer: {
    marginTop: 400,
  },
  successText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 35,
  },
  headerParent: {
    backgroundColor: 'rgb(86, 36, 179)',
    alignItems: 'center',
  },
  btnContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topUpBtnContainer: {
    backgroundColor: '#fff',
  },
  topUpBtn: {
    marginHorizontal: 15,
    borderRadius: 40,
    marginVertical: 20,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(86, 36, 179)',
  },
  topUpBtn2: {
    marginHorizontal: 15,
    borderRadius: 40,
    marginVertical: 20,
    height: 65,
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(86, 36, 179)',
  },
  topUpText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
  },
  headerNavigation: {
    marginVertical: 15,
    marginHorizontal: 70,
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 20,
  },
  topUp: {
    backgroundColor: '#fff',
    borderBottomWidth: 9,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  topUpContainer: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  primaryText: {
    fontSize: 25,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  topUpContent: {
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgb(86, 36, 179)',
    marginBottom: 40,
    alignItems: 'center',
  },
  companyContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
    height: 35,
    width: 45,
    justifyContent: 'center',
    backgroundColor: 'rgb(86, 36, 179)',
    borderRadius: 5,
  },
  balanceContainer: {
    marginVertical: 15,
  },
  companyName: {
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  avaCash: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
  },
  balance: {
    fontSize: 20,
  },
  topUpParent: {
    backgroundColor: '#fff',
    borderBottomWidth: 9,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  topUpParentContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  nominalBtn: {
    height: 50,
    width: 160,
    justifyContent: 'center',
    borderColor: 'rgb(232, 230, 230)',
    borderWidth: 2,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  nominalBtn1: {
    height: 50,
    width: 160,
    justifyContent: 'center',
    borderWidth: 2,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderColor: 'rgb(69, 247, 191)',
  },
  nominalText: {
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
  },
  enterNominalText: {
    marginTop: 20,
    fontSize: 20,
  },
  topUpinput: {
    height: 60,
    marginTop: 15,
    marginBottom: 30,
    justifyContent: 'center',
    backgroundColor: 'rgb(232, 230, 230)',
    borderRadius: 10,
  },
  input: {
    fontSize: 20,
    marginLeft: 15,
  },
  errorMsgContainer: {
    height: 40,
  },
  errorMsgText: {
    fontFamily: 'Poppins-Medium',
    marginLeft: 15,
    fontSize: 18,
    color: 'red',
  },
  addCardParent: {
    borderBottomWidth: 9,
    backgroundColor: '#fff',
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  addCardContainer: {
    marginHorizontal: 15,
    marginVertical: 60,
  },
  addCard: {
    borderColor: 'rgb(69, 247, 191)',
    borderWidth: 3,
    backgroundColor: 'rgb(240, 240, 240)',
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: 160,
    borderRadius: 10,
  },
  cardIcon: {
    marginTop: 20,
    color: 'rgb(69, 247, 191)',
    fontSize: 40,
  },
  addCardText: {
    marginBottom: 20,
    fontSize: 20,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {createTopUp, getUserSigned};

export default connect(mapStateToProps, mapDispatchToProps)(TopUp);
