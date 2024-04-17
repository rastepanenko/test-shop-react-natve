import { useState } from "react";
import { AccountCredentials } from "../mock/auth";
import { ISignInProvider, IUser } from "../types/Types";
import { useRecoilState } from "recoil";
import { userAtom } from "../state/RecoilState";

export default function useSignIn() {
    let userInfo = null;
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useRecoilState<IUser>(userAtom)
    console.log(user);

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        return new Promise((resolve, reject) => setTimeout(() => {
            userInfo = {
                name: user.name ? user.name : "Ivan",
                lastName: user.lastName ? user.lastName : 'Ivanov',
                email: email,
                password: password,
                token: "testToken",
                signed: true,
                orders: user.orders ? user.orders : [],
            } as IUser;

            if (email.toLowerCase().trim() === AccountCredentials.email && password.toLowerCase().trim() === AccountCredentials.password) {
                //setUser(userInfo)
                setIsLoading(false);
                return resolve(userInfo);
            } else {
                setIsLoading(false);
                //setErrorMessage('Wrong login or password')
                return reject({ message: 'Wrong login or password!' })
            }
        }, 1000))
    };

    return {
        signIn,
        isLoading,
    } as ISignInProvider
}