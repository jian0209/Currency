import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import color from '../styling/Color';

export const NavigateNext = () => {
  return <Icon name="arrow-circle-o-right" size={20} color={color.white} />;
};

export const CheckIcon = () => {
  return <Icon name="check-circle" color={color.white} size={20} />;
};

export const RightIcon = () => {
  return <AntDesign name="right" color={color.white} />;
};

export const DownIcon = () => {
  return <AntDesign name="down" color={color.white} />;
};

export const ArrowSwitchIcon = () => {
  return <Octicons name="arrow-switch" color={color.white} />;
};

export const BackIcon = () => {
  return <AntDesign name="left" color={color.white} size={20} />;
};

export const SettingIcon = () => {
  return (
    <MaterialCommunityIcons
      style={{ transform: [{ rotateY: '180deg' }] }}
      name="sort-reverse-variant"
      size={30}
      color={color.white}
    />
  );
};

export const UserIcon = () => {
  return <Icon name="user-o" color={color.white} size={20} />;
};

export const LoginUserIcon = () => {
  return <EvilIcon name="user" color={color.white} size={40} />;
};

export const ArrowRightIcon = () => {
  return <AntDesign name="arrowright" color={color.white} size={20} />;
};

export const RingIcon = () => {
  return (
    <MaterialCommunityIcons
      name="bell-ring-outline"
      color={color.white}
      size={20}
    />
  );
};

export const BitcoinIcon = () => {
  return <FontAwesome name="bitcoin" color={color.white} size={20} />;
};
