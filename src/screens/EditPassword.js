/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {updatePassword, errorDefault} from './redux/actions/user';
import {connect} from 'react-redux';
import {authLogOut} from './redux/actions/auth';

const EditPassword = props => {
  const {updatePassword: updateToggle} = props.user;
  const [password, setPassword] = useState({
    password: '',
    resendPassword: '',
  });
  const [resend, setResend] = useState(false);
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const handleChangePassword = () => {
    if (props.auth.token !== null) {
      props.updatePassword(props.auth.token.token, password);
    }
  };

  const showModal = visible => {
    setModal(visible);
  };

  useEffect(() => {
    if (updateToggle) {
      setSpinner(true);
      setModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateToggle]);

  useEffect(() => {
    if (spinner) {
      props.errorDefault();
      setTimeout(() => {
        setSpinner(false);
        props.authLogOut();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinner]);

  useEffect(() => {
    if (!resend) {
      setResend(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Modal visible={modal} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <View style={styles.modalContent}>
              <Text style={styles.warn}>
                Are you sure want to change your password? after this you should
                back to sign in
              </Text>
              <View style={{marginVertical: 10}}>
                <TouchableOpacity
                  onPress={handleChangePassword}
                  style={styles.changeBtn}>
                  <Text style={styles.changeBtnText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => showModal(false)}
                  style={styles.cancelBtn}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {spinner && (
        <View style={styles.loading}>
          <View
            style={{
              zIndex: 1,
            }}>
            <ActivityIndicator size="large" color="rgb(86, 36, 179)" />
          </View>
        </View>
      )}
      <View style={{paddingHorizontal: 20}}>
        <View style={styles.inputContainer}>
          <View style={styles.errMsgContainer}>
            {password.password.length < 8 && (
              <Text style={styles.errMsg}>
                Password must be 8 or greater characters long
              </Text>
            )}
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              onChangeText={val =>
                setPassword({
                  ...password,
                  password: val,
                })
              }
              secureTextEntry={true}
              placeholder="Masukkan password baru anda"
            />
          </View>
          <View style={styles.inputField2}>
            <TextInput
              style={styles.input}
              onChangeText={val => {
                if (val !== password.password || password.password === '') {
                  setResend(true);
                } else {
                  setResend(false);
                  setPassword({
                    ...password,
                    resendPassword: val,
                  });
                }
              }}
              secureTextEntry={true}
              placeholder="Masukkan ulang password baru anda"
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {password.password === password.resendPassword &&
              password.password.length >= 8 &&
              !resend ? (
                <View style={styles.true} />
              ) : (
                <View style={styles.false} />
              )}
            </View>
          </View>
        </View>
        {password.password === password.resendPassword &&
        password.password.length >= 8 &&
        !resend ? (
          <TouchableOpacity
            onPress={() => showModal(true)}
            style={styles.btnContinue}>
            <Text style={styles.continueText}>Ganti Password</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.btnContinue2}>
            <Text style={styles.continueText}>Ganti Password</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#000000a0',
    height: '100%',
  },
  loading: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: '#000000a0',
    height: '100%',
  },
  errMsgContainer: {
    height: 60,
    justifyContent: 'center',
  },
  warn: {
    fontSize: 25,
    textAlign: 'justify',
    fontFamily: 'Poppins-Medium',
  },
  modalContent: {
    padding: 40,
    marginVertical: 30,
  },
  changeBtn: {
    backgroundColor: 'rgb(86, 36, 179)',
    marginBottom: 15,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  cancelBtn: {
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgb(86, 36, 179)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: 'rgb(86, 36, 179)',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  errMsg: {
    color: 'red',
    fontSize: 18,
    marginLeft: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  true: {
    backgroundColor: '#03fc84',
    width: 15,
    marginRight: 10,
    height: 15,
    borderRadius: 15 / 2,
  },
  false: {
    backgroundColor: 'red',
    width: 15,
    marginRight: 10,
    height: 15,
    borderRadius: 15 / 2,
  },
  inputContainer: {
    borderRadius: 17,
    padding: 25,
    backgroundColor: '#fff',
  },
  inputField: {
    borderWidth: 1,
    marginTop: 25,
    padding: 10,
    borderRadius: 10,
  },
  inputField2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
  },
  input: {
    // marginLeft: 15,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  btnContinue: {
    marginTop: 25,
    padding: 18,
    backgroundColor: 'rgb(86, 36, 179)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  btnContinue2: {
    marginTop: 25,
    padding: 18,
    backgroundColor: 'rgb(86, 36, 179)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    opacity: 0.5,
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {updatePassword, errorDefault, authLogOut};

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);
