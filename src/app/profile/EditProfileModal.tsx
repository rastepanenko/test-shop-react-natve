import { View, Text, TouchableWithoutFeedback, Modal, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import Icon from "../components/ui/Icon";
import { useRecoilState } from "recoil";
import { userAtom } from "../../state/RecoilState";
import { useState } from "react";
import { TextInput } from "react-native-paper";

interface IEditProfileProps {
    readonly visible: boolean;
    readonly setVisible: (visible: boolean) => void;
}

export default function EditProfileModal({ visible, setVisible }: IEditProfileProps) {
    const [user, setUser] = useRecoilState(userAtom);
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.lastName);

    const save = () => {
        setUser({ ...user, name: name, lastName: lastName });
        setVisible(false);
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.iconOpacity}
                            onPress={() => setVisible(false)}
                        >
                            <Icon name="close" color={'gray'} style={{ marginBottom: -3 }} size={25} />
                        </TouchableOpacity>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>
                                Name
                            </Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            underlineStyle={{ display: 'none' }}
                            onChangeText={setName}
                            value={name}
                        />
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>
                                Lastname
                            </Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            underlineStyle={{ display: 'none' }}
                            onChangeText={setLastName}
                            value={lastName}
                        />
                        <TouchableOpacity onPress={save} style={styles.button}>
                            <Text style={styles.buttonText}>
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        height: '65%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
    },
    iconOpacity: {
        position: 'absolute',
        zIndex: 100,
        right: 1,
        height: '97%',
        marginTop: 10,
        marginRight: 10
    },
    titleContainer: {
        width: '85%',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    titleText: {
        fontSize: 14,
        fontWeight: '400',
        marginTop: 30,
        color: 'gray',
    },
    textInput: {
        width: '85%',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        height: 43,
        borderRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 10,
    },
    button: {
        position: 'absolute', 
        bottom: 1, 
        backgroundColor: 'black', 
        height: 45, 
        marginVertical: 20, 
        borderRadius: 10, 
        width: '85%', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16, 
        color: 'white',
    }
})