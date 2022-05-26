import createRouter5 from 'router5';
import browserPlugin from 'router5-plugin-browser';

const routes = {
    home : { name : 'home', path : '/' },
}

const createRouter = () => {
    
    const router = createRouter5( Object.values( routes ), {
        defaultRoute : routes.home.name
    } );
    
    router.usePlugin( browserPlugin( {
        useHash : true
    } ) );
    
    return router;
}

export { routes, createRouter };

