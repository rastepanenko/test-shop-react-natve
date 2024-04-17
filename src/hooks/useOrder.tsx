import { useRecoilState } from "recoil";
import { cartAtom, orderPriceAtom, userAtom } from "../state/RecoilState";
import { useState } from "react";
import { IOrder, IOrderInfo, IOrderProvider } from "../types/Types";
import { PaymentCardData } from "../mock/PaymentCardData";
import { useNavigation } from "@react-navigation/native";

export default function useOrder() {
    const [cart, setCart] = useRecoilState(cartAtom);
    const [user, setUser] = useRecoilState(userAtom);
    const [orderPrice, setOrderPrice] = useRecoilState(orderPriceAtom);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    let order = null;
    let orders: IOrder[] = user.orders; 

    const orderWithCard = async (orderInfo: IOrderInfo) => {
        setIsLoading(true);
        try {
            return new Promise(resolve => setTimeout(() => {
                order = {
                    totalPrice: orderPrice,
                    paymentStatus: true,
                    adress: orderInfo.adress,
                    name: orderInfo.name,
                    phone: orderInfo.phone,
                    date: new Date,
                    products: cart
                } as IOrder;

                if (
                    orderInfo.cardNumber.toLowerCase().trim() === PaymentCardData.cardNumber.toLowerCase().trim()
                    && orderInfo.cardExpiry.toLowerCase().trim() === PaymentCardData.cardDate.toLowerCase().trim()
                    && Number(orderInfo.cvc) === PaymentCardData.cvv) {
                    
                    orders = [order, ...orders];
                    setUser({ ...user, orders: orders })
                    setCart([]);
                    setIsLoading(false);
                    //@ts-ignore
                    navigation.navigate('Orders')
                    return resolve(orderInfo);
                } else {
                    alert('Invalid card details!');
                    //@ts-ignore
                    navigation.navigate('Root');
                }
            }, 1000))
        } catch (error) {
            console.error(error);
        }
    };

    const orderWithCash = async (orderInfo: IOrderInfo) => {
        setIsLoading(true);
        try {
            return new Promise(resolve => setTimeout(() => {
                order = {
                    totalPrice: orderPrice,
                    paymentStatus: false,
                    adress: orderInfo.adress,
                    name: orderInfo.name,
                    phone: orderInfo.phone,
                    date: new Date,
                    products: cart
                } as IOrder;

                orders = [order, ...orders];
                setUser({ ...user, orders: orders })
                setCart([]);
                setIsLoading(false);
                //@ts-ignore
                navigation.navigate('Orders')
                return resolve(order);
            }, 1000))
        } catch (error) {
            console.error(error);
        }
    };

    return {
        orderWithCard,
        orderWithCash,
        isLoading,
    } as IOrderProvider
}