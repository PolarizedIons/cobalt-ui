import axios from "axios";
import ICommand from "@/types/ICommand";
import { ApiResponse } from "../types/ApiResponse";

const baseURL =
    window.location.hostname === "localhost" ? "http://localhost:3000" : "";

export default class CommandService {
    static listCommands(): Promise<ApiResponse<ICommand[]>> {
        return axios.get(`${baseURL}/v1/commands`).then(resp => resp.data);
    }
}
