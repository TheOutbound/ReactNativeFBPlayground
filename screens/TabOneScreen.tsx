import * as React from 'react';
import { Dimensions, Platform, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as Facebook from 'expo-facebook'
import SECRETS from '../constants/Secrets'

const loginWithFacebook = async (): Promise<void> => {
  try {
    console.log('SECRETSS==', SECRETS)
    await Facebook.initializeAsync({
      appId: SECRETS.FB_ID_STAGING,
      appName: SECRETS.FB_NAME_STAGING
    })
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email']
    })
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await (await fetch(`https://graph.facebook.com/me?access_token=${String(token)}&fields=email,name,first_name,last_name,id`)).json()
      const userData = {
        user: {
          email: response?.email,
          first_name: response?.first_name,
          last_name: response?.last_name
        },
        facebook: {
          uid: response?.id,
          token
        }
      }
      console.log('USER DATA==', userData)
    } else {
      console.log('FB Login Cancelled')
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${String(message)}`)
  }
}

const SocialBtn = (props): JSX.Element|null => {
  const { label, action, fb } = props
  const colorScheme = useColorScheme()
  return Platform.OS === 'ios' ? (
    <TouchableOpacity
      style={{
        width: Dimensions.get('window').width - 32,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
        borderRadius: 4,
        backgroundColor: '#ccc'
      }}
      onPress={action}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  ) : null
}

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <SocialBtn label='Continue with Facebook' action={loginWithFacebook} fb />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
