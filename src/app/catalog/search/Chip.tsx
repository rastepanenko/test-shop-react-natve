import { TouchableOpacity, StyleSheet, Text } from 'react-native';

interface ChipProps {
    readonly key?: string;
    readonly text: string;
    readonly isSelected?: boolean;
    readonly onPress?: () => void;
}
export function Chip(props: ChipProps) {
    const textStyle = props.isSelected ? styles.textSelected : {};
    const chipStyle = props.isSelected ? styles.containerSelected : {};

    return (
        <TouchableOpacity
            key={props.text}
            style={[styles.container, chipStyle]}
            activeOpacity={0.8}
            onPress={props.onPress}
        >
            <Text style={{ color: 'white' }}>{props.text}</Text>
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
    container: {
        height: 25,
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dfdfdf',
        borderRadius: 12,
    },
    containerSelected: {
        backgroundColor: 'gray',
    },
    text: {
        color: '#333',
        fontSize: 12,
    },
    textSelected: {
        color: '#fff',
    },
});