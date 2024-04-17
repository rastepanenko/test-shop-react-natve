import { FlatList, View, Text, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../state/RecoilState";
import OrderItem from "./OrderItem";

export default function UserOrders() {
    const user = useRecoilValue(userAtom)

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={user.orders}
                renderItem={item => <OrderItem orderItem={item.item} />}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => <Text style={styles.emptyStateText}>You haven't made any orders yet</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white', 
        alignItems: 'center', 
    },
    list: {
        width: '90%', 
        marginTop: 30,
    },
    emptyStateText: {
        fontWeight: '500', 
        fontSize: 20, 
        color: 'gray', 
        textAlign: 'center',
    }
})