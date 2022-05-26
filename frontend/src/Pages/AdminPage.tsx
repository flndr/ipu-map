import { LatLngTuple }         from 'leaflet';
import { LatLngBoundsLiteral } from 'leaflet';
import React                   from 'react';
import styled                  from '@emotion/styled';
import { CheckPicker }         from 'rsuite';
import { Uploader }            from 'rsuite';
import { observer }            from 'mobx-react';

import { env }          from 'env';
import { Map }          from 'Components/Map';
import { ItemDataType } from 'rsuite/es/@types/common';
import { useMapStore }  from 'Stores/MapStore';

const Container = styled.div`
  display         : flex;
  flex-direction  : column;
  justify-content : stretch;
  height          : 100%;
  width           : 100%;
  text-align      : center;
  overflow-x      : hidden;
`;

const MapSizeContainer = styled.div`
  flex-grow : 1;
  min-width : 100%;
`;

const Logo = styled.img`
  display : block;
  height  : 4rem;
`;

const Header = styled.div`
  display         : flex;
  justify-content : space-between;
  align-items     : center;
  padding         : 0.5rem;
`;

const Stack = styled.div`
  display         : flex;
  justify-content : flex-start;
  align-items     : center;
  width           : auto;

  & > * {
    margin-left : 0.5rem;
  }
`;


export const AdminPage = observer( () => {
    
    const mapStore = useMapStore();
    
    const teamsData : ItemDataType[] = mapStore.teams.map( t => {
        return {
            label : t,
            value : t
        }
    } );
    
    const projectsData : ItemDataType[] = mapStore.projects.map( p => {
        return {
            label : p,
            value : p
        }
    } );
    
    return <Container>
        
        {/*
        <code>
            <pre style={ { textAlign : 'left' } }>{ JSON.stringify( mapStore.map, null, 2 ) }</pre>
        </code>
        */ }
        
        <Header>
            
            <Logo src={ '/logo-ipu.svg' }/>
            
            <Stack>
                <CheckPicker data={ [] } appearance="default" placeholder="Org-Einheit" searchable={ false }/>
                <CheckPicker data={ projectsData } appearance="default" placeholder="Projekt" searchable={ false }/>
                <CheckPicker data={ teamsData } appearance="default" placeholder="Team" searchable={ false }/>
            </Stack>
            
            <Uploader fileListVisible={ false }
                      onSuccess={ () => {
                          mapStore.loadMap();
                      } }
                      draggable={ true }
                      name={ 'excelfile' }
                      multiple={ false }
                      action={ env.apiBaseUrl + 'map' }>
                <div>Upload Excel or drag here</div>
            </Uploader>
        
        </Header>
        
        <MapSizeContainer>
            <Map map={ mapStore.map }/>
        </MapSizeContainer>
    
    </Container>
    
} );
