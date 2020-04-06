import { gql } from 'apollo-server';

export default gql`
    type Query {
        getControls: [Control]
    }

    type ControlAttribute {
        name: String!
        type: String!
        maximumRabiRate: Float!
        polarAngle: Float!
    }

    type Control {
        id: String!
        type: String!
        attributes: ControlAttribute!
    }
`;
