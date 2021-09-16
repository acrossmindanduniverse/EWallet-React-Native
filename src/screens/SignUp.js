/* eslint-disable react-native/no-inline-styles */
import {Formik} from 'formik';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {authSignUp, errMsgDefault} from './redux/actions/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {validationSchema} from './helpers/validation';

const SignUp = props => {
  const [customAlert, setCustomAlert] = useState(false);
  const {onToggle, signUpErrMsg} = props.auth;
  const [spinner, setSpinner] = useState(false);

  const handleSignUp = data => {
    props.authSignUp(data);
  };

  useEffect(() => {
    setTimeout(() => {
      props.errMsgDefault();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpErrMsg]);

  useEffect(() => {
    if (onToggle) {
      setSpinner(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onToggle]);

  useEffect(() => {
    if (spinner) {
      setTimeout(() => {
        setSpinner(false);
      }, 2000);
      setTimeout(() => {
        setCustomAlert(true);
      }, 2000);
    }
  }, [spinner, customAlert]);

  useEffect(() => {
    if (customAlert) {
      setTimeout(() => {
        props.errMsgDefault();
        setCustomAlert(false);
        props.navigation.navigate('auth');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customAlert]);

  return (
    <View style={styles.parent}>
      {spinner && (
        <View style={styles.customAlertContainer}>
          <View>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      )}
      {customAlert && (
        <View style={styles.customAlertContainer}>
          <View style={styles.successContainer}>
            <AntDesign name="checkcircleo" style={styles.succesText} />
            <Text style={styles.succesText}>Sign Up Success</Text>
          </View>
        </View>
      )}
      <View>
        <Text style={styles.signUp}>Sign Up</Text>
        <View style={{paddingHorizontal: 90, height: 75}}>
          {signUpErrMsg !== '' && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000000a0',
                padding: 8,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: 'red',
                  fontSize: 16,
                }}>
                {signUpErrMsg}
              </Text>
            </View>
          )}
        </View>
        <Formik
          initialValues={{
            email: '',
            password: '',
            phone: '',
          }}
          validationSchema={validationSchema}
          onSubmit={val => handleSignUp(val)}>
          {({errors, handleChange, handleBlur, handleSubmit, values}) => (
            <View style={{padding: 20}}>
              <View>
                <Text style={styles.errorMessage}>{errors.email}</Text>
                <Text style={styles.errorMessage}>{errors.password}</Text>
                <TextInput
                  style={styles.signUpForm}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Email Address"
                  placeholderTextColor="#fff"
                  value={values.email}
                />
                <TextInput
                  style={styles.signUpForm}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  value={values.password}
                />
                <TextInput
                  style={styles.signUpForm}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  placeholder="Phone Number"
                  placeholderTextColor="#fff"
                  value={values.phone}
                />
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.signUpBtn}
                  onPress={handleSubmit}>
                  <Text style={styles.signUpText}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#9333f2',
    justifyContent: 'center',
    flex: 1,
  },
  customAlertContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    zIndex: 1,
    padding: 15,
    backgroundColor: '#000000a0',
    height: '100%',
  },
  successContainer: {
    backgroundColor: 'rgb(212, 153, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 25,
  },
  succesText: {
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 5,
    fontSize: 18,
    marginVertical: 20,
    color: '#fff',
  },
  image: {
    height: '100%',
  },
  // signUpContainer: {
  //   justifyContent: 'flex-end',
  // },
  signUp: {
    fontSize: 70,
    textAlign: 'center',
    fontStyle: 'normal',
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  errorMessage: {
    fontSize: 20,
    color: 'red',
    marginHorizontal: 31,
  },
  signUpForm: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontSize: 20,
    color: '#fff',
  },
  btnContainer: {
    marginTop: 40,
  },
  signUpBtn: {
    backgroundColor: 'rgb(86, 36, 179)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
  },
  signUpText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authSignUp, errMsgDefault};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
