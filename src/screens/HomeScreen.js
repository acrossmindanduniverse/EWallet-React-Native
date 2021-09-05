/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import IoniIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {registerFcmToken} from './redux/actions/auth';
import {getUserSigned, homeAction} from './redux/actions/user';

const HomeScreen = props => {
  const {info} = props.auth;
  const [shouldMove, setShouldMove] = useState(false);
  const [arr, setArr] = useState([1, 2, 3, 4]);

  console.log(props.user, 'test user');

  const handleMove = () => {
    setShouldMove(false);
  };

  useEffect(() => {
    if (props.auth.token !== null) {
      props.getUserSigned(props.auth.token.token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth.token]);

  useEffect(() => {
    if (props.auth.token !== null) {
      props.registerFcmToken(props.auth.token?.token, {
        token: props.auth.fcmToken?.token,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.homeAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.parent}>
      <ScrollView>
        <View style={styles.firstContainer}>
          <View style={styles.userBalanceContainer1}>
            <View style={styles.userBalanceContent}>
              <Text style={styles.appNameCash}>AVA Cash</Text>
              <View style={styles.userSum}>
                <View>
                  <Text style={styles.userSumText1}>Rp</Text>
                </View>
                <View>
                  <Text style={styles.userSumText2}>
                    {Number(props.user.userSigned.balance).toLocaleString('in')}
                  </Text>
                </View>
              </View>
              <Text style={styles.point}>AVA Points 000</Text>
            </View>
          </View>
          <View style={styles.userActionsContainer1}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('topUp')}
                style={styles.iconActionsContainer}>
                <IoniIcons
                  name="add-circle-outline"
                  style={styles.iconActions}
                />
                <Text style={styles.iconActionsText}>Top Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('transfer')}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunity
                  name="bank-transfer-in"
                  style={styles.iconActions}
                />
                <Text style={styles.iconActionsText}>Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('history')}
                style={styles.iconActionsContainer}>
                <MaterialCommunity name="history" style={styles.iconActions} />
                <Text style={styles.iconActionsText}>History</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.userActionsContainer2}>
            <View style={styles.userActionsContent}>
              <TouchableOpacity style={styles.iconActionsContainer2}>
                <IoniIcons
                  color="rgb(247, 181, 82)"
                  size={20}
                  name="flash"
                  style={styles.flash}
                />
                <Text style={styles.userActionsContentText}>PLN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconActionsContainer2}>
                <IoniIcons
                  color="rgb(43, 69, 237)"
                  size={20}
                  name="phone-portrait-outline"
                  style={styles.phone}
                />
                <Text style={styles.userActionsContentText}>Pulsa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('voucher')}
                style={styles.iconActionsContainer2}>
                <IoniIcons
                  color="rgb(96, 250, 82)"
                  size={20}
                  name="game-controller"
                  style={styles.gameController}
                />
                <Text style={styles.userActionsContentText}>Voucher Game</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconActionsContainer2}>
                <AntDesign
                  color="rgb(129, 83, 245)"
                  size={20}
                  name="areachart"
                  style={styles.AreaChart}
                />
                <Text style={styles.userActionsContentText}>Invest</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userActionsContent}>
              <TouchableOpacity style={styles.iconActionsContainer2}>
                <IoniIcons
                  color="rgb(108, 235, 150)"
                  size={20}
                  name="shield-checkmark-sharp"
                  style={styles.shield}
                />
                <Text style={styles.userActionsContentText}>BPJS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconActionsContainer2}>
                <MaterialCommunity
                  color="rgb(250, 97, 138)"
                  size={20}
                  name="youtube-tv"
                  style={styles.tv}
                />
                <Text style={styles.userActionsContentText}>
                  Internet & TV Kabel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconActionsContainer2}>
                <FontAwesome
                  color="rgb(86, 36, 179)"
                  size={20}
                  name="umbrella"
                  style={styles.umbrella}
                />
                <Text style={styles.userActionsContentText}>Proteksi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconActionsContainer2}>
                <MaterialIcons
                  color="rgb(86, 36, 179)"
                  size={20}
                  name="menu-book"
                  style={styles.others}
                />
                <Text style={styles.userActionsContentText}>Lainnya</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.promoContainer}>
            <View style={styles.promoTextContainer}>
              <Text style={styles.info}>Info dan Promo Spesial</Text>
              <TouchableOpacity>
                <Text style={styles.seeMore}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              onTouchMove={handleMove}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={arr}
              renderItem={({item, idx}) => (
                <View style={styles.carouselContainer1}>
                  {console.log(item)}
                  <TouchableOpacity>
                    <View style={styles.carouselContent1}>
                      <Text>{item}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(_, index) => index}
            />
            <View style={styles.screenCircleContainer}>
              <FlatList
                horizontal
                data={[...Array(4)]}
                renderItem={({item, idx}) => {
                  return (
                    <View
                      style={
                        shouldMove ? styles.screenCircle2 : styles.screenCircle
                      }>
                      {item}
                    </View>
                  );
                }}
                keyExtractor={(_, index) => index}
              />
            </View>
          </View>
        </View>
        <View style={styles.carouselContainer2}>
          <Text style={styles.recomendationText}>Rekomendasi Pilihan</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[...Array(8)]}
            renderItem={({item}) => (
              <View style={styles.carousel}>
                <TouchableOpacity>
                  <View style={styles.carouselInsideContent}>
                    <Image style={styles.carouselContent2} source={item} />
                    <Text style={styles.companyField}>Lorem ipsum</Text>
                    <Text style={styles.productPrimaryText}>Lorem ipsum</Text>
                    <Text style={styles.productPrimaryText}>Lorem ipsum</Text>
                    <Text style={styles.companyName}>Lorem ipsum</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(_, index) => index}
          />
        </View>
        <View style={styles.financialContainer}>
          <Text style={styles.financialText}>Finansial Kamu</Text>
          <View style={styles.financialContent}>
            <View style={styles.investContainer1}>
              <View style={styles.avaInvestContainer1}>
                <Text style={styles.avaInvestText1}>AVA</Text>
                <Text style={styles.divider}> | </Text>
                <Text style={styles.avaInvestText2}>Invest</Text>
              </View>
              <View style={styles.avaInvestContainer2}>
                <Text style={styles.poweredBy}>Powered By</Text>
                <Text style={styles.company}>Lorem ipsum</Text>
              </View>
            </View>
            <View style={styles.investOffferContainer}>
              <View style={styles.investOfffer}>
                <Text style={styles.investOffferText}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </Text>
              </View>
              <TouchableOpacity style={styles.startBtn}>
                <Text style={styles.startBtnText}>Mulai</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.lastContainer}>
          <Text style={styles.recomendationText}>Yang Menarik di AVA</Text>
          <Text style={styles.millenialOffer}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam illo
            esse
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[...Array(2)]}
            renderItem={({item}) => (
              <View style={styles.last}>
                <View>
                  <View>
                    <Image style={styles.lastContent} source={item} />
                    <Text style={styles.productPrimaryText2}>Lorem ipsum</Text>
                    <Text style={styles.interestingProduct}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolores ipsa vitae saepe dicta, officiis
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.lastBtn}>
                  <Text style={styles.seeMore}>Lihat Sekarang</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(_, index) => index}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  firstContainer: {
    borderBottomWidth: 9,
    backgroundColor: '#fff',
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  userBalanceContainer1: {
    height: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(86, 36, 179)',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  appNameCash: {
    fontFamily: 'Poppins-Light',
    marginTop: 8,
    fontSize: 15,
    color: '#fff',
  },
  userSum: {
    flexDirection: 'row',
  },
  userSumText1: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 25,
  },
  userSumText2: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 35,
  },
  point: {
    fontFamily: 'Poppins-Light',
    color: '#fff',
    fontSize: 15,
  },
  userBalanceContent: {
    marginTop: 55,
    marginHorizontal: 15,
  },
  icon: {
    fontSize: 35,
    color: '#fff',
  },
  notificationContainer: {
    backgroundColor: 'rgb(86, 36, 179)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    bottom: 35,
    left: 19,
  },
  notification: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: 'rgb(186, 28, 28)',
  },
  userActionsContainer1: {
    bottom: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 2,
    height: 85,
    marginHorizontal: 20,
  },
  iconActions: {
    fontSize: 35,
    color: 'rgb(86, 36, 179)',
  },
  iconActionsContainer: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  iconActionsText: {
    color: 'rgb(86, 36, 179)',
    fontSize: 15,
  },
  userActionsContainer2: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userActionsContent: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  iconActionsContainer2: {
    padding: 20,
    width: '35%',
    alignItems: 'center',
  },
  userActionsContentText: {
    top: 10,
    textAlign: 'center',
  },
  promoContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 9,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  promoTextContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 15,
    justifyContent: 'space-between',
  },
  info: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  seeMore: {
    fontFamily: 'Poppins-Light',
    color: 'rgb(71, 255, 185)',
  },
  carouselContainer1: {
    alignItems: 'center',
    marginVertical: 15,
    justifyContent: 'center',
  },
  carouselContent1: {
    height: 150,
    backgroundColor: 'rgb(161, 94, 255)',
    width: 520,
    borderRadius: 7,
    marginHorizontal: 15,
  },
  screenCircle: {
    width: 8,
    height: 8,
    marginVertical: 15,
    marginHorizontal: 7,
    borderRadius: 8 / 2,
    backgroundColor: 'rgb(219, 219, 219)',
  },
  screenCircle2: {
    width: 20,
    marginVertical: 15,
    marginHorizontal: 7,
    borderRadius: 8 / 2,
    backgroundColor: 'rgb(71, 255, 185)',
    height: 10,
  },
  screenCircleContainer: {
    alignItems: 'center',
  },
  carouselContainer2: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 9,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  carousel: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  carouselContent2: {
    width: 200,
    height: 130,
    borderRadius: 7,
    backgroundColor: 'rgb(251, 171, 255)',
  },
  recomendationText: {
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 15,
    marginTop: 15,
    fontSize: 20,
  },
  companyField: {
    fontFamily: 'Poppins-Light',
    color: 'rgb(194, 194, 194)',
  },
  productPrimaryText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },
  companyName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  financialContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 9,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  financialText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginTop: 15,
    marginHorizontal: 15,
  },
  financialContent: {
    elevation: 3,
    marginVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 15,
  },
  investContainer1: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  avaInvestContainer1: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  avaInvestText1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
  },
  divider: {
    fontSize: 40,
  },
  avaInvestText2: {
    fontFamily: 'Poppins-SemiBoldItalic',
    fontSize: 40,
    marginHorizontal: 10,
  },
  avaInvestContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  poweredBy: {
    fontSize: 15,
    right: 4,
    color: 'rgb(179, 179, 179)',
  },
  company: {
    fontFamily: 'Poppins-Bold',
    left: 4,
  },
  investOffferContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 20,
  },
  investOfffer: {
    width: '50%',
  },
  investOffferText: {
    fontSize: 20,
    color: 'rgb(179, 179, 179)',
  },
  startBtn: {
    width: 130,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: 'rgb(86, 36, 179)',
  },
  startBtnText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
  lastContainer: {
    backgroundColor: '#fff',
  },
  last: {
    marginVertical: 20,
    marginHorizontal: 15,
    elevation: 3,
    borderRadius: 7,
    backgroundColor: '#fff',
  },
  lastContent: {
    width: 260,
    height: 150,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    backgroundColor: 'rgb(251, 171, 255)',
  },
  millenialOffer: {
    marginHorizontal: 15,
  },
  interestingProduct: {
    width: 220,
    marginHorizontal: 10,
  },
  productPrimaryText2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginHorizontal: 10,
  },
  lastBtn: {
    marginVertical: 15,
    marginHorizontal: 50,
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {getUserSigned, registerFcmToken, homeAction};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
