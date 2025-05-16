import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import RNFS from 'react-native-fs';

export default function App() {
    const camera = useCameraDevice('back');
    const cameraRef = useRef<Camera>(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(false); // ← 最初はfalse
    const [photos, setPhotos] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const loadPhotos = async () => {
        try {
        const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
        const imageFiles = files.filter(f => f.name.endsWith('.jpg') || f.name.endsWith('.png'));
        const photoUris = imageFiles.map(f => 'file://' + f.path);
        setPhotos(photoUris);
        } catch (e) {
        console.error('読み込み失敗:', e);
        }
    };

    loadPhotos();

    const startCamera = () => {
        setIsCameraActive(true);
    };

    const savePhotoInApp = async (photoPath: string, fileName: string) => {
        try {
        const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        await RNFS.copyFile(photoPath, destPath);
        console.log('アプリ内に保存したよ:', destPath);
        return destPath;
        } catch (e) {
        console.error('保存失敗:', e);
        }
    };

    const takePhoto = async () => {
        if (cameraRef.current == null) return;
        const photo = await cameraRef.current.takePhoto({ flash: 'off' });
        console.log('📸 撮ったよ:', photo.path);
        savePhotoInApp(photo.path, 'instax_' + Date.now() + '.jpg');
    };

    const endShooting = () => {
        setIsCameraActive(false);
        console.log('✅ 撮影終了');
    };

    if (!hasPermission) return <Text>No permission</Text>;
    if (camera == null) return <Text>No camera</Text>;

    return (
        <View style={styles.container}>
        {isCameraActive ? (
            <>
            <Camera
                style={StyleSheet.absoluteFill}
                device={camera}
                isActive={true}
                photo={true}
                ref={cameraRef}
            />
            <View style={styles.controls}>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Text style={styles.buttonText}>📸 撮影</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={endShooting}>
                <Text style={styles.buttonText}>🛑 終了</Text>
                </TouchableOpacity>
            </View>
            </>
        ) : (
            <View style={styles.center}>
                    <FlatList
                        data={photos}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.list}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={styles.image} />
                        )}
                    />
            <TouchableOpacity style={styles.button} onPress={startCamera}>
                <Text style={styles.buttonText}>📷 カメラ起動</Text>
            </TouchableOpacity>
            </View>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    controls: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    list: {
        padding: 10,
    },
    image: {
        width: 160,
        height: 200,
        margin: 5,
        borderRadius: 10,
    },
});
