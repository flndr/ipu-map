

export class ExcelParserError extends Error {
    constructor( m : string ) {
        super( m );
        Object.setPrototypeOf( this, ExcelParserError.prototype );
    }
}
