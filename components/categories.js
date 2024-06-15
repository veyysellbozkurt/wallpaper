import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { data } from '../constants/data'
import { theme } from '../constants/theme';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Categories = ({ activeCategory, handleChangeCategory }) => {
  return (
    <FlatList horizontal contentContainerStyle={styles.flatListContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <CategoryItem
          title={item}
          isActive={activeCategory == item}
          handleChangeCategory={handleChangeCategory} />)}
    />)
}



const CategoryItem = ({ title, isActive, handleChangeCategory }) => {
  let backgroundColor = isActive ? theme.colors.neutral(0.8) : theme.colors.white;
  let textColor = isActive ? theme.colors.white : theme.colors.neutral(0.8);

  return (
    <View>
      <Pressable
        style={[styles.category, { backgroundColor }]}
        onPress={() => handleChangeCategory(isActive ? null : title)
        }
      >
        <Text style={[styles.title, { textColor }]}>{title}</Text>
      </Pressable>
    </View>
  );

}
const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: wp(4),
    gap: 8
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: "white",
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  title: {
    fontSize: hp(1.4),
  }
})
export default Categories
