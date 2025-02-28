// import
require('dotenv').config()
const express = require('express')
const path = require('path')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const Pusher = require('pusher')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')

// express Setup
const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())
app.use(session({
		resave: true,
		saveUninitialized: true,
		secret: "Secret"
}))
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, 'views'))

// mongoose connection
mongoose.connect('mongodb://localhost:27017/erebor', { useNewUrlParser: true })
		.then( () => {
				console.log('Connection to erebor done.')
		})
		.catch( (err) => {
				console.log("Connection to erebor failed..")
				console.log(err)
		})

const playerSchema = new mongoose.Schema({
		username: String,
		password: String,
		name: String,
		teamCode: String,
		role: String,
		isReady: Boolean,
		isOnline: Boolean
})

const Player = mongoose.model("Player", playerSchema)

// Pusher Setup
const pusher = new Pusher({
		appId: process.env.APP_ID,
		key: process.env.KEY,
		secret: process.env.SECRET,
		cluster: process.env.CLUSTER,
		useTLS: true,
})

// Routes

app.get( '/', (req,res) => {
		res.render('home')
})

app.get( '/login', (req,res) => {
		res.render('login')
})
app.get( '/logout', (req,res) => {
		user = req.session.user
		Player.updateOne({username: user.username, password: user.password}, {$set: {isOnline: false}})
		.then( async resp => {
				await pusher.trigger('lobby-channel','online-event', {id: user._id, online: false})
				req.session.destroy();
				res.send('Successfully Logged out')
		})
})

app.post( '/join', (req,res) => {
		const { username, password, name, code } = req.body

		Player.updateOne({username, password}, {$set: {name: name, isOnline: true}})
		.then( resp => {
				Player.find({ username, password, name, teamCode: code }, null, { lean: true})
				.then( async data => {
						if(data.length != 0){
								req.session.user = data[0]
								req.session.save()
								data = req.session.user
								await pusher.trigger('lobby-channel','online-event', {id: data._id, online: true})
								res.render( 'profile', { user: data })
						}
						else{
								res.send("<h1> Invalid Credentials </h1>").status(404)
						}
				})
		})
})

app.get( '/profile', (req,res) => {
		user = req.session.user
		console.log(user)
		console.log("From the /profile route")
		Player.updateOne({_id: user._id}, {isReady : false})
		.then( resp => {
				res.render('profile', {user})
		})
})

app.get( '/change', (req,res) => {
		data = req.session.user
		res.render( 'change', { data })
})

app.post( '/change', (req,res) => {
		const { name } = req.body
		user = req.session.user
		Player.updateOne({ _id: user._id}, { $set: {name: name}})
		.then(resp => {
				req.session.user.name = name
				user.name = name
				res.render( 'profile', { user })
		})
})

app.get( '/lobby', (req,res) => {
		user = req.session.user
		Player.find({ teamCode: user.teamCode }, null, { lean: true })
		.then( teamPlayers => {
				console.log(user)
				res.render( 'lobby', { teamPlayers, id: user._id, mainPlayer: user })
		})
})

app.post( '/ready', (req,res) => {
		req.session.user.isReady = true
		req.session.save()
		user = req.session.user
		Player.updateOne({_id: user._id}, {$set: {isReady: true}})
		.then( async resp => {
				console.log(resp)
				await pusher.trigger('lobby-channel', 'ready-event', { id: user._id, ready: true })
		})
})

app.post( '/not-ready', (req,res) => {
		req.session.user.isReady = false
		req.session.save()
		user = req.session.user
		Player.updateOne({_id: user._id}, {$set: {isReady: false}})
		.then( async resp => {
				await pusher.trigger('lobby-channel', 'ready-event', { id: user._id, ready: false })
		})

})

app.listen(8000, () => {
		console.log("Connected")
})

