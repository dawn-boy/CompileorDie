// imports
const express = require( 'express' )
const path = require( 'path' )
const ejsMate = require('ejs-mate')


// express set-up
const app = express();
app.use( express.static( path.join( __dirname, 'public' ) ) )
app.use(express.urlencoded( { extends: true } ))
app.engine( 'ejs',ejsMate )
app.set( 'view engine', 'ejs' )
app.set( 'views', path.join( __dirname, 'views' ) )

// functions

// routes
app.get( '/', ( req,res ) => {
		res.render( 'home' )
})

app.get( '/login', ( req,res ) => {
		res.render( 'login' )
})

const login = { 'p1': 'pass1', 'p2': 'pass2', 'p3':'pass3' };
const teams = {}
count = 1

app.post( '/join', ( req,res ) => {
		const { username, password, name, code } = req.body;

		if( login[username] == password ){

				if( Object.keys(teams).includes(code) ) {
						if( teams['asdf'].length >= 6){
								res.send('max player reached')
						}
						else{
								teams[code].unshift(name)
						}
				}
				else{
						teams[code] = [name]
				}
				res.redirect('/lobby')
		}
		else{
				res.send('invalid username or password')
		}



})

app.get( '/lobby', ( req,res ) => {
		res.render( 'lobby', { players: teams['asdf'] })
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
