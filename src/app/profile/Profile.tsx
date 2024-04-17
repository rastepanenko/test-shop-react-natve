import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../state/RecoilState";
import useSignOut from "../../hooks/useSignOut";
import Loader from "../components/ui/Loader";
import Divider from "../components/ui/Divider";
import Icon from "../components/ui/Icon";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
    const user = useRecoilValue(userAtom);
    const {
        signOut,
        isLoading,
    } = useSignOut();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation();

    if (isLoading) {
        return <View style={styles.loaderContainer}>
            <Loader size={100} color={'black'} />
        </View>
    }

    return (
        <View style={styles.container}>
            <EditProfileModal visible={isModalVisible} setVisible={setIsModalVisible} />
            <View style={styles.nameCOntainer}>
                <Icon name={"user"} color={"gray"} size={100} style={{ margin: -3 }} />
                <Text style={styles.nameText}>
                    {`${user.name} ${user.lastName}`}
                </Text>
                <Text style={styles.emailText}>
                    {user.email}
                </Text>
            </View>
            <Divider />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => {
                        //@ts-ignore
                        navigation.navigate('Orders')
                    }}
                    style={[styles.button, { backgroundColor: 'black', }]}
                >
                    <Text style={styles.buttonText}>
                        My orders
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    style={[styles.button, { backgroundColor: 'black', }]}
                >
                    <Text style={styles.buttonText}>
                        Edit profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={signOut}
                    style={[styles.button, { backgroundColor: 'red', }]}
                >
                    <Text style={styles.buttonText}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    nameCOntainer: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        height: '35%',
        backgroundColor: '#f2f2f2',
    },
    nameText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
        marginTop: 20,
    },
    emailText: {
        fontSize: 17,
        fontWeight: '500',
        color: 'gray',
        marginTop: 5,
    },
    buttonsContainer: {
        width: '90%',
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        marginVertical: 10,
        height: 45,
        borderRadius: 8,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    }
})