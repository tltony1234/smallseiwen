import * as Discord from "discord.js";
import{ IBotCommand } from "../api";

function skill(user_id:string,user_job:string,user_skill:string,user_level:number,msg:string,msgObject:Discord.Message){
	const mysql2 = require('mysql');
	const connection2 = mysql2.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
	});
	connection2.connect();
	let skill_segment:number,skill_mp:number,skill_atk:number,skill_level:number;
	if(msg.length==10){
		let sql2 = `select * from skill_mapping where skill_name='${user_skill}'`;
		connection2.query(sql2,(error:any,results:any)=>{
			try{
				let skill = Object.values(results[0]);
				skill_segment = parseInt(`${skill[2]}`);
				skill_mp = parseInt(`${skill[3]}`);
				skill_atk = parseInt(`${skill[4]}`);
				skill_level = parseInt(`${skill[5]}`);
				msgObject.channel.send(
					`<@!${user_id}>\n`+
					`目前使用技能：${user_skill}\n`+
					`技能段數：${skill_segment}\n`+
					`技能消耗魔力：${skill_mp}\n`+
					`技能攻擊係數：${skill_atk}\n`
				);
			}catch{
				msgObject.channel.send(`系統錯誤skill`);
			}
		});
	}else{
		msg = msg.substring(11);
		if(msg=='skillup'){
			let skill1_level:number,skill1_name:string,skill2_level:number,skill2_name:string;
			let sql3 = `select * from skill_mapping where job_name = '${user_job}' and (skill_level >= ${user_level})`;
			connection2.query(sql3,(error:any,results:any)=>{
				try{
					let skill1=Object.values(results[0]);
					let skill2=Object.values(results[1]);
					skill1_level = parseInt(`${skill1[5]}`);
					skill1_name = String(`${skill1[0]}`);
					skill2_level = parseInt(`${skill2[5]}`);
					skill2_name = String(`${skill2[0]}`);
					if (skill1_name==user_skill){
						msgObject.channel.send(
							`<@!${user_id}>\n`+
							`你的等級不夠\n`+
							`下個技能${skill2_name} 所需等級：${skill2_level}\n`+
							`你的技能${user_skill} 你的等級：${user_level}`
						);
					}else{
						if(user_level>=skill1_level){
							skillup(user_id,skill1_name,skill1_level,msgObject);
						}else{
							msgObject.channel.send(
								`<@!${user_id}>\n`+
								`你的等級不夠\n`+
								`下個技能${skill1_name} 所需等級：${skill1_level}\n`+
								`你的技能${user_skill} 你的等級：${user_level}`
							);
						}
						
					}
				}catch{
					msgObject.channel.send(
						`<@!${user_id}>\n`+
						`騷年，你的技能已經不能強化了！\n`+
						`可能原因：該職業已無更高階技能`
					);
				}
				
			});
			
		}
	}
	
	connection2.end();	
}
function skillup(user_id:string,skill1_name:string,skill1_level:number,msgObject:Discord.Message){
	const mysql3 = require('mysql');
	const connection3 = mysql3.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
	});
	connection3.connect();
	let sql4=`update games set user_skill='${skill1_name}' where user_id='${user_id}'`;
	connection3.query(sql4,(error:any,results:any)=>{
		msgObject.channel.send(
			`<@!${user_id}>\n`+
			`成功升階技能！\n`+
			`目前技能為：${skill1_name}\n`+
			`輸入+gamskill查看詳細資訊`
		);
	});
	connection3.end();
}

export default class templatecommand implements IBotCommand{
	private readonly _command = "gameskill"
	
	help():string{
		return "技能";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
        msgObject.delete();
		let user_id = msgObject.author.id;
		let msg = msgObject.content;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '27351648',
			database: 'discord'
		});
		connection.connect();
		let user_job:string,user_skill:string,user_level:number;
		let sql=`SELECT * FROM games WHERE user_id='${user_id}'`;
		connection.query(sql,(error:any,results:any)=>{
			try{
				let user = Object.values(results[0]);
				user_job = String(`${user[6]}`);
				user_level = parseInt(`${user[5]}`);
				user_skill = String(`${user[10]}`);
				skill(user_id,user_job,user_skill,user_level,msg,msgObject);
			}catch{
				msgObject.channel.send(`查無此人 請先創角`);
			}
		});
		connection.end()
	}
}