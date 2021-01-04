import * as Discord from "discord.js";
import{ IBotCommand } from "../api";

export default class song1 implements IBotCommand{
	private readonly _command = "song1"
	
	help():string{
		return "腦袋呢？自己找答案好嗎？";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
		msgObject.delete();
		msgObject.reply("!p 恐怖情人");
	}
}

