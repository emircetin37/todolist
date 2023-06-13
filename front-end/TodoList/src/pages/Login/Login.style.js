import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: '#181920'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    title1: {
        color: '#fff',
        fontSize: 25,
        letterSpacing: 5
    },
    title2: {
        color: '#fff',
        fontSize: 15,
        opacity: 0.6,
        marginTop: 10
    },
    inputStyle: {
        color: '#fff',
        paddingHorizontal: 20
    },
    inputContainer: {
        orderBottomWidth: 0,
        borderWidth: 0,
        backgroundColor: '#252A34',
        height: 70,
        borderRadius: 20
    },
    signInButton: {
        width: '80%',
        alignSelf: 'center',
        marginTop: 50
    }
})