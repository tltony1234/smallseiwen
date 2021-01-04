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
        this._command = "shop";
    }
    help() {
        return "商店";
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
            if (msg.length == 5) {
                let sql3 = `select * from shop`;
                connection.query(sql3, (error, results) => {
                    try {
                        let shop = Object.values(results[0]);
                        msg = `<@!${user_id}>\n`;
                        msg += `-----------------\n`;
                        msg += `商品代號  商品名稱  商品價格\n`;
                        msg += `${String(shop[0])}\n`;
                    }
                    catch (_a) {
                        msgObject.channel.send(`系統錯誤shop`);
                    }
                });
            }
            else {
                msg = msg.substring(6);
                let sql = `select * from games where user_id='${user_id}'`;
                let sql2 = `select * from item where user_id='${user_id}'`;
                let user_money, blue5, blue6;
                connection.query(sql, (error, results) => {
                    let user = Object.values(results[0]);
                    user_money = parseInt(`${user[4]}`);
                });
                connection.query(sql2, (error, results) => {
                    let item = Object.values(results[0]);
                    blue5 = parseInt(`${item[5]}`);
                    blue6 = parseInt(`${item[6]}`);
                });
            }
            connection.end();
        });
    }
}
exports.default = templatecommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zaG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUEsTUFBcUIsZUFBZTtJQUFwQztRQUNrQixhQUFRLEdBQUcsTUFBTSxDQUFBO0lBbURuQyxDQUFDO0lBakRBLElBQUk7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBYztRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2xDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYSxFQUFDLFNBQXlCLEVBQUMsTUFBcUI7O1lBQ3ZFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNsQyxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFBO1lBQzNCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3pDLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFLFNBQVM7YUFDbkIsQ0FBQyxDQUFDO1lBQ0csVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JCLElBQUcsR0FBRyxDQUFDLE1BQU0sSUFBRSxDQUFDLEVBQUM7Z0JBQ2IsSUFBSSxJQUFJLEdBQUcsb0JBQW9CLENBQUM7Z0JBQ2hDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsS0FBUyxFQUFDLE9BQVcsRUFBQyxFQUFFO29CQUMzQyxJQUFHO3dCQUNDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JDLEdBQUcsR0FBRyxNQUFNLE9BQU8sS0FBSyxDQUFBO3dCQUN4QixHQUFHLElBQUkscUJBQXFCLENBQUE7d0JBQzVCLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQTt3QkFDM0IsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7cUJBQ2hDO29CQUFBLFdBQUs7d0JBQ0YsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ3RDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047aUJBQUk7Z0JBQ0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksR0FBRyxHQUFHLHNDQUFzQyxPQUFPLEdBQUcsQ0FBQztnQkFDM0QsSUFBSSxJQUFJLEdBQUcscUNBQXFDLE9BQU8sR0FBRyxDQUFDO2dCQUMzRCxJQUFJLFVBQWlCLEVBQUMsS0FBWSxFQUFDLEtBQVksQ0FBQztnQkFDaEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsQ0FBQyxLQUFTLEVBQUMsT0FBVyxFQUFDLEVBQUU7b0JBQzFDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDLENBQUMsQ0FBQztnQkFDSCxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLEtBQVMsRUFBQyxPQUFXLEVBQUMsRUFBRTtvQkFDM0MsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMsS0FBSyxHQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzdCLEtBQUssR0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDLENBQUMsQ0FBQzthQUNOO1lBQ0QsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLENBQUM7S0FBQTtDQUNEO0FBcERELGtDQW9EQyJ9