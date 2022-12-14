import axios from "axios";
import { baseUrl} from "./Components/constants/constant";

const instance = axios.create({
    baseURL : baseUrl,
})

export default instance