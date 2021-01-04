import * as Discord from "discord.js";
import{ IBotCommand } from "../api";

export default class purge implements IBotCommand{
	private readonly _command = "purge"
	
	help():string{
		return "清除頻道訊息";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
		msgObject.delete()
			.catch(console.error);
		if(!msgObject.member.hasPermission("ADMINISTRATOR")){
			msgObject.channel.send(`${msgObject.author.username}你不是管理員 可撥`)
			.then(msg => {
				(msg as Discord.Message).delete(5000)
					.catch(console.error);
			});
			return;
		}
		if(!args[0]){
			msgObject.channel.send(`${msgObject.author.username} 砍起來`)
			.then(msg=>{
				(msg as Discord.Message).delete(5000)
					.catch(console.error);
			});
			return;
		}
		let numberOfMessagesToDelete = Number(args[0]);
		if(isNaN(numberOfMessagesToDelete)){
			msgObject.channel.send(`${msgObject.author.username} 這不是有效數字`)
			.then(msg=>{
				(msg as Discord.Message).delete(5000)
					.catch(console.error);
			});
			return;
		}
		numberOfMessagesToDelete = Math.round(numberOfMessagesToDelete);
		msgObject.channel.bulkDelete(numberOfMessagesToDelete)
			.catch(console.error);
		
	}
}

