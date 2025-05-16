import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image } from 'react-native';

type PhotoGalleryProps = {
    photos: string[];                // 画像URIの配列
    onStartCamera: () => void;      // カメラ起動のコールバック
  };

export default function PhotoGallery({ photos, onStartCamera }: PhotoGalleryProps) {
  return (
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
      <TouchableOpacity style={styles.button} onPress={onStartCamera}>
        <Text style={styles.buttonText}>📷 カメラ起動</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
