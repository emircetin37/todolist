import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, ScrollView, View } from "react-native";
import { Avatar, BottomSheet, Button, CheckBox, ListItem, Text } from "@rneui/base";
import { getUser, saveUser } from "../../asyncStorage";
import TodoAdd from "../../components/TodoAdd/TodoAdd";
import { CompletedTodoService, GetTodoService } from "../../services";
import TodoList from "../../components/TodoList/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { AddSelectedTodo, ResetSelectedTodo, SetTodo, SetUser } from "../../redux/action";
import { styles } from "./Dashboard.style";
const window = Dimensions.get('window')
const Dashboard = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(false)
    const todos = useSelector(state => state.GeneralResponse.todo)
    const userId = useSelector(state => state.GeneralResponse.user)
    const selectedTodo = useSelector(state => state.GeneralResponse.selectedTodo)
    const dispatch = useDispatch()
    useEffect(() => {
        if (userId) {
            const value = {
                userId
            }
            GetTodoService(value).then((todo) => {
                dispatch(SetTodo(Object.entries(todo)))
            })
        }
    }, [userId])
    const renderItem = ({ item }) => {
        return (
            <TodoList item={item}></TodoList>
        )
    }
    const logOut = () => {
        saveUser('')
        dispatch(SetUser(''))
        navigation.navigate('Login')
        setIsVisible(false)
    }
    const completedTodo = () => {
        const values = {
            userId,
            selectedTodo
        }
        CompletedTodoService(values).then(() => {
            const value = {
                userId
            }
            GetTodoService(value).then((todo) => {
                dispatch(SetTodo(Object.entries(todo)))
            })
            dispatch(ResetSelectedTodo())
        })
    }
    return (
        <SafeAreaView style={{ ...styles.mainContainer }}>
            <View style={{ ...styles.headerContainer }}>
                <Text style={{ ...styles.headerTitle }}>Todo List</Text>
                <Avatar onPress={() => setIsVisible(true)} size="medium" rounded source={{ uri: 'https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg' }}></Avatar>
            </View>

            <View style={{ ...styles.contentContainer }}>
                <FlatList keyExtractor={(item) => item[0]} data={todos} renderItem={renderItem}></FlatList>
                <TodoAdd />
                <BottomSheet isVisible={isVisible}>
                    <View style={{ ...styles.bottomSheetContainer }}>
                        <Button onPress={() => logOut()} containerStyle={{ ...styles.logOutButton }} color="error">Log out</Button>
                        <Button onPress={() => setIsVisible(false)} titleStyle={{ color: '#000' }} color="#fff" containerStyle={{ alignSelf: 'center' }} buttonStyle={{ ...styles.closeButton }}>X</Button>
                    </View>

                </BottomSheet>
            </View>
            <Button onPress={() => completedTodo()} disabled={!selectedTodo.length} color="#fff" containerStyle={{ ...styles.completedTodoButton }} titleStyle={{ color: '#000' }}>Completed Todo</Button>
        </SafeAreaView>
    )
}


export default Dashboard