import * as Lockr             from 'lockr';
import React                  from 'react';
import { FC }                 from 'react';
import { useContext }         from 'react';
import { createContext }      from 'react';
import { runInAction }        from 'mobx';
import { makeAutoObservable } from 'mobx';

import { apiService } from 'API/ApiService';

class AuthStore {
    
    private LOCAL_STORAGE_KEY : string = 'ipu-map';
    
    private _token : string | null = null;
    
    constructor() {
        makeAutoObservable( this );
        this.token = Lockr.get( this.LOCAL_STORAGE_KEY, null );
    }
    
    private set token( t : string | null ) {
        this._token = t;
        if ( this._token ) {
            Lockr.set( this.LOCAL_STORAGE_KEY, this._token );
        } else {
            Lockr.rm( this.LOCAL_STORAGE_KEY )
        }
        apiService.setToken( this._token );
    }
    
    private get token() {
        return this._token;
    }
    
    get isLoggedIn() : boolean {
        return !!this.token;
    }
    
    //async logIn( password : string ) : Promise<void> {
    //
    //    try {
    //        const response = await apiService.login( { password } );
    //
    //        runInAction( () => {
    //            this.token = response.token || null;
    //        } );
    //    } catch ( e ) {
    //
    //        runInAction( () => {
    //            this.token = null;
    //        } );
    //
    //        throw e;
    //    }
    //}
    //
    //async logOut() : Promise<void> {
    //    this.token = null;
    //    return;
    //}
    
}

const AuthStoreContext = createContext<AuthStore>( new AuthStore() );

const AuthStoreProvider : FC<{ store : AuthStore }> = ( { store, children } ) => {
    return (
        <AuthStoreContext.Provider value={ store }>{ children }</AuthStoreContext.Provider>
    );
};

const useAuthStore = () => {
    return useContext( AuthStoreContext );
}

export { AuthStoreContext, AuthStoreProvider, useAuthStore, AuthStore };
