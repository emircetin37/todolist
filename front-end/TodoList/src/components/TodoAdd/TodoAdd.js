import { BottomSheet, Button, Input, Text } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AddTodoService, GetTodoService } from "../../services";
import { getUser } from "../../asyncStorage";
import { SetTodo } from "../../redux/action";
import { useDispatch } from "react-redux";
import { styles } from "./TodoAdd.style";
const TodoAdd = () => {
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false)
    const [todoText, setTodoText] = useState('')
    const [userId, setUserId] = useState('')
    useEffect(() => {
        getUser().then((userId) => {
            setUserId(userId)
        })
    }, [])
    function addTodo() {
        const date = new Date()
        const fullDate = (date.toLocaleDateString() + " " + date.toLocaleTimeString())
        const value = {
            userId,
            todoText,
            fullDate
        }
        AddTodoService(value)
            .then((res) => {
                if (res) {
                    setIsVisible(false)
                    GetTodoService(value).then((todo) => {
                        dispatch(SetTodo(Object.entries(todo)))
                    })
                }
            }
            ).catch(err => console.log(err))
    }
    return (
        <>
            <Button onPress={() => setIsVisible(true)} color="#181920" titleStyle={{ fontSize: 25 }} containerStyle={{ ...styles.addButtonContainer }} buttonStyle={{ ...styles.addButton }}>+</Button>
            <BottomSheet isVisible={isVisible}>
                <View style={{ ...styles.bottomSheetContainer }}>
                    <Text style={{ ...styles.addTodoText }}>Add Todo</Text>
                    <Input onChangeText={(text) => setTodoText(text)} inputStyle={{ ...styles.inputStyle }} placeholder="Todo" inputContainerStyle={{ ...styles.inputContainerStyle }}></Input>
                    <Button onPress={() => addTodo()} titleStyle={{ color: '#000' }} color="#fff" containerStyle={{ ...styles.addContainer }}>Add</Button>
                    <Button onPress={() => setIsVisible(false)} titleStyle={{ color: '#000' }} color="#fff" containerStyle={{ alignSelf: 'center' }} buttonStyle={{ ...styles.closeButton }}>X</Button>
                </View>
            </BottomSheet>
        </>
    )
}
export default TodoAdd