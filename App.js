import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importação das telas
import Home from './screens/Home';
import ProductScreen from './screens/ProductScreen';
import CategoryScreen from './screens/CategoryScreen';
import ProductListScreen from './screens/ProductListScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import CartScreen from './screens/CartScreen';
import SaleScreen from './screens/SaleScreen';
import SalesHistoryScreen from './screens/SalesHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import { 
  createProdutosTable, 
  createCategoriasTable, 
  createVendasTable, 
  createClientesTable, 
  createVendedoresTable, 
} from './services/database';

// Criando os navegadores
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Configuração do Bottom Tab Navigator
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Carrinho') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Vendas') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Início" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Carrinho" component={CartScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Vendas" component={SaleScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// Configuração do Stack Navigator para telas que não estarão no menu inferior
export default function App() {
  useEffect(() => {
    (async () => {
        try {
            console.log("Criando tabelas...");
            await createProdutosTable();
            console.log("Criando tabelas...");

            await createCategoriasTable();
            console.log("Criando tabelas...");

            await createVendasTable();
            console.log("Criando tabelas...");

            await createClientesTable();
            console.log("Criando tabelas...");

            await createVendedoresTable();
            console.log("Tabelas criadas com sucesso!");
        } catch (error) {
            console.error("Erro ao inicializar o banco de dados:", error);
        }
    })();
}, []);



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ title: 'Checkout', animation: 'fade' }} />
        <Stack.Screen name="ProductListScreen" component={ProductListScreen} options={{ title: 'Product List' }} />
        <Stack.Screen name="SalesHistoryScreen" component={SalesHistoryScreen} options={{ title: 'Sales History' }} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ title: 'Produto', headerBackTitleVisible: false }} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{ title: 'Categoria', headerBackTitleVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
