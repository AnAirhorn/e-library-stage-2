import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Permissions from 'expo-permissions';
import {BarcodeScanner} from 'expo-barcode-scanner';
import {Camera} from 'expo-camera'

export default class TransactionScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      domstate: 'normal',
      hasCameraHasPermissions: null,
      scanned: false,
      scannedData:'',
    }
  }
  
  getCameraPermissions=async domstate=>{
    const {status}=await Camera.requestPermissionsAsync();
    this.setState({
      hasCameraHasPermissions: status==='granted',
      domstate: domstate,
      scanned: false
    })
  }


  render() {
    const {domstate, hasCameraHasPermissions, scannedData, scanned} = this.state;
    return (
      <View style={styles.container}>
        <Text>
          {hasCameraHasPermissions? scannedData:"Request For Camera Permission"}
        </Text>
        <TouchableOpacity onPress={()=>{
          this.getCameraPermissions('scanned')
        }}>
          <Text>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  }
});
