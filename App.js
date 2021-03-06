import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';

export default class App extends React.Component {
    render() {
      return (
      <View>
        <AppContainer />
      </View>
    );
  }  
}

var AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen
})

var AppContainer = createAppContainer(AppNavigator);
