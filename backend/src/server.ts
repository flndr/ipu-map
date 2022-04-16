import cors    from "cors";
import express from "express";
import morgan  from 'morgan';

import { addRoutes }       from './routes';
import { PORT }            from './env';
import { PATH_JSON_CACHE } from './env';
import { mapCacheService } from './services/MapCacheService';

mapCacheService.init( PATH_JSON_CACHE ).then( () => {
    
    console.log( 'MapCache loaded:' );
    console.log( ' - LastUpdated: ' + mapCacheService.map.lastUpdated );
    console.log( ' - Mitarbeiter: ' + mapCacheService.map.mitarbeiter.length );
    
    const app = express();
    
    app.use( cors() );
    app.use( morgan( 'dev' ) );
    
    addRoutes( app );
    
    app.use( express.urlencoded( { extended : false } ) );
    app.use( express.json() );
    
    app.listen( PORT, () =>
        console.log( `MapServer running at http://localhost:${ PORT }/` )
    );
} )

