import { View, Text, FlatList, TouchableOpacity, Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import { cartAtom, orderPriceAtom } from "../../state/RecoilState";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Cart() {
    const [cart, setCart] = useRecoilState(cartAtom);
    const [orderPrice, setOrderPrice] = useRecoilState(orderPriceAtom);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        let total = 0;
        cart.map((item) => {
            if (item.count == 0) {
                setCart(cart.filter((i) => i.count > 0))
            }
            total = total + Number(item.product.price) * item.count;
        })

        if (cart.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }

        setOrderPrice(total);
    }, [cart])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container} >
                <Text style={styles.titleText}>
                    Cart
                </Text>
                <FlatList
                    style={styles.flatList}
                    data={cart}
                    renderItem={item => <CartItem cartItem={item.item} />}
                    keyExtractor={(item) => item.product.id.toString()}
                    ListEmptyComponent={() => <Text style={styles.emptyStateText}>There are no items added to your cart yet</Text>}
                />
                <View style={styles.bottomContainer}>
                    <Text style={styles.priceTitle}>
                        Order price:
                    </Text>
                    <Text style={styles.priceText} >
                        {orderPrice} ₽
                    </Text>
                    <TouchableOpacity
                        disabled={isDisabled}
                        onPress={() => {
                            //@ts-ignore
                            navigation.navigate('OrderScreen')
                        }}
                        style={[styles.button, { backgroundColor: isDisabled ? 'gray' : 'black', }]}
                    >
                        <Text style={styles.buttonText} >
                            Place an order
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    titleText: {
        textAlign: 'center',
        fontSize: 23,
        color: 'black',
        fontWeight: '600',
        marginTop: 100,
    },
    flatList: {
        width: '90%',
        marginTop: 30,
    },
    emptyStateText: {
        fontWeight: '500',
        fontSize: 20,
        color: 'gray',
        textAlign: 'center',
    },
    bottomContainer: {
        flex: 1,
        height: '100%',
        width: '90%',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    priceTitle: {
        textAlign: 'left',
        fontSize: 17,
        color: 'black',
        fontWeight: '600',
    },
    priceText: {
        textAlign: 'left',
        fontSize: 19,
        color: 'black',
        fontWeight: '600',
    },
    button: {
        height: 60,
        marginTop: 30,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    }
})