/**
 * 保存した写真の一覧を表示
 */

import React from 'react';
import { FlatList, Image, Text, View, StyleSheet } from 'react-native';
import type { PhotoInfo } from '../types';

type Props = {
    photos: PhotoInfo[];
};

export default function PhotoGallery({ photos }: Props) {
    return (
        <View style={styles.fullScreen}>
        <FlatList
            data={photos}
            keyExtractor={(_, i) => i.toString()}
            numColumns={2}
            renderItem={({ item }) => (
            <View style={styles.listView}>
                <Image
                    source={{ uri: item.uri }}
                    style={styles.listImg}
                />
                <Text>{item.liveName}</Text>
                <Text>{new Date(item.date).toLocaleString()}</Text>
            </View>
            )}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    listView: {
        margin: 5,
    },
    listImg: {
        width: 160,
        height: 200,
        borderRadius: 10,
    },
});
