import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:0706" });

export default instance;
