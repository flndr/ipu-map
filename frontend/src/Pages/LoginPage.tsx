import styled        from '@emotion/styled';
import { useEffect } from 'react';
import React         from 'react';
import { Alert }     from 'rsuite';
import { Input }     from 'rsuite';
import { observer }  from 'mobx-react';
import { useRouter } from 'react-router5';

import { ApiError }      from 'API/ApiService';
import { AuthStore }     from 'Stores/AuthStore';
import { useAuthStore }  from 'Stores/AuthStore';
import { routes }        from 'routes';

const Container = styled.div`
  display         : flex;
  justify-content : center;
  align-items     : center;
  height          : 100%;
  width           : 100%;
  text-align      : center;
`;

const Form = styled.div`
`;

export const LoginPage = observer( () => {
    
    console.log( 'LoginPage created' );
    
    const auth   = useAuthStore();
    const router = useRouter();
    
    const gotoDiary = ( auth : AuthStore ) => {
        if ( auth.isLoggedIn ) {
            router.navigate( routes.map.name )
        }
    };
    
    const handleEnter = async ( e : React.KeyboardEvent<HTMLInputElement> ) => {
        
        const pw = ( e.target as HTMLInputElement ).value;
        
        try {
            await auth.logIn( pw );
        } catch ( e ) {
            if ( e instanceof ApiError ) {
                Alert.warning( e.toString() );
            } else {
                Alert.error( 'Uh, check dev tools maybe...' );
            }
        }
        
        gotoDiary( auth );
    };
    
    useEffect( () => {
        gotoDiary( auth );
    } );
    
    return <Container>
        <Form>
            <Input placeholder={ 'Auth pls...' }
                   type={ 'password' }
                   onPressEnter={ handleEnter }/>
        </Form>
    </Container>
    
} );
