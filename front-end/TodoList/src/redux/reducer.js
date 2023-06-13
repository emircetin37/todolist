const INITIAL_STATE = {
    user: '',
    todo: [],
    selectedTodo: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload }
        case "SET_TODO":
            return { ...state, todo: action.payload }
        case "ADD_SELECTED_TODO":
            return { ...state, selectedTodo: [...state.selectedTodo, action.payload] }
        case "REMOVE_SELECTED_TODO":
            const updateTodo = state.selectedTodo.filter(todo => todo != action.payload)
            return { ...state, selectedTodo: updateTodo };
        case "RESET_SELECTED_TODO":
            return { ...state, selectedTodo: [] }
        default:
            return state
    }
}