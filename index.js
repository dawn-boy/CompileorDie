// imports
const express = require( 'express' )
const path = require( 'path' )
const mongoose = require( 'mongoose' )
const ejsMate = require('ejs-mate')


// express set-up
const app = express();
app.use( express.static( path.join( __dirname, 'public' ) ) )
app.use(express.urlencoded( { extends: true } ))
app.engine( 'ejs',ejsMate )
app.set( 'view engine', 'ejs' )
app.set( 'views', path.join( __dirname, 'views' ) )

// mongoose set-up
mongoose.connect('mongod://localhost:27017/erebor', { useNewUrlParser: true } )
		.then( () => {
				console.log("Connection to db erebor succeded!")
		})
		.catch( err => {
				console.log("Connection to db erebor failed.")
				console.log(err)
		})

// functions

const verifyLogin = ( req, res, next ) => {
		const login = { 'p1': 'pass1', 'p2': 'pass2', 'p3':'pass3' };
		const { username, password, name, query } = req.query;

		if ( login[username] == password ){
				next();
		}
		res.send('<h1>invalid username or password.</h1>');
}

// routes
// pages 
app.get( '/', ( req,res ) => {
		res.render( 'home' )
})

app.get( '/login', ( req,res ) => {
		res.render( 'login' )
})

app.get( '/lobby', verifyLogin, ( req,res ) => {
		res.render( 'lobby' )
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
