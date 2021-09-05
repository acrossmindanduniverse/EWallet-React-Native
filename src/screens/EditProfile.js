/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getUserSigned,
  updateFirstProfile,
  uploadPicture,
  errorDefault,
} from './redux/actions/user';
import {connect} from 'react-redux';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {APP_BACKEND_URL} from '@env';

const EditProfile = props => {
  const {token} = props.auth.token;
  const user = props.user.userSigned;
  const {errMsg, updated, errPic, picToggle} = props.user;
  const [profile, setProfile] = useState({
    name: user.name,
  });
  const [picture, setPicture] = useState({
    picture: '',
  });
  const [modal, setModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLaunchCamera = e => {
    if (!e.didCancel) {
      setPicture({
        ...picture,
        picture: e.assets[0],
      });
    }
    setModal(false);
  };

  const handleLaunchGallery = event => {
    if (!event.didCancel) {
      setPicture({
        ...picture,
        picture: event.assets[0],
      });
    }
    setModal(false);
  };

  const handleUpdateProfile = () => {
    if (picture.picture !== '') {
      props.uploadPicture(token, picture);
    } else {
      props
        .updateFirstProfile(token, profile)
        .then(() => {
          props.getUserSigned(token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const showModal = visible => {
    setModal(visible);
  };

  const showPhoneModal = visible => {
    setPhoneModal(visible);
  };

  const goToEditPhone = () => {
    props.navigation.navigate('editPhone');
    setPhoneModal(false);
  };

  useEffect(() => {
    if (picToggle) {
      props
        .updateFirstProfile(token, profile)
        .then(() => {
          props.getUserSigned(token);
        })
        .catch(err => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picToggle]);

  useEffect(() => {
    if (updated) {
      setSpinner(true);
      props.errorDefault();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated, errMsg]);

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
        props.navigation.navigate('home');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  console.log(errPic, 'phone');
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
            <Text style={styles.successText}>Profile Updated</Text>
          </View>
        </View>
      )}
      <Modal
        transparent={true}
        visible={modal}
        animationType="fade"
        onRequestClose={() => setModal(true)}>
        <TouchableOpacity
          onPressOut={() => showModal(false)}
          style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View
              margin={50}
              marginTop={300}
              backgroundColor="#fff"
              borderRadius={7}>
              <View style={styles.modalContent}>
                <Text style={styles.choosePhotoText}>Pilih Foto</Text>
                <TouchableOpacity
                  onPress={() => launchCamera({}, handleLaunchCamera)}>
                  <Text style={styles.choosePhoto}>Ambil foto dari kamera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => launchImageLibrary({}, handleLaunchGallery)}>
                  <Text style={styles.choosePhoto}>Pilih dari gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="fade"
        visible={phoneModal}
        transparent={true}
        onRequestClose={() => setPhoneModal(true)}>
        <View style={styles.modalContainer}>
          <View>
            <View backgroundColor="#fff" borderRadius={7}>
              <View style={styles.changePhoneModalContent}>
                <Text style={styles.ensure}>
                  Apakah Anda yakin ingin mengubah nomor ponsel?
                </Text>
                <Text style={styles.warn}>
                  Pengubahan nomor ponsel akan memutuskan koneksi AVA anda
                  dengan aplikasi partner. Untuk menghubungkan kembali silakan
                  aktivasi ulang AVA di aplikasi partner
                </Text>
                <View style={styles.optionBtnContainer}>
                  <TouchableOpacity
                    onPress={goToEditPhone}
                    style={styles.optionBtn1}>
                    <Text style={styles.yesText}>IYA</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => showPhoneModal(false)}
                    style={{width: '120%', alignItems: 'center'}}>
                    <Text style={styles.noText}>BATALKAN</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.errorMessage}>{errMsg}</Text>
      <ScrollView style={styles.profileInfo}>
        <View style={styles.pictureContainer}>
          <View>
            {user.picture !== null ? (
              <Image
                style={styles.origin}
                source={{uri: `${APP_BACKEND_URL}${user.picture}`}}
              />
            ) : (
              <Ionicons
                name="ios-person-circle-outline"
                style={styles.profilePicture}
              />
            )}
          </View>
          <View>
            <View style={{height: 25, marginLeft: 15}}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 17,
                  fontFamily: 'Poppins-Medium',
                }}>
                {errPic}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => showModal(true)}
              style={styles.uploadPicture}>
              <Text style={styles.secondaryText}>Perbarui Foto Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              value={profile.name}
              style={styles.primaryText}
              onChangeText={val =>
                setProfile({
                  ...profile,
                  name: val,
                })
              }
            />
          </View>
        </View>
        <View style={styles.changeContainer}>
          <View style={styles.primaryContainer}>
            <Text style={styles.primaryText}>{user.phone}</Text>
            <TouchableOpacity onPress={() => showPhoneModal(true)}>
              <Text style={styles.secondaryText}>Ubah</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.primaryContainer}>
            <Text style={styles.primaryText}>{user.email}</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('editEmail')}>
              <Text style={styles.secondaryText}>Ubah</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.saveBtnContainer}>
        <TouchableOpacity onPress={handleUpdateProfile} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>SIMPAN</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  modalContainer: {
    position: 'absolute',
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#000000a0',
  },
  modalContent: {
    margin: 30,
  },
  choosePhotoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    marginTop: 25,
  },
  choosePhoto: {
    marginVertical: 35,
    fontSize: 20,
  },
  profileInfo: {
    paddingHorizontal: 20,
  },
  pictureContainer: {
    flexDirection: 'row',
  },
  errorMessage: {
    fontSize: 20,
    marginLeft: 25,
    marginTop: 25,
    fontFamily: 'Poppins-Bold',
    color: 'red',
  },
  profilePictureContainer: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(232, 230, 230)',
    marginRight: 10,
    borderRadius: 58 / 2,
    borderWidth: 4,
    borderColor: 'rgb(232, 230, 230)',
  },
  uploadPicture: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  profilePicture: {
    fontSize: 50,
    color: 'rgb(265, 240, 240)',
    textAlign: 'center',
  },
  inputContainer: {
    borderBottomWidth: 2,
    marginTop: 35,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  primaryText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  origin: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 60 / 2,
  },
  changeContainer: {
    marginVertical: 90,
  },
  primaryContainer: {
    marginBottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secondaryText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: 'rgb(54, 255, 181)',
  },
  saveBtnContainer: {
    marginBottom: 35,
  },
  saveBtn: {
    marginHorizontal: 50,
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
  changePhoneModalContent: {
    margin: 30,
  },
  ensure: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginVertical: 15,
  },
  warn: {
    fontSize: 20,
  },
  optionBtnContainer: {
    marginTop: 25,
    justifyContent: 'center',
    marginHorizontal: 80,
    alignItems: 'center',
  },
  optionBtn1: {
    backgroundColor: 'rgb(54, 255, 181)',
    alignItems: 'center',
    marginBottom: 20,
    padding: 5,
    width: '100%',
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
  getUserSigned,
  updateFirstProfile,
  uploadPicture,
  errorDefault,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
