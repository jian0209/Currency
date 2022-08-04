import React, { useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { ButtonStyle } from '../styling/ButtonStyle';
import { GlobalStyle } from '../styling/Global';
import { BackIcon, ArrowRightIcon } from '../components/Icon';
import { TextInputComp } from '../components/TextInput';
import { CardStyle } from '../styling/CardStyle';
import { TextStyle } from '../styling/TextStyle';
import LinearGradient from 'react-native-linear-gradient';
import color from '../styling/Color';
import { UserStore } from '../stores/UserStore';
import { v4 } from 'uuid';

export default function CurrencyListScreen(props) {
  const { navigation } = props;

  const userData = UserStore.useState((s) => s.userData);

  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [loginParam, setLoginParam] = useState({
    username: '',
    password: '',
  });
  const [signupParam, setSignupParam] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={ButtonStyle.headerLeftBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <BackIcon />
        </TouchableOpacity>
      ),
      headerTitle: () => <View />,
    });
  }, [navigation]);

  const handleLogin = () => {
    let isValid = false;
    for (let i = 0; i < userData.length; i++) {
      if (
        userData[i].username === loginParam.username &&
        userData[i].password === loginParam.password
      ) {
        isValid = true;
        break;
      }
    }
    if (loginParam.username === '' || loginParam.password === '') {
      Alert.alert('Login Failed', 'Username or Password empty', [
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        { text: 'Try It Again', onPress: () => console.log('OK Pressed') },
      ]);
      return;
    }
    if (isValid) {
      UserStore.update((s) => {
        s.userInfo = loginParam;
        s.token = v4();
      });
      navigation.navigate('GeneralSettings');
    } else {
      Alert.alert('Login Failed', 'Invalid Username or Password', [
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        { text: 'Try It Again', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const handleRegister = () => {
    if (signupParam.username === '' || signupParam.password === '') {
      Alert.alert('Register Failed', 'Username or Password empty', [
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        { text: 'Try It Again', onPress: () => console.log('OK Pressed') },
      ]);
      return;
    }
    if (signupParam.password === signupParam.confirmPassword) {
      let temp = [...userData];
      let isValid = true;
      temp.forEach((item, index) => {
        if (item.username === signupParam.username) {
          isValid = false;
        }
      });
      if (isValid) {
        temp.push(signupParam);
        UserStore.update((s) => {
          s.userData = temp;
        });
        let tempSignup = { ...signupParam };
        tempSignup.confirmPassword = '';
        tempSignup.password = '';
        tempSignup.username = '';
        setSignupParam(tempSignup);
        setShowLogin(true);
        setShowSignup(false);
      } else {
        Alert.alert('Register Failed', 'Username already exist', [
          { text: 'Try It Again', onPress: () => console.log('OK Pressed') },
        ]);
      }
    } else {
      Alert.alert('Register Failed', 'Password does not match', [
        { text: 'Try It Again', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  return (
    <View style={GlobalStyle.container}>
      <View style={CardStyle.logSignMainCard}>
        <View style={CardStyle.logSignTextCard}>
          <TouchableOpacity
            onPress={() => {
              setShowLogin(true);
              setShowSignup(false);
            }}>
            <Text
              style={
                showLogin
                  ? TextStyle.isSelectedLogSignText
                  : TextStyle.logSignText
              }>
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}>
            <Text
              style={
                showSignup
                  ? TextStyle.isSelectedLogSignText
                  : TextStyle.logSignText
              }>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
        {showLogin && (
          <View style={CardStyle.logSignTextInputCard}>
            <TextInputComp
              value={loginParam.username}
              setValue={(val) => {
                setLoginParam({ ...loginParam, username: val });
              }}
              placeholder={'Username'}
            />
            <TextInputComp
              value={loginParam.password}
              secureTextEntry={true}
              setValue={(val) => {
                setLoginParam({ ...loginParam, password: val });
              }}
              placeholder={'Password'}
            />
            <View style={CardStyle.btnCard}>
              <TouchableOpacity
                onPress={handleLogin}
                style={ButtonStyle.loginBtn}>
                <LinearGradient
                  style={ButtonStyle.loginBtn}
                  colors={[color.gradiantFromBtn, color.gradiantToBtn]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 1 }}>
                  <ArrowRightIcon />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {showSignup && (
          <View style={CardStyle.logSignTextInputCard}>
            <TextInputComp
              value={signupParam.username}
              setValue={(val) => {
                setSignupParam({ ...signupParam, username: val });
              }}
              placeholder={'Username'}
            />
            <TextInputComp
              value={signupParam.password}
              secureTextEntry={true}
              setValue={(val) => {
                setSignupParam({ ...signupParam, password: val });
              }}
              placeholder={'Password'}
            />
            <TextInputComp
              value={signupParam.confirmPassword}
              secureTextEntry={true}
              setValue={(val) => {
                setSignupParam({ ...signupParam, confirmPassword: val });
              }}
              placeholder={'Confirm Password'}
            />
            <View style={CardStyle.btnCard}>
              <TouchableOpacity
                onPress={handleRegister}
                style={ButtonStyle.loginBtn}>
                <LinearGradient
                  style={ButtonStyle.loginBtn}
                  colors={[color.gradiantFromBtn, color.gradiantToBtn]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 1 }}>
                  <ArrowRightIcon />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
