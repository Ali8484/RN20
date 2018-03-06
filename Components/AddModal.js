import React, {Component} from 'react';
import {
    AppRegistry,
    FlatList ,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Platform,
    TouchableHighlight,
    Dimensions,
    TextInput
} from 'react-native' ;

import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import FlatListData from '../Data/FlatListData';

var screen = Dimensions.get('window'); 

export default class AddModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            newFoodName: '',
            newFoodDescription: ''
        };
    }
    showAddModal = () => {
        this.refs.myModal.open();
    }

    generateKey = (numberOfCharacters) => {
        return require('random-string')({length: numberOfCharacters});
    }

    render() {
        return(
            <Modal 
            ref={"myModal"}
            style={{                                              /* The description style of the add information window */
                justifyContent: 'center',
                borderRadius: Platform.OS === 'ios' ? 30 : 0 ,  
                shadowRadius: 10 ,
                width: screen.width - 80 ,
                height: 280
            }}
            position='center'                                        /* The description style of the add Alert window */
            backdrop={true}
           
            onOpened={() => {
           // alert("Would you like to add one ?")
            }}
            onClosed={() => {
           //     alert("You added one !");
            } }
            >
        <Text  style={{
            fontSize: 16 ,
            fontWeight: 'bold',
            textAlign:'center',
            marginTop:40
        }}>
            New food's information 
            </Text>
        <TextInput                                            /* newFoodName INPUT */    
        style={{
            height:40,
            borderBottomColor: 'gray',
            marginLeft: 30,
            marginRight:30,
            marginTop:20,
            marginBottom:10,
            borderBottomWidth:1
        }}
        onChangeText={(text) => this.setState({ newFoodName:text })  }
        placeholder="Enter new food's name"
        value={this.state.newFoodName}
        />
        <TextInput                                                     /* newFoodDescription INPUT */
        style={{
            height:40,
            borderBottomColor: 'gray',
            marginLeft: 30,
            marginRight:30,
            marginTop:20,
            marginBottom:10,
            borderBottomWidth:1
        }}
        onChangeText={(text) => this.setState({ newFoodDescription:text })  }
        placeholder="Enter new food's Description"
        value={this.state.newFoodDescription}
        />
        <Button                                                      /* Save Button */
                style={{ fontSize: 18 , color: 'white' }}
                containerStyle={{
                        padding: 8 ,
                        marginLeft: 70 , 
                        marginRight:70,
                        height:40,
                        borderRadius: 6 ,
                        backgroundColor: 'mediumseagreen'

                }} onPress={() => {
                    if (this.state.newFoodName.length == 0 || this.state.newFoodDescription.length == 0 ) {
                        alert("You must enter food's name and description ");
                        return;
                    }
                    const newKey = this.generateKey(24);
                    const newFood = {
                        key:newKey,
                        name:this.state.newFoodName,
                        imageUrl: "http://veggifood.in/wp-content/uploads/2018/01/Food-600x600.jpg",
                        foodDescription: this.state.newFoodDescription
                    };
                    FlatListData.push(newFood);
                    this.props.parentFlatList.refreshFlatList(newKey);
                    this.refs.myModal.close();
                }} 
                >  
                    SAVE
            </Button>
            </Modal>
        );
    }
}