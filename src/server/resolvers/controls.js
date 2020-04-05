const controlData = require('../data/controls.json');

module.exports = {
    Query: {
        getControls() {
            return controlData.map(item => ({
                ...item,
                attributes: {
                    name: item.attributes.name,
                    type: item.attributes.type,
                    maximumRabiRate: item.attributes.maximum_rabi_rate,
                    polarAngle: item.attributes.polar_angle
                }
            }));
        }
    }
};
