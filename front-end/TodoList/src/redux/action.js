export const SetUser = (user) => {
    return {
        type: "SET_USER",
        payload: user
    }
}

export const SetTodo = (todo) => {
    return {
        type: "SET_TODO",
        payload: todo
    }
}
export const AddSelectedTodo = (todo) => {
    return {
        type: "ADD_SELECTED_TODO",
        payload: todo
    }
}
export const RemoveSelectedTodo = (todo) => {
    return {
        type: "REMOVE_SELECTED_TODO",
        payload: todo
    }
}
export const ResetSelectedTodo = ()=>{
    return{
        type:"RESET_SELECTED_TODO",
    }
}