import React, { useCallback, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Text, Input, Button } from "@rneui/base";
import { RegisterService } from "../../services";
import { styles } from "./Register.style";
const Register = ({ navigation }) => {
    const [fullName, setFullName] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const signUp = useCallback(() => {
        const value = {
            mail,
            password,
            fullName
        }
        RegisterService(value).then((userId) => {
            if (userId.length) {
                navigation.navigate('Login')
                setMail('')
                setPassword('')
                setFullName('')
            }

        }).catch((error) => {
        })
    }, [mail, password, fullName])
    return (
        <SafeAreaView style={{ ...styles.mainContainer }}>
            <View style={{ ...styles.headerContainer }}>
                <Text style={{ ...styles.title1 }}>Create New account</Text>
                <Text style={{ ...styles.title2 }}>Please fill in the form to continue</Text>
            </View>
            <View style={{ marginTop: 70 }}>
                <Input onChangeText={(fullNameText) => setFullName(fullNameText)} autoCapitalize="none" keyboardType="email-address" textContentType="emailAddress" inputStyle={{ ...styles.input }} placeholder="Full Name" inputContainerStyle={{ ...styles.inputContainer }}></Input>
                <Input onChangeText={(mailText) => setMail(mailText)} autoCapitalize="none" keyboardType="email-address" textContentType="emailAddress" inputStyle={{ ...styles.input }} placeholder="Email" inputContainerStyle={{ ...styles.inputContainer }}></Input>
                <Input onChangeText={(passwordText) => setPassword(passwordText)} textContentType="password" autoCapitalize="none" secureTextEntry={true} inputStyle={{ ...styles.input }} placeholder="Password" inputContainerStyle={{ ...styles.inputContainer }}></Input>
                <Button onPress={() => signUp()} color="#5567FE" style={{ ...styles.signUp}} buttonStyle={{ height: 70, borderRadius: 30 }} >Sign Up</Button>
                <View style={{ ...styles.footerContainer}}>
                    <Text style={{ color: '#fff' }}>Have an account?</Text>
                    <Text onPress={() => navigation.navigate('Login')} style={{ color: '#5567FE' }}>Sign In</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Register