import { Response } from 'express';
import { Express }  from 'express';
import Multer       from 'multer';
import { IS_DEV }   from './env';

import { PATH_JSON_CACHE }    from './env';
import { ApiError }           from './errors/ApiError';
import { ExcelParserError }   from './errors/ExcelParserErrors';
import { ExcelParserService } from './services/ExcelParserService';
import { GeocodeService }     from './services/GeocodeService';
import { FileHandlerService } from './services/FileHandlerService';
import { mapCacheService }    from './services/MapCacheService';
import { MapCache }           from './models/MapCache';
import { ErrorCode }          from './models/ErrorCode';

const uploadHandler = Multer( {
    storage : Multer.diskStorage( {
        destination : './uploads',
    } )
} );

const returnError = ( res : Response, e : Error | any ) => {
    let status  = 500;
    let message = 'Something went wrong';
    if ( e instanceof ExcelParserError || e instanceof ApiError ) {
        status = 400;
    }
    if ( e instanceof Error ) {
        message = e.message;
    }
    res.status( status ).jsonp( { message } );
}

export const addRoutes = ( app : Express ) => {
    
    app.get( '/map', ( req, res ) => {
        res.status( 200 ).jsonp( mapCacheService.map );
    } );
    
    app.post( '/map', uploadHandler.single( 'excelfile' ), async ( req, res ) => {
        try {
            
            if ( !req.file ) {
                returnError( res, new ApiError( ErrorCode.NO_FILE ) );
                return;
            }
            
            const filePath = req.file.path;
            
            const geocodeService     = new GeocodeService();
            const excelParserService = new ExcelParserService();
            
            const mitarbeiterFromXls = await excelParserService.readMitarbeiterFromXls( filePath );
            const mitarbeiter        = await geocodeService.locateMitarbeiter( mitarbeiterFromXls );
            
            const newCache : MapCache = {
                lastUpdated : new Date().toISOString(),
                mitarbeiter
            };
            
            await FileHandlerService.storeAsJson( newCache, PATH_JSON_CACHE );
            await mapCacheService.updateCache( newCache );
            await FileHandlerService.delete( filePath );
            
            console.log( 'MapCache updated:' );
            console.log( ' - Timestamp:   ' + mapCacheService.map.lastUpdated );
            console.log( ' - Mitarbeiter: ' + mapCacheService.map.mitarbeiter.length );
            
            res.status( 200 ).jsonp( mitarbeiter );
            
        } catch ( e ) {
            returnError( res, e );
        }
        
    } );
    
    app.post( '/login', ( req, res ) => {
        res.status( 200 ).jsonp( {
            token : 'token'
        } );
    } );
}
