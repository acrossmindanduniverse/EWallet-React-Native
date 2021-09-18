/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {makeTransfer} from './redux/actions/private';
import {
  getUserForTransfer,
  errorDefault,
  getUserSigned,
  getUserDefault,
} from './redux/actions/user';

const OnePlatform = props => {
  const {token} = props.auth.token;
  const {transfer, userSigned, errMsg} = props.user;
  const [deductedBalance, setDeductedBalance] = useState(0);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [balance, setBalance] = useState(false);

  const doTransfer = () => {
    const newTransfer = {
      deductedBalance,
      phone,
      message,
    };
    props.makeTransfer(token, newTransfer).then(() => {
      props.errorDefault();
      setPhone('');
      props.getUserDefault();
      props.getUserSigned(token);
      setSpinner(true);
      setModal(false);
    });
  };

  const showModal = visible => {
    setModal(visible);
    props.getUserForTransfer(token, phone);
  };

  useEffect(() => {
    if (!modal) {
      props.errorDefault();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, errMsg]);

  useEffect(() => {
    if (spinner) {
      // props.getUserDefault();
      setTimeout(() => {
        setSpinner(false);
      }, 2000);
      setTimeout(() => {
        setBalance(false);
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
            <Text style={styles.successText}>Transfer Success</Text>
          </View>
        </View>
      )}
      <Modal
        transparent={true}
        visible={modal}
        animationType="fade"
        onRequestClose={() => setModal(true)}>
        <ScrollView style={styles.modalContainer}>
          <View
            marginHorizontal={30}
            height="100%"
            borderRadius={7}
            backgroundColor="#fff">
            <View style={styles.modalContent}>
              <Text style={styles.confirm}>Konfirmasi Transfer</Text>
              {errMsg !== '' ? (
                <View style={styles.receiverParent}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'Poppins-SemiBold',
                      color: 'rgb(86, 36, 179)',
                    }}>
                    User gak ketemu, edit dulu yuk
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.primaryText}>Penerima</Text>
                  <View style={styles.receiverContainer}>
                    <View style={styles.receiverPicture}>
                      <Image />
                    </View>
                    {transfer !== null && (
                      <View marginLeft={25}>
                        <Text style={styles.name}>{transfer.name}</Text>
                        <Text style={styles.primaryText}>
                          AVA - {transfer.phone}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
              <View style={styles.primaryContainer}>
                <Text style={styles.primaryText}>Sumber Dana</Text>
                <Text style={styles.secondaryText}>AVA Cash</Text>
              </View>
              <View style={styles.primaryContainer}>
                <Text style={styles.primaryText}>Pesan(opsional)</Text>
                <Text style={styles.secondaryText}>{message}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detail}>Detail</Text>
                <View style={styles.secondaryContainer}>
                  <Text style={styles.primaryText}>Nominal Transfer</Text>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.detail}>
                      Rp{Number(deductedBalance).toLocaleString('ind')}
                    </Text>
                  </View>
                </View>
                <View style={styles.secondaryContainer}>
                  <Text style={styles.primaryText}>Biaya Transaksi</Text>
                  <Text style={styles.detail}>Rp0</Text>
                </View>
              </View>
              <View style={styles.secondaryContainer}>
                <Text style={styles.detail}>Total</Text>
                <Text style={styles.detail}>
                  Rp{Number(deductedBalance).toLocaleString('ind')}
                </Text>
              </View>
              <View>
                {errMsg !== '' ? (
                  <View style={styles.optionBtnContainer}>
                    <TouchableOpacity onPress={() => showModal(false)}>
                      <Text style={styles.noText}>EDIT</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.optionBtnContainer}>
                    <TouchableOpacity
                      onPress={doTransfer}
                      style={styles.optionBtn1}>
                      <Text style={styles.yesText}>TRANSFER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{paddingTop: 10}}
                      onPress={() => showModal(false)}>
                      <Text style={styles.noText}>BATALKAN</Text>
                    </TouchableOpacity>
                  </View>
                  //08129312721
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <ScrollView>
        <View style={styles.nameOrPhone}>
          <View>
            <TextInput
              style={styles.textInput1}
              value={phone}
              onChangeText={setPhone}
              placeholder="Masukkan nama atau nomor ponsel"
            />
          </View>
        </View>
        <View style={styles.sourceContainer}>
          <Text style={styles.sourceText}>Sumber Dana</Text>
          <View style={styles.sourceContent}>
            <View style={styles.sourceInsideContent}>
              <View style={styles.avaContainer}>
                <Text style={styles.avaText}>AVA</Text>
              </View>
              <View style={styles.avaCashContainer}>
                <Text style={styles.avaCashText}>AVA Cash</Text>
                <View style={styles.balanceContainer}>
                  <Text style={styles.balance1}>Saldo</Text>
                  <Text style={styles.balance2}>
                    {' '}
                    Rp{Number(userSigned.balance).toLocaleString('ind')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.deductedBalanceContainer}>
          <Text style={styles.transferNominal}>Nominal Transfer</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currency}>Rp</Text>
            <TextInput
              style={styles.numberInput}
              defaultValue={deductedBalance}
              onChangeText={val => {
                if (val < 10000) {
                  setBalance(true);
                } else {
                  setBalance(false);
                  setDeductedBalance(val);
                }
              }}
            />
          </View>
          <View style={styles.errorContainer}>
            {balance && (
              <Text style={styles.errorHandling}>Minimal Transfer 10.000</Text>
            )}
          </View>
        </View>
        <View style={styles.messageContainer}>
          <View style={styles.textInputContainer1}>
            <TextInput
              style={styles.textInput1}
              value={message}
              onChangeText={setMessage}
              placeholder="Pesan (opsional)"
            />
          </View>
        </View>
      </ScrollView>
      <View>
        {userSigned.balance < 10000 ? (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('topUp')}
            style={styles.continue}>
            <Text style={styles.continueText}>TOP UP DULU</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <View style={{alignItems: 'center'}}>
              {deductedBalance > 10000000 && (
                <Text style={{fontFamily: 'Poppins-Light', color: 'red'}}>
                  Nominal tidak bisa lebih dari 10.000.000
                </Text>
              )}
            </View>
            {phone !== '' && !balance && deductedBalance <= 10000000 ? (
              <TouchableOpacity
                onPress={() => showModal(true)}
                style={styles.continue}>
                <Text style={styles.continueText}>LANJUTKAN</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.continue2}>
                <Text style={styles.continueText}>LANJUTKAN</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#fff',
    flex: 1,
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
  modalContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#000000a0',
    height: '100%',
  },
  receiverContainer: {
    flexDirection: 'row',
  },
  modalContent: {
    margin: 35,
  },
  confirm: {
    fontFamily: 'Poppins-Bold',
    color: 'rgb(86, 36, 179)',
    fontSize: 15,
    marginBottom: 35,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  receiverPicture: {
    width: 35,
    height: 35,
    backgroundColor: 'grey',
    borderRadius: 35 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryContainer: {
    marginVertical: 25,
  },
  primaryText: {
    fontSize: 15,
    marginBottom: 15,
  },
  secondaryText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  detailContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  detail: {
    fontSize: 15,
    marginVertical: 6,
    fontFamily: 'Poppins-Bold',
  },
  secondaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameOrPhone: {
    margin: 30,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  contactIcon: {
    justifyContent: 'center',
  },
  textInputContainer1: {
    borderBottomWidth: 1,
  },
  textInput1: {
    marginBottom: 7,
    fontSize: 18,
  },
  contacts: {
    fontSize: 32,
    left: 25,
    color: 'rgb(148, 148, 148)',
  },
  sourceContainer: {
    marginTop: 35,
    marginHorizontal: 35,
  },
  sourceText: {
    bottom: 8,
  },
  sourceContent: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(148, 148, 148)',
  },
  sourceInsideContent: {
    marginHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 20,
  },
  avaContainer: {
    backgroundColor: 'rgb(86, 36, 179)',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  avaText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#fff',
    marginHorizontal: 15,
    marginVertical: 3,
  },
  balanceContainer: {
    flexDirection: 'row',
  },
  balance1: {
    color: 'rgb(201, 201, 201)',
  },
  balance2: {
    fontSize: 15,
  },
  avaCashText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  deductedBalanceContainer: {
    backgroundColor: 'rgb(247, 247, 247)',
    borderRadius: 7,
    marginHorizontal: 30,
    padding: 10,
    marginVertical: 15,
  },
  transferNominal: {
    marginVertical: 15,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  currency: {
    fontSize: 20,
    backfaceVisibility: 'hidden',
    fontFamily: 'Poppins-Bold',
  },
  numberInput: {
    fontSize: 20,
    width: '80%',
    fontFamily: 'Poppins-Bold',
  },
  errorContainer: {
    justifyContent: 'center',
    height: 40,
  },
  errorHandling: {
    color: 'red',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  messageContainer: {
    marginHorizontal: 25,
  },
  continue: {
    borderRadius: 30,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(24, 237, 166)',
  },
  continue2: {
    borderRadius: 30,
    margin: 10,
    justifyContent: 'center',
    opacity: 0.5,
    alignItems: 'center',
    backgroundColor: 'rgb(24, 237, 166)',
  },
  continueText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    marginVertical: 15,
  },
  optionBtnContainer: {
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  optionBtn1: {
    backgroundColor: 'rgb(54, 255, 181)',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
  },
  yesText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  noText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'rgb(54, 255, 181)',
  },
});

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

const mapDispatchToProps = {
  makeTransfer,
  getUserSigned,
  getUserForTransfer,
  getUserDefault,
  errorDefault,
};

export default connect(mapStateToProps, mapDispatchToProps)(OnePlatform);
