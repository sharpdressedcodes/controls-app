import gql from 'graphql-tag';

const getControlsQuery = gql`
    query GetControls {
        getControls {
            id
            type
            attributes {
                name
                type
                maximumRabiRate
                polarAngle
            }
        }
    }
`;

export default getControlsQuery;
