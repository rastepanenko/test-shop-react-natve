import { View, Text, StyleSheet } from "react-native";
import { IOrder } from "../../types/Types";
import moment from 'moment'

interface IOrderItemProps {
    readonly orderItem: IOrder;
}

export default function OrderItem({ orderItem }: IOrderItemProps) {

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.text}>
                    Name
                </Text>
                <Text style={styles.text}>
                    {orderItem.name}
                </Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.text}>
                    Delivery adress
                </Text>
                <Text style={styles.text}>
                    {orderItem.adress}
                </Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.text}>
                    Order date
                </Text>
                <Text style={styles.text}>
                    {moment(orderItem.date).local().locale('ru').format('DD MMMM YYYY')}
                </Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.text}>
                    Total products
                </Text>
                <Text style={styles.text}>
                    {orderItem.products.length}
                </Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.text}>
                    Order price
                </Text>
                <Text style={styles.text}>
                    {orderItem.totalPrice} ₽
                </Text>
            </View>
            <View style={styles.statusContainer}>
                <Text style={[styles.statusText, { color: orderItem.paymentStatus ? 'green' : 'red', }]}>
                    {orderItem.paymentStatus
                        ? 'Order has been paid'
                        : 'Payment upon receipt'
                    }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#f2f2f2',
        marginVertical: 10,
        borderRadius: 10,
        padding: 15
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    text: {
        fontSize: 19,
        fontWeight: '500',
    },
    statusContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
    },
    statusText: {
        fontSize: 19,
        fontWeight: '500',
    }
})