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
function skill(user_id, user_job, user_skill, user_level, msg, msgObject) {
    const mysql2 = require('mysql');
    const connection2 = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection2.connect();
    let skill_segment, skill_mp, skill_atk, skill_level;
    if (msg.length == 10) {
        let sql2 = `select * from skill_mapping where skill_name='${user_skill}'`;
        connection2.query(sql2, (error, results) => {
            try {
                let skill = Object.values(results[0]);
                skill_segment = parseInt(`${skill[2]}`);
                skill_mp = parseInt(`${skill[3]}`);
                skill_atk = parseInt(`${skill[4]}`);
                skill_level = parseInt(`${skill[5]}`);
                msgObject.channel.send(`<@!${user_id}>\n` +
                    `目前使用技能：${user_skill}\n` +
                    `技能段數：${skill_segment}\n` +
                    `技能消耗魔力：${skill_mp}\n` +
                    `技能攻擊係數：${skill_atk}\n`);
            }
            catch (_a) {
                msgObject.channel.send(`系統錯誤skill`);
            }
        });
    }
    else {
        msg = msg.substring(11);
        if (msg == 'skillup') {
            let skill1_level, skill1_name, skill2_level, skill2_name;
            let sql3 = `select * from skill_mapping where job_name = '${user_job}' and (skill_level >= ${user_level})`;
            connection2.query(sql3, (error, results) => {
                try {
                    let skill1 = Object.values(results[0]);
                    let skill2 = Object.values(results[1]);
                    skill1_level = parseInt(`${skill1[5]}`);
                    skill1_name = String(`${skill1[0]}`);
                    skill2_level = parseInt(`${skill2[5]}`);
                    skill2_name = String(`${skill2[0]}`);
                    if (skill1_name == user_skill) {
                        msgObject.channel.send(`<@!${user_id}>\n` +
                            `你的等級不夠\n` +
                            `下個技能${skill2_name} 所需等級：${skill2_level}\n` +
                            `你的技能${user_skill} 你的等級：${user_level}`);
                    }
                    else {
                        if (user_level >= skill1_level) {
                            skillup(user_id, skill1_name, skill1_level, msgObject);
                        }
                        else {
                            msgObject.channel.send(`<@!${user_id}>\n` +
                                `你的等級不夠\n` +
                                `下個技能${skill1_name} 所需等級：${skill1_level}\n` +
                                `你的技能${user_skill} 你的等級：${user_level}`);
                        }
                    }
                }
                catch (_a) {
                    msgObject.channel.send(`<@!${user_id}>\n` +
                        `騷年，你的技能已經不能強化了！\n` +
                        `可能原因：該職業已無更高階技能`);
                }
            });
        }
    }
    connection2.end();
}
function skillup(user_id, skill1_name, skill1_level, msgObject) {
    const mysql3 = require('mysql');
    const connection3 = mysql3.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection3.connect();
    let sql4 = `update games set user_skill='${skill1_name}' where user_id='${user_id}'`;
    connection3.query(sql4, (error, results) => {
        msgObject.channel.send(`<@!${user_id}>\n` +
            `成功升階技能！\n` +
            `目前技能為：${skill1_name}\n` +
            `輸入+gamskill查看詳細資訊`);
    });
    connection3.end();
}
class templatecommand {
    constructor() {
        this._command = "gameskill";
    }
    help() {
        return "技能";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
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
            let user_job, user_skill, user_level;
            let sql = `SELECT * FROM games WHERE user_id='${user_id}'`;
            connection.query(sql, (error, results) => {
                try {
                    let user = Object.values(results[0]);
                    user_job = String(`${user[6]}`);
                    user_level = parseInt(`${user[5]}`);
                    user_skill = String(`${user[10]}`);
                    skill(user_id, user_job, user_skill, user_level, msg, msgObject);
                }
                catch (_a) {
                    msgObject.channel.send(`查無此人 請先創角`);
                }
            });
            connection.end();
        });
    }
}
exports.default = templatecommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXNraWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2dhbWVza2lsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLFNBQVMsS0FBSyxDQUFDLE9BQWMsRUFBQyxRQUFlLEVBQUMsVUFBaUIsRUFBQyxVQUFpQixFQUFDLEdBQVUsRUFBQyxTQUF5QjtJQUNySCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBQzNDLElBQUksRUFBRSxXQUFXO1FBQ2pCLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLFNBQVM7S0FDbkIsQ0FBQyxDQUFDO0lBQ0gsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLElBQUksYUFBb0IsRUFBQyxRQUFlLEVBQUMsU0FBZ0IsRUFBQyxXQUFrQixDQUFDO0lBQzdFLElBQUcsR0FBRyxDQUFDLE1BQU0sSUFBRSxFQUFFLEVBQUM7UUFDakIsSUFBSSxJQUFJLEdBQUcsaURBQWlELFVBQVUsR0FBRyxDQUFDO1FBQzFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsS0FBUyxFQUFDLE9BQVcsRUFBQyxFQUFFO1lBQy9DLElBQUc7Z0JBQ0YsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3hDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNuQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxF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