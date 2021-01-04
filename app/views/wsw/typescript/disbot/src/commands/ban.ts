
import * as Discord from "discord.js";
import{ IBotCommand } from "../api";

export default class ban implements IBotCommand{
	private readonly _command = "ban"
	
	help():string{
		return "你媽的頭,像皮球一腳踢到百貨大樓";
	} 
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
		let mentionedUser = msgObject.mentions.users.first();
		let suppliedReason = args.slice(1).join(" ")||"";
		let banLog = `${msgObject.author.username}:${suppliedReason}`;
		msgObject.delete()
			.catch(console.error);
		if(!msgObject.member.hasPermission("ADMINISTRATOR")){
			msgObject.channel.send(`${msgObject.author.username} 你的權限不夠高 可撥`)
			.then(msg =>{
				(msg as Discord.Message).delete(5000)
					.catch(console.error);
			});
			return;
		}
		if(!mentionedUser){
			msgObject.channel.send(`${msgObject.author.username} 我找不到人可以踢`)
			.then(msg =>{
				(msg as Discord.Message).delete(5000)
					.catch(console.error);
			});
			return;
		}
		
		msgObject.guild.member(mentionedUser).ban(banLog)
			.then(console.log)
			.catch(console.error)
	}
}
