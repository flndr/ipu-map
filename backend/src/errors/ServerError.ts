

export class ServerError extends Error {
    constructor( m : string ) {
        super( m );
        Object.setPrototypeOf( this, ServerError.prototype );
    }
}
