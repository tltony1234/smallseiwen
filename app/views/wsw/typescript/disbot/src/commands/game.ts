import * as Discord from "discord.js";
import{ IBotCommand } from "../api";

export default class game implements IBotCommand{
	private readonly _command = "game"
	
	help():string{
		return "遊戲資訊";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
		msgObject.delete();
		let user_id = msgObject.author.id;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '27351648',
			database: 'discord'
		});
		connection.connect();
		var sql=`SELECT * FROM games WHERE user_id='${user_id}'`;
		connection.query(sql,(error:any,results:any)=>{
			try{
				let sqb=Object.values(results[0]);
				msgObject.channel.send("-------------------\n"+
					`暱稱：<@!${user_id}>\n`+
					"-------------------\n"+
					`等級：${sqb[5]}\n`+
					`經驗值：${sqb[2]}\n`+
					`職業：${sqb[6]}	冷卻時間：${sqb[7]} 秒\n`+
					`剩餘魔力：${sqb[8]}\n`+
					`上限魔力：${sqb[9]}\n`+
					"-------------------\n"+
					`持有武器：${sqb[3]}\n`+
					`持有飾品：${sqb[15]}\n`+
					`持有輸輸幣：${sqb[4]}\n`+
					"-------------------\n"+
					`目前技能：${sqb[10]}\n`+
					`目前爆擊機率：${sqb[11]}\n`+
					`目前爆擊傷害：${sqb[12]}\n`+
					"-------------------\n"+
					`所在地：${sqb[14]}`
				);
			}
			catch{
				msgObject.channel.send(`查無資料，請先使用+newborn創立角色`);
			}
		});
		connection.end();
	}
}
