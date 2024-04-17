import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { CustomRadioButton } from "../components/ui/CustomRadioButton";
import PaymentForm from "./PaymentForm";
import { IOrderInfo } from "../../types/Types";
import useOrder from "../../hooks/useOrder";
import Loader from "../components/ui/Loader";
import { useNavigation } from "@react-navigation/native";

export default function Order() {
    const {
        orderWithCard,
        orderWithCash,
        isLoading,
    } = useOrder();
    const [orderInfo, setOrderInfo] = useState<IOrderInfo>({
        name: '',
        adress: '',
        phone: '',
        cardNumber: '',
        cardExpiry: '',
        cvc: '',
    });
    const [checked, setChecked] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [paymentFieldsReady, setPaymentFieldsReady] = useState(false);

    useEffect(() => {
        if ((orderInfo.name && orderInfo.adress && orderInfo.phone && paymentFieldsReady && checked == 'card') || (orderInfo.name && orderInfo.adress && orderInfo.phone && checked == 'cash')) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [orderInfo, paymentFieldsReady, checked]);

    const onSubmit = () => {
        if (checked === 'cash') {
            orderWithCash(orderInfo);
        } else {
            orderWithCard(orderInfo);
        }
    }

    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Loader size={100} color={'black'} />
        </View>
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.titleText}>
                    Enter data for delivery and payment of the order
                </Text>
                <View style={{ width: '90%' }}>
                    <TextInput
                        style={styles.textInput}
                        underlineStyle={{ display: 'none' }}
                        onChangeText={(text) => setOrderInfo(prev => ({ ...prev, name: text }))}
                        placeholder="Full Name"
                    />
                    <TextInput
                        style={styles.textInput}
                        underlineStyle={{ display: 'none' }}
                        onChangeText={(text) => setOrderInfo(prev => ({ ...prev, phone: text }))}
                        placeholder="Phone Number"
                        keyboardType='phone-pad'
                    />
                    <TextInput
                        style={styles.textInput}
                        underlineStyle={{ display: 'none' }}
                        onChangeText={(text) => setOrderInfo(prev => ({ ...prev, adress: text }))}
                        placeholder="Adress"
                    />
                </View>
                <View style={{ width: '90%' }}>
                    <Text style={styles.paymentText}>
                        Payment options
                    </Text>
                    <View style={styles.radioContainer}>
                        <CustomRadioButton
                            label={"Cash"}
                            selected={checked === 'cash' ? true : false}
                            onSelect={() => setChecked('cash')}
                        />
                        <CustomRadioButton
                            label={"Card"}
                            selected={checked === 'card' ? true : false}
                            onSelect={() => setChecked('card')}
                        />
                    </View>
                </View>
                {checked === 'card'
                    ? <PaymentForm setPaymentFieldsReady={setPaymentFieldsReady} setOrderInfo={setOrderInfo} orderInfo={orderInfo} />
                    : null
                }
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                    onPress={onSubmit}
                    disabled={isButtonDisabled}
                    style={[styles.button, { backgroundColor: isButtonDisabled ? 'gray' : 'black', }]}>
                    <Text style={styles.buttonText}>
                        Order
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    titleText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 20,
        color: 'black',
        marginTop: 30
    },
    textInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 30,
        backgroundColor: 'white',
        height: 43,
        borderRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 10,
    },
    paymentText: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontWeight: '500',
        fontSize: 18,
        color: 'black',
        marginTop: 30
    },
    radioContainer: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 45,
        marginVertical: 10,
        marginBottom: 40,
        borderRadius: 10,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    }
})