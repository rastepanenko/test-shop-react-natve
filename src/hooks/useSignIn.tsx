import { useState } from "react";
import { AccountCredentials } from "../mock/auth";
import { ISignInProvider, IUser } from "../types/Types";
import { useRecoilState } from "recoil";
import { userAtom } from "../state/RecoilState";

export default function useSignIn() {
    let userInfo = null;
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useRecoilState<IUser>(userAtom)
    console.log(user);

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            return new Promise(resolve => setTimeout(() => {
                userInfo = {
                    name: user.name ? user.name : "Ivan",
                    lastName: user.lastName ? user.lastName : 'Ivanov',
                    email: email,
                    password: password,
                    token: "testToken",
                    signed: true,
                    orders: user.orders ? user.orders : [],
                } as IUser;
                
                if(email.toLowerCase().trim() === AccountCredentials.email && password.toLowerCase().trim() === AccountCredentials.password) {
                    setUser(userInfo)
                    return resolve(userInfo);
                } else {
                    setErrorMessage('Wrong login or password')
                }
                
                setIsLoading(false);
            }, 1000))
        } catch (error) {
            console.error(error);
        }
    };

    return {
        signIn,
        errorMessage,
        isLoading,
    } as ISignInProvider
}