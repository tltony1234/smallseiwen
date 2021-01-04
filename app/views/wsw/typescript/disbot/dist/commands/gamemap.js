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
function map(user_id, user_map, msg, user_level) {
    const mysql2 = require('mysql');
    const connection2 = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection2.connect();
    let map_les, map_hig;
    let sql2 = `select * from map_mapping where map_name='${user_map}'`;
    connection2.query(sql2, (error, results) => {
        try {
            let map = Object.values(results[0]);
            map_les = parseInt(`${map[1]}`);
            map_hig = parseInt(`${map[2]}`);
            msg.channel.send(`<@!${user_id}>\n` +
                `目前所在位置為： ${user_map}\n` +
                `目前等級為： ${user_level}\n` +
                `地圖等級下限為： ${map_les}\n` +
                `地圖等級上限為： ${map_hig}`);
        }
        catch (_a) {
            msg.channel.send(`系統錯誤`);
        }
    });
    connection2.end();
}
class templatecommand {
    constructor() {
        this._command = "gamemap";
    }
    help() {
        return "地圖";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
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
            let sql = `select * from games where user_id=${user_id}`;
            let user_map, user_level;
            connection.query(sql, (error, results) => {
                try {
                    let user = Object.values(results[0]);
                    user_map = String(`${user[13]}`);
                    user_level = parseInt(`${user[5]}`);
                    map(user_id, user_map, msgObject, user_level);
                }
                catch (_a) {
                    msgObject.channel.send('系統錯誤');
                }
            });
        });
    }
}
exports.default = templatecommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZW1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9nYW1lbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsU0FBUyxHQUFHLENBQUMsT0FBYyxFQUFDLFFBQWUsRUFBQyxHQUFtQixFQUFDLFVBQWlCO0lBQzdFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDM0MsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsU0FBUztLQUNuQixDQUFDLENBQUM7SUFDQSxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEIsSUFBSSxPQUFjLEVBQUMsT0FBYyxDQUFDO0lBQ2xDLElBQUksSUFBSSxHQUFHLDZDQUE2QyxRQUFRLEdBQUcsQ0FBQztJQUNwRSxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLEtBQVMsRUFBQyxPQUFXLEVBQUMsRUFBRTtRQUM1QyxJQUFHO1lBQ0MsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxPQUFPLEdBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixPQUFPLEdBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDWixNQUFNLE9BQU8sS0FBSztnQkFDbEIsWUFBWSxRQUFRLElBQUk7Z0JBQ3hCLFVBQVUsVUFBVSxJQUFJO2dCQUN4QixZQUFZLE9BQU8sSUFBSTtnQkFDdkIsWUFBWSxPQUFPLEVBQUUsQ0FDeEIsQ0FBQztTQUNMO1FBQUEsV0FBSztZQUNGLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdEIsQ0FBQztBQUNELE1BQXFCLGVBQWU7SUFBcEM7UUFDa0IsYUFBUSxHQUFHLFNBQVMsQ0FBQTtJQWlDdEMsQ0FBQztJQS9CQSxJQUFJO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWM7UUFDM0IsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWEsRUFBQyxTQUF5QixFQUFDLE1BQXFCOztZQUN2RSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDeEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDekMsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsU0FBUzthQUNuQixDQUFDLENBQUM7WUFDRyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsSUFBSSxHQUFHLEdBQUcscUNBQXFDLE9BQU8sRUFBRSxDQUFDO1lBQ3pELElBQUksUUFBZSxFQUFDLFVBQWlCLENBQUM7WUFDdEMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsQ0FBQyxLQUFTLEVBQUMsT0FBVyxFQUFDLEVBQUU7Z0JBQzFDLElBQUc7b0JBQ0MsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2pDLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNwQyxHQUFHLENBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzlDO2dCQUFBLFdBQUs7b0JBQ0YsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7aUJBQ2pDO1lBQ04sQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDO0tBQUE7Q0FDRDtBQWxDRCxrQ0FrQ0MifQ==