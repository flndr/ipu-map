import React            from 'react';
import { useRoute }     from 'react-router5';
import { useAuthStore } from 'Stores/AuthStore';

import { AuthStoreProvider }  from 'Stores/AuthStore';
import { AdminPage }          from 'Pages/AdminPage';
import { LoginPage }          from 'Pages/LoginPage';
import { MapPage }            from 'Pages/MapPage';
import { routes }             from 'routes';

const pages = {
    [ routes.admin.name ] : <AdminPage/>,
    [ routes.login.name ] : <LoginPage/>,
    [ routes.map.name ]   : <MapPage/>,
}

const PageSwitch = () => {
    
    const { route } = useRoute();
    
    return <>{ pages[ route.name ] }</>;
};

const App = () => {
    
    console.log( 'App created.' );
    
    const authStore  = useAuthStore();
    
    return <>
        <AuthStoreProvider store={ authStore }>
            <PageSwitch/>
        </AuthStoreProvider>
    </>
}

export default App;
