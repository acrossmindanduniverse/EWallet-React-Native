import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NoItem = () => {
  return (
    <View>
      <Text style={styles.unavailableProduct}>Produk Tidak Tersedia</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  unavailableProduct: {
    fontFamily: 'Poppins-Bold',
    color: 'rgb(86, 36, 179)',
    textAlign: 'center',
    marginTop: 150,
    fontSize: 40,
  },
});

export default NoItem;
