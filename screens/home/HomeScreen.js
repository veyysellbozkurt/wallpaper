import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getAuth } from "firebase/auth";
import firebase from '../../firebase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Categories from '../../components/categories';
import axios from 'axios';
import { apiCall } from '../../api';
import ImageGrid from '../../components/imageGrid';
import {
  useFonts, Roboto_400Regular
} from '@expo-google-fonts/roboto';
import { debounce } from 'lodash';


var page = 1;

const auth = getAuth(firebase);
//const router = useRouter();

const HomeScreen = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch(error => alert(error.message));
  };

  useEffect(() => {
    fetchImages();

  }, []);
  const fetchImages = async (params = { page: 1 }, append = false) => {
    console.log('params', params, append);
    let res = await apiCall(params);
    //console.log('get results', res.data.hits[0]);
    if (res.success && res?.data?.hits) {
      if (append) { setImages([...images, ...res.data.hits]) }
      else { setImages([...res.data.hits]) }
    }
  };

  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState('');
  const searchInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [activeCategory, setactiveCategory] = useState(null);
  const handleChangeCategory = (cat) => {

    setactiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let params = {
      page,
    }
    if (cat) {
      params.category = cat
    }
    fetchImages(params, false);

  }
  console.log('active', activeCategory); // check if we get the category names

  const handleSearch = (text) => {
    //console.log('searching for: ', text); 
    setSearch(text);
    if (text.length > 2) {
      //search for this text
      page = 1;
      setImages([]);
      fetchImages({ page, q: text }, false);
      setactiveCategory(null);
    }
    if (text == "") {
      //reset results
      searchInputRef?.current?.clear();

      page = 1;
      setImages([]);
      fetchImages({ page });
      setactiveCategory(null);

    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  const clearSearch = () => {
    setSearch("");
    searchInputRef?.current?.clear();

  }


  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title} >
            C00L Wallpaper
          </Text>
        </Pressable>
        <Pressable>
          <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)}></FontAwesome6>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {/* searchbar */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcon} >
            <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
          </View>
          <TextInput placeholder='Search for photos....' style={styles.serachInput} onChangeText={handleTextDebounce} ref={searchInputRef} />
          {
            search && (
              <Pressable onPress={() => handleSearch("")} style={styles.closeIcon}>
                <Ionicons name='close' size={24} color={theme.colors.neutral(0.6)} />
              </Pressable>
            )
          }
        </View>
        {/* categories */}
        <View style={styles.categories}>
          <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
        </View>
        {/* images */}
        <View>
          {images.length > 0 && <ImageGrid images={images} />}

        </View>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>


      </ScrollView>
    </View>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15
  },
  button: {
    borderColor: 'white',
    backgroundColor: 'white',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    borderColor: 'midnightblue',
    color: 'midnightblue',
    fontWeight: '700',
    fontSize: 16,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
    fontFamily: 'Roboto_400Regular'
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,

  },
  searchIcon: {
    padding: 8,
  },
  serachInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    padding: 8,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.neutral(0.1),
    marginLeft: 8

  }
})

{/**/ }