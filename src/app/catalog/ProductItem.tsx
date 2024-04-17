import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { ICartItem, IProduct } from "../../types/Types";
import Icon from "../components/ui/Icon";
import { useRecoilState } from "recoil";
import { cartAtom } from "../../state/RecoilState";

interface IProductItemProps {
    readonly product: IProduct;
}

export default function ProductItem(props: IProductItemProps) {
    const { product } = props;
    const [cart, setCart] = useRecoilState(cartAtom);

    const putInCart = () => {
        let isAddCount = false;
        if(cart.length != 0) {
            const updatedCart = cart.map((item) => {
                if (item.product.id === product.id) {
                    isAddCount = true;
                    return { ...item, count: item.count + 1 };
                } 
                return item;
            });

            if(isAddCount) {
                setCart(updatedCart);
            }
            else {
                setCart(prev => [...prev, {product: product, count: 1}])
            }
            
        } else {
            setCart(prev => [...prev, {product: product, count: 1}])
        }
    }

    return (
        <View style={styles.container}>
            {!product.image
                ? <View style={styles.emptyImageContainer}>
                    <Icon name="minus-circle" color={'gray'} style={{ marginBottom: -3, }} size={50} />
                    <Text style={styles.emptyImageText}>
                        Photo not available
                    </Text>
                </View>
                : <Image source={{ uri: product.image }} style={styles.image} />
            }
            <Text style={styles.priceText}>
                {product.price} ₽
            </Text>
            <Text style={styles.titleText}>
                {product.title}
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={putInCart}
            >
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f2f2f2', 
        height: '100%', 
        borderRadius: 8,
    },
    emptyImageContainer: {
        alignItems: 'center', 
        width: '100%', 
        height: '50%', 
        justifyContent: 'center',
    },
    emptyImageText: {
        textAlign: 'center', 
        color: 'gray', 
        marginTop: 10
    },
    image: {
        width: '100%', 
        height: '50%'
    },
    priceText: {
        fontSize: 20, 
        fontWeight: '600', 
        color: 'black',
    },
    titleText: {
        fontSize: 16, 
        fontWeight: '500'
    },
    button: {
        backgroundColor: 'black', 
        width: '85%', 
        marginTop: 10, 
        height: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 14, 
        color: 'white', 
        fontWeight: '500',
    }
})