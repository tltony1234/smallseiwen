import * as Discord from "discord.js";
import{ IBotCommand } from "../api";

export default class leave implements IBotCommand{
	private readonly _command = "leave"
	
	help():string{
		return "離開語音頻道";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
		msgObject.delete();
		if(msgObject.guild.voiceConnection){
			msgObject.guild.voiceConnection.disconnect();
		}else{
			msgObject.channel.send("你必再語音頻道內");
		}
	}
}
