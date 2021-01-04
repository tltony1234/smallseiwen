import * as Discord from "discord.js";
import{ IBotCommand } from "../api";

export default class templatecommand implements IBotCommand{
	private readonly _command = "newborn"
	
	help():string{
		return "創角";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}

	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
        msgObject.delete();
        let user_id = msgObject.author.id;
        let user_name = msgObject.author.username;
        const mysql = require('mysql'); 
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '27351648',
			database: 'discord'
		});
		connection.connect();
		let sql = `SELECT * FROM games WHERE user_id='${user_id}'`;
		connection.query(sql,(error:any,results:any)=>{
			try{
				if(results==""){
					let ntime=Date.now();
					newborn(user_id,user_name,ntime,msgObject);
				}else{
					msgObject.channel.send(`已創立過角色!`);
				}
				
			}catch{
				msgObject.channel.send(`系統錯誤newborn`);
			}
		});
		connection.end();
    }
}

function newborn(user_id:string,user_name:string,ntime:number,msgObject:Discord.Message){
	const mysql2 = require('mysql'); 
	const connection2 = mysql2.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
	});
	connection2.connect();
	let sql2=`INSERT INTO games(user_id,user_name,user_exp,user_weapon,user_money,user_level,user_job,user_cd,user_mp,user_mpmax,user_skill,user_crit,user_critdmg,user_lastatk,user_map,user_accessories) VALUES ('${user_id}','${user_name}','0','0','0','1','初心者','1','10','10','嫩寶丟擲術','30','1.3',${ntime},'楓之島','0')`;
	let sql3=`INSERT INTO attack(user_id,master_name,master_hp) VALUES ('${user_id}','嫩寶','0')`;
	let sql4=`INSERT INTO item(user_id,blue,vitality,morning,dusk,special,super) VALUES ('${user_id}','10','0','0','0','0','0')`;
	connection2.query(sql3);
	connection2.query(sql4);
	connection2.query(sql2,(error:any,results:any)=>{
		msgObject.channel.send("-------------------\n"+
			`成功創立角色 <@!${user_id}> \n`+
			"-------------------\n"+
			`輸入+game查看角色資訊`
		);
	});
	connection2.end();
}