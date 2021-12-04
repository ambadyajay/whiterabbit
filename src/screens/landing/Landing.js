import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import Realm from "realm";
import {
    Icon,
    Layout,
    useTheme,
    TopNavigation,
    Text,
    Input
} from '@ui-kitten/components';
import { AsyncStorage } from 'react-native';

// api
import API from '../../common/Api'

// endpoints
import { HOST, GET_EMPLOYE } from '../../common/Endpoints'


// realmschema
import { EmployeSchema, addressSchema, comapnySchema } from '../../components/EmployeSchema';

const Landing = ({ navigation }) => {

    useEffect(() => {
        getEmployeList();
    }, [])

    const getEmployeList = async () => {
        const url = `${HOST}/${GET_EMPLOYE}`

        const value = await AsyncStorage.getItem('isDataLoaded');
        if (value === 'true') {
            navigation.navigate('EmployeList')
        }
        else {
            API('get', url).then(resp => {
                saveDataToDB(resp)
            });
        }
    }

    const saveDataToDB = async (resp) => {
        Realm.open({ schema: [EmployeSchema, addressSchema, comapnySchema] })
            .then(async (realm) => {
                realm.write(async () => {
                    resp.map(item => {
                        realm.create('Employe', {
                            id: item.id,
                            name: item.name,
                            username: item.username,
                            email: item.email,
                            profile_image: item.profile_image === null ? '' : item.profile_image,
                            phone: item.phone === null ? '' : item.phone,
                            website: item.website === null ? '' : item.website,
                            address: {
                                street: item.address.street,
                                suite: item.address.suite,
                                city: item.address.city,
                                zipcode: item.address.zipcode
                            },
                            company: {
                                name: !item.company ? '' : item.company.name,
                                catchPhrase: !item.company ? '' : item.company.catchPhrase,
                                bs: !item.company ? '' : item.company.bs
                            }
                        })
                    })
                })
            });
        await AsyncStorage.setItem('isDataLoaded', 'true')
        navigation.navigate('EmployeList')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text category='h6'>Splash Screen</Text>
            </Layout>
        </SafeAreaView>
    )
}

export default Landing
