import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebase from '../firebase';
import background from '../assets/back.png';

const auth = getAuth(firebase);

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message));
  }

  const handleRegister = () => {
    navigation.navigate("RegisterScreen");
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message));
  }

  return (
    <ImageBackground source={background} style={styles.imagecontainer}>

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={handleSignUp}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign Up!</Text>
            </TouchableOpacity>
          </View>
        </View>




      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  imagecontainer: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
  movieAppText: {
    fontFamily: 'AmericanTypewriter-Bold',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    position: 'absolute',
    top: 190,
  },

  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end', // En altta başlar

  },
  inputContainer: {
    width: '70%',


  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    top: -80,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    top: -95,
  },
  button: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'white',
    borderWidth: 2,
    bottom: 5,
  },
  buttonText: {
    color: 'darkslateblue',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,

  },
  bottomLeftImage: {
    position: 'absolute',
    bottom: -20,
    //left: -100,
    width: 500,
    height: 200,
    zIndex: 1,
  },
})
