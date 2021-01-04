import * as Discord from "discord.js";
import{ IBotCommand } from "../api";

function map(user_id:string,user_map:string,msg:Discord.Message,user_level:number){
    const mysql2 = require('mysql');
	const connection2 = mysql2.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
	});
    connection2.connect();
    let map_les:number,map_hig:number;
    let sql2 = `select * from map_mapping where map_name='${user_map}'`;
    connection2.query(sql2,(error:any,results:any)=>{
        try{
            let map = Object.values(results[0]);
            map_les=parseInt(`${map[1]}`);
            map_hig=parseInt(`${map[2]}`);
            msg.channel.send(
                `<@!${user_id}>\n`+
                `目前所在位置為： ${user_map}\n`+
                `目前等級為： ${user_level}\n`+
                `地圖等級下限為： ${map_les}\n`+
                `地圖等級上限為： ${map_hig}`
            );
        }catch{
            msg.channel.send(`系統錯誤`);
        }
    });
    connection2.end();
}
export default class templatecommand implements IBotCommand{
	private readonly _command = "gamemap"
	
	help():string{
		return "地圖";
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
        let sql = `select * from games where user_id=${user_id}`;
        let user_map:string,user_level:number;
        connection.query(sql,(error:any,results:any)=>{
            try{
                let user = Object.values(results[0]);
                user_map = String(`${user[13]}`);
                user_level = parseInt(`${user[5]}`);
                map(user_id,user_map,msgObject,user_level);
            }catch{
                msgObject.channel.send('系統錯誤')
            }
       });
	}
}