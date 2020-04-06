import gql from 'graphql-tag';

export default gql`
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
