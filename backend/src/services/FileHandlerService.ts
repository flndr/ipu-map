import fs             from 'fs/promises';
import { constants }  from 'fs';
import { accessSync } from 'fs';

import { ServerError } from '../errors/ServerError';
import { ErrorCode }   from '../models/ErrorCode';

export class FileHandlerService {
    
    readonly filePath : string;
    
    constructor( filePath : string | any ) {
        if ( !FileHandlerService.doesFileExist( filePath ) ) {
            throw new ServerError( ErrorCode.NO_FILE );
        }
        this.filePath = filePath;
    }
    
    static doesFileExist( filePath : string | any ) : boolean {
        let doesExist = true;
        try {
            accessSync( filePath, constants.F_OK );
        } catch ( e ) {
            doesExist = false;
        }
        return doesExist;
    }
    
    static async delete( filePath : string | any ) : Promise<void> {
        if ( !FileHandlerService.doesFileExist( filePath ) ) {
            throw new Error( `Can't delete file: Path "${ filePath }" not found.` )
        }
        try {
            await fs.unlink( filePath );
        } catch ( e ) {
            throw e;
        }
    }
    
    static async copy( source : string, dest : string ) : Promise<void> {
        if ( !FileHandlerService.doesFileExist( source ) ) {
            throw new Error( `Can't copy file: Path "${ source }" not found.` )
        }
        try {
            await fs.copyFile( source, dest );
        } catch ( e ) {
            throw e;
        }
    }
    
    static async storeAsJson( object : object, filePath : string ) : Promise<void> {
        try {
            await fs.writeFile( filePath, JSON.stringify( object ), 'utf8' );
        } catch ( e ) {
            throw e;
        }
    }
    
    static async readAndParseJson<T>( filePath : string ) : Promise<T> {
        if ( !FileHandlerService.doesFileExist( filePath ) ) {
            throw new Error( `Can't read file: Path "${ filePath }" not found.` )
        }
        try {
            const data = await fs.readFile( filePath, 'utf8' );
            return JSON.parse( data );
        } catch ( e ) {
            throw e;
        }
    }
    
}
