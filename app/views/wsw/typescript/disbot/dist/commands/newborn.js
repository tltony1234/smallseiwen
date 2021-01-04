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
        this._command = "newborn";
    }
    help() {
        return "創角";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            let user_id = msgObject.author.id;
            let user_name = msgObject.author.username;
            const mysql = require('mysql');
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '27351648',
                database: 'discord'
            });
            connection.connect();
            let sql = `SELECT * FROM games WHERE user_id='${user_id}'`;
            connection.query(sql, (error, results) => {
                try {
                    if (results == "") {
                        let ntime = Date.now();
                        newborn(user_id, user_name, ntime, msgObject);
                    }
                    else {
                        msgObject.channel.send(`已創立過角色!`);
                    }
                }
                catch (_a) {
                    msgObject.channel.send(`系統錯誤newborn`);
                }
            });
            connection.end();
        });
    }
}
exports.default = templatecommand;
function newborn(user_id, user_name, ntime, msgObject) {
    const mysql2 = require('mysql');
    const connection2 = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection2.connect();
    let sql2 = `INSERT INTO games(user_id,user_name,user_exp,user_weapon,user_money,user_level,user_job,user_cd,user_mp,user_mpmax,user_skill,user_crit,user_critdmg,user_lastatk,user_map,user_accessories) VALUES ('${user_id}','${user_name}','0','0','0','1','初心者','1','10','10','嫩寶丟擲術','30','1.3',${ntime},'楓之島','0')`;
    let sql3 = `INSERT INTO attack(user_id,master_name,master_hp) VALUES ('${user_id}','嫩寶','0')`;
    let sql4 = `INSERT INTO item(user_id,blue,vitality,morning,dusk,special,super) VALUES ('${user_id}','10','0','0','0','0','0')`;
    connection2.query(sql3);
    connection2.query(sql4);
    connection2.query(sql2, (error, results) => {
        msgObject.channel.send("-------------------\n" +
            `成功創立角色 <@!${user_id}> \n` +
            "-------------------\n" +
            `輸入+game查看角色資訊`);
    });
    connection2.end();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3Ym9ybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9uZXdib3JuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsZUFBZTtJQUFwQztRQUNrQixhQUFRLEdBQUcsU0FBUyxDQUFBO0lBcUN0QyxDQUFDO0lBbkNBLElBQUk7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFDRCxhQUFhLENBQUMsT0FBYztRQUMzQixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2xDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYSxFQUFDLFNBQXlCLEVBQUMsTUFBcUI7O1lBQ3ZFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNsQyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2dCQUN6QyxJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSxTQUFTO2FBQ25CLENBQUMsQ0FBQztZQUNILFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLEdBQUcsR0FBRyxzQ0FBc0MsT0FBTyxHQUFHLENBQUM7WUFDM0QsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsQ0FBQyxLQUFTLEVBQUMsT0FBVyxFQUFDLEVBQUU7Z0JBQzdDLElBQUc7b0JBQ0YsSUFBRyxPQUFPLElBQUUsRUFBRSxFQUFDO3dCQUNkLElBQUksS0FBSyxHQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDckIsT0FBTyxDQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUMzQzt5QkFBSTt3QkFDSixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDbEM7aUJBRUQ7Z0JBQUEsV0FBSztvQkFDTCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDdEM7WUFDRixDQUFDLENBQUMsQ0FBQztZQUNILFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNmLENBQUM7S0FBQTtDQUNKO0FBdENELGtDQXNDQztBQUVELFNBQVMsT0FBTyxDQUFDLE9BQWMsRUFBQyxTQUFnQixFQUFDLEtBQVksRUFBQyxTQUF5QjtJQUN0RixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBQzNDLElBQUksRUFBRSxXQUFXO1FBQ2pCLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLFNBQVM7S0FDbkIsQ0FBQyxDQUFDO0lBQ0gsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLElBQUksSUFBSSxHQUFDLHlNQUF5TSxPQUFPLE1BQU0sU0FBUyw0REFBNEQsS0FBSyxhQUFhLENBQUM7SUFDdlQsSUFBSSxJQUFJLEdBQUMsOERBQThELE9BQU8sYUFBYSxDQUFDO0lBQzVGLElBQUksSUFBSSxHQUFDLCtFQUErRSxPQUFPLDZCQUE2QixDQUFDO0lBQzdILFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLEtBQVMsRUFBQyxPQUFXLEVBQUMsRUFBRTtRQUMvQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUI7WUFDN0MsYUFBYSxPQUFPLE1BQU07WUFDMUIsdUJBQXVCO1lBQ3ZCLGVBQWUsQ0FDZixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDbkIsQ0FBQyJ9