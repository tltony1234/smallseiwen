import * as Discord from "discord.js";
import{ IBotCommand } from "../api";


export default class templatecommand implements IBotCommand{
	private readonly _command = "changemap"
	
	help():string{
		return "換圖";
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
        let sql = `select * from games where user_id='${user_id}'`;
        let sql2 =`select * from map_mapping where map_name='${msg.substring(11)}'`;
        let user_level:number,user_map:string,map_hig:number,map_les:number,map_name:string;
        connection.query(sql,(error:any,results:any)=>{
            try{
                let user = Object.values(results[0]);
                user_level = parseInt(`${user[5]}`);
                user_map = String(`${user[13]}`);
            }catch{
                msgObject.channel.send('系統錯誤');
            }
        });
        connection.query(sql2,(error:any,results:any)=>{
            try{
                let map=Object.values(results[0]);
                map_name = String(`${map[0]}`);
                map_les=parseInt(`${map[1]}`);
                map_hig=parseInt(`${map[2]}`);
                if(user_map == msg.substring(11)){
                    msgObject.channel.send(
                        `<@!${user_id}>\n`+
                        `你的所在地：${user_map}\n`+
                        `你要去的地方：${msg.substring(11)}\n`+
                        `我想我應該不需要多說什麼了吧:thinking:`
                    );
                }else{
                    if(user_level>map_les-20 && user_level<map_hig){
                        changemap(0,user_id,user_level,map_name,map_hig,map_les,msgObject);
                    }else if(user_level<map_les-20){
                        msgObject.channel.send(
                            `<@!${user_id}>\n`+
                            `騷年，你還太菜了，回家多打打正拳\n`+
                            `地圖名稱：${map_name}\n`+
                            `需要等級：${map_les}\n`+
                            `你的等級：${user_level}`
                        );
                    }else if(user_level>map_hig){
                        changemap(1,user_id,user_level,map_name,map_hig,map_les,msgObject);
                    }
                }
                

            }catch{
                msgObject.channel.send(`系統錯誤`);
            }
        });
        connection.end();
	}
}

function changemap(num:number,user_id:string,user_level:number,map_name:string,map_hig:number,map_les:number,msg:Discord.Message){
    const mysql2 = require('mysql');
	const connection2 = mysql2.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
	});
    connection2.connect();
    let sql3 = `UPDATE games SET user_map='${map_name}' WHERE user_id='${user_id}'`;
    connection2.query(sql3,(error:any,results:any)=>{
        if(num==0){
            msg.channel.send(
                `<@!${user_id}>\n`+
                `騷年，展開屬於你的冒險吧\n`+
                `地圖名稱： ${map_name}\n`+
                `怪物最高等級： ${map_hig}\n`+
                `怪物最低等級： ${map_les}\n`+
                `你的等級： ${user_level}`
            );
        }else if(num==1){
            msg.channel.send(
                `<@!${user_id}>\n`+
                `騷年，你已經成長茁壯，建議前往更高區域:face_with_monocle:\n`+
                `地圖名稱：${map_name}\n`+
                `怪物最高等級：${map_hig}\n`+
                `你的等級：${user_level}`
            );
        }
    });
    connection2.end();
}
