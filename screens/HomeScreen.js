import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      lexicalCategory: '',
      word: '',
      definition: '',
      examples: '',
    };
  }

  getWord = (word) => {
    var searchKeyword = word.toLowerCase();

    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';
    console.log(url);
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })

      .then((response) => {
        var responseObject = response;

        if (responseObject) {
          var wordData = responseObject.definitions[0];
          console.log(wordData);
          var lexicography = wordData.wordtype;
          var definition = wordData.description;
          this.setState({
            word: this.state.text,
            definition: definition,
            lexicalCategory: lexicography,
          });
          console.log(this.state.word);
          console.log(this.state.definition);
          console.log(this.state.lexicalCategory);
        } else {
          this.setState({
            word: this.state.text,
            definition: 'Not Found',
          });
          console.log(this.state.word);
          console.log(this.state.definition);
        }
      });
  };

  render() {
    return (
      <SafeAreaProvider>
        <View>
          <Header
            centerComponent={{
              text: 'Pocket Dictionary',
              style: { color: 'white', fontWeight: 'bold', fontSize: 20 },
            }}
            backgroundColor={'#f25c93'}
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word: 'Loading....',
                lexicalCategory: '',
                examples: [],
                definition: '',
              });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.searchhButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text);
            }}>
            <Text style={styles.searchtext}>SEARCH</Text>
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', marginLeft: 50 }}>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Text>Word : </Text>
            <Text>{this.state.word}</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Text>Type : </Text>
            <Text>{this.state.lexicalCategory}</Text>
          </View>
          <View style={{flexDirection:'row', marginBottom: 20}}>
            <Text>Definition : </Text>
            <Text>{this.state.definition}</Text>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  searchhButton: {
    backgroundColor: '#e0d209',
    marginTop: 40,
    alignSelf: 'center',
    borderRadius: 30,
  },
  searchtext: {
    color: 'white',
    padding: 15,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 40,
    borderWidth: 2,
    alignSelf: 'center',
  },
});
