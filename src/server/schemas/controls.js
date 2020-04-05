const { gql } = require('apollo-server');

module.exports = gql`
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
