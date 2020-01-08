import CommandType from "./CommandType";
import ReplyType from "./ReplyType";

export default interface ICommand {
    _id: string;
    name: string;
    cmd: string;
    commandType: CommandType;
    content: string;
    replyType: ReplyType;
}
