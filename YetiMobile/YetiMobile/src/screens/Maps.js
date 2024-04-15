import React from 'react'
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const Maps = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        latitude: 26.668365,
        longitude: 	87.430496,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default Maps