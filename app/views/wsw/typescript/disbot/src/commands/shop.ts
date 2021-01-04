import * as Discord from "discord.js";
import{ IBotCommand } from "../api";


export default class templatecommand implements IBotCommand{
	private readonly _command = "shop"
	
	help():string{
		return "商店";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
        msgObject.delete();
        let user_id = msgObject.author.id;
        let msg = msgObject.content
        const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '27351648',
			database: 'discord'
		});
        connection.connect();
        if(msg.length==5){
            let sql3 = `select * from shop`;
            connection.query(sql3,(error:any,results:any)=>{
                try{
                    let shop = Object.values(results[0]);
                    msg = `<@!${user_id}>\n`
                    msg += `-----------------\n`;
                    msg += `${shop[0]}  ${shop[1]} ${shop[2]}\n`;
                    msg += `-----------------`;
                }catch{
                    msgObject.channel.send(`系統錯誤shop`);
                }
            });
        }else{
            msg = msg.substring(6);
            let sql = `select * from games where user_id='${user_id}'`;
            let sql2 = `select * from item where user_id='${user_id}'`;
            let user_money:number,blue5:number,blue6:number;
            connection.query(sql,(error:any,results:any)=>{
                let user = Object.values(results[0]);
                user_money = parseInt(`${user[4]}`);
            });
            connection.query(sql2,(error:any,results:any)=>{
                let item = Object.values(results[0]);
                blue5=parseInt(`${item[5]}`);
                blue6=parseInt(`${item[6]}`);
            });
        }
        connection.end();
	}
}