import React, { memo } from 'react';
import { ApolloConsumer } from '@apollo/react-common';
import { StyledControlsPage as ControlsPageComponent } from '../components/ControlsPage';
import CONTROLS_QUERY from '../api/getControls';

const getControls = client => () => client.query({ query: CONTROLS_QUERY });

function ControlsPage() {
    return (
        <ApolloConsumer>
            {client => <ControlsPageComponent getControls={getControls(client)} />}
        </ApolloConsumer>
    );
}

ControlsPage.displayName = 'ControlsPageContainer';

export default memo(ControlsPage);
