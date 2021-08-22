import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  authSignIn,
  authRefreshToken,
  registerFcmToken,
  errMsgDefault,
} from './redux/actions/auth';

const SignIn = props => {
  const {errMsg, onAuth} = props.auth;
  console.log(props.auth);

  const handleSignIn = data => {
    props.authSignIn(data);
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
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={values => handleSignIn(values)}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View style={styles.parent}>
          <View>
            <Text style={styles.signIn}>Sign In</Text>
            <Text style={styles.errorMessage}>{errMsg}</Text>
            <View>
              <ScrollView>
                <TextInput
                  style={styles.signInForm}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Email Address"
                  placeholderTextColor="#fff"
                  value={values.email}
                />
                <TextInput
                  style={styles.signInForm}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  value={values.password}
                />
              </ScrollView>
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.signInBtn}
                  onPress={handleSubmit}>
                  <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('signUp')}
                  style={styles.signUpBtn}>
                  <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'rgb(212, 153, 255)',
    flex: 1,
  },
  image: {
    height: '100%',
  },
  errorMessage: {
    color: 'red',
    marginLeft: 31,
    fontSize: 20,
  },
  signInContainer: {
    marginTop: 260,
  },
  signIn: {
    fontSize: 70,
    marginTop: 180,
    marginLeft: 31,
    bottom: 78,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#fff',
  },
  signInForm: {
    borderBottomWidth: 1,
    height: 65,
    marginHorizontal: 31,
    borderBottomColor: '#fff',
    fontSize: 20,
    color: '#fff',
  },
  btnContainer: {
    marginHorizontal: 31,
    marginTop: 40,
  },
  signInBtn: {
    backgroundColor: 'rgb(86, 36, 179)',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    height: 70,
    borderRadius: 20,
  },
  signInText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  signUpBtn: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 20,
  },
  signUpText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'rgb(86, 36, 179)',
  },
  sideBorder: {
    marginHorizontal: 10,
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    marginLeft: 31,
    marginTop: 23,
  },
  forgotPasswordText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signInOptionContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  signInOption: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
