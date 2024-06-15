import { View, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'

const ImageCard = ({ item, index }) => {
  return (
    <Pressable>
      <Image style={styles.image} source={{ uri: item?.webformatURL }} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
    borderRadius: 10, // Optional: to give the image rounded corners
  }
})

export default ImageCard
