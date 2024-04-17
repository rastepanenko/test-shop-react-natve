import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { IOrderInfo } from "../../types/Types";

interface IPaymentFormProps {
    readonly setPaymentFieldsReady: (paymentFieldsReady: boolean) => void;
    readonly setOrderInfo: (orderInfo: any) => void;
    readonly orderInfo: IOrderInfo;
}

export default function PaymentForm({ setPaymentFieldsReady, setOrderInfo, orderInfo }: IPaymentFormProps) {

    useEffect(() => {
        if (orderInfo.cardExpiry && orderInfo.cardNumber && orderInfo.cvc) {
            setPaymentFieldsReady(true);
        } else {
            setPaymentFieldsReady(false);
        }
    }, [orderInfo])

    const handlingCardNumber = (number: string) => {
        setOrderInfo((prev: IOrderInfo) => ({ ...prev, cardNumber: number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim() }))
    }

    const handlingCardExpiry = (text: string) => {
        if (text.indexOf('.') >= 0 || text.length > 5) {
            return;
        }

        if (text.length === 2 && orderInfo.cardExpiry.length === 1) {
            text += '/'
        }

        setOrderInfo((prev: IOrderInfo) => ({ ...prev, cardExpiry: text }))
    }

    return (
        <View style={{ width: '90%' }}>
            <TextInput
                style={styles.cardNumberInput}
                underlineStyle={{ display: 'none' }}
                onChangeText={handlingCardNumber}
                placeholder="Card Number"
                keyboardType='numeric'
                value={orderInfo.cardNumber}
            />
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                    style={styles.otherInputs}
                    underlineStyle={{ display: 'none' }}
                    onChangeText={handlingCardExpiry}
                    placeholder='MM/YY'
                    keyboardType={'numeric'}
                    value={orderInfo.cardExpiry}
                />
                <TextInput
                    style={styles.otherInputs}
                    underlineStyle={{ display: 'none' }}
                    onChangeText={(text) => setOrderInfo((prev: IOrderInfo) => ({ ...prev, cvc: Number(text) }))}
                    placeholder='CVC/CVV'
                    keyboardType={'numeric'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardNumberInput: {
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
    otherInputs: {
        width: '45%',
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 30,
        backgroundColor: 'white',
        height: 43,
        borderRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 10,
    }
})