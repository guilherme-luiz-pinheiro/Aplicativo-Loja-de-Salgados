// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  obterTodosClientes,
  obterTodosVendedores,
  adicionarCliente,
  adicionarVendedor,
} from '../../services/auth'; // Certifique-se de que essas funções estão implementadas no seu arquivo de autenticação

const LoginScreen = ({ navigation }) => {
  // Estado para alternar entre login e registro
  const [isRegister, setIsRegister] = useState(false);
  // Tipo de usuário: 'cliente' ou 'vendedor'
  const [tipo, setTipo] = useState('cliente');

  // Campos comuns
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Campos para registro
  const [nome, setNome] = useState('');
  const [loja, setLoja] = useState(''); // Apenas para vendedores

  // Função de login: procura o usuário e valida a senha
  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha os campos de email e senha.');
      return;
    }

    if (tipo === 'cliente') {
      const clientes = await obterTodosClientes();
      const cliente = clientes.find(c => c.email.toLowerCase() === email.toLowerCase());
      if (cliente && cliente.senha === senha) {
        Alert.alert('Login', 'Login de cliente realizado com sucesso!');
        navigation.replace('Main'); // Substitui a tela de login pela principal
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos para cliente.');
      }
    } else {
      const vendedores = await obterTodosVendedores();
      const vendedor = vendedores.find(v => v.email.toLowerCase() === email.toLowerCase());
      if (vendedor && vendedor.senha === senha) {
        Alert.alert('Login', 'Login de vendedor realizado com sucesso!');
        navigation.replace('Main'); // Substitui a tela de login pela principal
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos para vendedor.');
      }
    }
};


  // Função de registro: utiliza as funções de adicionar cliente ou vendedor
  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }
    if (tipo === 'vendedor' && !loja) {
      Alert.alert('Erro', 'Informe o nome da loja.');
      return;
    }

    let success = false;
    // Gerando um código simples com base no timestamp (melhore conforme sua necessidade)
    const codigo = Date.now().toString();

    if (tipo === 'cliente') {
      success = await adicionarCliente({ codigo, nome, email, senha });
    } else {
      success = await adicionarVendedor({ codigo, nome, email, senha, loja });
    }

    if (success) {
      Alert.alert('Registro', `Registro de ${tipo} realizado com sucesso!`);
      // Limpar campos e voltar para a tela de login
      setIsRegister(false);
      setNome('');
      setEmail('');
      setSenha('');
      setLoja('');
    } else {
      Alert.alert('Erro', 'Falha ao registrar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? 'Registro' : 'Login'}</Text>

      {/* Alternador entre Login e Registro */}
      <View style={styles.switchContainer}>
        <TouchableOpacity
          onPress={() => setIsRegister(false)}
          style={[styles.switchButton, !isRegister && styles.activeSwitch]}
        >
          <Text style={styles.switchText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsRegister(true)}
          style={[styles.switchButton, isRegister && styles.activeSwitch]}
        >
          <Text style={styles.switchText}>Registro</Text>
        </TouchableOpacity>
      </View>

      {/* Se estiver no modo de registro, exibe o campo Nome */}
      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
      )}

      {/* Seleção do tipo de usuário */}
      <Text style={styles.label}>Tipo de usuário:</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={(itemValue) => setTipo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Cliente" value="cliente" />
        <Picker.Item label="Vendedor" value="vendedor" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Campo adicional para vendedores no modo registro */}
      {isRegister && tipo === 'vendedor' && (
        <TextInput
          style={styles.input}
          placeholder="Loja"
          value={loja}
          onChangeText={setLoja}
        />
      )}

      <Button
        title={isRegister ? 'Registrar' : 'Entrar'}
        onPress={isRegister ? handleRegister : handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  switchButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeSwitch: {
    backgroundColor: '#007BFF',
  },
  switchText: {
    color: '#fff',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 4,
  },
});

export default LoginScreen;
