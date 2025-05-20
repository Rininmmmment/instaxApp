/**
 * 保存した写真の一覧を表示
 */

import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import type { PhotoInfo } from '../types';

type Props = {
    photos: PhotoInfo[];
};

export default function PhotoGallery({ photos }: Props) {
    return (
        <View style={{ flex: 1 }}>
        <FlatList
            data={photos}
            keyExtractor={(_, i) => i.toString()}
            numColumns={2}
            renderItem={({ item }) => (
            <View style={{ margin: 5 }}>
                <Image source={{ uri: item.uri }} style={{ width: 160, height: 200, borderRadius: 10 }} />
                <Text>{item.liveName}</Text>
                <Text>{new Date(item.date).toLocaleString()}</Text>
            </View>
            )}
        />
        </View>
    );
}


