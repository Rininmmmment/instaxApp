import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import CameraView from './components/CameraView';
import PhotoGallery from './components/PhotoGallery';
import { savePhotoInApp, loadPhotos } from './utils/fileUtils';

export default function App() {
  const camera = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      const loadedPhotos = await loadPhotos();
      setPhotos(loadedPhotos);
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current == null) return;
    const photo = await cameraRef.current.takePhoto({ flash: 'off' });
    const savedPath = await savePhotoInApp(photo.path, 'instax_' + Date.now() + '.jpg');
    if (savedPath) setPhotos(prev => [...prev, 'file://' + savedPath]);
  };

  if (!hasPermission) return <Text>No permission</Text>;
  if (camera == null) return <Text>No camera</Text>;

  return isCameraActive ? (
    <CameraView
      cameraRef={cameraRef}
      device={camera}
      onTakePhoto={takePhoto}
      onEnd={() => setIsCameraActive(false)}
    />
  ) : (
    <PhotoGallery photos={photos} onStartCamera={() => setIsCameraActive(true)} />
  );
}