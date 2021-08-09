import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const Transfer = props => {
  return (
    <View>
      <View style={styles.toAvaContainer}>
        <View style={styles.toAvaContent}>
          <View style={styles.transferMethodContainer}>
            <MaterialIcons style={styles.primaryIcon} name="send-to-mobile" />
            <Text style={styles.avaToAva}>Ke Sesama AVA</Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('onePlatform')}
            style={styles.chevronContainer}>
            <Entypo style={styles.chevron} name="chevron-right" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toAvaContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  toAvaContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    elevation: 4,
    marginVertical: 30,
  },
  primaryIcon: {
    color: 'rgb(41, 242, 195)',
    marginRight: 20,
    fontSize: 30,
  },
  avaToAva: {
    fontSize: 18,
  },
  transferMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    color: 'rgb(94, 94, 94)',
    fontSize: 18,
  },
});

export default Transfer;
