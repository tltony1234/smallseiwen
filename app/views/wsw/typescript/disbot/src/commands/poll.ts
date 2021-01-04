import * as Discord from "discord.js";
import{ IBotCommand } from "../api";

export default class poll implements IBotCommand{
	private readonly _command = "poll"
	
	help():string{
		return "投給2號台灣惡耗";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
		msgObject.delete();
		if(args.length <1){return;}
		let pollEmbed = new Discord.RichEmbed()
			.setTitle("投票囉 投票時間：3分鐘")
			.setDescription(args.join(" "))
		let pollMessage = await msgObject.channel.send(pollEmbed);
		await(pollMessage as Discord.Message).react("✅");
		await(pollMessage as Discord.Message).react("❎");
		
		let filter = (reaction: Discord.MessageReaction) => reaction.emoji.name=== "✅"  || reaction.emoji.name==="❎";
		let results = await (pollMessage as Discord.Message).awaitReactions(filter,{time:6000})
		let resultsEmbed = new Discord.RichEmbed()
			.setTitle("投票結果")
			.setDescription(`${args.join(" ")}`)
			.addField("✅:",`${results.get("✅").count-1} 票`)
			.addField("❎:",`${results.get("❎").count-1} 票`)
		msgObject.channel.send(resultsEmbed);
		(pollMessage as Discord.Message).delete(0);
	}
}
