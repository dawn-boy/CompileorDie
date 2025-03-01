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
const corsOptions = {
    origin: "*", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
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
				try{
						await pusher.trigger('online-channel','online-event', {id: user._id, online: false})
				} catch (err){
						console.log(err)
						console.log('error on online-channel')
				}
				try{
						await pusher.trigger('ready-channel', 'ready-event', { id: user._id, ready: false })
				} catch (err){
						console.log(err)
						console.log('error on ready-channel')
				}
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
								try{
										await pusher.trigger('online-channel','online-event', {id: data._id, online: true})
								} catch (err){
										console.log('error on online-channle2')
										console.log(err)
								}
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
				try{
						await pusher.trigger('ready-channel', 'ready-event', { id: user._id, ready: true })
				} catch(err){
						console.log(err)
						console.log('error on ready channel 2')
				}
				res.json({'success':true})
		})
})

app.post( '/not-ready', (req,res) => {
		req.session.user.isReady = false
		req.session.save()
		user = req.session.user
		Player.updateOne({_id: user._id}, {$set: {isReady: false}})
		.then( async resp => {
				try{
						await pusher.trigger('ready-channel', 'ready-event', { id: user._id, ready: false })
				} catch(err){
						console.log(err)
						console.log('error on ready-channel3')
				}
				res.json({'success':true})
		})

})
app.get( '/ready-check', (req,res) => {
		user = req.session.user
		Player.find({teamCode: user.teamCode})
		.then( async data => {
				for( let player of data ){
					if(!player.isOnline || !player.isReady){
							return res.json({ready: false})
					}
				}
				try{
						await pusher.trigger('countdown-channel', 'countdown-event', {success: true})
				} catch(err){
						console.log(err)
						console.log('error on countdown-channel')
				}
				return res.json({ready:true})
		})
})

app.get( '/countdown', (req,res) => {
		res.render('countdown')
})

app.post('/game', async (req,res) => {
		try{
				await pusher.trigger('game-channel','game-event', {success: true})
		} catch(err){
				console.log(err)
				console.log('error on game channel')
		}
})

app.get( '/game', (req,res) => {
		user = req.session.user
		role = user.role	
		res.render(role)
})



app.listen(8000, () => {
		console.log("Connected")
})

