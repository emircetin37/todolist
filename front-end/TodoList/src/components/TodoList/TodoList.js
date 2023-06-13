import React, { useEffect, useState } from "react";
import { ListItem, CheckBox, Text, Icon, BottomSheet, Button } from "@rneui/base";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AddSelectedTodo, RemoveSelectedTodo, SetTodo } from "../../redux/action";
import { GetTodoService, SelectedTodoRemoveService, UpdateTodoService } from "../../services";
import { Input } from "@rneui/themed";
import { styles } from "./TodoList.style";
const TodoList = ({ item }) => {
    const selectedTodo = useSelector(state => state.GeneralResponse.selectedTodo)
    const userId = useSelector(state => state.GeneralResponse.user)
    const [isVisible, setIsVisible] = useState(false)
    const dispatch = useDispatch()
    const [todoId, setTodoId] = useState()
    const [todo, setTodo] = useState()
    const [updateText, setUpdateText] = useState('')
    useEffect(() => {
        const [key, value] = item
        setTodoId(key)
        setTodo(value)
    }, [item])
    useEffect(() => {
        if (todo) {
            setUpdateText(todo.todoText)
        }
    }, [todo])
    function checkedControl() {
        if (selectedTodo.includes(todoId))
            dispatch(RemoveSelectedTodo(todoId))
        else
            dispatch(AddSelectedTodo(todoId))
    }
    function selectedRemove() {
        const value = {
            userId,
            todoId
        }
        SelectedTodoRemoveService(value).then(() => {
            GetTodoService(value).then((todo) => {
                dispatch(SetTodo(Object.entries(todo)))
            })
        })
    }
    function updateTodo() {
        const date = new Date()
        const fullDate = (date.toLocaleDateString() + " " + date.toLocaleTimeString())
        const value = {
            userId,
            todoId,
            todoText: updateText,
            fullDate
        }
        UpdateTodoService(value).then(() => {
            setIsVisible(false)
            GetTodoService(value).then((todo) => {
                dispatch(SetTodo(Object.entries(todo)))
            })
        })
    }
    if (!todo) {
        return null
    }
    return (
        <>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{todo.todoText}</ListItem.Title>
                    <ListItem.Subtitle>Creating Time</ListItem.Subtitle>
                    <ListItem.Subtitle>{todo.fullDate}</ListItem.Subtitle>
                </ListItem.Content>
                <CheckBox checked={selectedTodo.includes(todoId)} onPress={(e) => { checkedControl() }}></CheckBox>
                <Icon onPress={() => setIsVisible(true)} name="edit"></Icon>
                <Icon onPress={() => selectedRemove()} name="delete"></Icon>

            </ListItem>
            <BottomSheet isVisible={isVisible}>
                <View style={{ ...styles.bottomSheetContainer }}>
                    <Input value={updateText} onChangeText={(text) => setUpdateText(text)} autoCapitalize="none" inputStyle={{ ...styles.inputStyle }} inputContainerStyle={{ ...styles.inputContainerStyle }}></Input>
                    <Button onPress={() => updateTodo()} color="#fff" containerStyle={{ ...styles.editButton }} titleStyle={{ color: '#000' }}>Edit</Button>
                    <Button onPress={() => setIsVisible(false)} titleStyle={{ color: '#000' }} color="#fff" containerStyle={{ alignSelf: 'center' }} buttonStyle={{ ...styles.closeButton }}>X</Button>
                </View>
            </BottomSheet>
        </>
    )
}

export default TodoList