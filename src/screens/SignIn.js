/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  authSignIn,
  authRefreshToken,
  registerFcmToken,
  errMsgDefault,
} from './redux/actions/auth';

const SignIn = props => {
  const {errMsg} = props.auth;

  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = () => {
    props.authSignIn(signIn);
  };

  useEffect(() => {
    if (errMsg !== '') {
      props.errMsgDefault();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    AsyncStorage.removeItem('persist:auth');
  }, []);

  return (
    <ScrollView style={styles.parent}>
      <Text style={styles.signInHeaderText}>Sign In</Text>
      <View>
        <View>
          <View style={{height: 25}}>
            {errMsg !== '' && (
              <Text style={styles.errorMessage}>
                Email or password did not match to the record
              </Text>
            )}
          </View>
          <View style={styles.signIn}>
            <TextInput
              style={styles.signInText}
              onChangeText={val =>
                setSignIn({
                  ...signIn,
                  email: val,
                })
              }
              placeholder="Email Address"
            />
          </View>
          <View style={styles.signIn}>
            <TextInput
              style={styles.signInText}
              onChangeText={val =>
                setSignIn({
                  ...signIn,
                  password: val,
                })
              }
              secureTextEntry={true}
              placeholder="Password"
            />
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.signInBtn} onPress={handleSignIn}>
            <Text style={styles.primarySignInIText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('signUp')}
            style={styles.signIngBtn2}>
            <Text style={styles.signInText2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#9333f2',
    flex: 1,
    padding: 40,
    // paddingBottom: 100,
  },
  errorMessage: {
    color: '#e60017',
    fontSize: 20,
  },
  signIn: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
  },
  signInHeaderText: {
    fontSize: 60,
    marginVertical: 60,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  signInBtn: {
    backgroundColor: 'rgb(86, 36, 179)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginVertical: 15,
    borderRadius: 20,
  },
  signInText: {
    fontFamily: 'Poppins-Medium',
    color: '#000',
    fontSize: 20,
  },
  signIngBtn2: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
  },
  primarySignInIText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  signInText2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'rgb(86, 36, 179)',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  authSignIn,
  errMsgDefault,
  authRefreshToken,
  registerFcmToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
