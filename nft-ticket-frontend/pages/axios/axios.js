import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:1612" });

export default instance;
