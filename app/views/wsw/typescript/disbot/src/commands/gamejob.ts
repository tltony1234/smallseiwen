import * as Discord from "discord.js";
import{ IBotCommand } from "../api";

function job(job_name:string,user_id:string,msg:Discord.Message,job_mpmax:number){
    const mysql2 = require('mysql'); 
	const connection2 = mysql2.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
    });
    let skill_name:string;
    let sql4 = `select * from skill_mapping where job_name='${job_name}'`;
    connection2.connect();
    connection2.query(sql4,(error:any,results:any)=>{
        try{
            let skill=Object.values(results[0]);
            skill_name = String(skill[0]);
            jobskill(user_id,job_name,skill_name,msg,job_mpmax);
        }catch{
            msg.channel.send(`系統錯誤`);
        }
    });
    connection2.end()
}
function jobskill(user_id:string,job_name:string,skill_name:string,msg:Discord.Message,user_mpmax:number){
    const mysql3 = require('mysql'); 
	const connection3 = mysql3.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
    });
    let sql3 =  `UPDATE games SET user_job='${job_name}',user_skill='${skill_name}',user_mpmax='${user_mpmax}' WHERE user_id='${user_id}'`;
    connection3.connect();
    connection3.query(sql3,(error:any,results:any)=>{
        msg.channel.send(
            `<@!${user_id}>\n`+
            `成功轉職為 ${job_name}\n`+
            `技能變更為 ${skill_name}\n`+
            `輸入+game查看詳細資料`
        );
    });
    connection3.end();
}
export default class templatecommand implements IBotCommand{
	private readonly _command = "gamejob"
	
	help():string{
		return "職業";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
        let msg = msgObject.content;
        let user_id = msgObject.author.id;
        msgObject.delete();
        const mysql = require('mysql'); 
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '27351648',
			database: 'discord'
		});
        connection.connect();
        let user_level:number,job_level:number,user_weapon:number,job_const:number,job_name:string,user_job:string,job_mpmax:number;
        let sql = `SELECT * FROM job_mapping WHERE job_name='${msg.substring(9)}'`;
        let sql2 = `SELECT * FROM games WHERE user_id='${user_id}'`;
        connection.query(sql,(error:any,results:any)=>{
            try{
                let sqb=Object.values(results[0]);
                job_name = String(`${sqb[0]}`);
                job_level = parseInt(`${sqb[1]}`);
                job_const = parseInt(`${sqb[2]}`);
                job_mpmax = parseInt(`${sqb[3]}`);
            }
            catch{
                msgObject.channel.send('找不到該職業');
            }    
        });
        connection.query(sql2,(error:any,results:any)=>{
            try{
                let sqc=Object.values(results[0]);
                user_level = parseInt(`${sqc[5]}`);
                user_weapon = parseInt(`${sqc[3]}`);
                user_job = String(`${sqc[6]}`);
                if (job_name!=undefined){
                    if (user_level>=job_level && user_weapon>=job_const){
                        if(job_name==user_job){
                            msgObject.channel.send(`<@!${user_id}>目前職業已為${user_job}，不需要轉職！`);
                        }else{
                            job(job_name,user_id,msgObject,job_mpmax);
                        }
                    }else{
                        msgObject.channel.send(
                            `<@!${user_id}> 轉職條件未達成\n`+
                            `轉職成 ${job_name} 的需要條件\n`+
                            `需要等級${job_level}  你的等級${user_level}\n`+
                            `需要武器${job_const}  你的武器${user_weapon}`
                        );
                    }
                }else{
                    msgObject.channel.send(`<@!${user_id}>目前職業為${user_job}`);
                }
            }
            catch{
                msgObject.channel.send('找不到角色請先創角');
            }
        });
        
        connection.end();
    }
}