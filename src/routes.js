/**
 * instalar dependencias:
 * yarn add react-navigation react-native-gesture-handler
 *
 * fazer link:
 * react-native link react-native-gesture-handler
 *
 * adicionar linhas no arquivo (conforme tutorial):
 * /Users/eloymartins/CursoJS/modulo06/android/app/src/main/java/com/modulo06/MainActivity.java
 *
 *
 */
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Main from './pages/Main';
import User from './pages/User';
import Web from './pages/Web';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Web,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF',
      },
    }
  )
);

export default Routes;
