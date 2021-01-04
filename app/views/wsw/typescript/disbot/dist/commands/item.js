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
        this._command = "item";
    }
    help() {
        return "道具";
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
            if (msg.length == 5) {
                let sql = `select * from item where user_id='${user_id}'`;
                connection.query(sql, (error, results) => {
                    try {
                        let item = Object.values(results[0]);
                        msgObject.channel.send(`<@!${user_id}> 的背包\n` +
                            `藍色藥水：${item[1]}\n` +
                            `活力藥水：${item[2]}\n` +
                            `清晨藥水：${item[3]}\n` +
                            `黃昏藥水：${item[4]}\n` +
                            `特殊藥水：${item[5]}\n` +
                            `超級藥水：${item[6]}`);
                    }
                    catch (_a) {
                        msgObject.channel.send(`系統錯誤item`);
                    }
                });
            }
            connection.end();
        });
    }
}
exports.default = templatecommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUEsTUFBcUIsZUFBZTtJQUFwQztRQUNrQixhQUFRLEdBQUcsTUFBTSxDQUFBO0lBMENuQyxDQUFDO0lBeENBLElBQUk7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBYztRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2xDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYSxFQUFDLFNBQXlCLEVBQUMsTUFBcUI7O1lBQ3ZFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQzVCLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2xDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3pDLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFLFNBQVM7YUFDbkIsQ0FBQyxDQUFDO1lBQ0gsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2YsSUFBRyxHQUFHLENBQUMsTUFBTSxJQUFFLENBQUMsRUFBQztnQkFDYixJQUFJLEdBQUcsR0FBQyxxQ0FBcUMsT0FBTyxHQUFHLENBQUM7Z0JBQ3hELFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFDLENBQUMsS0FBUyxFQUFDLE9BQVcsRUFBQyxFQUFFO29CQUMxQyxJQUFHO3dCQUNDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNsQixNQUFNLE9BQU8sU0FBUzs0QkFDdEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7NEJBQ25CLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJOzRCQUNuQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSTs0QkFDbkIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7NEJBQ25CLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJOzRCQUNuQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNwQixDQUFDO3FCQUNMO29CQUFBLFdBQUs7d0JBQ0YsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ3RDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFDRCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDeEIsQ0FBQztLQUFBO0NBQ0Q7QUEzQ0Qsa0NBMkNDIn0=