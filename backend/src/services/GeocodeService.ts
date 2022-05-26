import { IS_DEV }             from '../env';
import { MitarbeiterLocated } from '../models/MitarbeiterLocated';
import { MitarbeiterFromXls } from '../models/MitarbeiterFromXls';
import { GeocodeApiService }  from './GeocodeApiService';

export class GeocodeService {
    
    readonly geocode = new GeocodeApiService();
    
    public async locateMitarbeiter( persons : MitarbeiterFromXls[] ) : Promise<MitarbeiterLocated[]> {
        const locatedPersons : MitarbeiterLocated[] = [];
        
        if ( IS_DEV ) {
            console.log( 'Fetching Positions...' );
        }
        
        for ( const person of persons ) {
            const position = await this.geocode.search( [
                person.plz,
                person.ort,
                person.strasse
            ].filter( p => !!p && p !== '' ) );
            if ( position ) {
                locatedPersons.push( {
                    ...person,
                    ...position
                } );
            }
        }
        
        return locatedPersons;
    }
    
}
