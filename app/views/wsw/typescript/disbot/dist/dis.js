"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("./config");
const client = new Discord.Client();
let commands = [];
loadCommands(`${__dirname}/commands`);
client.on("ready", () => {
    console.log("機器人已啟動");
    client.user.setActivity("輸輸谷", { type: "PLAYING" });
});
client.on("guildMemberAdd", member => {
    let welcomeChannel = member.guild.channels.find(channel => channel.name === "王家前院");
    welcomeChannel.send(`歡迎 ${member.displayName} 加入王家軍`);
    let memberRole = member.guild.roles.find(role => role.id == "678880231313899521");
    member.addRole(memberRole);
    member.send("歡迎加入王家軍");
});
client.on("guildMemberRemove", member => {
    let welcomeChannel = member.guild.channels.find(channel => channel.name === "王家前院");
    welcomeChannel.send(`888888`);
    member.send(`Your mother's head, like a ball, kicked to the department store. Department store, sell leather balls, sell your mother's head.`);
});
client.on("message", msg => {
    if (msg.author.bot) {
        return;
    }
    if (msg.channel.type == "dm") {
        return;
    }
    if (msg.content == '') {
        rebackpic(msg);
    }
    else {
        rebackmsg(msg);
    }
    if (!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }
    handleCommand(msg);
});
function rebackpic(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        msg.attachments.forEach(attachment => {
            if (msg.channel.id == "628882731085856778") {
                return;
            }
            if (msg.channel.id == "697362163907690566") {
                return;
            }
            if (msg.channel.id == "548379976559362070") {
                return;
            }
            if (msg.channel.id == "611765081881182208") {
                return;
            }
            let url = attachment.url;
            let rebackChannel = msg.member.guild.channels.find(channel => channel.name === "備份區");
            let mes = "";
            if (msg.member.nickname == null) {
                mes = msg.channel + "-" + msg.author.username + "說：" + url;
            }
            else {
                mes = msg.channel + "-" + msg.member.nickname + "說：" + url;
            }
            rebackChannel.send(mes);
        });
    });
}
function rebackmsg(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        if (msg.channel.id == "628882731085856778") {
            return;
        }
        if (msg.channel.id == "697362163907690566") {
            return;
        }
        if (msg.channel.id == "548379976559362070") {
            return;
        }
        if (msg.channel.id == "611765081881182208") {
            return;
        }
        let rebackChannel = msg.member.guild.channels.find(channel => channel.name === "備份區");
        let mes = "";
        if (msg.member.nickname == null) {
            mes = msg.channel + "-" + msg.author.username + "說：" + msg.content;
        }
        else {
            mes = msg.channel + "-" + msg.member.nickname + "說：" + msg.content;
        }
        rebackChannel.send(mes);
    });
}
function handleCommand(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLowerCase();
        let args = msg.content.split(" ").slice(1);
        for (const commandClass of commands) {
            try {
                if (!commandClass.isThisCommand(command)) {
                    continue;
                }
                yield commandClass.runCommand(args, msg, client);
            }
            catch (exception) {
                console.log(exception);
            }
        }
    });
}
function loadCommands(commandsPath) {
    if (!ConfigFile.config.commands || ConfigFile.config.commands.length === 0) {
        return;
    }
    for (const commandName of ConfigFile.config.commands) {
        const commandClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandClass();
        commands.push(command);
    }
}
client.login(ConfigFile.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Rpcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFHdkMsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRXBELElBQUksUUFBUSxHQUFnQixFQUFFLENBQUM7QUFDL0IsWUFBWSxDQUFDLEdBQUcsU0FBUyxXQUFXLENBQUMsQ0FBQTtBQUVyQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBQyxHQUFFLEVBQUU7SUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUMsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQztBQUVqRCxDQUFDLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUMsTUFBTSxDQUFBLEVBQUU7SUFDbEMsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLENBQXdCLENBQUM7SUFDM0csY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLE1BQU0sQ0FBQyxXQUFXLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUcsb0JBQW9CLENBQUMsQ0FBQztJQUNqRixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEIsQ0FBQyxDQUFDLENBQUE7QUFF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