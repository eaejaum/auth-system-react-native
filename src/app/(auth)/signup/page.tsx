import { StyleSheet, Text, View } from "react-native";

export default function Signup() {
    return (
        <View style={styles.container}>
            <Text>Cadastro</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } 
});