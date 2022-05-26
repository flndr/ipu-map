import got             from 'got';
import { IS_DEV }      from '../env';
import { GEOCODE_URL } from '../env';

interface Position {
    lat : string;
    lon : string;
}

export class GeocodeApiService {
    
    public async search( params : string[] ) : Promise<Position | null> {
        
        const queryString = 'q=' + encodeURIComponent( params.join( ' ' ) );
        const url         = GEOCODE_URL + 'search.php?' + queryString;
        
        if ( IS_DEV ) {
            console.log( ' - ', url );
        }
        
        let positions : Position[];
        
        try {
            const response = await got.get( url ).json();
            positions      = response as unknown as Position[];
        } catch ( e ) {
            console.log( e );
            return null;
        }
        
        // TODO correct error handling
        
        if ( positions && Array.isArray( positions ) && positions.length > 0 ) {
            return {
                lat : positions[ 0 ].lat,
                lon : positions[ 0 ].lon
            };
        }
        
        return null;
    }
    
}
