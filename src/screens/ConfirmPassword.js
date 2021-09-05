/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {confirmPassword, errorDefault} from './redux/actions/user';
import {connect} from 'react-redux';

const ConfirmPassword = props => {
  const {updatePassword, errMsg} = props.user;
  const [password, setPassword] = useState({
    password: '',
  });

  console.log(updatePassword, 'test user');

  const handleConfirmPassword = () => {
    if (props.auth.token !== null) {
      props.confirmPassword(props.auth.token.token, password);
    }
  };

  useEffect(() => {
    if (updatePassword) {
      props.errorDefault();
      props.navigation.navigate('editPassword');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePassword]);

  return (
    <View style={{flex: 1, padding: 40, justifyContent: 'center'}}>
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.errMsgContainer}>
            {errMsg !== '' && <Text style={styles.errMsg}>{errMsg}</Text>}
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
              placeholder="Masukkan password lama anda"
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleConfirmPassword}
          style={styles.btnContinue}>
          <Text style={styles.continueText}>LANJUTKAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // inputParent: {
  //   marginHorizontal: 50,
  //   marginVertical: 140,
  // },
  errMsgContainer: {
    height: 40,
    justifyContent: 'center',
  },
  errMsg: {
    color: 'red',
    fontSize: 18,
    marginLeft: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  inputContainer: {
    borderRadius: 17,
    padding: 25,
    backgroundColor: '#fff',
  },
  inputField: {
    marginBottom: 70,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
  },
  input: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  btnContinue: {
    marginVertical: 30,
    backgroundColor: 'rgb(86, 36, 179)',
    padding: 18,
    alignItems: 'center',
    borderRadius: 25,
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

const mapDispatchToProps = {confirmPassword, errorDefault};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);
