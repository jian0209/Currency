import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ButtonStyle } from '../styling/ButtonStyle';
import { GlobalStyle } from '../styling/Global';
import { BackIcon, ArrowRightIcon } from '../components/Icon';
import { TextInputComp } from '../components/TextInput';
import { CardStyle } from '../styling/CardStyle';
import { TextStyle } from '../styling/TextStyle';
import LinearGradient from 'react-native-linear-gradient';
import color from '../styling/Color';
import { UserStore } from '../stores/UserStore';
import { SettingStore } from '../stores/SettingStorage';
import I18n from 'react-native-i18n';

export default function CurrencyListScreen(props) {
  const { navigation } = props;

  const userData = UserStore.useState((s) => s.userData);
  const defaultLanguage = SettingStore.useState((s) => s.language);

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
            navigation.navigate('GeneralSettings');
          }}>
          <BackIcon />
        </TouchableOpacity>
      ),
      headerTitle: () => <View />,
    });
  }, [navigation]);

  useEffect(() => {
    navigation.navigate('Currency');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [defaultLanguage]);

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
      Alert.alert(I18n.t('loginFailed'), I18n.t('loginFailedMsgUsername'), [
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {
          text: I18n.t('tryItAgain'),
          onPress: () => console.log('OK Pressed'),
        },
      ]);
      return;
    }
    if (isValid) {
      UserStore.update((s) => {
        s.userInfo = loginParam;
        s.token = 'token';
      });
      navigation.navigate('GeneralSettings');
    } else {
      Alert.alert(I18n.t('loginFailed'), I18n.t('loginFailedMsgPassword'), [
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {
          text: I18n.t('tryItAgain'),
          onPress: () => console.log('OK Pressed'),
        },
      ]);
    }
  };

  const handleRegister = () => {
    if (signupParam.username === '' || signupParam.password === '') {
      Alert.alert(
        I18n.t('registerFailed'),
        I18n.t('registerFailedMsgUsername'),
        [
          // {
          //   text: 'Cancel',
          //   onPress: () => console.log('Cancel Pressed'),
          //   style: 'cancel',
          // },
          {
            text: I18n.t('tryItAgain'),
            onPress: () => console.log('OK Pressed'),
          },
        ]
      );
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
        Alert.alert(
          I18n.t('registerFailed'),
          I18n.t('registerFailedMsgDuplicateUsername'),
          [
            {
              text: I18n.t('tryItAgain'),
              onPress: () => console.log('OK Pressed'),
            },
          ]
        );
      }
    } else {
      Alert.alert(
        I18n.t('registerFailed'),
        I18n.t('registerFailedMsgPassword'),
        [
          {
            text: I18n.t('tryItAgain'),
            onPress: () => console.log('OK Pressed'),
          },
        ]
      );
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
              {I18n.t('login')}
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
              {I18n.t('signup')}
            </Text>
          </TouchableOpacity>
        </View>
        {showLogin && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={CardStyle.logTextInputCard}>
            <TextInputComp
              value={loginParam.username}
              setValue={(val) => {
                setLoginParam({ ...loginParam, username: val });
              }}
              placeholder={I18n.t('username')}
            />
            <TextInputComp
              value={loginParam.password}
              secureTextEntry={true}
              setValue={(val) => {
                setLoginParam({ ...loginParam, password: val });
              }}
              placeholder={I18n.t('password')}
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
          </KeyboardAvoidingView>
        )}
        {showSignup && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={CardStyle.signTextInputCard}>
            <TextInputComp
              value={signupParam.username}
              setValue={(val) => {
                setSignupParam({ ...signupParam, username: val });
              }}
              placeholder={I18n.t('username')}
            />
            <TextInputComp
              value={signupParam.password}
              secureTextEntry={true}
              setValue={(val) => {
                setSignupParam({ ...signupParam, password: val });
              }}
              placeholder={I18n.t('password')}
            />
            <TextInputComp
              value={signupParam.confirmPassword}
              secureTextEntry={true}
              setValue={(val) => {
                setSignupParam({ ...signupParam, confirmPassword: val });
              }}
              placeholder={I18n.t('confirmPassword')}
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
          </KeyboardAvoidingView>
        )}
      </View>
    </View>
  );
}
