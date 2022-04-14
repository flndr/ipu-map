import styled           from '@emotion/styled';
import { useState }     from 'react';
import React            from 'react';
import { useIdleTimer } from 'react-idle-timer'

interface Props {
    timeoutInSeconds? : number,
    onIdle? : () => Promise<void>;
    onActive? : () => Promise<void>;
}

const Container = styled.div`
  position : relative;
  height   : 100%;
`;

const Overlay = styled.div`
  position         : absolute;
  left             : 0;
  top              : 0;
  right            : 0;
  bottom           : 0;
  background-color : #585858;
  z-index          : 100;
  opacity          : 0.25;
`;

const Centered = styled.div`
  display         : flex;
  justify-content : center;
  align-items     : center;
  height          : 100%;
  width           : 100%;
  text-align      : center;
  font-weight     : normal;
  font-size       : 3rem;
  cursor          : default;
`;

export const IdleOverlay : React.FC<Props> = ( props ) => {
    
    const [ isIdle, setIsIdle ] = useState( false );
    
    const handleOnIdle   = props.onIdle || ( () => console.log( 'Just chillin...' ) );
    const handleOnActive = props.onActive || ( () => console.log( '... and back.' ) );
    
    useIdleTimer( {
        debounce : 500,
        timeout  : 1000 * ( props.timeoutInSeconds || 5 ),
        onIdle   : async () => {
            await handleOnIdle();
            setIsIdle( true );
        },
        onActive : async () => {
            await setIsIdle( false );
            handleOnActive();
        }
    } )
    
    return <Container>
        { props.children }
        { isIdle && <Overlay>
            <Centered>idle</Centered>
        </Overlay> }
    </Container>
}
