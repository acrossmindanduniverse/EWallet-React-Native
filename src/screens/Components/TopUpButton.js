import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const TopUpButton = () => {
  return (
    <View style={styles.topUpBtnContainer}>
      <TouchableOpacity style={styles.topUpBtn}>
        <Text style={styles.topUpText}>Top Up Sekarang</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topUpBtnContainer: {
    backgroundColor: '#fff',
  },
  topUpBtn: {
    marginHorizontal: 15,
    borderRadius: 40,
    marginVertical: 20,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(86, 36, 179)',
  },
  topUpText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 25,
  },
});

export default TopUpButton;
