import { Dimensions, StyleSheet } from "react-native";
const window = Dimensions.get('window')
export const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: '#181920'
    },
    headerContainer: {
        width: '100%',
        height: window.height * 0.1,
        backgroundColor: '#181920',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    headerTitle: {
        color: '#fff',
        fontSize: 40,
        letterSpacing: 10
    },
    contentContainer: {
        width: '100%',
        height: window.height * 0.7,
        backgroundColor: '#fff'
    },
    bottomSheetContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#181920'
    },
    logOutButton: {
        width: '50%',
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 30
    },
    closeButton: {
        width: 50,
        height: 50,
        borderRadius: 70,
        marginTop: 20
    },
    completedTodoButton: {
        width: '50%',
        alignSelf: 'center',
        borderRadius: 50,
        marginTop: 40
    }
})