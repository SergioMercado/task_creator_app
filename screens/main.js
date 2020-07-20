import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import {
  useAuthenticationDispatch,
  useAuthenticationState,
} from '../components/authentication';
import LoginScreen from './login';
import ProjectScreen from './projects';
import ProjectDetailScreen from './project_detail';

function Logout() {
  const dispatch = useAuthenticationDispatch();

  const clearUserSession = async () => {
    try {
      await AsyncStorage.multiRemove(['@token', '@refreshToken', '@user']);
      dispatch({ type: 'LOGOUT' });
    } catch (e) {}
  };

  useEffect(() => {
    clearUserSession();
  }, []);

  return <></>;
}

const Tab = createBottomTabNavigator();
const ProjectStack = createStackNavigator();

function ProjectStackScreen() {
  return (
    <ProjectStack.Navigator>
      <ProjectStack.Screen
        name='Projects'
        options={{ title: 'Proyectos' }}
        component={ProjectScreen}
      />
      <ProjectStack.Screen
        name='ProjectDetails'
        component={ProjectDetailScreen}
      />
    </ProjectStack.Navigator>
  );
}

export default function MainScreen() {
  const { user } = useAuthenticationState();

  return (
    <>
      {!user && <LoginScreen />}

      {user && (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Projects') {
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                } else if (route.name === 'Logout') {
                  iconName = focused ? 'ios-log-out' : 'ios-log-out';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: '#44BBA4',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen
              name='Projects'
              options={{ title: 'Proyectos' }}
              component={ProjectStackScreen}
            />
            <Tab.Screen
              name='Logout'
              options={{ title: 'Salir' }}
              component={Logout}
            />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
