import React        from 'react';
import { useRoute } from 'react-router5';

import { AdminPage }        from 'Pages/AdminPage';
import { useMount }         from 'react-use';
import { routes }           from 'routes';
import { useMapStore }      from 'Stores/MapStore';
import { MapStoreProvider } from 'Stores/MapStore';

const pages = {
    [ routes.home.name ] : <AdminPage/>,
}

const PageSwitch = () => {
    
    const { route } = useRoute();
    
    return <>{ pages[ route.name ] }</>;
};

const App = () => {
    
    const mapStore = useMapStore();
    
    useMount( () => mapStore.loadMap() );
    
    return <>
        <MapStoreProvider store={ mapStore }>
            <PageSwitch/>
        </MapStoreProvider>
    </>
}

export default App;
