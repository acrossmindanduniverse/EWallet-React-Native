import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {HistoryDetailHeader} from './Components/Header';
import {getHistoryById} from './redux/actions/user';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HistoryDetail = props => {
  const {historyById} = props.user;
  const {token} = props.auth.token;
  const {params} = props.route;

  useEffect(() => {
    props.getHistoryById(token, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <HistoryDetailHeader text="berhasil" date={historyById.createdAt} />
      <View>
        <View style={styles.parentContainer}>
          <View style={styles.parentContent}>
            <View>
              <Text style={styles.primaryText}>Dari</Text>
              <Text style={styles.sender}>{historyById.sender}</Text>
              <Text style={styles.primaryText}>Pesan</Text>
              {historyById.message !== null ? (
                <Text style={styles.message}>{historyById.message}</Text>
              ) : (
                <Text style={styles.message}>-</Text>
              )}
            </View>
            <View style={styles.referalCodeParent}>
              <View style={styles.referalCodeContainer}>
                <Text style={styles.primaryText}>No. Referensi</Text>
                <Text style={styles.secondaryText}>{historyById.refNo}</Text>
              </View>
            </View>
            <View style={styles.sourceContainer}>
              <Text style={styles.primaryText}>Sumber Dana</Text>
              <View style={styles.sourceContent}>
                <Text style={styles.secondaryText}>AVA Cash</Text>
                <View style={styles.balanceContainer}>
                  <Text style={styles.balance}>
                    Rp{Number(historyById.balance).toLocaleString('ind')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.helpParent}>
          <View style={styles.help}>
            <Ionicons style={styles.chatbox} name="chatbox-ellipses-outline" />
            <View style={styles.helpContainer}>
              <Text style={styles.secondaryText}>Butuh Bantuan ?</Text>
            </View>
          </View>
          <View style={styles.chevronContainer}>
            <Ionicons style={styles.chevron} name="chevron-forward" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    borderBottomColor: 'rgb(207, 207, 207)',
    borderBottomWidth: 15,
  },
  parentContent: {
    margin: 50,
  },
  helpParent: {
    marginTop: 25,
    marginBottom: 80,
    marginHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    fontSize: 25,
  },
  help: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatbox: {
    color: 'rgb(28, 255, 126)',
    fontSize: 30,
    marginRight: 15,
  },
  primaryText: {
    fontSize: 18,
  },
  sender: {
    fontFamily: 'Poppins-Bold',
    marginVertical: 18,
    fontSize: 18,
  },
  message: {
    fontSize: 18,
    marginVertical: 25,
    fontFamily: 'Poppins-Medium',
  },
  referalCodeParent: {
    borderTopWidth: 1,
    marginVertical: 35,
    borderBottomWidth: 1,
  },
  sourceContainer: {
    marginTop: 25,
    marginBottom: 35,
  },
  referalCodeContainer: {
    marginTop: 35,
    marginBottom: 25,
  },
  sourceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryText: {
    marginTop: 15,
    fontSize: 18,
    fontFamily: 'Poppins-Light',
  },
  balanceContainer: {
    justifyContent: 'center',
  },
  balance: {
    color: 'rgb(0, 255, 119)',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
});

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

const mapDispatchToProps = {getHistoryById};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetail);
