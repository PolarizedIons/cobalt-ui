import ICommand from "@/types/ICommand";
import { ApiResponse } from "../types/ApiResponse";
import ServiceBase from "./ServiceBase";

export default class CommandService extends ServiceBase {
    static listCommands(): Promise<ApiResponse<ICommand[]>> {
        return this.client.get("/v1/commands").then(resp => resp.data);
    }
}
