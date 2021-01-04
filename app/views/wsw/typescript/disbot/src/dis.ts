import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import {IBotCommand} from "./api";

const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[]=[];
loadCommands(`${__dirname}/commands`)

client.on("ready",()=>{
	console.log("機器人已啟動");
	client.user.setActivity("輸輸谷",{type:"PLAYING"});
	
})

client.on("guildMemberAdd",member=>{
	let welcomeChannel = member.guild.channels.find(channel => channel.name === "王家前院") as Discord.TextChannel;
	welcomeChannel.send(`歡迎 ${member.displayName} 加入王家軍`);
	let memberRole = member.guild.roles.find(role => role.id =="678880231313899521");
	member.addRole(memberRole);
	member.send("歡迎加入王家軍");
})

client.on("guildMemberRemove",member =>{
	let welcomeChannel = member.guild.channels.find(channel => channel.name === "王家前院") as Discord.TextChannel;
	welcomeChannel.send(`888888`);
	member.send(`Your mother's head, like a ball, kicked to the department store. Department store, sell leather balls, sell your mother's head.`);
})

client.on("message",msg=>{
	if(msg.author.bot){return;}
	if(msg.channel.type == "dm"){return;}
	if(msg.content==''){
		rebackpic(msg);
	}else{
		rebackmsg(msg);
	}
	
	if(!msg.content.startsWith(ConfigFile.config.prefix)){return;}
	handleCommand(msg);
})
async function rebackpic(msg:Discord.Message){
	msg.attachments.forEach(attachment => {
		if(msg.channel.id=="628882731085856778"){return;}
		if(msg.channel.id=="697362163907690566"){return;}
		if(msg.channel.id=="548379976559362070"){return;}
		if(msg.channel.id=="611765081881182208"){return;}
		let url = attachment.url;
		let rebackChannel=msg.member.guild.channels.find(channel => channel.name === "備份區") as Discord.TextChannel;
		let mes="";
		if(msg.member.nickname==null){
			mes = msg.channel+"-"+msg.author.username+"說："+url;
		}else{
			mes = msg.channel+"-"+msg.member.nickname+"說："+url;
		}
		rebackChannel.send(mes);
	});
}
async function rebackmsg(msg:Discord.Message){
	if(msg.channel.id=="628882731085856778"){return;}
	if(msg.channel.id=="697362163907690566"){return;}
	if(msg.channel.id=="548379976559362070"){return;}
	if(msg.channel.id=="611765081881182208"){return;}
	let rebackChannel=msg.member.guild.channels.find(channel => channel.name === "備份區") as Discord.TextChannel;
	let mes="";
	if(msg.member.nickname==null){
		mes = msg.channel+"-"+msg.author.username+"說："+msg.content;
	}else{
		mes = msg.channel+"-"+msg.member.nickname+"說："+msg.content;
	}
	rebackChannel.send(mes);
}

async function handleCommand(msg:Discord.Message){
	let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix,"").toLowerCase();
	let args = msg.content.split(" ").slice(1);
	for(const commandClass of commands){
		try{
			if(!commandClass.isThisCommand(command)){
				continue;
			}
			await commandClass.runCommand(args,msg,client);
		}
		catch(exception){
			console.log(exception);
		}
	}
}

function loadCommands(commandsPath:string){
	if(!ConfigFile.config.commands||(ConfigFile.config.commands as string[]).length===0){return;}
	for(const commandName of ConfigFile.config.commands as string[]){
		const commandClass = require(`${commandsPath}/${commandName}`).default;
		const command = new commandClass() as IBotCommand;
		commands.push(command);
	}
}

client.login(ConfigFile.config.token);
