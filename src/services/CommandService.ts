import ICommand from "@/types/ICommand";
import { ApiResponse } from "../types/ApiResponse";
import ServiceBase from "./ServiceBase";

export default class CommandService extends ServiceBase {
  static listCommands(): Promise<ApiResponse<ICommand[]>> {
    return this.client.get("/commands").then(resp => resp.data);
  }

  static createCommand(cmd: ICommand): Promise<ApiResponse<ICommand>> {
    return this.client.post("/commands", cmd).then(resp => resp.data);
  }

  static saveCommand(cmd: ICommand): Promise<ApiResponse<ICommand>> {
    return this.client.put(`/commands/${cmd._id}`, cmd).then(resp => resp.data);
  }

  static deleteCommand(id: string): Promise<ApiResponse<boolean>> {
    return this.client.delete(`/commands/${id}`).then(resp => resp.data);
  }
}
