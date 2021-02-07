import React, { useEffect } from 'react'
import { Image, Pressable } from 'react-native'
import { Text, View } from 'native-base'
import BrokenImg from './BrokenImg'

export default function ActivityImage(props) {
    let { image, id, name } = props.data
    useEffect(()=>{
        if (!image.startsWith("data:image/png;base64,")) image = 'data:image/png;base64,' + image
    },[image])

    return (
        <View key={id}>
            <Pressable>
                {
                    image ? <Image style={{ width: 128, height: 128 }} source={{ uri: image }} /> : <Image style={{ width: 128, height: 128 }} source={{ uri: BrokenImg }} />
                }
                <Text>{name}</Text>
            </Pressable>
        </View>
    )
}
