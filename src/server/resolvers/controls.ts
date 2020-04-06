import controlData from '../data/controls.json';

type BaseDataAttributeType = {
    name: string,
    type: string
};

type BaseControlDataType = {
    type: string,
    id: string
};

type ControlDataAttributeType = BaseDataAttributeType & {
    maximum_rabi_rate: number,
    polar_angle: number
};

type ControlDataType = BaseControlDataType & {
    attributes: ControlDataAttributeType
};

type ParsedControlDataAttributeType = BaseDataAttributeType & {
    maximumRabiRate: number,
    polarAngle: number
};

type ParsedControlDataType = BaseControlDataType & {
    attributes: ParsedControlDataAttributeType
};

export default {
    Query: {
        getControls(): ParsedControlDataType[] {
            return controlData.map((item: ControlDataType) => ({
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
