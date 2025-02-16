// imports
const express = require( 'express' )
const path = require( 'path' )
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')


// express set-up
const app = express();
app.use( express.static( path.join( __dirname, 'public' ) ) )
app.use(express.urlencoded( { extends: true } ))
app.engine( 'ejs',ejsMate )
app.set( 'view engine', 'ejs' )
app.set( 'views', path.join( __dirname, 'views' ) )

// mongoose setup

mongoose.connect( 'mongodb://localhost:27017/erebor', { useNewUrlParser: true } )
		.then( () => {
				console.log("COnnection to erebor succeded!");
		})
		.catch( (err) => {
				console.log("COnnection to erebor failed..");
		})

const playerSchema = new mongoose.Schema({
		username: String,
		password: String,
		name: String,
		teamCode: String,
		role: String,
		isReady: Boolean,
		isOnline: Boolean,
})
const Player = mongoose.model('Player',playerSchema)

// routes
app.get( '/', ( req,res ) => {
		res.render( 'home' )
})

app.get( '/login', ( req,res ) => {
		res.render( 'login' )
})

app.post( '/join', ( req,res ) => {
		const { username, password, name, code } = req.body;

		Player.find({ username, password, name, teamCode: code },null, {lean: true})
		.then( data => {
				if ( data.length != 0 ){
						console.log(data)
						data = data[0]
						res.render( 'profile', { data } )
				}
				else{
						res.send("<h1>Invalid Credentials.</h1>").status(404)
				}
		})

})
app.get( '/profile/:id', ( req,res ) => {
		const { id } = req.params;

		Player.updateOne( {_id: id}, {isReady: false})
		.then( resp => {
				Player.findById( id,null,{ lean: true } )
				.then( data => {
						res.render( 'profile', { data  } )
				})
		})


})

app.get( '/:teamCode/ready/:id', ( req,res ) => {
		const { teamCode, id } = req.params
		Player.find({ teamCode },null,{lean: true})
		.then( teamPlayers => {
				Player.findById( id,null,{ lean: true })
				.then( mainPlayer => {
						console.log(mainPlayer)
						Player.updateOne({username: mainPlayer.username}, {$set: {isReady: true}})
						.then( resp => {
								console.log(resp)
								res.render( 'lobby', { teamPlayers, id, mainPlayer })
						})
				})
		})

})

app.get( '/change/:id', ( req,res ) => {
		const { id } = req.params;
		Player.findById(id, null, { lean: true })
				.then( data => {
						res.render( 'change', { data } )
				})
})
app.post( '/change/:id', ( req,res ) => {
		const { name } = req.body;
		const { id } = req.params;

		Player.updateOne( { _id: id }, { $set: {name: name} })
		.then(resp => {
				console.log(resp)

				Player.findById( id,null,{ lean: true } )
				.then( data => {
						res.render( 'profile', { data } )
				})
		})


})

app.get( '/:teamCode/lobby/:id', ( req,res ) => {

		const { teamCode, id } = req.params
		Player.find({ teamCode },null,{lean: true})
		.then( teamPlayers => {
				Player.findById( id,null,{ lean: true })
				.then( mainPlayer => {
						res.render( 'lobby', { teamPlayers, id, mainPlayer })
				})
		})
})

app.get( '/hacker', ( req,res ) => {
		res.render( 'hacker' )
})

app.get( '/debugger', ( req,res ) => {
		res.render( 'debugger' )
})

app.get( '/cyberguardian', ( req,res ) => {
		res.render( 'cyberguardian' )
})

app.get( '/developer', ( req,res ) => {
		res.render( 'developer' )
})

app.get( '/endgame', ( req,res ) => {
		res.render( 'endgame' )
})


// app listens
app.listen( 8000, () => {
		console.log("Listening on port 8000.");
})
