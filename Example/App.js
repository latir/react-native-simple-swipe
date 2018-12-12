import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ContactList from './components/ContactList';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to your Phonebook!</Text>
        </View>
        <ContactList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#8AB0AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#3E505B',
    borderRadius: 4,
    padding: 20
  },
  headerText: {
    color: '#8AB0AB',
    fontWeight: 'bold'
  }
});
