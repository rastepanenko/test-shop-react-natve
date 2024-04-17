import { AtomEffect, atom } from "recoil";
import { ICartItem, IUser } from "../types/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";

function persistAtom<T>(key: string): AtomEffect<T> {
    return ({ setSelf, onSet, trigger }) => {
        const loadPersisted = async () => {
            const savedValue = await AsyncStorage.getItem(key);

            if (savedValue != null) {
                setSelf(JSON.parse(savedValue));
            }
        };

        // Asynchronously set the persisted data
        if (trigger === 'get') {
            loadPersisted();
        }

        // Subscribe to state changes and persist them to localForage
        onSet((newValue, _, isReset) => {
            isReset
                ? AsyncStorage.removeItem(key)
                : AsyncStorage.setItem(key, JSON.stringify(newValue));
        })
    }
}


export const userAtom = atom<IUser>({
    key: 'userAtom',
    default: {
        name: "",
        lastName: '',
        email: '',
        password: '',
        token: "",
        signed: false,
        orders: []
    },
    dangerouslyAllowMutability: false,
    effects_UNSTABLE: [persistAtom('userAtomPersist')],
});

export const cartAtom = atom<ICartItem[]>({
    key: 'cartAtom',
    default: [],
    dangerouslyAllowMutability: false,
    effects_UNSTABLE: [persistAtom('cartAtomPersist')],
});

export const orderPriceAtom = atom({
    key: 'orderPriceAtom',
    default: 0,
    dangerouslyAllowMutability: false,
});
