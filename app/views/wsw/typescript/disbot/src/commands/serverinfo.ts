import * as Discord from "discord.js";
import{ IBotCommand } from "../api";

export default class serverinfo implements IBotCommand{
	private readonly _command = "serverinfo"
	
	help():string{
		return "伺服器信息";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
		msgObject.delete();
		let embed = new Discord.RichEmbed()
						.setColor([0,200,0])
						.setTitle("伺服器信息")
						.setFooter("中山泰拳冠軍-猴王王俊迪")
						.setImage(client.user.avatarURL)
						.setDescription("王氏家族")
						.addField("目前伺服器人數:",` ${msgObject.guild.memberCount} `)
		msgObject.channel.send(embed)
			.catch(console.error);
	}
}
