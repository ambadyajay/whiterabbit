import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
    Icon,
    Layout,
    useTheme,
    TopNavigation,
    TopNavigationAction,
    Text,
    Input
} from '@ui-kitten/components';
import AppColor from '../../constents/AppColor';

const { height } = Dimensions.get('window');

const BackIcon = props => <Icon {...props} fill={AppColor.WHITE} name="arrow-ios-back-outline" />;


const EmployeDetails = ({ route, navigation }) => {
    const theme = useTheme();

    const { name, item } = route.params;

    const renderBackAction = () => (
        <TopNavigationAction
            icon={BackIcon}
            onPress={() => navigation.goBack('')}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <TopNavigation
                    style={{ backgroundColor: theme['color-primary-default'] }}
                    alignment="start"
                    accessoryLeft={renderBackAction}
                    title={props => <Text category='h6' {...props} style={[props.style, { color: AppColor.WHITE, fontWeight: 'bold' }]}>{name}</Text>}
                />
                <Layout style={styles.body}>
                    <Layout style={styles.profileImageContainer}>
                        <Image
                            style={styles.profileImage}
                            source={!item.profile_image ? require('../../assets/user.jpg') : { uri: item.profile_image }}
                        />
                    </Layout>

                    <Layout style={styles.titleContiner}>
                        <Text category='h6'>{item.name}</Text>
                        <Layout style={{ paddingTop: 5 }}>
                            <Text category='s1'>{item.company.name}</Text>
                        </Layout>
                    </Layout>
                    <Layout style={{ marginTop: 20 }}>
                        <Text category='h6'>Personal Information</Text>

                        <Layout style={{ paddingHorizontal: 5 }}>
                            <Layout style={styles.infoContiner}>
                                <Text style={styles.label} category='label'>User Name :</Text>
                                <Text>{item.username}</Text>
                            </Layout>

                            <Layout style={styles.infoContiner}>
                                <Text style={styles.label} category='label'>Email Id :</Text>
                                <Text>{item.email}</Text>
                            </Layout>
                            {
                                !item.phone ?
                                    null : <Layout style={styles.infoContiner}>
                                        <Text style={styles.label} category='label'>Phone :</Text>
                                        <Text>{item.phone}</Text>
                                    </Layout>
                            }
                            <Layout style={styles.infoContiner}>
                                <Text style={styles.label} category='label'>Website :</Text>
                                <Text>{item.website}</Text>
                            </Layout>
                        </Layout>
                    </Layout>

                    <Layout style={{ marginTop: 20 }}>
                        <Text category='h6'>Address</Text>

                        <Layout style={{ paddingHorizontal: 5 }}>
                            <Layout style={styles.infoContiner}>
                                <Text category='label' style={styles.label}>Street :</Text>
                                <Text>{item.address.street}</Text>
                            </Layout>

                            <Layout style={styles.infoContiner}>
                                <Text category='label' style={styles.label}>Suit :</Text>
                                <Text>{item.address.suite}</Text>
                            </Layout>

                            <Layout style={styles.infoContiner}>
                                <Text category='label' style={styles.label}>City :</Text>
                                <Text>{item.address.city}</Text>
                            </Layout>

                            <Layout style={styles.infoContiner}>
                                <Text category='label' style={styles.label}>Zip code :</Text>
                                <Text>{item.address.zipcode}</Text>
                            </Layout>
                        </Layout>
                    </Layout>

                    <Layout style={{ marginTop: 20 }}>
                        <Text category='h6'>Company Information</Text>

                        <Layout style={{ paddingHorizontal: 5 }}>
                            <Layout style={styles.infoContiner}>
                                <Text category='label' style={styles.label}>Name :</Text>
                                <Text>{item.company.name}</Text>
                            </Layout>

                            <Layout style={styles.infoContiner}>
                                <Text category='label' style={styles.label}>CatchPhrase :</Text>
                                <Text style={{ width: '70%', textAlign: 'right' }}>{item.company.catchPhrase}</Text>
                            </Layout>

                            <Layout style={styles.infoContiner}>
                                <Text category='label' style={styles.label}>BS :</Text>
                                <Text>{item.company.bs}</Text>
                            </Layout>

                        </Layout>
                    </Layout>
                    <Layout>
                    </Layout>
                </Layout>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColor.WHITE
    },
    body: {
        flex: 1,
        padding: 20,
    },
    profileImageContainer: {
        alignItems: 'center'
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    titleContiner: {
        marginTop: 20,
        alignItems: 'center'
    },
    infoContiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7
    },
    label: {
        fontSize: 15
    }
})


export default EmployeDetails
