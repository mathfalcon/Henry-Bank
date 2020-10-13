import { createStackNavigator } from 'react-navigation';
import { fromLeft } from 'react-navigation-transitions';
import front from '../'

export default appStack = createStackNavigator(
  {
    ScreenA: {
      screen: ScreenA,
    },
    ScreenB: {
      screen: ScreenB,
    },
  },
  {
    initialRouteName: 'ScreenA',
    transitionConfig: () => fromLeft(),
  },
);
