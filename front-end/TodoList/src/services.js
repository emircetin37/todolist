import axios from "axios";
const url = "http://192.168.1.12:3000"
export async function LoginService(value) {
    try {
        const response = await axios.post(url + "/Login", value)
        return response.data
    }
    catch (error) {
        throw error
    }

}

export async function RegisterService(value) {
    try {
        const response = await axios.post(url + "/Register", value)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function AddTodoService(value) {
    try {
        const response = await axios.post(url + "/AddTodo", value)
        return response.data
    }
    catch (error) {
        throw error
    }
}

export async function GetTodoService(value) {
    try {
        const response = await axios.post(url + "/GetTodo", value)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function SelectedTodoRemoveService(value) {
    try {
        const response = await axios.post(url + "/SelectedTodoRemove", value)
        return response.data
    }
    catch (error) {
        throw error
    }
}

export async function UpdateTodoService(value) {
    try {
        const response = await axios.post(url + "/UpdateTodo", value)
        return response.data
    }
    catch (error) {
        throw error
    }
}

export async function CompletedTodoService(value) {
    try {
        const response = await axios.post(url + "/CompletedTodo", value)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function GetCompletedTodoService(value) {
    try {

    }
    catch (error) {
        throw error
    }
}