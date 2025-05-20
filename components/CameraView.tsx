/**
 * カメラで撮影する機能
 */

import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

type Props = {
    onTakePhoto: (photoPath: string, fileName: string) => void;
    onEnd: () => void;
};

export default function CameraView({ onTakePhoto, onEnd }: Props) {
    const camera = useCameraDevice('back');  // 使うカメラ自体の情報
    const cameraRef = useRef<Camera>(null);  // 撮影操作用のカメラ参照（takePhotoで使う）

    // 撮影したファイルを親に渡すメソッド
    const takePhoto = async () => {
        if (!cameraRef.current) return;
        const photo = await cameraRef.current.takePhoto({ flash: 'off' });
        const fileName = 'instax_' + Date.now() + '.jpg';
        onTakePhoto(photo.path, fileName);
    };

    if (!camera) return <Text>No camera</Text>;

    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={cameraRef}
                style={{ flex: 1 }}
                device={camera}
                isActive={true}
                photo={true}
            />
            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <Text style={styles.buttonText}>📸 撮影</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onEnd}>
                    <Text style={styles.buttonText}>🛑 終了</Text>
                </TouchableOpacity>
            </View>
        </View>
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
