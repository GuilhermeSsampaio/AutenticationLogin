const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const TWO_HOURS = 1000 * 60 * 60 * 2
const {
    PORT = 3000,
        NODE_ENV = 'development',
        SESS_NAME = 'sid',
        SESS_SECRET = 'SECRET',
        SESS_LIFETIME = TWO_HOURS
} = process.env

const IN_PROD = NODE_ENV === 'production'
//aqui usario o db
const users = [{
    id: 1,
    name: 'Alex',
    email: 'alex@gmail.com',
    password: 'secret'
}, {
    id: 2,
    name: 'Gui',
    email: 'gui@gmail.com',
    password: 'secret'
}, {
    id: 1,
    name: 'Pedro',
    email: 'pedro@gmail.com',
    password: 'secret'
}]

const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}))

const redirectLogin = (req, res, next) => {
    if (!req.session.userID) {
        res.redirect('/login')
    } else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if (!req.session.userID) {
        res.redirect('/login')
    } else {
        next()
    }
}

app.use((req, res, next) => {
    const {userID} = req.session
    if(userID){
        res.locals.user = users.find(user => user.id === userID)
    }
    next()
})

app.get('/', (req, res) => {
    const {
        userID
    } = req.session
    res.send(
        `
        <h1>menu</h1>
        ${userID ?`
        <form method='post' action='/logout'>
            <button>LOgout</button>
        </form>  
        `:`
        <a href= '/login'>login</a>
        <a href= '/register'>register</a>
        `}  
    `)
})


app.get('/home', redirectLogin, (req, res) => {
    const {user} = res.locals
console.log(req.session.userID)
    res.send(`
        <h1>home</h1>   
        <a href= '/'> menu </a>
        <ul>
        <li>name: ${user.name} </li>
        <li>email: ${user.email}</li>
        </ul>
    `)            
})

app.get('/profile', (req, res) => {
    const {user} = res.locals
})

app.get('/login', (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form method= 'post' action='/login'>
            <input type = 'email' name = 'email' placeholder = 'Email' required />
            <input type = 'password' name = 'password' placeholder = 'senha' required />
            <input type = 'submit'/>
        </form>    
        <a href= '/register'>register</a>

    `)
})
app.get('/register', (req, res) => {
    res.send(`
        <h1>register</h1>
        <form method= 'post' action='/login'>
            <input type = 'text' name = 'name' placeholder = 'Nome' required />
            <input type = 'email' name = 'email' placeholder = 'Email' required />
            <input type = 'password' name = 'password' placeholder = 'senha' required />
            <input type = 'submit'/>
        </form>    
        <a href= '/login'>login</a>

    `)
})
app.post('/login', (req, res) => {
    const {email, password} = req.body
    // const user= "";
    if (email && password) {
        const user = users.find(
            user => user.email === email && user.password === password
        )
        if (user) {
            req.session.userID = user.id
            return res.redirect('/home')
        }
    }

    // res.redirect('/login')
})
app.post('/register', redirectHome, (req, res) => {
    const {
        name,
        email,
        password
    } = req.body

    if (name && email && password) {
        const exists = users.some(
            user => user.email === email
        )

        if (!exists) {
            const user = {
                id: users.length + 1,
                name,
                email,
                password
            }
        users.push(user)

        req.session.userID = user.id

        return res.redirect('/home')
        }
    }
    res.redirect('/login')
})

app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.redirect('/home')
        }
        res.clearCookie(SESS_NAME)
        res.redirect('/login')
    })
})
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));