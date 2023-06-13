const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
app.use(express.json())
// app.use(cors)
const firebase = require('firebase/app')
const firebaseConfig = require('./config')
const dbConfig = firebase.initializeApp(firebaseConfig)
const { getDatabase, ref, push, set, onValue, remove, update } = require('firebase/database');
const dataBase = getDatabase(dbConfig)
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth')
const auth = getAuth(dbConfig)


app.listen(port, () => {
    console.log("sunucu " + port + " portunda çalışıyor.")
})


app.post('/Login', (req, res) => {
    const values = req.body
    signInWithEmailAndPassword(auth, values.mail, values.password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.send(user.uid)
        })
        .catch((error) => {
            res.status(400).json({ error: error.message })
        });
})



app.post('/Register', (req, res) => {
    const values = req.body
    createUserWithEmailAndPassword(auth, values.mail, values.password)
        .then((e => res.send(e.user.uid)))
        .catch((error) => {
            res.status(400).json({ error: error.message })
        })
})



app.post('/AddTodo', (req, res) => {

    const values = req.body
    const todoListRef = ref(dataBase, 'todo/' + values.userId);
    const newTodoRef = push(todoListRef);
    set(newTodoRef, {
        userId: values.userId,
        todoText: values.todoText,
        fullDate: values.fullDate
    }).then(() => {
        res.send("Eklendi.")
    })
})

app.post('/GetTodo', (req, res) => {
    const values = req.body;
    const todoListRef = ref(dataBase, 'todo/' + values.userId);

    let isDataSent = false;

    onValue(todoListRef, (snapshot) => {
        if (!isDataSent) {
            const data = snapshot.val();
            res.send(data);
            isDataSent = true;
        }
    });
})



app.post('/SelectedTodoRemove', (req, res) => {
    const values = req.body;
    const todoListRef = ref(dataBase, '/todo/' + values.userId + "/" + values.todoId)
    remove(todoListRef).then(() => {
        res.send("Okey")
    })
})



app.post('/UpdateTodo', (req, res) => {
    const values = req.body;
    const todoListRef = ref(dataBase, '/todo/' + values.userId + "/" + values.todoId)
    update(todoListRef, { fullDate: values.fullDate, todoText: values.todoText, userId: values.userId }).then(() => {
        res.send("Okey")
    })
})



app.post('/CompletedTodo', (req, res) => {
    const values = req.body;
    const deletes = {}
    values.selectedTodo.forEach(todoId => {
        deletes[values.userId + '/' + todoId] = null
    })
    const todoListRef = ref(dataBase, '/todo/');
    update(todoListRef, deletes).then(() => {
        res.send("Okey")
    })

})
















