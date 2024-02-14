import React, {useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import LinkedInLoginButton from '@gcou/react-native-linkedin';
import { authorize } from 'react-native-app-auth';

interface LoginProps {
  clientId: string;
  redirectUri: string;
  onSuccess?: (accessToken: string) => void;
  onError?: (error: Error) => void;
}

const Entry = (props: LoginProps) => {
  const {clientId, redirectUri, onSuccess, onError } = props;
  const [isLoading, setIsLoading] = useState(false);
  const linkedRef = useRef<any>();

  // const handleLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     const {accessToken} = await LinkedInLoginButton.login({
  //       clientId,
  //       redirectUri,
  //     });
  //     onSuccess?.(accessToken);
  //   } catch (error) {
  //     onError?.(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const handleLinkedInLogin = async () => {
    try {
      const config = {
        clientId: '77guib7eaiqf8e',
        redirectUrl: 'http://localhost:8081/auth/linkedin/callback',
        // redirectUri: 'com.rnts:/auth/linkedin/callback',
        scopes: [
        // 'r_liteprofile', 'r_emailaddress',
        'profile', 
        'email',
        'openid', 
        'w_member_social',
      ],
        serviceConfiguration: {
          authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
          tokenEndpoint: 'https://www.linkedin.com/oauth/v2/accessToken',
        },
      };

      const result = await authorize(config);
      console.log('LinkedIn Login Success', result);
    } catch (error) {
      console.error('LinkedIn Login Error', error);
      // console.log('Error Response:', error?.params?.error_description);
    }
  };


  return (
    <View style={styles.container}>
      <Text>Entry</Text>
      {/* <LinkedInLoginButton
        clientId={clientId}
        redirectUri={redirectUri}
        buttonText="Login with LinkedIn"
        isLoading={isLoading}
        onLogin={handleLogin}
      /> */}

      {/* <LinkedInLoginButton
        ref={linkedRef}
        clientID="77guib7eaiqf8e"
        clientSecret="iuUw1QqvqMEHiuod"
        redirectUri="https://localhost:8081/auth/linkedin/callback"
        onSuccess={
          token =>{
            console.log(token)
            // let name_surname = "https://api.linkedin.com/v2/me";
            // let user_mail = "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))";
            // let namereq = new XMLHttpRequest();
            //   namereq.open("GET", user_mail);
            //   namereq.setRequestHeader("Authorization", "Bearer " + token.access_token);
            //   namereq.onreadystatechange = function(){
            //     if(namereq.readyState === 4){
            //       console.log("Text:" , namereq.responseText);;
            //     }
            //   }
            //   namereq.send();
          }
        }
      /> */}
      {/* <Button title="Log Out" onPress={() => console.log('logout')} /> */}
      <Button title="Login with LinkedIn" onPress={handleLinkedInLogin} />
    </View>
  );
};

export default Entry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
