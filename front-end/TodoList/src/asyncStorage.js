import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async (userId) => {
    try {
        await AsyncStorage.setItem('userId', userId)
    }
    catch (error) {
        console.error(error)
    }
}
export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem('userId')
        if (user != null)
            return user
    } catch (error) {
        console.error(error)
    }
}