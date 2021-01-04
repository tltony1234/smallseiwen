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
        this._command = "changemap";
    }
    help() {
        return "換圖";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
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
            let sql2 = `select * from map_mapping where map_name='${msg.substring(11)}'`;
            let user_level, user_map, map_hig, map_les, map_name;
            connection.query(sql, (error, results) => {
                try {
                    let user = Object.values(results[0]);
                    user_level = parseInt(`${user[5]}`);
                    user_map = String(`${user[13]}`);
                }
                catch (_a) {
                    msgObject.channel.send('系統錯誤');
                }
            });
            connection.query(sql2, (error, results) => {
                try {
                    let map = Object.values(results[0]);
                    map_name = String(`${map[0]}`);
                    map_les = parseInt(`${map[1]}`);
                    map_hig = parseInt(`${map[2]}`);
                    if (user_map == msg.substring(11)) {
                        msgObject.channel.send(`<@!${user_id}>\n` +
                            `你的所在地：${user_map}\n` +
                            `你要去的地方：${msg.substring(11)}\n` +
                            `我想我應該不需要多說什麼了吧:thinking:`);
                    }
                    else {
                        if (user_level > map_les - 20 && user_level < map_hig) {
                            changemap(0, user_id, user_level, map_name, map_hig, map_les, msgObject);
                        }
                        else if (user_level < map_les - 20) {
                            msgObject.channel.send(`<@!${user_id}>\n` +
                                `騷年，你還太菜了，回家多打打正拳\n` +
                                `地圖名稱：${map_name}\n` +
                                `需要等級：${map_les}\n` +
                                `你的等級：${user_level}`);
                        }
                        else if (user_level > map_hig) {
                            changemap(1, user_id, user_level, map_name, map_hig, map_les, msgObject);
                        }
                    }
                }
                catch (_a) {
                    msgObject.channel.send(`系統錯誤`);
                }
            });
            connection.end();
        });
    }
}
exports.default = templatecommand;
function changemap(num, user_id, user_level, map_name, map_hig, map_les, msg) {
    const mysql2 = require('mysql');
    const connection2 = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection2.connect();
    let sql3 = `UPDATE games SET user_map='${map_name}' WHERE user_id='${user_id}'`;
    connection2.query(sql3, (error, results) => {
        if (num == 0) {
            msg.channel.send(`<@!${user_id}>\n` +
                `騷年，展開屬於你的冒險吧\n` +
                `地圖名稱： ${map_name}\n` +
                `怪物最高等級： ${map_hig}\n` +
                `怪物最低等級： ${map_les}\n` +
                `你的等級： ${user_level}`);
        }
        else if (num == 1) {
            msg.channel.send(`<@!${user_id}>\n` +
                `騷年，你已經成長茁壯，建議前往更高區域:face_with_monocle:\n` +
                `地圖名稱：${map_name}\n` +
                `怪物最高等級：${map_hig}\n` +
                `你的等級：${user_level}`);
        }
    });
    connection2.end();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlbWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2NoYW5nZW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUlBLE1BQXFCLGVBQWU7SUFBcEM7UUFDa0IsYUFBUSxHQUFHLFdBQVcsQ0FBQTtJQXFFeEMsQ0FBQztJQW5FQSxJQUFJO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWM7UUFDM0IsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWEsRUFBQyxTQUF5QixFQUFDLE1BQXFCOztZQUN2RSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUM1QixJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUN4QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2dCQUN6QyxJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSxTQUFTO2FBQ25CLENBQUMsQ0FBQztZQUNHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLEdBQUcsR0FBRyxzQ0FBc0MsT0FBTyxHQUFHLENBQUM7WUFDM0QsSUFBSSxJQUFJLEdBQUUsNkNBQTZDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUM1RSxJQUFJLFVBQWlCLEVBQUMsUUFBZSxFQUFDLE9BQWMsRUFBQyxPQUFjLEVBQUMsUUFBZSxDQUFDO1lBQ3BGLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFD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