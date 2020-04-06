import React, { memo } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloQueryResult } from 'apollo-client/core/types';
import { ApolloConsumer } from '@apollo/react-common';
import { StyledControlsPage as ControlsPageComponent } from '../components/ControlsPage';
import { getControls as CONTROLS_QUERY } from '../api';

const getControls = (client: ApolloClient<any>): Function => (): Promise<ApolloQueryResult<any>> => client.query({ query: CONTROLS_QUERY });

function ControlsPage() {
    return (
        <ApolloConsumer>
            {client => <ControlsPageComponent getControls={getControls(client)} />}
        </ApolloConsumer>
    );
}

ControlsPage.displayName = 'ControlsPageContainer';

export default memo(ControlsPage);
