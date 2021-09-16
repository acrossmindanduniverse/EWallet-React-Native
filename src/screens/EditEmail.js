import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import {validationSchema} from './helpers/validation';
import {connect} from 'react-redux';
import {updateThirdProfile, getUserSigned} from './redux/actions/user';
import AntDesign from 'react-native-vector-icons/AntDesign';

const EditEmail = props => {
  const user = props.user.userSigned;
  const {token} = props.auth.token;
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdateEmail = data2 => {
    props.updateThirdProfile(token, data2).then(() => {
      props.getUserSigned(token);
      setSpinner(true);
    });
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

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={val => handleUpdateEmail(val)}>
      {({errors, handleChange, handleBlur, handleSubmit, values}) => (
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
                <Text style={styles.successText}>Email Updated</Text>
              </View>
            </View>
          )}
          {console.log(values, 'test')}
          <ScrollView style={styles.changeParent}>
            <View style={styles.changeContainer}>
              <Text style={styles.changeText}>Ubah Email</Text>
              <Text style={styles.signed}>Email Terdaftar</Text>
              <Text style={styles.signedData}>{user.email}</Text>
            </View>
            <Text style={styles.errorMessage}>{errors.email}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={handleChange('email')}
                style={styles.input}
                onBlur={handleBlur('email')}
                placeholder="Email Baru"
                value={values.email}
              />
            </View>
            <View style={styles.stepsParent}>
              <Text style={styles.instruction}>Instruksi</Text>
              <View style={styles.stepsContainer}>
                <View style={styles.step}>
                  <View style={styles.circle} />
                  <Text style={styles.stepText}>Ubah email Anda</Text>
                </View>
                <View>
                  <AntDesign name="arrowdown" style={styles.straightLine} />
                </View>
                <View style={styles.step}>
                  <View style={styles.circle} />
                  <Text style={styles.stepText}>Lakukan login ulang</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.saveBtnContainer}>
            <TouchableOpacity onPress={handleSubmit} style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>SIMPAN</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  parent: {
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
  changeText: {
    color: 'rgb(86, 36, 179)',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  signed: {
    fontSize: 18,
    marginBottom: 15,
    color: 'grey',
  },
  signedData: {
    fontSize: 20,
  },
  changeParent: {
    margin: 35,
  },
  inputContainer: {
    borderBottomWidth: 1,
  },
  errorMessage: {
    color: 'red',
    fontSize: 15,
    marginTop: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    fontSize: 18,
  },
  saveBtnContainer: {
    marginBottom: 35,
  },
  saveBtn: {
    marginHorizontal: 35,
    borderRadius: 35,
    backgroundColor: 'rgb(54, 255, 181)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 25,
    marginVertical: 15,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  stepsParent: {
    marginTop: 40,
  },
  instruction: {
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    fontSize: 20,
  },
  step: {
    flexDirection: 'row',
    marginVertical: 5,
    marginLeft: 10,
  },
  circle: {
    backgroundColor: 'rgb(231, 145, 255)',
    borderWidth: 3,
    borderColor: 'rgb(86, 36, 179)',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
  stepText: {
    fontSize: 15,
    marginLeft: 20,
  },
  straightLine: {
    fontSize: 40,
    color: 'rgb(54, 255, 181)',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {updateThirdProfile, getUserSigned};

export default connect(mapStateToProps, mapDispatchToProps)(EditEmail);
