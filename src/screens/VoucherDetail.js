import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {getProductDetail} from './redux/actions/product';
import {makeTransaction} from './redux/actions/private';
import {getUserSigned} from './redux/actions/user';

const VoucherDetail = props => {
  const {params} = props.route;
  const {token} = props.auth.token;
  const [purchaseDetail, setPurchaseDetail] = useState(false);
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [itemId, setItemId] = useState();

  console.log(params, 'root');
  const showModal = visible => {
    setModal(visible);
  };

  const checkId = (id, variant) => {
    setItemId(id, variant);
    setPurchaseDetail(!purchaseDetail);
  };

  console.log(itemId, 'variant test');

  const confirmTouch = () => {
    props
      .makeTransaction(props.auth.token.token, {
        item_id: itemId.itemId,
        item_variant: itemId.id,
      })
      .then(() => {
        props.getUserSigned(token);
        setSpinner(true);
        setPurchaseDetail(false);
      });
  };

  useEffect(() => {
    props.getProductDetail(params[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <View>
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
            <Text style={styles.successText}>Payment Success</Text>
          </View>
        </View>
      )}
      <View style={styles.voucherHeader}>
        <Image style={styles.voucherPicture} />
        <Text style={styles.primaryText}>{params[2]}</Text>
      </View>
      <ScrollView>
        <FlatList
          data={props.product.detailProduct}
          renderItem={(item, _) => (
            <TouchableOpacity
              onPress={() => checkId(item.item)}
              style={styles.productContainer}>
              <View style={styles.productParent}>
                <View style={styles.productContent}>
                  <View style={styles.productDetail}>
                    <Text style={styles.primaryText}>{item.item.variant}</Text>
                    <TouchableOpacity onPress={() => showModal(true)}>
                      <Text style={styles.seeDetails}>see details</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text color="rgb(92, 92, 92)">{params[1]}</Text>
                    <Text style={styles.primaryText}>
                      Rp{Number(item.item.price).toLocaleString('in')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={idx => idx}
        />
        <Modal
          visible={modal}
          style={styles.modal}
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => {
            showModal(true);
          }}>
          <View style={styles.modalParentContainer}>
            <View style={styles.modalContainer}>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={() => setModal(false)}
                  activeOpacity={0.5}>
                  <Text style={styles.secondaryText}>Close</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.customTextContainer}>
                <Text style={styles.customText}>{params[1]}</Text>
              </View>
            </View>
          </View>
        </Modal>
        {itemId !== undefined && (
          <Modal
            visible={purchaseDetail}
            backgroundColor="#fff"
            transparent={true}
            animationType={'fade'}
            onRequestClose={() => {
              setPurchaseDetail(true);
            }}>
            <View style={styles.modalParentContainer2}>
              <View style={styles.purchaseDetailContainer}>
                <View style={styles.purchaseDetailContent}>
                  <Text style={styles.detailText}>Detail Pembelian</Text>
                  <View style={styles.primaryDetail}>
                    <Text style={styles.primaryDetailText}>
                      {itemId.variant}
                    </Text>
                    <Text style={styles.primaryDetailText}>
                      {Number(itemId.price).toLocaleString('in')}
                    </Text>
                  </View>
                  <View style={styles.primaryDetail}>
                    <Text style={styles.primaryDetailText}>
                      Biaya Transaksi
                    </Text>
                    <Text style={styles.primaryDetailText}>0</Text>
                  </View>
                </View>
                <View style={styles.total}>
                  <Text style={styles.totalText}>Total Pembelian</Text>
                  <Text style={styles.totalText}>
                    Rp{Number(itemId.price).toLocaleString('in')}
                  </Text>
                </View>
                <View style={styles.btnModalContainer}>
                  <TouchableOpacity
                    onPress={() => setPurchaseDetail(false)}
                    activeOpacity={0.5}
                    style={styles.btnModal1}>
                    <Text style={styles.change}>Ubah</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={confirmTouch}
                    style={styles.btnModal2}>
                    <Text style={styles.confirm}>Konfirmasi</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  total: {
    marginHorizontal: 25,
    flexDirection: 'row',
    borderTopColor: 'rgb(122, 122, 122)',
    borderTopWidth: 1,
    justifyContent: 'space-between',
  },
  totalText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginVertical: 20,
  },
  btnModalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    marginHorizontal: 25,
  },
  btnModal1: {
    borderRadius: 25,
    width: '40%',
    right: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(235, 224, 255)',
  },
  change: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'rgb(86, 36, 179)',
  },
  btnModal2: {
    borderRadius: 25,
    left: 15,
    width: '40%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(86, 36, 179)',
  },
  confirm: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'rgb(235, 224, 255)',
  },
  purchaseDetailContainer: {
    top: 500,
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  purchaseDetailContent: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  detailText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 20,
  },
  primaryDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryDetailText: {
    fontSize: 18,
    marginVertical: 15,
    color: 'rgb(122, 122, 122)',
  },
  parent: {
    backgroundColor: '#000000a0',
    flex: 1,
  },
  voucherHeader: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voucherPicture: {
    width: 30,
    borderRadius: 15,
    marginRight: 10,
    height: 30,
    backgroundColor: 'grey',
  },
  productContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  productParent: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  productContent: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  primaryText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  seeDetails: {
    color: 'rgb(56, 242, 165)',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  productDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalParentContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#000000a0',
  },
  modalParentContainer2: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#000000a0',
    height: '100%',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: 800,
    top: 400,
    borderRadius: 20,
  },
  customTextContainer: {
    justifyContent: 'center',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  customText: {
    textAlign: 'justify',
    marginHorizontal: 30,
    color: 'grey',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  btnContainer: {
    alignItems: 'center',
    marginVertical: 70,
    top: 20,
  },
  primaryBtn: {
    width: 100,
    alignItems: 'center',
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
});

const mapStateToProps = state => ({
  product: state.product,
  auth: state.auth,
});

const mapDispatchToProps = {getProductDetail, makeTransaction, getUserSigned};

export default connect(mapStateToProps, mapDispatchToProps)(VoucherDetail);
