import * as Discord from "discord.js";
import{ IBotCommand } from "../api";


export default class templatecommand implements IBotCommand{
	private readonly _command = "item"
	
	help():string{
		return "道具";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
        msgObject.delete();
        let msg = msgObject.content;
        let user_id = msgObject.author.id;
        const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '27351648',
			database: 'discord'
		});
		connection.connect();
        if(msg.length==5){
            let sql=`select * from item where user_id='${user_id}'`;
            connection.query(sql,(error:any,results:any)=>{
                try{
                    let item = Object.values(results[0]);
                    msgObject.channel.send(
                        `<@!${user_id}> 的背包\n`+
                        `藍色藥水：${item[1]}\n`+
                        `活力藥水：${item[2]}\n`+
                        `清晨藥水：${item[3]}\n`+
                        `黃昏藥水：${item[4]}\n`+
                        `特殊藥水：${item[5]}\n`+
                        `超級藥水：${item[6]}`
                    );
                }catch{
                    msgObject.channel.send(`系統錯誤item`);
                }
            });
        }
        connection.end();
	}
}