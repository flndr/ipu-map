import styled       from '@emotion/styled';
import { env }      from 'env';
import React        from 'react';
import { Uploader } from 'rsuite';

import { observer } from 'mobx-react';

const Container = styled.div`
  display         : flex;
  justify-content : center;
  align-items     : center;
  height          : 100%;
  width           : 100%;
  text-align      : center;
`;

const DragArea = styled.div`
  width  : 400px;
  height : 300px;
`;

export const AdminPage = observer( () => {
    
    return <Container>
        <Uploader
            draggable={ true }
            name={ 'jsonfile' }
            multiple={ false }
            action={ env.apiBaseUrl + 'map' }>
            <DragArea>Select Excel-File</DragArea>
        </Uploader>
    </Container>
    
} );
