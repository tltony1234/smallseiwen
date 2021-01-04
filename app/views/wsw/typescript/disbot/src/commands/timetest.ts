import * as Discord from "discord.js";
import{ IBotCommand } from "../api";


export default class templatecommand implements IBotCommand{
	private readonly _command = "timetest"
	
	help():string{
		return "test";
	}
	isThisCommand(command:string):boolean{
		return command === this._command;
	}
	
	async runCommand(args:string[],msgObject:Discord.Message,client:Discord.Client):Promise<void>{
		msgObject.delete();
		let user_id=msgObject.author.id
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '27351648',
			database: 'discord'
        });
        connection.connect();
		let sql2 = `select * from shop`;
        connection.query(sql2,(error:any,results:any)=>{
            msgObject.channel.send(`done`);
        });
        connection.end()
	}
}