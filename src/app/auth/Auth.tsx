import { useEffect, useState } from "react";
import { TextInput, View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, StyleSheet } from "react-native";
import useSignIn from "../../hooks/useSignIn";
import Loader from "../components/ui/Loader";
import { useRecoilState } from "recoil";
import { userAtom } from "../../state/RecoilState";
import { IUser } from "../../types/Types";

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')
    const { signIn, isLoading } = useSignIn();
    const [user, setUser] = useRecoilState<IUser>(userAtom)

    const validationEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    useEffect(() => {
        if (email && password && validationEmail.test(email)) {
            setIsDisabled(false);
        }
    }, [email, password])

    async function login() {
        try {
            const userInfo = await signIn(email, password);
            setUser(userInfo);
        } catch (error) {
            setErrorMessage((error as Error).message);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.authText}>Sign in to Test Shop</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder='Email'
                        style={styles.textInput}
                    />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Password'
                        style={styles.textInput}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        onPress={login}
                        style={[styles.loginButton, { backgroundColor: isDisabled ? 'gray' : 'black', }]}
                    >
                        {isLoading
                            ? <Loader size={37} color={'white'} />
                            : <Text style={{ color: 'white', }}>
                                Sign In
                            </Text>
                        }
                    </TouchableOpacity>
                    {errorMessage == ''
                        ? null
                        : <Text style={styles.error}>{errorMessage}</Text>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    authText: {
        fontSize: 20,
        fontWeight: '600',
    },
    inputsContainer: {
        width: '80%',
        marginBottom: '20%',
        marginTop: '5%'
    },
    textInput: {
        backgroundColor: 'white',
        height: 40,
        borderRadius: 4,
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 16,
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    loginButton: {
        width: '100%',
        height: 45,
        marginVertical: 5,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
    }
});