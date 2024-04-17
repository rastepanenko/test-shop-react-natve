import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ICustomRadioButtonProps {
    readonly label: string;
    readonly selected: boolean;
    readonly onSelect: () => void; 
}

export const CustomRadioButton = ({ label, selected, onSelect }: ICustomRadioButtonProps) => ( 
    <TouchableOpacity 
        style={[styles.container, { backgroundColor: selected ? 'gray' : 'white', }]} 
        onPress={onSelect} 
    > 
        <Text style={styles.labelText}> 
            {label} 
        </Text> 
    </TouchableOpacity> 
); 

const styles = StyleSheet.create({
    container: {
        width: '40%', 
        height: 25, 
        justifyContent: 'center', 
        alignItems: 'center',  
        marginHorizontal: 10, 
        borderRadius: 16, 
        borderWidth: 1, 
        borderColor: 'gray'
    },
    labelText: {
        fontSize: 16, 
        fontWeight: '500', 
        textAlign: 'center', 
        color: 'black',
    }
})