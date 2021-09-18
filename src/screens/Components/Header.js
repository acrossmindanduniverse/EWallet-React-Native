import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {authLogOut} from '../redux/actions/auth';
import {useDispatch} from 'react-redux';

export const HomeHeader = () => {
  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch(authLogOut());
  // }, []);
  return (
    <View style={homeHeaderStyles.parent}>
      <View style={homeHeaderStyles.HomeScreenName}>
        <Text style={homeHeaderStyles.appName}>AVA</Text>
        <TouchableOpacity style={homeHeaderStyles.notificationBtn}>
          <FontAwesome name="bell" style={homeHeaderStyles.icon} />
          <View style={homeHeaderStyles.notificationContainer}>
            <View style={homeHeaderStyles.notification} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const TopUpHeader = props => {
  return (
    <View style={homeHeaderStyles.parent}>
      <View style={homeHeaderStyles.TopScreenName}>
        <TouchableOpacity
          style={homeHeaderStyles.goBack}
          onPress={() => props.navigation.goBack()}>
          <AntDesign style={homeHeaderStyles.backIcon} name="arrowleft" />
        </TouchableOpacity>
        <Text style={homeHeaderStyles.appName}>Top Up</Text>
      </View>
    </View>
  );
};

export const TransferHeader = props => {
  return (
    <View style={homeHeaderStyles.parent}>
      <View style={homeHeaderStyles.TopScreenName}>
        <TouchableOpacity
          style={homeHeaderStyles.goBack}
          onPress={() => props.navigation.goBack()}>
          <AntDesign
            style={homeHeaderStyles.transferBackIcon}
            name="arrowleft"
          />
        </TouchableOpacity>
        {props.scene.route.name !== 'transfer' ? (
          <Text style={homeHeaderStyles.appName}>KE SESAMA AVA</Text>
        ) : (
          <Text style={homeHeaderStyles.appName}>TRANSFER</Text>
        )}
      </View>
    </View>
  );
};

export const HistoryHeader = props => {
  return (
    <View style={homeHeaderStyles.parent}>
      <View style={homeHeaderStyles.TopScreenName}>
        <TouchableOpacity
          style={homeHeaderStyles.goBack}
          onPress={() => props.navigation.goBack()}>
          <AntDesign
            style={homeHeaderStyles.historyBackIcon}
            name="arrowleft"
          />
        </TouchableOpacity>
        <Text style={homeHeaderStyles.appName}>History</Text>
      </View>
    </View>
  );
};

export const VoucherHeader = props => {
  return (
    <View>
      <View style={homeHeaderStyles.TopScreenName}>
        <TouchableOpacity
          style={homeHeaderStyles.goBack}
          onPress={() => props.navigation.goBack()}>
          <AntDesign
            color="#000"
            style={homeHeaderStyles.backIcon}
            name="arrowleft"
          />
        </TouchableOpacity>
        <Text style={homeHeaderStyles.voucher}>Voucher</Text>
      </View>
    </View>
  );
};

export const ProfileHeader = props => {
  return (
    <View style={homeHeaderStyles.parent}>
      <View style={homeHeaderStyles.TopScreenName}>
        <TouchableOpacity
          style={homeHeaderStyles.goBack}
          onPress={() => props.navigation.goBack()}>
          <AntDesign
            color="#fff"
            style={homeHeaderStyles.backIcon}
            name="arrowleft"
          />
        </TouchableOpacity>
        <Text style={homeHeaderStyles.editPofileText}>Edit Profile</Text>
      </View>
    </View>
  );
};

export const HistoryDetailHeader = ({navigation, text, date}) => {
  return (
    <View style={homeHeaderStyles.historyDetailParent}>
      <View style={homeHeaderStyles.infoParent}>
        <View style={homeHeaderStyles.infoContainer} />
        <Text style={homeHeaderStyles.appName2}>AVA</Text>
        <View style={homeHeaderStyles.successParent}>
          <View style={homeHeaderStyles.successContainer}>
            <View style={homeHeaderStyles.successContent}>
              <AntDesign style={homeHeaderStyles.check} name="check" />
            </View>
            <Text style={homeHeaderStyles.successText}>{text}</Text>
          </View>
          <Text style={homeHeaderStyles.date}>{date}</Text>
        </View>
      </View>
    </View>
  );
};

const homeHeaderStyles = StyleSheet.create({
  parent: {
    backgroundColor: 'rgb(86, 36, 179)',
  },
  appName2: {
    color: 'rgb(86, 36, 179)',
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
  },
  infoParent: {
    width: '100%',
    alignItems: 'center',
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  historyDetailParent: {
    backgroundColor: 'rgb(237, 237, 237)',
  },
  hitoryDetailContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  successParent: {
    marginTop: 30,
    marginBottom: 15,
  },
  successContainer: {
    marginBottom: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  successContent: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    justifyContent: 'center',
    backgroundColor: 'rgb(28, 255, 126)',
    borderWidth: 1 / 2,
  },
  check: {
    fontSize: 15,
    color: 'grey',
    textAlign: 'center',
  },
  successText: {
    color: 'rgb(28, 255, 126)',
    textTransform: 'capitalize',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 7,
    fontSize: 20,
  },
  HomeScreenName: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationBtn: {
    justifyContent: 'center',
  },
  appName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: '#fff',
  },
  voucher: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: '#000',
  },
  editPofileText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: '#fff',
  },
  icon: {
    fontSize: 30,
    color: '#fff',
  },
  notificationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(86, 36, 179)',
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    bottom: 32,
    left: 15,
  },
  notification: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: 'rgb(186, 28, 28)',
  },
  TopScreenName: {
    flexDirection: 'row',
    padding: 25,
  },
  goBack: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  transferBackIcon: {
    color: '#fff',
    fontSize: 30,
    marginHorizontal: 30,
  },
  historyBackIcon: {
    color: '#fff',
    fontSize: 30,
    marginHorizontal: 30,
  },
  backIcon: {
    color: '#000',
    fontSize: 30,
  },
});
