import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from './imageCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const ImageGrid = ({ images }) => {

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={2}
        initialNumToRender={1000}
        //contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => <ImageCard item={item} index={index} />}
        estimatedItemSize={200}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100)
  }


})

export default ImageGrid