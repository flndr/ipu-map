import { uniq }               from 'lodash-es';
import { runInAction }        from 'mobx';
import React                  from 'react';
import { FC }                 from 'react';
import { useContext }         from 'react';
import { createContext }      from 'react';
import { makeAutoObservable } from 'mobx';
import { MapCache }           from '../API/Models/MapCache';
import { apiService }         from '../API/ApiService';

class MapStore {
    
    private _map : MapCache = {
        lastUpdated : 'never',
        mitarbeiter : []
    };
    
    constructor() {
        makeAutoObservable( this );
    }
    
    get map() {
        return this._map;
    }
    
    async loadMap() : Promise<void> {
        
        try {
            const response = await apiService.loadMap();
            runInAction( () => {
                this._map = response;
            } );
        } catch ( e ) {
            throw e;
        }
    }
    
    get teams() : string[] {
        const teams =
                  this._map.mitarbeiter
                      .map( ma => ma.team )
                      .filter( t => !!t && t !== '' )
                      .sort();
        return uniq( teams );
    }
    
    get projects() : string[] {
        const projects =
                  this._map.mitarbeiter
                      .map( ma => ma.project )
                      .filter( t => !!t && t !== '' )
                      .sort();
        return uniq( projects );
    }
    
}

const MapStoreContext = createContext<MapStore>( new MapStore() );

const MapStoreProvider : FC<{ store : MapStore }> = ( { store, children } ) => {
    return (
        <MapStoreContext.Provider value={ store }>{ children }</MapStoreContext.Provider>
    );
};

const useMapStore = () => {
    return useContext( MapStoreContext );
}

export { MapStoreContext, MapStoreProvider, useMapStore, MapStore };
