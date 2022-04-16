import XLSX from 'xlsx';

import { ServerError }        from '../errors/ServerError';
import { ExcelParserError }   from '../errors/ExcelParserErrors';
import { ErrorCode }          from '../models/ErrorCode';
import { MitarbeiterFromXls } from '../models/MitarbeiterFromXls';

export class ExcelParserService {
    
    public async readMitarbeiterFromXls( filePath : string, sheetName : string = 'MA' ) : Promise<MitarbeiterFromXls[]> {
        
        let workBook : XLSX.WorkBook | null = null;
        
        try {
            workBook = XLSX.readFile( filePath );
        } catch ( e ) {
            throw new ServerError( ErrorCode.COULD_NOT_READ_XLS )
        }
        
        if ( !workBook.Sheets || !workBook.Sheets.hasOwnProperty( sheetName ) ) {
            throw new ExcelParserError( ErrorCode.SHEET_NOT_FOUND )
        }
        
        let parsedJson : any[][] | any[] | null = null;
        
        try {
            parsedJson = XLSX.utils.sheet_to_json( workBook.Sheets[ sheetName ] );
        } catch ( e ) {
            throw new ExcelParserError( ErrorCode.COULD_NOT_EXTRACT_JSON );
        }
        
        if ( !Array.isArray( parsedJson ) || parsedJson.length === 0 ) {
            throw new ExcelParserError( ErrorCode.XLS_NO_DATA_FOUND );
        }
        
        // TODO add validation or trust XLS?
        
        return parsedJson as unknown as MitarbeiterFromXls[];
    }
    
}
