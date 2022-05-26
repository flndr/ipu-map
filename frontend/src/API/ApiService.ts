import { MapCache } from './Models/MapCache';
import axios        from 'axios';
import { env }      from 'env';

class ApiError extends Error {
    
    constructor( public code : number, message : string ) {
        super( message );
        Object.setPrototypeOf( this, new.target.prototype );
        this.name = ApiError.name;
    }
    
    toString() {
        return [
            this.code,
            this.message
        ].join( ' - ' );
    }
}

class ApiService {
    
    token : string | null = null;
    
    setToken( t : string | null ) {
        this.token = t;
    }
    
    async loadMap() {
        return this.get<MapCache>( 'map' );
    }
    
    //async setMap( day : Day ) {
    //    return this.post( 'map', day );
    //}
    
    //async login( request : LoginRequest ) {
    //    return this.post<LoginRequest, LoginResponse>( '/login', request );
    //}
    
    private async post<I, O>( url : string, request : I ) : Promise<O> {
        return this.request( 'POST', url, request );
    }
    
    private async get<O>( url : string ) : Promise<O> {
        return this.request( 'GET', url );
    }
    
    private async request<I, O>( m : 'POST' | 'GET', url : string, request ? : I ) : Promise<O> {
        const method = m === 'GET' ? this.instance.get : this.instance.post;
        try {
            const response = await method( url, request );
            return response.data;
        } catch ( e ) {
            if ( e && e.isAxiosError && e.response ) {
                throw new ApiError( e.response.status, e.response.data || e.response.statusText );
            }
            throw e;
        }
    }
    
    private get instance() {
        return axios.create( {
            baseURL : env.apiBaseUrl,
            timeout : 1000,
            headers : {
                'Authorization' : this.token
            }
        } );
    }
    
}

const apiService = new ApiService();

export { ApiService, apiService, ApiError };
