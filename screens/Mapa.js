import React, { useState, useEffect, useRef } from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export function Mapa() {

    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);

    useEffect(()=>{
    (async function(){
        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            console.log(location)
            setOrigin({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.000922,
              longitudeDelta: 0.000421
            })
        } else {
            throw new Error('Location permission not granted');
            }
    })();
    },[]);

  const [casa, setCasa] = useState({
    latitude: -25.4897341,
    longitude: -49.2307093
  })

  const [pin2, setPin2] = useState({
    latitude: -25.4842341,
    longitude: -49.2307093
  })

    return (
        <MapView 
        style={styles.map}
        initialRegion={origin}
        provider="google"
      >
        <Marker 
          coordinate={casa}
          draggable={true}
          title="SUA CASA"
          description="sua casa está AQUI"
          icon={{
            uri: "https://img.icons8.com/office/120/000000/home--v1.png"
          }}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinates);
          }}
          onDragEnd={(e) => {
            setCasa({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            })
          }}
        />
        <Marker 
          coordinate={pin2}
          draggable={true}
          title="SUA POSIÇÃO"
          description="Olá idoso, você está AQUI"
          icon={{
            uri: "https://img.icons8.com/color/120/000000/old-woman.png"
          }}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinates);
          }}
          onDragEnd={(e) => {
            setPin2({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            })
          }}
        />
        <Circle 
          center={casa}
          radius={1000}
        />
      </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: '100%'
    },
  });