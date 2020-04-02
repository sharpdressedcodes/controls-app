import axios from 'axios';
import config from '../config/main';

export default function getControls() {
    return axios.get(`http://localhost:${config.server.port}${config.endpoints.api.getControls}`);
}
