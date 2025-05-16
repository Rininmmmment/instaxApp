import RNFS from 'react-native-fs';

export const savePhotoInApp = async (photoPath: string, fileName: string): Promise<string | undefined> => {
  try {
    const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    await RNFS.copyFile(photoPath, destPath);
    console.log('アプリ内に保存したよ:', destPath);
    return destPath;
  } catch (e) {
    console.error('保存失敗:', e);
  }
};

export const loadPhotos = async (): Promise<string[]> => {
  try {
    const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
    const imageFiles = files.filter(f => f.name.endsWith('.jpg') || f.name.endsWith('.png'));
    return imageFiles.map(f => 'file://' + f.path);
  } catch (e) {
    console.error('読み込み失敗:', e);
    return [];
  }
};
