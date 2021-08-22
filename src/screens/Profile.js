import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {authLogOut} from './redux/actions/auth';
import {APP_BACKEND_URL} from '@env';
import {getUserSigned} from './redux/actions/user';

const Profile = props => {
  const [phoneNumber, setPhoneNumber] = useState();
  const {userSigned} = props.user;

  const handleLogOut = () => {
    props.authLogOut();
    props.getUserSigned('');
  };

  useEffect(() => {
    if (userSigned.phone !== null) {
      setPhoneNumber(
        userSigned.phone.replace(/\D[^.]/g, '').slice(0, 4) +
          '-' +
          userSigned.phone.slice(3, 6) +
          '-' +
          userSigned.phone.slice(6),
      );
    }
  }, [userSigned]);

  console.log(userSigned.picture, ' profile');

  return (
    <View style={styles.parent}>
      <ScrollView>
        <View style={styles.profileInfoParentContainer}>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileText}>Profile</Text>
            <View style={styles.profileInfoParentContent}>
              <View style={styles.profileInfoContent}>
                {userSigned.picture !== null ? (
                  <View>
                    <Image
                      resizeMode="contain"
                      source={{uri: `${APP_BACKEND_URL}${userSigned.picture}`}}
                      style={styles.origin}
                    />
                  </View>
                ) : (
                  <View style={styles.profilePictureContainer}>
                    <Ionicons
                      name="ios-person-circle-outline"
                      style={styles.profilePicture}
                    />
                  </View>
                )}
                <View style={styles.profileInfo}>
                  <Text style={styles.primaryText}>{userSigned.name}</Text>
                  <Text style={styles.phoneText}>{phoneNumber}</Text>
                </View>
              </View>
            </View>
            <View style={styles.statusContainer}>
              <View style={styles.statusContent1}>
                <FontAwesome5 style={styles.appLogo} name="circle-notch" />
                <Text style={styles.premierAccount}>AVA Premier</Text>
              </View>
              <TouchableOpacity style={styles.statusContent}>
                <Text style={styles.secondaryText}>Lihat Detail</Text>
                <FontAwesome5
                  style={styles.secondaryText}
                  marginLeft={10}
                  name="chevron-right"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.avaIdContainer}>
          <View style={styles.avaContent}>
            <Text style={styles.avaId}>AVA ID</Text>
            <View style={styles.avaBtnContainer}>
              <TouchableOpacity style={styles.avaBtn}>
                <AntDesign style={styles.qrCode} name="qrcode" />
                <Text style={styles.avaPrimaryText}>QR Code</Text>
              </TouchableOpacity>
              <View marginHorizontal={10} />
              <TouchableOpacity style={styles.avaBtn}>
                <AntDesign style={styles.barcode} name="barcode" />
                <Text style={styles.avaPrimaryText}>Loyalty</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.primaryParent}>
          <View style={styles.primaryContainer}>
            <Text style={styles.primaryAccount}>Akun</Text>
            <FlatList
              data={['Ubah Profile', 'My Cards', 'Kode Promo']}
              renderItem={({item, _}) => (
                <View style={styles.primaryContent}>
                  <View style={styles.primaryProfileContainer}>
                    <TouchableOpacity>
                      {item === 'Ubah Profile' && (
                        <FontAwesome5
                          style={styles.primaryProfileText}
                          name="user-edit"
                        />
                      )}
                      {item === 'My Cards' && (
                        <AntDesign
                          style={styles.primaryProfileText}
                          name="creditcard"
                        />
                      )}
                      {item === 'Kode Promo' && (
                        <FontAwesome5
                          style={styles.primaryProfileText}
                          name="ticket-alt"
                        />
                      )}
                    </TouchableOpacity>
                    <View style={styles.primaryProfileTextContainer}>
                      <Text style={styles.secondaryProfileText}>{item}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('editProfile')}
                    style={styles.chevronBtn}>
                    <FontAwesome5 name="chevron-right" />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(_, index) => index}
              ItemSeparatorComponent={() => (
                <View style={styles.secondaryContainer} />
              )}
            />
          </View>
        </View>
        <View style={styles.primaryParent}>
          <View style={styles.primaryContainer}>
            <Text style={styles.primaryAccount}>Keamanan</Text>
            <FlatList
              data={['Ubah Security Code']}
              renderItem={({item, _}) => (
                <View style={styles.primaryContent}>
                  <View style={styles.primaryProfileContainer}>
                    <TouchableOpacity>
                      <FontAwesome5
                        style={styles.primaryProfileText}
                        name="lock"
                      />
                    </TouchableOpacity>
                    <View style={styles.primaryProfileTextContainer}>
                      <Text style={styles.secondaryProfileText}>{item}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('confirmPassword')}
                    style={styles.chevronBtn}>
                    <FontAwesome5 name="chevron-right" />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(_, index) => index}
              ItemSeparatorComponent={() => (
                <View style={styles.secondaryContainer} />
              )}
            />
          </View>
        </View>
        <View style={styles.primaryParent}>
          <View style={styles.primaryContainer}>
            <Text style={styles.primaryAccount}>Tentang</Text>
            <FlatList
              data={[
                'Keuntungan Pakai AVA',
                'Paduan AVA',
                'Syarat dan Ketentuan',
                'Kebijakan Privasi',
                'Pusat Bantuan',
              ]}
              renderItem={({item, _}) => (
                <View style={styles.primaryContent}>
                  <View style={styles.primaryProfileContainer}>
                    <TouchableOpacity>
                      {item === 'Keuntungan Pakai AVA' && (
                        <FontAwesome5
                          style={styles.primaryProfileText}
                          name="medal"
                        />
                      )}
                      {item === 'Paduan AVA' && (
                        <AntDesign
                          style={styles.primaryProfileText}
                          name="bulb1"
                        />
                      )}
                      {item === 'Syarat dan Ketentuan' && (
                        <FontAwesome5
                          style={styles.primaryProfileText}
                          name="bars"
                        />
                      )}
                      {item === 'Kebijakan Privasi' && (
                        <Ionicons
                          style={styles.primaryProfileText}
                          name="shield-checkmark"
                        />
                      )}
                      {item === 'Pusat Bantuan' && (
                        <AntDesign
                          style={styles.primaryProfileText}
                          name="questioncircle"
                        />
                      )}
                    </TouchableOpacity>
                    <View style={styles.primaryProfileTextContainer}>
                      <Text style={styles.secondaryProfileText}>{item}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('editProfile')}
                    style={styles.chevronBtn}>
                    <FontAwesome5 name="chevron-right" />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(_, index) => index}
              ItemSeparatorComponent={() => (
                <View style={styles.secondaryContainer} />
              )}
            />
          </View>
        </View>
        <View style={styles.signOutBtnContainer}>
          <TouchableOpacity onPress={handleLogOut} style={styles.signOutBtn}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#fff',
  },
  signOutBtnContainer: {
    backgroundColor: '#e6e6e6',
  },
  signOutBtn: {
    marginHorizontal: 15,
    borderRadius: 40,
    marginBottom: 40,
    marginVertical: 20,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(86, 36, 179)',
  },
  signOutText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 25,
  },
  profileInfoParentContainer: {
    borderBottomWidth: 9,
    marginTop: 35,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  profileInfoParentContent: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  profileText: {
    fontFamily: 'Poppins-Black',
    fontSize: 30,
    marginLeft: 30,
    marginBottom: 20,
  },
  profileInfoContent: {
    flexDirection: 'row',
    marginBottom: 15,
    marginHorizontal: 30,
  },
  profilePictureContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(232, 230, 230)',
    marginRight: 10,
    borderRadius: 48 / 2,
    borderWidth: 4,
    borderColor: 'rgb(232, 230, 230)',
  },
  origin: {
    width: 48,
    height: 48,
    resizeMode: 'cover',
    borderRadius: 48 / 2,
  },
  profilePicture: {
    fontSize: 40,
    color: 'rgb(265, 240, 240)',
    textAlign: 'center',
  },
  primaryText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  statusContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
  statusContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContent1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogo: {
    marginRight: 20,
    fontSize: 20,
    color: 'rgb(56, 56, 56)',
  },
  premierAccount: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  secondaryText: {
    color: 'rgb(56, 56, 56)',
    textAlign: 'center',
    marginHorizontal: 7,
    fontFamily: 'Poppins-Medium',
  },
  profileInfo: {
    marginLeft: 20,
  },
  phoneText: {
    color: 'rgb(56, 56, 56)',
    fontFamily: 'Poppins-Medium',
  },
  avaId: {
    fontSize: 20,
    marginVertical: 20,
    fontFamily: 'Poppins-Bold',
  },
  avaPrimaryText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  qrCode: {
    fontSize: 30,
    marginRight: 15,
  },
  barcode: {
    marginRight: 30,
    fontSize: 30,
  },
  avaIdContainer: {
    borderBottomWidth: 9,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  avaContent: {
    marginHorizontal: 30,
  },
  avaBtnContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  avaBtn: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderColor: 'rgb(232, 230, 230)',
    borderRadius: 15,
    height: 65,
  },
  primaryParent: {
    borderBottomWidth: 9,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  primaryContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  secondaryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  primaryAccount: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
  },
  primaryContent: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  primaryProfileContainer: {
    flexDirection: 'row',
  },
  primaryProfileTextContainer: {
    position: 'relative',
  },
  chevronBtn: {
    justifyContent: 'center',
  },
  secondaryProfileText: {
    position: 'absolute',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  primaryProfileText: {
    fontSize: 25,
    marginRight: 15,
    fontFamily: 'Poppins-Bold',
  },
  btnSignIn: {
    backgroundColor: '#fff',
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    borderRadius: 20,
  },
  btnSignInText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#6A4029',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {authLogOut, getUserSigned};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
