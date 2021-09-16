import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getAllProducts} from './redux/actions/product';
import {connect} from 'react-redux';

const Voucher = props => {
  useEffect(() => {
    props.getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.primaryParent}>
      <View style={styles.primaryContainer}>
        <FlatList
          keyExtractor={item => String(item)}
          data={props.product.item}
          renderItem={({item, _}) => (
            <View style={styles.primaryContent}>
              <View style={styles.primaryProfileContainer}>
                <TouchableOpacity>
                  <View
                    backgroundColor="#grey"
                    width={30}
                    height={30}
                    borderRadius={15}
                  />
                </TouchableOpacity>
                <View style={styles.primaryProfileTextContainer}>
                  <Text style={styles.secondaryProfileText}>{item.name}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('voucherDetail', [
                    item.id,
                    item.description,
                    item.name,
                  ])
                }
                style={styles.chevronBtn}>
                <FontAwesome5 name="chevron-right" />
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={styles.secondaryContainer} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  primaryParent: {
    borderBottomWidth: 9,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  primaryContainer: {
    marginHorizontal: 30,
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
});

const mapStateToProps = state => ({
  product: state.product,
});

const mapDispatchToProps = {getAllProducts};

export default connect(mapStateToProps, mapDispatchToProps)(Voucher);
