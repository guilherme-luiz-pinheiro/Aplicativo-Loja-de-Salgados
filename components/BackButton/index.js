// components/BackButton.js
import React from 'react';
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Ionicons
      name="arrow-back"
      size={24}
      color="black"
      onPress={() => navigation.goBack()} // Navega para a tela anterior
    />
  );
};

export default BackButton;
