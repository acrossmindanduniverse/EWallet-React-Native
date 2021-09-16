import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import appLogo from '../../../assets/ic_launcher.png';
import {authRefreshToken} from '../redux/actions/auth';
import {connect} from 'react-redux';
import {splashAction} from './../redux/actions/user';

const SplashScreen = props => {
  const {token} = props.auth.info;

  useEffect(() => {
    const refreshToken = {
      refreshToken: props.auth.info.refreshToken,
    };
    props.authRefreshToken(props.auth.info.token, refreshToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token !== null) {
      setTimeout(() => {
        props.navigation.navigate('home');
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.splashAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.parent}>
      <View style={styles.parentBg}>
        <Image source={appLogo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentBg: {
    height: '100%',
    backgroundColor: 'rgb(161, 94, 255)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogo: {
    resizeMode: 'cover',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {authRefreshToken, splashAction};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
