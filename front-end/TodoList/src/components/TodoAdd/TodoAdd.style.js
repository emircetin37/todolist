import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    addButton: {
        width: 70,
        height: 70,
        borderRadius: 50
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    bottomSheetContainer: {
        width: '100%',
        height: 300,
        backgroundColor: '#181920',
        padding: 10
    },
    addTodoText: {
        color: '#fff',
        fontSize: 30,
        letterSpacing: 5,
        marginLeft: 20,
        marginBottom: 30
    },
    inputStyle: {
        color: '#fff',
        paddingHorizontal: 20
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
        borderWidth: 0,
        backgroundColor: '#252A34',
        height: 50,
        borderRadius: 20
    },
    addContainer: {
        width: '60%',
        borderRadius: 50,
        alignSelf: 'center'
    },
    closeButton: {
        width: 50,
        height: 50,
        borderRadius: 70,
        marginTop: 20
    }
})