import * as Discord from "discord.js";
import{ IBotCommand } from "../api";


export default class templatecommand implements IBotCommand{
	private readonly _command = "rm"
	
	help():string{
		return "回魔";
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
        let sql = `select * from games where user_id='${user_id}'`;
        let user_mp:number,user_mpmax:number;
        connection.query(sql,(error:any,results:any)=>{
            try {
                let user = Object.values(results[0]);
                user_mp = parseInt(`${user[8]}`);
                user_mpmax = parseInt(`${user[9]}`);
                if (user_mp < user_mpmax){
                    itemuse(user_id,user_mpmax,user_mp,msgObject,msg);
                }else{
                    msgObject.channel.send(`<@!${user_id}>\n---------------\n你的魔力充足，不需補充！\n---------------`);
                }
            }catch{
                msgObject.channel.send(`系統錯誤rm`);
            }
        });
        connection.end();
	}
}

function itemuse(user_id:string,user_mpmax:number,user_mp:number,msgObject:Discord.Message,msg:string){
    const mysql2 = require('mysql');
    const connection2 = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection2.connect();
    let sql2 = `select * from item where user_id='${user_id}'`;
    let blue1:number,blue2:number,blue3:number,blue4:number,blue5:number,blue6:number;
    let sql3:string,sql4:string,msg1:string;
    connection2.query(sql2,(error:any,results:any)=>{
        let item = Object.values(results[0]);
        blue1 = parseInt(`${item[1]}`);
        blue2 = parseInt(`${item[2]}`);
        blue3 = parseInt(`${item[3]}`);
        blue4 = parseInt(`${item[4]}`);
        blue5 = parseInt(`${item[5]}`);
        blue6 = parseInt(`${item[6]}`);
        if(msg.length==3){
            if(blue5==0 && blue6 !=0){
                user_mp = user_mpmax;
                blue6 -= 1;
                sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                sql4 = `update item set super='${blue6}' where user_id='${user_id}'`;
                msg1 = `<@!${user_id}>\n---------------\n成功使用了超級藥水 1 罐\n剩餘超級藥水數量：${blue6}\n---------------`;
            }else if(blue5 !=0 && blue6 == 0){
                user_mp += Math.floor(user_mpmax / 2);
                user_mp > user_mpmax ? user_mp = user_mpmax : user_mp ;
                blue5 -= 1;
                sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                sql4 = `update item set special='${blue5}' where user_id='${user_id}'`;
                msg1 = `<@!${user_id}>\n---------------\n成功使用了特殊藥水 1 罐\n剩餘特殊藥水數量：${blue5}\n---------------`;
            }else if(blue5 != 0 && blue6 != 0){
                if(user_mp <= Math.floor(user_mpmax/2) && blue5 >= 2){
                    user_mp = user_mpmax;
                    blue5 -= 2;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set special='${blue5}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了特殊藥水 2 罐\n剩餘特殊藥水數量：${blue5}\n---------------`;
                }else if(user_mp <= Math.floor(user_mpmax/2) && blue5 < 2){
                    user_mp = user_mpmax;
                    blue6 -= 1;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set super='${blue6}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了超級藥水 1 罐\n剩餘超級藥水數量：${blue6}\n---------------`;
                }
                else{
                    user_mp += Math.floor(user_mpmax / 2);
                    user_mp > user_mpmax ? user_mp = user_mpmax : user_mp ;
                    blue5 -= 1;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set special='${blue5}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了特殊藥水 1 罐\n剩餘超級藥水數量：${blue5}\n---------------`;
                }
            }else{
                msgObject.channel.send(
                    `<@!${user_id}>\n`+
                    `----------------\n`+
                    `你的藥水不夠了，請至商店購買，或者狩獵Boss\n`+
                    `----------------`
                );
            }
        }else{
            msg = msg.substring(4);
            if(msg=='100'){
                if(blue1 >= 1){
                    user_mp += 100;
                    blue1 -= 1;
                    user_mp > user_mpmax ? user_mp = user_mpmax : user_mp;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set blue='${blue1}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了藍色藥水 1 罐\n剩餘藍色藥水數量：${blue1}\n---------------`;
                }else{
                    msgObject.channel.send(
                        `<@!${user_id}>\n`+
                        `-----------------\n`+
                        `你的藍色藥水不足！\n`+
                        `剩餘藍色藥水數量：${blue1}\n`+
                        `-----------------`
                    );
                }
            }else if(msg=='300'){
                if(blue2 >= 1){
                    user_mp += 300;
                    blue2 -= 1;
                    user_mp > user_mpmax ? user_mp = user_mpmax : user_mp;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set vitality='${blue2}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了活力藥水 1 罐\n剩餘活力藥水數量：${blue2}\n---------------`;
                }else{
                    msgObject.channel.send(
                        `<@!${user_id}>\n`+
                        `-----------------\n`+
                        `你的活力藥水不足！\n`+
                        `剩餘活力藥水數量：${blue2}\n`+
                        `-----------------`
                    );
                }
            }else if(msg=='4000'){
                if(blue3 >= 1){
                    user_mp += 4000;
                    blue3 -= 1;
                    user_mp > user_mpmax ? user_mp = user_mpmax : user_mp;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set morning='${blue3}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了清晨之露 1 罐\n剩餘清晨之露數量：${blue3}\n---------------`;
                }else{
                    msgObject.channel.send(
                        `<@!${user_id}>\n`+
                        `-----------------\n`+
                        `你的清晨之露不足！\n`+
                        `剩餘清晨之露數量：${blue3}\n`+
                        `-----------------`
                    );
                }
            }else if(msg=='5000'){
                if(blue4 >= 1){
                    user_mp += 5000;
                    blue4 -= 1;
                    user_mp > user_mpmax ? user_mp = user_mpmax : user_mp;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set dusk='${blue4}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了黃昏之露 1 罐\n剩餘黃昏之露數量：${blue4}\n---------------`;
                }else{
                    msgObject.channel.send(
                        `<@!${user_id}>\n`+
                        `-----------------\n`+
                        `你的黃昏之露不足！\n`+
                        `剩餘黃昏之露數量：${blue4}\n`+
                        `-----------------`
                    );
                }
            }
        }
        if(sql3 != undefined && sql4 != undefined){
            itemend(sql3,sql4,msgObject,msg1);
        }
    });
    connection2.end();
}
function itemend(sql3:string,sql4:string,msgObject:Discord.Message,msg:string){
    const mysql3 = require('mysql');
    const connection3 = mysql3.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection3.connect();
    connection3.query(sql3);
    connection3.query(sql4,(error:any,results:any)=>{
        try{
            msgObject.channel.send(msg);
        }catch{
            msgObject.channel.send(`系統錯誤rm`);
        }
    });
    connection3.end()
}