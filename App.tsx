import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

export default function App() {
const camera = useCameraDevice('back');
const [hasPermission, setHasPermission] = useState(false);

useEffect(() => {
    (async () => {
    const status = await Camera.getCameraPermissionStatus();
    setHasPermission(status === 'granted');
    })();
}, []);

if (camera == null) return <Text>No camera</Text>;
if (!hasPermission) return <Text>No permission</Text>;

return (
    <View style={styles.container}>
    <Camera style={StyleSheet.absoluteFill} device={camera} isActive={true} />
    </View>
);
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});
