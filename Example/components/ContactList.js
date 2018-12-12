import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';

import records from '../data/records';

import ListItem from './ListItem';

const propTypes = {
  records: PropTypes.arrayOf(PropTypes.shape()).isRequirerd
}

const Seperator = () => (
  <View style={{ alignSelf: 'center', height: 1, width: '100%', backgroundColor: '#26413C' }}>
    <View style={{ alignSelf: 'center', height: 1, width: '90%', backgroundColor: '#1A1D1A' }} />
  </View>
);

class ContactList extends React.Component {
  state = { records };

  removeRecord = idx => {
    console.log(idx)
    this.setState(prevState => ({ records: prevState.records.filter((record, i) => i !== idx) }))
  }

  render() {
    const { records } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={records.slice(0, 5)}
          renderItem={({ item, index }) => <ListItem removeRecord={() => this.removeRecord(index)} item={item} />}
          ItemSeparatorComponent={() => <Seperator />}
          keyExtractor={item => item.email}
          style={{ width: '100%' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

ContactList.propTypes = propTypes;

export default ContactList;