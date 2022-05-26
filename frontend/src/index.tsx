import React              from 'react';
import ReactDOM           from 'react-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import 'leaflet/dist/leaflet.css';
import './index.css';
import { RouterProvider } from 'react-router5';
import { createRouter }   from 'routes';
import App                from './App';

const router = createRouter();

router.start( () => ReactDOM.render(
    <RouterProvider router={ router }>
        <App/>
    </RouterProvider>,
    document.getElementById( 'root' )
) );
