import * as Discord from "discord.js";
import{ IBotCommand } from "../api";


export default class atk implements IBotCommand{
	private readonly _command = "atk"
	
	help():string{
		return "攻擊";
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
		let user_level:number,user_crit:number,user_critdmg:number,user_weapon:number,user_job:string,user_lastatk:number;
		let user_cd:number,user_skill:string,user_mp:number,user_exp:number,user_map:string,user_money:number,user_accessories:number;
		let sql = `select * from games where user_id = '${user_id}'`;
		connection.query(sql,(error:any,results:any)=>{
			try{
				let user=Object.values(results[0]);
				user_id = String(`${user[0]}`);
				user_level = parseInt(`${user[5]}`);
				user_crit = parseInt(`${user[11]}`);
				user_critdmg = parseFloat(`${user[12]}`);
				user_cd = parseInt(`${user[7]}`);
				user_weapon = parseInt(`${user[3]}`);
				user_job = String(`${user[6]}`);
				user_mp = parseInt(`${user[8]}`);
				user_exp = parseInt(`${user[2]}`);
				user_map = String(`${user[14]}`);
				user_money = parseInt(`${user[4]}`);
				user_lastatk =parseInt(`${user[13]}`);
				user_accessories = parseInt(`${user[15]}`);
				user_skill = String(`${user[10]}`);
				if (user_lastatk <= Date.now()){
					inside(user_id,user_level,user_skill,user_map,msgObject,user_mp,user_weapon,user_crit,user_critdmg,user_cd,user_exp,
						user_money,user_lastatk,user_accessories);
				}else{
					msgObject.channel.send(`<@!${user_id}> 冷卻時間還有 ${(user_lastatk-Date.now())/1000} 秒`);
				}
				
			}
			catch{
				msgObject.channel.send('查無此人，請先創角');
			}
		});
		
		connection.end();
	}
}

function inside(user_id:string,user_level:number,user_skill:string,user_map:string,msgObject:Discord.Message,user_mp:number,
				user_weapon:number,user_crit:number,user_critdmg:number,user_cd:number,user_exp:number,user_money:number,
				user_lastatk:number,user_accessories:number){
	let sql2 = `select * from skill_mapping where skill_name = '${user_skill}'`; 
	let sql3 = `select * from map_mapping where map_name='${user_map}'`;
	let sql4 = `select * from attack where user_id='${user_id}'`;
	let sql7 = `select * from lv_mapping where lv='${user_level}'`;
	const mysql2 = require('mysql');
	const connection2 = mysql2.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
	});
	connection2.connect();
	let skill_segment:number,skill_atk:number,skill_mp:number,skill_name:string,map_hig:number,map_les:number,map_name:string,master_hp:number;
	let master_name:string,lvup:number;
	connection2.query(sql2,(error:any,results:any)=>{
		try{
			let skill = Object.values(results[0]);
			skill_atk = parseInt(`${skill[4]}`);
			skill_mp = parseInt(`${skill[3]}`);
			skill_segment = parseInt(`${skill[2]}`);
			skill_name = user_skill;
		}catch{
			msgObject.channel.send(`系統錯誤skill`);
		}
	});
	connection2.query(sql3,(error:any,results:any)=>{
		try{
			let map = Object.values(results[0]);
			map_hig=parseInt(`${map[2]}`);
			map_les=parseInt(`${map[1]}`);
			map_name=user_map;
		}catch{
			msgObject.channel.send(`系統錯誤map`);
		}
	});
	connection2.query(sql7,(error:any,results:any)=>{
		try{
			let lvmap = Object.values(results[0]);
			lvup=parseInt(`${lvmap[1]}`);
		}catch{
			msgObject.channel.send(`系統錯誤lv`);
		}
	});
	connection2.query(sql4,(error:any,results:any)=>{
		try{
			let atk = Object.values(results[0]);
			master_hp = parseInt(`${atk[2]}`);
			master_name = String(`${atk[1]}`);
			if(master_hp==0){
				newatk(user_map,map_hig,map_les,user_mp,skill_mp,user_level,user_weapon,skill_segment,skill_atk,user_crit,user_critdmg,user_id,user_cd,user_exp,user_money,user_lastatk,lvup,msgObject,user_skill,user_accessories);
			}else{
				again(user_mp,skill_mp,user_level,user_weapon,skill_segment,skill_atk,user_crit,user_critdmg,user_id,user_cd,user_exp,user_money,user_lastatk,lvup,msgObject,master_hp,master_name,user_skill,user_accessories);
			}
		}catch{
			console.log(`${error}`);
			msgObject.channel.send(`系統錯誤attack`);
		}
	});
	connection2.end();
	
}
function newatk(user_map:string,map_hig:number,map_les:number,user_mp:number,skill_mp:number,user_level:number,
				user_weapon:number,skill_segment:number,skill_atk:number,user_crit:number,user_critdmg:number,user_id:string,user_cd:number,
				user_exp:number,user_money:number,user_lastatk:number,lvup:number,msgObject:Discord.Message,user_skill:string,user_accessories:number){
	let randnum = random(map_les,map_hig);
	if(user_level-10>randnum && randnum>user_level+20){
		randnum = user_level+20 ;
	}
	let sql5 = `select * from master where master_map='${user_map}' and (master_level = '${randnum}')`;
	const mysql3 = require('mysql');
	const connection3 = mysql3.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
	});
	connection3.connect();
	let master_name:string,master_hp:number,master_level:number,master_exp:number,master_item:number,master_droppercent:number,master_money:number;
	let atkv:number,ran:number,atka:number,criton:number,skillon:number;
	connection3.query(sql5,(error:any,results:any)=>{
		let master = Object.values(results[0]);
		master_name = String(`${master[0]}`);
		master_hp = parseInt(`${master[1]}`);
		master_level = parseInt(`${master[2]}`);
		master_exp = parseInt(`${master[3]}`);
		master_item = parseInt(`${master[4]}`);
		master_droppercent = parseInt(`${master[5]}`);
		master_money = parseInt(`${master[6]}`);
		ran = random(0,99);
		if(user_mp > skill_mp){
			atka = (user_level * 4 + user_weapon) * skill_atk * skill_segment;
			user_mp = user_mp - skill_mp;
			skillon = 1 ;
		}else{
			atka = (user_level * 4 + user_weapon)
			skillon = 0 ;
		}
		if(ran > user_crit){
			atkv = atka;
			criton = 0;
		}else{
			criton = 1;
			atkv = Math.round(atka * user_critdmg);
		}
		master_hp = master_hp - atkv;
		master_hp <= 0 ? win(user_id,user_cd,user_level,user_exp,user_weapon,user_money,user_lastatk,user_mp,master_droppercent,master_level,master_money,master_name,master_exp,master_item,atkv,msgObject,lvup,user_skill,criton,skillon,user_crit,user_critdmg,user_accessories) : lose(user_id,user_cd,user_lastatk,user_mp,master_name,master_level,master_hp,atkv,msgObject,user_skill,criton,skillon);
	});
	connection3.end();

}
function again(user_mp:number,skill_mp:number,user_level:number,user_weapon:number,skill_segment:number,skill_atk:number,
				user_crit:number,user_critdmg:number,user_id:string,user_cd:number,user_exp:number,user_money:number,
				user_lastatk:number,lvup:number,msgObject:Discord.Message,master_hp:number,master_name:string,user_skill:string,user_accessories:number){
	let sql10 = `select * from master where master_name='${master_name}'`;
	const mysql6 = require('mysql');
	const connection6 = mysql6.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
	});
	connection6.connect();
	let atka:number,atkv:number,ran:number,master_exp:number,master_item:number,master_droppercent:number,master_money:number,master_level:number,criton:number,skillon:number;
	connection6.query(sql10,(error:any,results:any)=>{
		let master = Object.values(results[0]);
		master_droppercent = parseInt(`${master[5]}`);
		master_money = parseInt(`${master[6]}`);
		master_exp = parseInt(`${master[3]}`);
		master_level = parseInt(`${master[2]}`);
		master_item = parseInt(`${master[4]}`);
		ran = random(0,99);
		if(user_mp > skill_mp){
			atka = (user_level * 4 + user_weapon) * skill_atk * skill_segment;
			user_mp = user_mp - skill_mp;
			skillon = 1 ;
		}else{
			atka = (user_level * 4 + user_weapon);
			skillon = 0 ;
		}
		if(ran >= user_crit){
			atkv = atka;
			criton = 0;
		}else{
			atkv = Math.round(atka * user_critdmg);
			criton = 1;
		}
		master_hp = master_hp - atkv;
		master_hp <= 0 ? win(user_id,user_cd,user_level,user_exp,user_weapon,user_money,user_lastatk,user_mp,master_droppercent,master_level,master_money,master_name,master_exp,master_item,atkv,msgObject,lvup,user_skill,criton,skillon,user_crit,user_critdmg,user_accessories) : lose(user_id,user_cd,user_lastatk,user_mp,master_name,master_level,master_hp,atkv,msgObject,user_skill,criton,skillon);
	});
	connection6.end();
}
function win(user_id:string,user_cd:number,user_level:number,user_exp:number,user_weapon:number,user_money:number,
	user_lastatk:number,user_mp:number,master_droppercent:number,master_level:number,master_money:number,master_name:string,master_exp:number,
	master_item:number,atkv:number,msgObject:Discord.Message,lvup:number,user_skill:string,criton:number,skillon:number,user_crit:number,
	user_critdmg:number,user_accessories:number){
	const mysql4 = require('mysql');
	const connection4 = mysql4.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
	});
	connection4.connect();
	let drop = random(1,master_droppercent);
	let drop2 = random(1,master_droppercent);
	let dropweapon:number,dropaccessories:number;
	let sql6=`UPDATE attack SET master_hp ='0' WHERE user_id='${user_id}'`;
	connection4.query(sql6,(error:any,results:any)=>{
		if (drop == master_droppercent){
			user_weapon += master_item;
			dropweapon=1;
		}else{dropweapon=0;}
		if (drop2 == master_droppercent){
			user_accessories += master_item;
			dropaccessories=1;
		}else{dropaccessories=0}
		user_money += master_money;
		user_exp += master_exp;
		user_cd = 2;
		let ntime=Date.now();
		user_lastatk = ntime + (user_cd * 1000);
		user_crit = Math.floor(user_accessories/100)+30;
		if(user_crit>=100){
			user_crit = 100;
		}
		if(user_accessories>=7000){
			user_critdmg = Math.floor((user_weapon+user_accessories-7000)/10000)+1.3;
		}else{
			user_critdmg = Math.floor(user_weapon/10000)+1.3;
		}
		if(user_critdmg>=6){
			user_critdmg = 6;
		}
		if (user_exp > lvup){
			user_level += 1 ;
			user_exp -= lvup;
		}
		winend(user_id,user_cd,user_level,user_exp,user_weapon,user_money,user_lastatk,user_mp,master_level,master_money,master_name,master_exp,master_item,atkv,msgObject,user_skill,criton,skillon,user_crit,user_critdmg,user_accessories,dropweapon,dropaccessories);
	});
	connection4.end()
}
function winend(user_id:string,user_cd:number,user_level:number,user_exp:number,user_weapon:number,user_money:number,
				user_lastatk:number,user_mp:number,master_level:number,master_money:number,master_name:string,master_exp:number,
				master_item:number,atkv:number,msgObject:Discord.Message,user_skill:string,criton:number,skillon:number,user_crit:number,
				user_critdmg:number,user_accessories:number,dropweapon:number,dropaccessories:number){
	const mysql5 = require('mysql');
	const connection5 = mysql5.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
	});
	connection5.connect();
	let sql8=`UPDATE games SET user_cd='${user_cd}',user_level = '${user_level}',user_exp='${user_exp}',user_weapon='${user_weapon}',user_money='${user_money}',user_lastatk='${user_lastatk}',user_mp='${user_mp}',user_crit='${user_crit}',user_critdmg='${user_critdmg}',user_accessories='${user_accessories}' WHERE user_id='${user_id}'`
	let msg:string;
	connection5.query(sql8,(error:any,results:any)=>{
		try{
			msg = `<@!${user_id}>\n`;
			msg += `-------------------\n`;
			skillon == 1 ? msg += `使用技能${user_skill}\n` : msg += `使用普通攻擊\n`
			criton == 1 ? msg += `對 ${master_name} (Lv：${master_level})造成了 **${atkv}** 的爆擊傷害\n` : msg += `對 ${master_name} (Lv：${master_level})造成了 ${atkv} 的傷害\n`;
			msg += `剩餘魔力：${user_mp}\n`;
			msg += `獲得經驗值：${master_exp}\n`;
			msg += `獲得輸輸幣：${master_money}\n`;
			dropweapon == 1 ? msg += `獲得武器： ${master_item}\n` : msg
			dropaccessories ==1 ? msg += `獲得飾品： ${master_item}\n` : msg
			msg += `-------------------`;
			msgObject.channel.send(msg);
		}catch{
			msgObject.channel.send(`系統錯誤wined`)
		}	
	});
	connection5.end();
}
function lose(user_id:string,user_cd:number,user_lastatk:number,user_mp:number,master_name:string,master_level:number,master_hp:number,atkv:number,msgObject:Discord.Message,user_skill:string,criton:number,skillon:number){
	const mysql7 = require('mysql');
	const connection7 = mysql7.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
	});
	connection7.connect();
	let sql11 = `UPDATE attack SET master_name='${master_name}',master_hp='${master_hp}'  WHERE user_id='${user_id}'`
	connection7.query(sql11,(error:any,results:any)=>{
		let ntime = Date.now();
		user_cd = 2;
		user_lastatk = ntime + (user_cd * 1000);
		losend(user_id,user_cd,user_lastatk,user_mp,master_name,master_level,master_hp,atkv,msgObject,user_skill,criton,skillon);
	});
	
	connection7.end();
}
function losend(user_id:string,user_cd:number,user_lastatk:number,user_mp:number,master_name:string,master_level:number,master_hp:number,atkv:number,msgObject:Discord.Message,user_skill:string,criton:number,skillon:number){
	const mysql8 = require('mysql');
	const connection8 = mysql8.createConnection({
		host: 'localhost',
		user: 'root',
		password: '27351648',
		database: 'discord'
	});
	connection8.connect();
	let sql12 = `UPDATE games SET user_cd='${user_cd}',user_lastatk='${user_lastatk}',user_mp='${user_mp}' WHERE user_id='${user_id}'`
	let msg:string;
	connection8.query(sql12,(error:any,results:any)=>{
		try{
			msg = `<@!${user_id}>\n`;
			msg += `-------------------\n`;
			skillon == 1 ? msg += `使用技能${user_skill}\n` : msg += `使用普通攻擊\n`;
			criton == 1 ? msg += `對 ${master_name} (Lv：${master_level})造成了 **${atkv}** 的爆擊傷害\n` : msg += `對 ${master_name} (Lv：${master_level})造成了 ${atkv} 的傷害\n`
			msg += `剩餘魔力：${user_mp}\n`;
			msg += `${master_name} 的血量還剩下 ${master_hp}\n`;
			msg += `-------------------\n`;
			msgObject.channel.send(msg);
		}catch{
			msgObject.channel.send(`系統錯誤losend`)
		}
	});
	connection8.end();
}
function random(min:number, max:number){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}
