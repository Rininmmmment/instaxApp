import React, { RefObject } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import type { Camera as CameraType, CameraDevice } from 'react-native-vision-camera';

type Props = {
    cameraRef: RefObject<CameraType | null>;
    device: CameraDevice;
    onTakePhoto: () => void;
    onEnd: () => void;
  };

export default function CameraView({ cameraRef, device, onTakePhoto, onEnd }: Props) {
  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        ref={cameraRef}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
          <Text style={styles.buttonText}>📸 撮影</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onEnd}>
          <Text style={styles.buttonText}>🛑 終了</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
