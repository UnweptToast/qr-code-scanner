import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Header } from "react-native-elements";

export default function App() {
  const [button, setButton] = useState(false);

  const [permission, setPermission] = useState(null);

  const [scanned, setScanned] = useState(false);

  const [data, setData] = useState("");

  const askPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setPermission(status === "granted");
    console.log(status);
  };

  const handleScan = async ({ item, data }) => {
    setData(data);
    setButton(false);
    setScanned(true);
  };

  if (!button) {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Header
          centerComponent={{
            text: "QR Code Scanner",
            style: { paddingVertical: 20, fontSize: 24 },
          }}
          backgroundColor="whitesmoke"
          barStyle="dark-content"
          style={styles.title}
        />
        <Image
          source={{
            uri:
              "https://static.vecteezy.com/system/resources/previews/000/493/026/original/barcode-scanner-stock-vector-illustration.jpg",
          }}
          style={styles.img}
        />
        {permission ? (
          <TouchableOpacity>
            <Text
              style={[styles.text, { color: "dodgerblue" }]}
              onPress={() => {
                Linking.openURL(data);
              }}
            >
              {data}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.text}>Allow Permission to use Camera</Text>
        )}
        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: "dodgerblue",
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
          onPress={() => {
            setButton(true);
            setData("");
            setScanned(false);
            askPermissions();
          }}
        >
          <Text style={{ fontSize: 22, color: "#333" }}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (button && permission) {
    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleScan}
        style={StyleSheet.absoluteFill}
      />
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    alignSelf: "center",
    marginVertical: 30,
  },
  img: {
    height: 170,
    width: 170,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 50,
  },
  title: {
    padding: 40,
  },
});
