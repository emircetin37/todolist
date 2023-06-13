import { Button, Image, Text } from "@rneui/base";
import { Input } from "@rneui/themed";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native"
import { LoginService } from "../../services";
import { getUser, saveUser } from "../../asyncStorage";
import { useDispatch, useSelector } from "react-redux";
import { SetAge, SetUser } from "../../redux/action";
import { styles } from "./Login.style";

const Login = ({ navigation }) => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    let user = useSelector(state => state.GeneralResponse.user)
    useEffect(() => {
        getUser().then((userId) => {
            if (userId != undefined) {
                navigation.navigate('Dashboard')
                dispatch(SetUser(userId))
            }
        })
    }, [])
    const signIn = useCallback(() => {
        const value = {
            mail,
            password
        }
        LoginService(value).then(userId => {
            if (userId.length) {
                saveUser(userId)
                dispatch(SetUser(userId))
                navigation.navigate('Dashboard')
                setMail('')
                setPassword('')
            }
        }).catch(error => {
            console.log(error)
            alert("Lütfen tekrar giriş yapmayı deneyin.")
        })
    }, [mail, password])
    return (
        <SafeAreaView style={{ ...styles.mainContainer }}>
            <View style={{ ...styles.headerContainer }}>
                <Image style={{ width: 100, height: 100 }} source={{ uri: 'https://www.acaipbidukkan.com/public/assets/img/sepet-icon.png' }}></Image>
                <Text style={{ ...styles.title1 }}>Welcome Back!</Text>
                <Text style={{ ...styles.title2 }}>Please sign in your account</Text>
            </View>
            <View style={{ marginTop: 70 }}>
                <Input onChangeText={(mailText) => setMail(mailText)} autoCapitalize="none" keyboardType="email-address" textContentType="emailAddress" inputStyle={{ ...styles.inputStyle }} placeholder="Email" inputContainerStyle={{ ...styles.inputContainer }}></Input>
                <Input onChangeText={(passwordText) => setPassword(passwordText)} textContentType="password" autoCapitalize="none" secureTextEntry={true} inputStyle={{ ...styles.inputStyle }} placeholder="Password" inputContainerStyle={{ ...styles.inputContainer }}></Input>
                <Button onPress={() => signIn()} color="#5567FE" style={{ ...styles.signInButton }} buttonStyle={{ height: 70, borderRadius: 30 }} >Sign in</Button>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ color: '#fff' }}>Don't have an account?</Text>
                    <Text onPress={() => navigation.navigate('Register')} style={{ color: '#5567FE' }}>Sign Up</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login