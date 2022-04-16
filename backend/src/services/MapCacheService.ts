import { MapCache }           from '../models/MapCache';
import { FileHandlerService } from './FileHandlerService';

class MapCacheService {
    
    private mapCache : MapCache = {
        lastUpdated : 'never',
        mitarbeiter : []
    };
    
    public async init( filePath : string | any ) {
        if ( FileHandlerService.doesFileExist( filePath ) ) {
            this.mapCache = await FileHandlerService.readAndParseJson<MapCache>( filePath );
        }
    }
    
    public async updateCache( mapCache : MapCache ) {
        this.mapCache = mapCache;
    }
    
    get map() : MapCache {
        return this.mapCache;
    }
}

const mapCacheService = new MapCacheService();

export { mapCacheService };
