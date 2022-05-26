import { MapCache }            from 'API/Models/MapCache';
import { LatLngBoundsLiteral } from 'leaflet';
import L                       from 'leaflet';
import { LatLngTuple }         from 'leaflet';
import React                   from 'react';
import { useMapEvents }        from 'react-leaflet';
import { useMap }              from 'react-leaflet';
import { Popup }               from 'react-leaflet';
import { Marker }              from 'react-leaflet';
import { TileLayer }           from 'react-leaflet';
import { MapContainer }        from 'react-leaflet';
import { Avatar }              from 'rsuite';
import { useMapStore }         from 'Stores/MapStore';

const icon = L.icon( {
    iconUrl     : "/marker-icon-2x.png",
    iconSize    : L.point( 25, 41 ),
    iconAnchor  : L.point( 25 / 2, 41 ),
    popupAnchor : L.point( 0, -44 ),
} );

interface Props {
    map : MapCache;
}

const defaultBounds = [ [ 49.51661145, 11.367720046771842 ] ] as unknown as LatLngBoundsLiteral;

const MapController : React.FC<Props> = ( props : Props ) => {
    
    const map       = useMap();
    const mapStore  = useMapStore();
    const mapEvents = useMapEvents( {
        click( e ) {
            console.log( e.latlng.lat, e.latlng.lng );
        },
    } );
    if ( mapStore.map.mitarbeiter.length > 0 ) {
        const positions = mapStore.map.mitarbeiter.map( ma => {
            return [ parseFloat( ma.lat ), parseFloat( ma.lon ) ] as unknown as LatLngTuple;
        } );
        map.fitBounds( [ ...positions ] );
    }
    
    return <></>;
};

export const Map : React.FC<Props> = ( props : Props ) => {
    
    return <>
        <MapContainer style={ { height : '100%', width : '100%' } } bounds={ defaultBounds }>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController { ...props }/>
            { props.map.mitarbeiter.map( ( ma, i ) => {
                const position = [ parseFloat( ma.lat ), parseFloat( ma.lon ) ] as unknown as LatLngTuple;
                return <Marker position={ position } icon={ icon } key={ 'ma-' + i }>
                    <Popup>
                        <Avatar>{ ma.id }</Avatar>
                        <strong>{ ma.firstname } { ma.lastname }</strong> ({ ma.id })<br/>
                        <a href={ "mailto:" + ma.email }>{ ma.email }</a>
                    </Popup>
                </Marker>;
            } ) }
        </MapContainer>
    </>;
}
