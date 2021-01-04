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
class templatecommand {
    constructor() {
        this._command = "rm";
    }
    help() {
        return "回魔";
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
            let sql = `select * from games where user_id='${user_id}'`;
            let user_mp, user_mpmax;
            connection.query(sql, (error, results) => {
                try {
                    let user = Object.values(results[0]);
                    user_mp = parseInt(`${user[8]}`);
                    user_mpmax = parseInt(`${user[9]}`);
                    if (user_mp < user_mpmax) {
                        itemuse(user_id, user_mpmax, user_mp, msgObject, msg);
                    }
                    else {
                        msgObject.channel.send(`<@!${user_id}>\n---------------\n你的魔力充足，不需補充！\n---------------`);
                    }
                }
                catch (_a) {
                    msgObject.channel.send(`系統錯誤rm`);
                }
            });
            connection.end();
        });
    }
}
exports.default = templatecommand;
function itemuse(user_id, user_mpmax, user_mp, msgObject, msg) {
    const mysql2 = require('mysql');
    const connection2 = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection2.connect();
    let sql2 = `select * from item where user_id='${user_id}'`;
    let blue1, blue2, blue3, blue4, blue5, blue6;
    let sql3, sql4, msg1;
    connection2.query(sql2, (error, results) => {
        let item = Object.values(results[0]);
        blue1 = parseInt(`${item[1]}`);
        blue2 = parseInt(`${item[2]}`);
        blue3 = parseInt(`${item[3]}`);
        blue4 = parseInt(`${item[4]}`);
        blue5 = parseInt(`${item[5]}`);
        blue6 = parseInt(`${item[6]}`);
        if (msg.length == 3) {
            if (blue5 == 0 && blue6 != 0) {
                user_mp = user_mpmax;
                blue6 -= 1;
                sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                sql4 = `update item set super='${blue6}' where user_id='${user_id}'`;
                msg1 = `<@!${user_id}>\n---------------\n成功使用了超級藥水 1 罐\n剩餘超級藥水數量：${blue6}\n---------------`;
            }
            else if (blue5 != 0 && blue6 == 0) {
                user_mp += Math.floor(user_mpmax / 2);
                user_mp > user_mpmax ? user_mp = user_mpmax : user_mp;
                blue5 -= 1;
                sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                sql4 = `update item set special='${blue5}' where user_id='${user_id}'`;
                msg1 = `<@!${user_id}>\n---------------\n成功使用了特殊藥水 1 罐\n剩餘特殊藥水數量：${blue5}\n---------------`;
            }
            else if (blue5 != 0 && blue6 != 0) {
                if (user_mp <= Math.floor(user_mpmax / 2) && blue5 >= 2) {
                    user_mp = user_mpmax;
                    blue5 -= 2;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set special='${blue5}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了特殊藥水 2 罐\n剩餘特殊藥水數量：${blue5}\n---------------`;
                }
                else if (user_mp <= Math.floor(user_mpmax / 2) && blue5 < 2) {
                    user_mp = user_mpmax;
                    blue6 -= 1;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set super='${blue6}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了超級藥水 1 罐\n剩餘超級藥水數量：${blue6}\n---------------`;
                }
                else {
                    user_mp += Math.floor(user_mpmax / 2);
                    user_mp > user_mpmax ? user_mp = user_mpmax : user_mp;
                    blue5 -= 1;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set special='${blue5}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了特殊藥水 1 罐\n剩餘超級藥水數量：${blue5}\n---------------`;
                }
            }
            else {
                msgObject.channel.send(`<@!${user_id}>\n` +
                    `----------------\n` +
                    `你的藥水不夠了，請至商店購買，或者狩獵Boss\n` +
                    `----------------`);
            }
        }
        else {
            msg = msg.substring(4);
            if (msg == '100') {
                if (blue1 >= 1) {
                    user_mp += 100;
                    blue1 -= 1;
                    user_mp > user_mpmax ? user_mp = user_mpmax : user_mp;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set blue='${blue1}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了藍色藥水 1 罐\n剩餘藍色藥水數量：${blue1}\n---------------`;
                }
                else {
                    msgObject.channel.send(`<@!${user_id}>\n` +
                        `-----------------\n` +
                        `你的藍色藥水不足！\n` +
                        `剩餘藍色藥水數量：${blue1}\n` +
                        `-----------------`);
                }
            }
            else if (msg == '300') {
                if (blue2 >= 1) {
                    user_mp += 300;
                    blue2 -= 1;
                    user_mp > user_mpmax ? user_mp = user_mpmax : user_mp;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set vitality='${blue2}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了活力藥水 1 罐\n剩餘活力藥水數量：${blue2}\n---------------`;
                }
                else {
                    msgObject.channel.send(`<@!${user_id}>\n` +
                        `-----------------\n` +
                        `你的活力藥水不足！\n` +
                        `剩餘活力藥水數量：${blue2}\n` +
                        `-----------------`);
                }
            }
            else if (msg == '4000') {
                if (blue3 >= 1) {
                    user_mp += 4000;
                    blue3 -= 1;
                    user_mp > user_mpmax ? user_mp = user_mpmax : user_mp;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set morning='${blue3}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了清晨之露 1 罐\n剩餘清晨之露數量：${blue3}\n---------------`;
                }
                else {
                    msgObject.channel.send(`<@!${user_id}>\n` +
                        `-----------------\n` +
                        `你的清晨之露不足！\n` +
                        `剩餘清晨之露數量：${blue3}\n` +
                        `-----------------`);
                }
            }
            else if (msg == '5000') {
                if (blue4 >= 1) {
                    user_mp += 5000;
                    blue4 -= 1;
                    user_mp > user_mpmax ? user_mp = user_mpmax : user_mp;
                    sql3 = `update games set user_mp='${user_mp}' where user_id='${user_id}'`;
                    sql4 = `update item set dusk='${blue4}' where user_id='${user_id}'`;
                    msg1 = `<@!${user_id}>\n---------------\n成功使用了黃昏之露 1 罐\n剩餘黃昏之露數量：${blue4}\n---------------`;
                }
                else {
                    msgObject.channel.send(`<@!${user_id}>\n` +
                        `-----------------\n` +
                        `你的黃昏之露不足！\n` +
                        `剩餘黃昏之露數量：${blue4}\n` +
                        `-----------------`);
                }
            }
        }
        if (sql3 != undefined && sql4 != undefined) {
            itemend(sql3, sql4, msgObject, msg1);
        }
    });
    connection2.end();
}
function itemend(sql3, sql4, msgObject, msg) {
    const mysql3 = require('mysql');
    const connection3 = mysql3.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection3.connect();
    connection3.query(sql3);
    connection3.query(sql4, (error, results) => {
        try {
            msgObject.channel.send(msg);
        }
        catch (_a) {
            msgObject.channel.send(`系統錯誤rm`);
        }
    });
    connection3.end();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFJQSxNQUFxQixlQUFlO0lBQXBDO1FBQ2tCLGFBQVEsR0FBRyxJQUFJLENBQUE7SUF1Q2pDLENBQUM7SUFyQ0EsSUFBSTtRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFjO1FBQzNCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFhLEVBQUMsU0FBeUIsRUFBQyxNQUFxQjs7WUFDdkUsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2xDLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUE7WUFDM0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDekMsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsU0FBUzthQUNuQixDQUFDLENBQUM7WUFDRyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsSUFBSSxHQUFHLEdBQUcsc0NBQXNDLE9BQU8sR0FBRyxDQUFDO1lBQzNELElBQUksT0FBYyxFQUFDLFVBQWlCLENBQUM7WUFDckMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsQ0FBQyxLQUFTLEVBQUMsT0FBVyxFQUFDLEVBQUU7Z0JBQzFDLElBQUk7b0JBQ0EsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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