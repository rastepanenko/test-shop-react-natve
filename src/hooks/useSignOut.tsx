import { useState } from "react";
import { AccountCredentials } from "../mock/auth";
import { ISignInProvider, ISignOutProvider, IUser } from "../types/Types";
import { useRecoilState } from "recoil";
import { userAtom } from "../state/RecoilState";

export default function useSignOut() {
    let userInfo = null;
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useRecoilState<IUser>(userAtom)

    const signOut = async () => {
        setIsLoading(true);
        return new Promise(resolve => setTimeout(() => {
            userInfo = {
                name: user.name,
                lastName: user.lastName,
                email: '',
                password: '',
                token: '',
                signed: false,
                orders: user.orders
            } as IUser;

            setIsLoading(false);
            return resolve(userInfo);
        }, 1000))
    };

    return {
        signOut,
        isLoading,
    } as ISignOutProvider
}