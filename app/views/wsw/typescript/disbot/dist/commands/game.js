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
class game {
    constructor() {
        this._command = "game";
    }
    help() {
        return "遊戲資訊";
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
            var sql = `SELECT * FROM games WHERE user_id='${user_id}'`;
            connection.query(sql, (error, results) => {
                try {
                    let sqb = Object.values(results[0]);
                    msgObject.channel.send("-------------------\n" +
                        `暱稱：<@!${user_id}>\n` +
                        "-------------------\n" +
                        `等級：${sqb[5]}\n` +
                        `經驗值：${sqb[2]}\n` +
                        `職業：${sqb[6]}	冷卻時間：${sqb[7]} 秒\n` +
                        `剩餘魔力：${sqb[8]}\n` +
                        `上限魔力：${sqb[9]}\n` +
                        "-------------------\n" +
                        `持有武器：${sqb[3]}\n` +
                        `持有飾品：${sqb[15]}\n` +
                        `持有輸輸幣：${sqb[4]}\n` +
                        "-------------------\n" +
                        `目前技能：${sqb[10]}\n` +
                        `目前爆擊機率：${sqb[11]}\n` +
                        `目前爆擊傷害：${sqb[12]}\n` +
                        "-------------------\n" +
                        `所在地：${sqb[14]}`);
                }
                catch (_a) {
                    msgObject.channel.send(`查無資料，請先使用+newborn創立角色`);
                }
            });
            connection.end();
        });
    }
}
exports.default = game;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9nYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsSUFBSTtJQUF6QjtRQUNrQixhQUFRLEdBQUcsTUFBTSxDQUFBO0lBaURuQyxDQUFDO0lBL0NBLElBQUk7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNmLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBYztRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2xDLENBQUM7SUFDSyxVQUFVLENBQUMsSUFBYSxFQUFDLFNBQXlCLEVBQUMsTUFBcUI7O1lBQzdFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNsQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2dCQUN6QyxJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSxTQUFTO2FBQ25CLENBQUMsQ0FBQztZQUNILFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLEdBQUcsR0FBQyxzQ0FBc0MsT0FBTyxHQUFHLENBQUM7WUFDekQsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsQ0FBQyxLQUFTLEVBQUMsT0FBVyxFQUFDLEVBQUU7Z0JBQzdDLElBQUc7b0JBQ0YsSUFBSSxHQUFHLEdBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCO3dCQUM3QyxTQUFTLE9BQU8sS0FBSzt3QkFDckIsdUJBQXVCO3dCQUN2QixNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSTt3QkFDaEIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7d0JBQ2pCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTTt3QkFDakMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7d0JBQ2xCLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUNsQix1QkFBdUI7d0JBQ3ZCLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUNsQixRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSTt3QkFDbkIsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7d0JBQ25CLHVCQUF1Qjt3QkFDdkIsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUk7d0JBQ25CLFVBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJO3dCQUNyQixVQUFVLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSTt3QkFDckIsdUJBQXVCO3dCQUN2QixPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUNoQixDQUFDO2lCQUNGO2dCQUNELFdBQUs7b0JBQ0osU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztpQkFDaEQ7WUFDRixDQUFDLENBQUMsQ0FBQztZQUNILFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQixDQUFDO0tBQUE7Q0FDRDtBQWxERCx1QkFrREMifQ==