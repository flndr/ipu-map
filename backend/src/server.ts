import cors    from "cors";
import express from "express";
import morgan  from 'morgan';
import fs      from "fs/promises";
import multer  from 'multer';

import map from '../cache/map.json';

const port = 4000;
const app  = express();

const storage = multer.diskStorage( {
    destination : ( req, file, callback ) => {
        callback( null, './uploads' );
    },
    filename    : ( req, file, callback ) => {
        callback( null, 'file' );
    }
} );

const upload = multer({storage}).single('jsonfile');

app.use( cors() );
app.use( morgan( 'dev' ) );

//////////////////////

app.get( '/map', ( req, res ) => {
    res.status( 200 ).jsonp( map );
} );

app.post( '/map', ( req, res ) => {
    res.status( 200 ).jsonp( map );
} );

app.post( '/login', ( req, res ) => {
    res.status( 200 ).jsonp( {
        token : 'token'
    } );
} );

//////////////////////

app.use( express.urlencoded( { extended : false } ) );
app.use( express.json() );
app.listen( port, () => {
    console.log( `App running @ http://localhost:${ port }` )
} );
