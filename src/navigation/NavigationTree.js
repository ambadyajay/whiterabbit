import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// color const
import AppColor from '../constents/AppColor';


// screens
import EmployeList from '../screens/employeList/EmployeList';
import EmployeDetails from '../screens/employeDetails/EmployeDetails';
import Landing from '../screens/landing/Landing';

const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? AppColor.primary : '',
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : AppColor.primary,
    headerShown: false,
  };

const AppStackNavigator = createNativeStackNavigator();


export const AppNavigator = () => {
    return (
        <AppStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AppStackNavigator.Screen name="Landing" component={Landing} />
        <AppStackNavigator.Screen name="EmployeList" component={EmployeList} />
        <AppStackNavigator.Screen name="EmployeDetails" component={EmployeDetails} />
        </AppStackNavigator.Navigator>
    )
}