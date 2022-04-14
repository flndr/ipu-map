import createRouter5 from 'router5';
import browserPlugin from 'router5-plugin-browser';

const routes = {
    admin : { name : 'admin', path : '/admin' },
    login : { name : 'login', path : '/login' },
    map   : { name : 'day', path : '/map' },
}

const createRouter = () => {
    
    const router = createRouter5( Object.values( routes ), {
        defaultRoute : routes.login.name
    } );
    
    router.usePlugin( browserPlugin( {
        useHash : true
    } ) );
    
    return router;
}

export { routes, createRouter };

