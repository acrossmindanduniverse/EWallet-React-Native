import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Animated,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {getHistory, getDefaultHistory} from './redux/actions/user';
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

const History = props => {
  const {token} = props.auth;
  const {history, pageInfo} = props.user;
  const getTime = new Date();
  const [tap, setTap] = useState(false);
  const [search, setSearch] = useState({
    search: '',
    sortBy: 'createdAt',
    sort: '' || 'asc',
  });
  const [screen, setScreen] = useState(1);
  const [customDropDown, setCustomDropDown] = useState(false);
  const [newDate, setNewDate] = useState([]);
  const dateArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Nov',
    'Oct',
    'Dec',
  ];

  const scrollPagination = () => {
    setScreen(screen + 1);
  };

  const handleSearch = () => {
    if (screen > 1) {
      props.getHistory(
        token.token,
        search.search,
        search.sortBy,
        search.sort,
        screen,
      );
    } else {
      props.getHistory(token.token, search.search, search.sortBy, search.sort);
    }
    setScreen(1);
    setTap(false);
  };

  console.log(getTime, 'history date');

  const mapAllDates = data => {
    const dataArr = [];
    data.map(row => {
      if (!dataArr.includes(row.createdAt)) {
        dataArr.push(row.createdAt);
      }
    });
    setNewDate(dataArr);
  };

  const showDropDown = visible => {
    setCustomDropDown(visible);
  };

  const handleSort = data => {
    setSearch({
      ...search,
      sort: data,
    });
  };

  useEffect(() => {
    mapAllDates(history);
  }, [history]);

  useEffect(() => {
    if (!customDropDown) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, customDropDown]);

  useEffect(() => {
    if (tap) {
      props.getDefaultHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tap]);

  return (
    <View style={styles.parent}>
      <View style={styles.searchParent}>
        <View style={styles.searchContainer} onTouchStart={() => setTap(true)}>
          <TouchableOpacity onPress={handleSearch} style={styles.iconContainer}>
            <Icon style={styles.icon} name="search1" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            onChangeText={val =>
              setSearch({
                ...search,
                search: val,
              })
            }
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={styles.chevronDownContainer}>
          <TouchableOpacity onPress={() => showDropDown(true)}>
            <Entypo name="chevron-down" style={styles.chevronDown} />
          </TouchableOpacity>
          <View>
            <Modal
              onRequestClose={() => setCustomDropDown(true)}
              visible={customDropDown}
              transparent={true}
              animationType="fade">
              <View style={styles.modalParent}>
                <View style={styles.modalContainer}>
                  <TouchableOpacity
                    onPress={() => showDropDown(false)}
                    style={styles.closeContainer}>
                    <Icon name="close" style={styles.close} />
                  </TouchableOpacity>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      onPress={() => handleSort('asc')}
                      style={styles.modalBtn}>
                      <Text style={styles.modalText}>Recent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleSort('desc')}
                      style={styles.modalBtn}>
                      <Text style={styles.modalText}>Oldest</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
      <FlatList
        data={history}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={scrollPagination}
        style={styles.itemParentContainer}
        renderItem={item => (
          <View>
            {/* {newDate.map(historyDate => ( */}
            <View>
              {/* {historyDate === item.item.createdAt && (
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{`${getTime.getDay(
                      historyDate,
                    )} ${
                      dateArr[getTime.getMonth(historyDate)]
                    } ${getTime.getFullYear(historyDate)}, ${getTime.getHours(
                      historyDate,
                    )}:${getTime.getMinutes(historyDate)}`}</Text>
                  </View>
                )} */}
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('historyDetail', item.item.id)
                  }
                  style={styles.itemContent}>
                  <Text style={styles.itemName}>{item.item.sender}</Text>
                  <View style={styles.itemInsideContent1}>
                    <Text style={styles.description}>
                      {item.item.description}
                    </Text>
                    <Text style={styles.points}>
                      Rp{Number(item.item.balance).toLocaleString('ind')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* ))} */}
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.secondaryContainer} />
        )}
        scrollEventThrottle={400}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#fff',
    flex: 1,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  close: {
    fontSize: 18,
    marginRight: 20,
    marginVertical: 15,
    textAlign: 'center',
  },
  modalParent: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#000000a0',
    height: '100%',
  },
  modalContainer: {
    backgroundColor: '#fff',
    height: '15%',
    marginHorizontal: 120,
    marginTop: 140,
    borderRadius: 15,
    position: 'relative',
  },
  modalBtn: {
    alignItems: 'center',
  },
  modalText: {
    fontSize: 15,
    marginVertical: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  searchParent: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  chevronDownContainer: {
    justifyContent: 'center',
  },
  chevronDown: {
    fontSize: 25,
    marginLeft: 10,
  },
  searchContainer: {
    elevation: 3,
    flexDirection: 'row',
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  searchInput: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    width: '100%',
    color: '#000',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 10,
    fontSize: 20,
  },
  secondaryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(232, 230, 230)',
  },
  dateContainer: {
    backgroundColor: 'rgb(222, 222, 222)',
    justifyContent: 'center',
    alignContent: 'center',
  },
  dateText: {
    fontFamily: 'Poppins-Bold',
    color: '#000',
    fontSize: 18,
  },
  itemParentContainer: {
    marginHorizontal: 15,
  },
  itemContainer: {
    marginVertical: 20,
  },
  itemContent: {
    marginVertical: 18,
    marginHorizontal: 25,
  },
  itemName: {
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  itemInsideContent1: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  description: {
    color: 'rgb(66, 66, 66)',
    fontSize: 13,
  },
  points: {
    color: 'rgb(0, 255, 119)',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
});

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

const mapDispatchToProps = {getHistory, getDefaultHistory};

export default connect(mapStateToProps, mapDispatchToProps)(History);
