import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import IncomeExpensesScreen from './screens/IncomeExpensesScreen';
import { FinanceProvider } from './context/FinanceContext';
import { colors, styles } from './styles/styles';
const Tab = createBottomTabNavigator();
const icons = {
  Home: 'grid-outline',
  'Income & Expenses': 'swap-horizontal-outline'
};
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.green,
    card: colors.surface,
    text: colors.ink,
    border: colors.border
  }
};
export default function App() {
  return <SafeAreaProvider>
    <StatusBar style="dark" />
    <FinanceProvider>
    <NavigationContainer theme={theme}>
      <Tab.Navigator screenOptions={({
        route
      }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        tabBarIcon: ({
          color,
          size
        }) => <Ionicons name={icons[route.name]} size={size} color={color} />
      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Income & Expenses" component={IncomeExpensesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </FinanceProvider>
  </SafeAreaProvider>;
}
