import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from "react-native";
import Icon from "../components/ui/Icon";
import { IProductFocus } from "../../types/Types";
import { useRecoilState } from "recoil";
import { cartAtom } from "../../state/RecoilState";

interface IDetailsModalProps {
    readonly visible: boolean;
    readonly setVisible: (visible: boolean) => void;
    readonly focusProduct: IProductFocus;
    readonly setFocusProduct: (product: IProductFocus) => void;
}

export default function DetailsModal(props: IDetailsModalProps) {
    const { visible, setVisible, focusProduct, setFocusProduct } = props;
    const [cart, setCart] = useRecoilState(cartAtom);
    const initialProductState: IProductFocus = {
        product: {
            id: 0,
            title: "",
            product_type: "",
            price: "",
            image: null
        },
        isFocused: false,
    }

    const close = () => {
        setVisible(false);
        setFocusProduct(initialProductState);
    }

    const putInCart = () => {
        let isAddCount = false;
        if(cart.length != 0) {
            const updatedCart = cart.map((item) => {
                if (item.product.id === focusProduct.product.id) {
                    isAddCount = true;
                    return { ...item, count: item.count + 1 };
                } 
                return item;
            });

            if(isAddCount) {
                setCart(updatedCart);
            }
            else {
                setCart(prev => [...prev, {product: focusProduct.product, count: 1}])
            }
            
        } else {
            setCart(prev => [...prev, {product: focusProduct.product, count: 1}])
        }
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.iconOpacity} onPress={close}>
                        <Icon name="close" color={'gray'} style={{ marginBottom: -3 }} size={25} />
                    </TouchableOpacity>
                    {!focusProduct.product?.image
                        ? <View style={styles.emptyImageContainer}>
                            <Icon name="minus-circle" color={'gray'} style={{ marginBottom: -3 }} size={50} />
                            <Text style={styles.emptyImageText}>
                                Photo not available
                            </Text>
                        </View>
                        : <Image source={{ uri: focusProduct.product.image }} style={styles.image} />
                    }
                    <Text style={styles.priceText}>
                        {focusProduct.product?.price} ₽
                    </Text>
                    <Text style={styles.titleText}>
                        {focusProduct.product?.title}
                    </Text >
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>
                            {`Details:\nbla bla bla bla`}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={putInCart}
                    >
                        <Text style={styles.buttonText}>
                            Add to Cart
                        </Text>
                    </TouchableOpacity>
                </View>
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
    emptyImageContainer: {
        alignItems: 'center',
        width: '80%',
        height: '30%',
    },
    emptyImageText: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 10
    },
    image: {
        width: '100%',
        aspectRatio: 16 / 9
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
    detailsContainer: {
        width: '85%',
        alignItems: 'flex-start',
    },
    detailsText: {
        fontSize: 15,
        fontWeight: '500',
        color: 'gray',
    },
    button: {
        backgroundColor: 'black',
        width: '85%',
        height: 50,
        position: 'absolute',
        bottom: 1,
        marginBottom: 20,
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