import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            isSearchPressed: true,
            word: '',
            lexicalCategory: '',
            definition: ''
        }
    }

    getWord = (word) => {
        var searchKeyword = word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + ".json"   
        

        return fetch(url)
        .then((data) => {
            if(data.status === 200) {
                return data.json()
            } else {
                return null
            }
        })
        .then((response) => {
            var responseObject = response

            if(responseObject) {
                var wordData = responseObject.definitions[0]
                var definition = wordData.description
                var lexicalCategory = wordData.wordtype

                this.setState({
                    "word": this.state.text,
                    "definition": definition,
                    "lexicalCategory": lexicalCategory
                })
            } else {
                this.setState({
                    "word": this.state.text,
                    "definition": "Not Found",
                    "lexicalCategory": "Not Found"
                })
            }
        })
    }
    

    render() {
      return (
        <View>
            <ScrollView>
            <Header backgroundColor = {"#5C0032"} centerComponent = {{text: 'Pocket Dictionary', style: {color: 'white', fontSize: 28}}}/>

            <TextInput style = {styles.inputBox} onChangeText = {text => {
                this.setState({
                    text: text,
                    isSearchPressed: false,
                    word: "Loading...",
                    lexicalCategory: '',
                    examples: [],
                    definition: ''
                })
            }}/>

            <TouchableOpacity style = {styles.searchButton} onPress = {() => {
                this.setState({isSearchPressed: true});
                this.getWord(this.state.text)
            }}><Text style = {{textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: "white"}}>Search</Text></TouchableOpacity>

            <View>
                <Text style = {{fontSize: 20, marginLeft: 50}}>
                    {
                        this.state.isSearchPressed && this.state.word === "Loading..."
                        ? this.state.word
                        :<Text> </Text>
                    }
                </Text>
                {
                    this.state.word !== "Loading..."?
                    <View>
                        <View>
                            <Text style = {styles.details1}>
                                Word: {" "}
                            </Text>
                            <Text style = {{fontSize: 20, marginLeft: 100, marginRight: 20, marginTop: -28}}>
                                {this.state.word}
                            </Text>
                        </View>

                        <View>
                            <Text style = {styles.details2}>
                                Type: {" "}
                            </Text>
                            <Text style = {{fontSize: 20, marginLeft: 100, marginRight: 20, marginTop: -28}}>
                                {this.state.lexicalCategory}
                            </Text>
                        </View>

                        <View>
                            <Text style = {styles.details3}>
                                Definition: {" "}
                            </Text>
                            <Text style = {{fontSize: 20, marginLeft: 20, marginRight: 20}}>
                                {this.state.definition}
                            </Text>
                        </View>
                    </View>
                    :<Text> </Text>
                }
            </View>
            </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({

    inputBox: {
        marginTop: 100,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
        borderStyle: 'dashed',
        justifyContent: 'center',
        backgroundColor: "lightpink",
        fontSize: 20,
        borderColor: "#5C0032"
    },

    searchButton: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        borderWidth: 3,
        borderRadius: 20,
        marginTop: 50,
        justifyContent: 'center',
        width: 150,
        height: 50,
        backgroundColor: "#E1449A",
        borderColor: "#5C0032"
    },

    details1: {
        marginTop: 30,
        color: "#DB017A",
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20
    },

    details2: {
        marginTop: 30,
        color: "#5C1C3F",
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20
    },

    details3: {
        marginTop: 30,
        color: "#A8005D",
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20
    }
})