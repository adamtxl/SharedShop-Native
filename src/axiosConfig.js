import axios from 'axios';

// Set the baseURL for all axios requests
axios.defaults.baseURL = 'http://192.168.86.105:5001';

// You can also set other defaults, such as headers if needed
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;