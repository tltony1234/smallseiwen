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
function job(job_name, user_id, msg, job_mpmax) {
    const mysql2 = require('mysql');
    const connection2 = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    let skill_name;
    let sql4 = `select * from skill_mapping where job_name='${job_name}'`;
    connection2.connect();
    connection2.query(sql4, (error, results) => {
        try {
            let skill = Object.values(results[0]);
            skill_name = String(skill[0]);
            jobskill(user_id, job_name, skill_name, msg, job_mpmax);
        }
        catch (_a) {
            msg.channel.send(`系統錯誤`);
        }
    });
    connection2.end();
}
function jobskill(user_id, job_name, skill_name, msg, user_mpmax) {
    const mysql3 = require('mysql');
    const connection3 = mysql3.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    let sql3 = `UPDATE games SET user_job='${job_name}',user_skill='${skill_name}',user_mpmax='${user_mpmax}' WHERE user_id='${user_id}'`;
    connection3.connect();
    connection3.query(sql3, (error, results) => {
        msg.channel.send(`<@!${user_id}>\n` +
            `成功轉職為 ${job_name}\n` +
            `技能變更為 ${skill_name}\n` +
            `輸入+game查看詳細資料`);
    });
    connection3.end();
}
class templatecommand {
    constructor() {
        this._command = "gamejob";
    }
    help() {
        return "職業";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
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
            let user_level, job_level, user_weapon, job_const, job_name, user_job, job_mpmax;
            let sql = `SELECT * FROM job_mapping WHERE job_name='${msg.substring(9)}'`;
            let sql2 = `SELECT * FROM games WHERE user_id='${user_id}'`;
            connection.query(sql, (error, results) => {
                try {
                    let sqb = Object.values(results[0]);
                    job_name = String(`${sqb[0]}`);
                    job_level = parseInt(`${sqb[1]}`);
                    job_const = parseInt(`${sqb[2]}`);
                    job_mpmax = parseInt(`${sqb[3]}`);
                }
                catch (_a) {
                    msgObject.channel.send('找不到該職業');
                }
            });
            connection.query(sql2, (error, results) => {
                try {
                    let sqc = Object.values(results[0]);
                    user_level = parseInt(`${sqc[5]}`);
                    user_weapon = parseInt(`${sqc[3]}`);
                    user_job = String(`${sqc[6]}`);
                    if (job_name != undefined) {
                        if (user_level >= job_level && user_weapon >= job_const) {
                            if (job_name == user_job) {
                                msgObject.channel.send(`<@!${user_id}>目前職業已為${user_job}，不需要轉職！`);
                            }
                            else {
                                job(job_name, user_id, msgObject, job_mpmax);
                            }
                        }
                        else {
                            msgObject.channel.send(`<@!${user_id}> 轉職條件未達成\n` +
                                `轉職成 ${job_name} 的需要條件\n` +
                                `需要等級${job_level}  你的等級${user_level}\n` +
                                `需要武器${job_const}  你的武器${user_weapon}`);
                        }
                    }
                    else {
                        msgObject.channel.send(`<@!${user_id}>目前職業為${user_job}`);
                    }
                }
                catch (_a) {
                    msgObject.channel.send('找不到角色請先創角');
                }
            });
            connection.end();
        });
    }
}
exports.default = templatecommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZWpvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9nYW1lam9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsU0FBUyxHQUFHLENBQUMsUUFBZSxFQUFDLE9BQWMsRUFBQyxHQUFtQixFQUFDLFNBQWdCO0lBQzVFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDM0MsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsU0FBUztLQUNoQixDQUFDLENBQUM7SUFDSCxJQUFJLFVBQWlCLENBQUM7SUFDdEIsSUFBSSxJQUFJLEdBQUcsK0NBQStDLFFBQVEsR0FBRyxDQUFDO0lBQ3RFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0QixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLEtBQVMsRUFBQyxPQUFXLEVBQUMsRUFBRTtRQUM1QyxJQUFHO1lBQ0MsSUFBSSxLQUFLLEdBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLFFBQVEsQ0FBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxHQUFHLEVBQUMsU0FBUyxDQUFDLENBQUM7U0FDdkQ7UUFBQSxXQUFLO1lBQ0YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUNyQixDQUFDO0FBQ0QsU0FBUyxRQUFRLENBQUMsT0FBYyxF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