import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import {
    Icon,
    Layout,
    useTheme,
    TopNavigation,
    Text,
    Input
} from '@ui-kitten/components';
import Realm from "realm";

// api
import API from '../../common/Api'

// color
import AppColor from '../../constents/AppColor'

// endpoints
import { HOST, GET_EMPLOYE } from '../../common/Endpoints'

// realmschema
import EmployeSchema from '../../common/EmployeSchema';

// dimension
const { width } = Dimensions.get('window');

const user = require('../../assets/user.jpg')


const EmployeList = ({ navigation }) => {
    const theme = useTheme();
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [searchData, setSarchData] = useState([]);

    useEffect(() => {
        getEmployeList();
        // fetchEmployeData()
    }, [])

    const getEmployeList = () => {
        const url = `${HOST}/${GET_EMPLOYE}`
        API('get', url).then(resp => {
            setData(resp)
            setSarchData(resp)
            // saveDataToDB(resp)
        });
    }

    // const fetchEmployeData = () => {
    //     Realm.open({schema: [EmployeSchema]}).then(async (realm) => {
    //       const employes = await realm.objects('Employe');
    //       console.log("emp ",employes);
    //     });
    //   };


    // const saveDataToDB = (resp) => {
    //     Realm.open({ schema: [EmployeSchema] })
    //         .then((realm) => {
    //             realm.write(async () => {
    //                 const employes = await realm.create('Employe', {
    //                     id: 1,
    //                     data: resp
    //                 })
    //                 console.log("emp ", employes);
    //             })
    //         });
    // }




    const renderIcon = (props) => (
        <Icon {...props} name={'search-outline'} />
    );

    const searchFilterFunction = text => {
        const employeData = searchData;
        const newData = employeData.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.email.toUpperCase()}`
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1
        });
        setData(newData);
        setValue(text)
    };

    const renderItem = ({ item, index }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('EmployeDetails', {
            name: item.name,
            item: item
        })} activeOpacity={.86}>
            <Layout style={styles.employeCard}>
                <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image defaultSource={require('../../assets/user.jpg')}
                        source={!item.profile_image ? require('../../assets/user.jpg') : { uri: item.profile_image }}
                        style={styles.profileImage} />
                </Layout>
                <Layout style={{ marginLeft: 20 }}>
                    <Text category='h6' style={styles.employeTitle}>{item.name}</Text>
                    <Text category='s1' style={styles.employeSubTitle}>{!item.company ? '' : item.company.name}</Text>
                </Layout>
            </Layout>
        </TouchableWithoutFeedback>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TopNavigation
                style={{ backgroundColor: theme['color-primary-default'] }}
                alignment="center"
                title={props => <Text category='h6' {...props} style={[props.style, { color: AppColor.WHITE, fontWeight: 'bold' }]}>WHITE RABBIT</Text>}

            />
            <Layout style={styles.body}>
                <Input
                    value={value}
                    placeholder='Search by email or name '
                    accessoryRight={renderIcon}
                    onChangeText={(text) => searchFilterFunction(text)}
                />

                <Layout style={styles.employeListContainer}>
                    <Text category='h6'>My Team</Text>
                    <Layout style={{ marginBottom: '20%' }}>

                        {
                            data.length === 0 ?
                                <Layout style={{ alignItems: 'center', marginTop: '30%' }}>
                                    <Text category="h6">Cannot find the employe.</Text>
                                </Layout> :
                                <FlatList
                                    data={data}
                                    extraData={data}
                                    style={{
                                        paddingHorizontal: 10,
                                        marginTop: 12,
                                        marginBottom: 12,
                                    }}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                />
                        }


                    </Layout>
                </Layout>
            </Layout>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        padding: 20,
    },
    employeCard: {
        width: '98%',
        margin: 5,
        elevation: 4,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 7,
        flexDirection: 'row'
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 22
    },
    employeListContainer: {
        marginTop: 25
    },
    employeTitle: {
        fontSize: 18,
    },
    employeSubTitle: {
        fontSize: 14,
    }
})


export default EmployeList
