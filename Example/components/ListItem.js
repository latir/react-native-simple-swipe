import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SwipeToClear } from 'react-native-simple-swipe';
import { PropTypes } from 'prop-types';
// import { SwipeToClear } from './SwipeToClear'; //TODO remove

const propTypes = {
  item: PropTypes.shape({}).isRequired
};

const ListItem = ({ item, removeRecord }) => {
  const favourite = item.favourite ? require('../assets/favourite.png') : require('../assets/nonFavourite.png');
  return (
    <SwipeToClear peakOnMount={!item.favourite} swipeButtonOnPress={removeRecord}>
      <View style={styles.container}>
        <Image style={{ height: 40, width: 40, marginRight: 20  }} source={favourite} />
        <Image style={{ height: 40, width: 40, marginRight: 20, borderRadius: 10 }} source={{ uri: item.profileImg }} />
        <View style={{ flex: 2 }}>
          <Text style={styles.contactName}>{item.firstName} {item.lastName}</Text>
          <Text style={styles.contactText}>{item.email}</Text>
          <Text style={styles.contactNumber}>{item.telNumber}</Text>
        </View>
      </View>
    </SwipeToClear>
  );
}

const baseStyles = {
  text: {
    color: '#8AB0AB',
    padding: 2
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    padding: 15,
    backgroundColor: '#26413C',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactName:{
    ...baseStyles.text,
    fontWeight: 'bold'
  },
  contactNumber: {
    ...baseStyles.text,
    textDecorationLine: 'underline'
  },
  contactText: {
    ...baseStyles.text
  }
});


ListItem.propTypes = propTypes;

export default ListItem