import * as Discord from "discord.js";
import{ IBotCommand } from "../api";

export default class join implements IBotCommand{
	private readonly _command = "join"
	
	help():string{
		return "加入語音頻道";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
		msgObject.delete();
		if(msgObject.member.voiceChannel){
			if(!msgObject.guild.voiceConnection){
				msgObject.member.voiceChannel.join()
					.then(connection =>{
						msgObject.channel.send("成功加入！")
						.then(msg =>{
							(msg as Discord.Message).delete(5000)
							.catch(console.error);
						});
					})
			}
		}else{
			msgObject.channel.send("你必須先加入一個語音頻道");
		}
	}
}
