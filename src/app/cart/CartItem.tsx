import { View, Text, Image, StyleSheet } from "react-native";
import { ICartItem } from "../../types/Types";
import { IconButton, TextInput } from "react-native-paper";
import { useRecoilState } from "recoil";
import { cartAtom } from "../../state/RecoilState";
import { useEffect, useState } from "react";

interface ICartItemProps {
    readonly cartItem: ICartItem;
}

export default function CartItem({ cartItem }: ICartItemProps) {
    const [cart, setCart] = useRecoilState(cartAtom);
    const [productCount, setProductCount] = useState(0);
    const [isEditEnd, setIsEditEnd] = useState(false);

    useEffect(() => {
        setProductCount(cartItem.count);
    }, [cart])

    useEffect(() => {
        if(isEditEnd) {
            setCart(cart.map((item) => item.product.id == cartItem.product.id ? { ...item, count: productCount } : item));
            setIsEditEnd(false);
        }
    }, [productCount, isEditEnd])

    const handleCount = (type: string) => {
        if(type == 'minus') {
            setProductCount(productCount - 1)
        } else {
            setProductCount(productCount + 1)
        }
        setIsEditEnd(true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {!cartItem.product.image
                    ? null
                    : <Image source={{ uri: cartItem.product.image }} style={styles.image} />
                }
                <View>
                    <Text style={styles.titleText}>
                        {cartItem.product.title}
                    </Text>
                    <Text style={styles.priceText}>
                        {cartItem.product.price} ₽
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <IconButton 
                    icon={"minus"} 
                    iconColor="gray" 
                    style={styles.icon} 
                    onPress={() => handleCount('minus')} 
                />
                <TextInput
                    style={styles.textInput}
                    inputMode='numeric'
                    underlineStyle={{ display: 'none' }}
                    selectTextOnFocus
                    value={productCount.toString()}
                    onChangeText={(text) => setProductCount(Number(text))}
                    onEndEditing={() => setIsEditEnd(true)}
                />
                <IconButton 
                    icon={"plus"} 
                    iconColor="gray" 
                    style={styles.iconButton} 
                    onPress={() => handleCount('plus')} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50, 
        width: '95%', 
        backgroundColor: '#f2f2f2', 
        justifyContent: 'space-between', 
        alignSelf: 'center', 
        padding: 5, 
        flexDirection: 'row', 
        shadowOpacity: 3, 
        shadowColor: 'gray', 
        shadowOffset: { width: 3, height: 3 }, 
        borderRadius: 16, 
        marginVertical: 7,
    },
    imageContainer: {
        alignItems: 'center', 
        flexDirection: 'row',
    },
    image: {
        height: '80%', 
        aspectRatio: 16 / 9
    },
    titleText: {
        fontSize: 16, 
        color: 'black', 
        fontWeight: '500',
    },
    priceText: {
        fontSize: 14, 
        color: 'black', 
        fontWeight: '400',
    },
    icon: {
        width: 20, 
        height: 20,
    },
    textInput: {
        width: 50,
        height: 43,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        borderRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        width: 20, 
        height: 20,
    }
})