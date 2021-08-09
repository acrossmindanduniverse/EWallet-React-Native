/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {View, StyleSheet, Alert} from 'react-native';
import {getOtp} from './redux/actions/auth';
import {connect} from 'react-redux';

const OTP = props => {
  const [code, setCode] = useState();
  const str = Date.now();
  const [getCode, setGetCode] = useState();
  const newStr = str.toString();
  const newCode = newStr.slice(9);

  // useEffect(() => {
  //   setCode(newCode);
  //   Alert.alert(`this is your code ${code}`);
  // }, []);

  useEffect(() => {
    props.getOtp(getCode);
  }, []);

  useEffect(() => {
    if (getCode !== undefined) {
      props.navigation.navigate('splash');
    }
  }, [getCode]);

  console.log(getCode, 'test get');
  return (
    <View style={styles.parent}>
      <OTPInputView
        style={styles.otpParent}
        pinCount={4}
        codeInputFieldStyle={styles.underline}
        codeInputHighlightStyle={styles.underlineHighLighted}
        autoFocusOnLoad
        keyboardType="number-pad"
        onCodeFilled={test => {
          setGetCode(test);
          console.log(`code ${test}`);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: 30,
  },
  // otpParent: {
  // },
  underline: {
    width: 30,
    color: '#000',
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineHighLighted: {
    borderColor: 'rgb(86, 36, 179)',
  },
});

const mapDispatchToProps = {getOtp};

export default connect(null, mapDispatchToProps)(OTP);
