import CommandType from "./CommandType";
import ReplyType from "./ReplyType";

export default interface ICommand {
  id: string;
  name: string;
  commandType: CommandType;
  content: string;
  replyType: ReplyType;
}
