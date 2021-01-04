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
class atk {
    constructor() {
        this._command = "atk";
    }
    help() {
        return "攻擊";
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
            let user_level, user_crit, user_critdmg, user_weapon, user_job, user_lastatk;
            let user_cd, user_skill, user_mp, user_exp, user_map, user_money, user_accessories;
            let sql = `select * from games where user_id = '${user_id}'`;
            connection.query(sql, (error, results) => {
                try {
                    let user = Object.values(results[0]);
                    user_id = String(`${user[0]}`);
                    user_level = parseInt(`${user[5]}`);
                    user_crit = parseInt(`${user[11]}`);
                    user_critdmg = parseFloat(`${user[12]}`);
                    user_cd = parseInt(`${user[7]}`);
                    user_weapon = parseInt(`${user[3]}`);
                    user_job = String(`${user[6]}`);
                    user_mp = parseInt(`${user[8]}`);
                    user_exp = parseInt(`${user[2]}`);
                    user_map = String(`${user[14]}`);
                    user_money = parseInt(`${user[4]}`);
                    user_lastatk = parseInt(`${user[13]}`);
                    user_accessories = parseInt(`${user[15]}`);
                    user_skill = String(`${user[10]}`);
                    if (user_lastatk <= Date.now()) {
                        inside(user_id, user_level, user_skill, user_map, msgObject, user_mp, user_weapon, user_crit, user_critdmg, user_cd, user_exp, user_money, user_lastatk, user_accessories);
                    }
                    else {
                        msgObject.channel.send(`<@!${user_id}> 冷卻時間還有 ${(user_lastatk - Date.now()) / 1000} 秒`);
                    }
                }
                catch (_a) {
                    msgObject.channel.send('查無此人，請先創角');
                }
            });
            connection.end();
        });
    }
}
exports.default = atk;
function inside(user_id, user_level, user_skill, user_map, msgObject, user_mp, user_weapon, user_crit, user_critdmg, user_cd, user_exp, user_money, user_lastatk, user_accessories) {
    let sql2 = `select * from skill_mapping where skill_name = '${user_skill}'`;
    let sql3 = `select * from map_mapping where map_name='${user_map}'`;
    let sql4 = `select * from attack where user_id='${user_id}'`;
    let sql7 = `select * from lv_mapping where lv='${user_level}'`;
    const mysql2 = require('mysql');
    const connection2 = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection2.connect();
    let skill_segment, skill_atk, skill_mp, skill_name, map_hig, map_les, map_name, master_hp;
    let master_name, lvup;
    connection2.query(sql2, (error, results) => {
        try {
            let skill = Object.values(results[0]);
            skill_atk = parseInt(`${skill[4]}`);
            skill_mp = parseInt(`${skill[3]}`);
            skill_segment = parseInt(`${skill[2]}`);
            skill_name = user_skill;
        }
        catch (_a) {
            msgObject.channel.send(`系統錯誤skill`);
        }
    });
    connection2.query(sql3, (error, results) => {
        try {
            let map = Object.values(results[0]);
            map_hig = parseInt(`${map[2]}`);
            map_les = parseInt(`${map[1]}`);
            map_name = user_map;
        }
        catch (_a) {
            msgObject.channel.send(`系統錯誤map`);
        }
    });
    connection2.query(sql7, (error, results) => {
        try {
            let lvmap = Object.values(results[0]);
            lvup = parseInt(`${lvmap[1]}`);
        }
        catch (_a) {
            msgObject.channel.send(`系統錯誤lv`);
        }
    });
    connection2.query(sql4, (error, results) => {
        try {
            let atk = Object.values(results[0]);
            master_hp = parseInt(`${atk[2]}`);
            master_name = String(`${atk[1]}`);
            if (master_hp == 0) {
                newatk(user_map, map_hig, map_les, user_mp, skill_mp, user_level, user_weapon, skill_segment, skill_atk, user_crit, user_critdmg, user_id, user_cd, user_exp, user_money, user_lastatk, lvup, msgObject, user_skill, user_accessories);
            }
            else {
                again(user_mp, skill_mp, user_level, user_weapon, skill_segment, skill_atk, user_crit, user_critdmg, user_id, user_cd, user_exp, user_money, user_lastatk, lvup, msgObject, master_hp, master_name, user_skill, user_accessories);
            }
        }
        catch (_a) {
            console.log(`${error}`);
            msgObject.channel.send(`系統錯誤attack`);
        }
    });
    connection2.end();
}
function newatk(user_map, map_hig, map_les, user_mp, skill_mp, user_level, user_weapon, skill_segment, skill_atk, user_crit, user_critdmg, user_id, user_cd, user_exp, user_money, user_lastatk, lvup, msgObject, user_skill, user_accessories) {
    let randnum = random(map_les, map_hig);
    if (user_level - 10 > randnum && randnum > user_level + 20) {
        randnum = user_level + 20;
    }
    let sql5 = `select * from master where master_map='${user_map}' and (master_level = '${randnum}')`;
    const mysql3 = require('mysql');
    const connection3 = mysql3.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection3.connect();
    let master_name, master_hp, master_level, master_exp, master_item, master_droppercent, master_money;
    let atkv, ran, atka, criton, skillon;
    connection3.query(sql5, (error, results) => {
        let master = Object.values(results[0]);
        master_name = String(`${master[0]}`);
        master_hp = parseInt(`${master[1]}`);
        master_level = parseInt(`${master[2]}`);
        master_exp = parseInt(`${master[3]}`);
        master_item = parseInt(`${master[4]}`);
        master_droppercent = parseInt(`${master[5]}`);
        master_money = parseInt(`${master[6]}`);
        ran = random(0, 99);
        if (user_mp > skill_mp) {
            atka = (user_level * 4 + user_weapon) * skill_atk * skill_segment;
            user_mp = user_mp - skill_mp;
            skillon = 1;
        }
        else {
            atka = (user_level * 4 + user_weapon);
            skillon = 0;
        }
        if (ran > user_crit) {
            atkv = atka;
            criton = 0;
        }
        else {
            criton = 1;
            atkv = Math.round(atka * user_critdmg);
        }
        master_hp = master_hp - atkv;
        master_hp <= 0 ? win(user_id, user_cd, user_level, user_exp, user_weapon, user_money, user_lastatk, user_mp, master_droppercent, master_level, master_money, master_name, master_exp, master_item, atkv, msgObject, lvup, user_skill, criton, skillon, user_crit, user_critdmg, user_accessories) : lose(user_id, user_cd, user_lastatk, user_mp, master_name, master_level, master_hp, atkv, msgObject, user_skill, criton, skillon);
    });
    connection3.end();
}
function again(user_mp, skill_mp, user_level, user_weapon, skill_segment, skill_atk, user_crit, user_critdmg, user_id, user_cd, user_exp, user_money, user_lastatk, lvup, msgObject, master_hp, master_name, user_skill, user_accessories) {
    let sql10 = `select * from master where master_name='${master_name}'`;
    const mysql6 = require('mysql');
    const connection6 = mysql6.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection6.connect();
    let atka, atkv, ran, master_exp, master_item, master_droppercent, master_money, master_level, criton, skillon;
    connection6.query(sql10, (error, results) => {
        let master = Object.values(results[0]);
        master_droppercent = parseInt(`${master[5]}`);
        master_money = parseInt(`${master[6]}`);
        master_exp = parseInt(`${master[3]}`);
        master_level = parseInt(`${master[2]}`);
        master_item = parseInt(`${master[4]}`);
        ran = random(0, 99);
        if (user_mp > skill_mp) {
            atka = (user_level * 4 + user_weapon) * skill_atk * skill_segment;
            user_mp = user_mp - skill_mp;
            skillon = 1;
        }
        else {
            atka = (user_level * 4 + user_weapon);
            skillon = 0;
        }
        if (ran >= user_crit) {
            atkv = atka;
            criton = 0;
        }
        else {
            atkv = Math.round(atka * user_critdmg);
            criton = 1;
        }
        master_hp = master_hp - atkv;
        master_hp <= 0 ? win(user_id, user_cd, user_level, user_exp, user_weapon, user_money, user_lastatk, user_mp, master_droppercent, master_level, master_money, master_name, master_exp, master_item, atkv, msgObject, lvup, user_skill, criton, skillon, user_crit, user_critdmg, user_accessories) : lose(user_id, user_cd, user_lastatk, user_mp, master_name, master_level, master_hp, atkv, msgObject, user_skill, criton, skillon);
    });
    connection6.end();
}
function win(user_id, user_cd, user_level, user_exp, user_weapon, user_money, user_lastatk, user_mp, master_droppercent, master_level, master_money, master_name, master_exp, master_item, atkv, msgObject, lvup, user_skill, criton, skillon, user_crit, user_critdmg, user_accessories) {
    const mysql4 = require('mysql');
    const connection4 = mysql4.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection4.connect();
    let drop = random(1, master_droppercent);
    let drop2 = random(1, master_droppercent);
    let dropweapon, dropaccessories;
    let sql6 = `UPDATE attack SET master_hp ='0' WHERE user_id='${user_id}'`;
    connection4.query(sql6, (error, results) => {
        if (drop == master_droppercent) {
            user_weapon += master_item;
            dropweapon = 1;
        }
        else {
            dropweapon = 0;
        }
        if (drop2 == master_droppercent) {
            user_accessories += master_item;
            dropaccessories = 1;
        }
        else {
            dropaccessories = 0;
        }
        user_money += master_money;
        user_exp += master_exp;
        user_cd = 2;
        let ntime = Date.now();
        user_lastatk = ntime + (user_cd * 1000);
        user_crit = Math.floor(user_accessories / 100) + 30;
        if (user_crit >= 100) {
            user_crit = 100;
        }
        if (user_accessories >= 7000) {
            user_critdmg = Math.floor((user_weapon + user_accessories - 7000) / 10000) + 1.3;
        }
        else {
            user_critdmg = Math.floor(user_weapon / 10000) + 1.3;
        }
        if (user_critdmg >= 6) {
            user_critdmg = 6;
        }
        if (user_exp > lvup) {
            user_level += 1;
            user_exp -= lvup;
        }
        winend(user_id, user_cd, user_level, user_exp, user_weapon, user_money, user_lastatk, user_mp, master_level, master_money, master_name, master_exp, master_item, atkv, msgObject, user_skill, criton, skillon, user_crit, user_critdmg, user_accessories, dropweapon, dropaccessories);
    });
    connection4.end();
}
function winend(user_id, user_cd, user_level, user_exp, user_weapon, user_money, user_lastatk, user_mp, master_level, master_money, master_name, master_exp, master_item, atkv, msgObject, user_skill, criton, skillon, user_crit, user_critdmg, user_accessories, dropweapon, dropaccessories) {
    const mysql5 = require('mysql');
    const connection5 = mysql5.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection5.connect();
    let sql8 = `UPDATE games SET user_cd='${user_cd}',user_level = '${user_level}',user_exp='${user_exp}',user_weapon='${user_weapon}',user_money='${user_money}',user_lastatk='${user_lastatk}',user_mp='${user_mp}',user_crit='${user_crit}',user_critdmg='${user_critdmg}',user_accessories='${user_accessories}' WHERE user_id='${user_id}'`;
    let msg;
    connection5.query(sql8, (error, results) => {
        try {
            msg = `<@!${user_id}>\n`;
            msg += `-------------------\n`;
            skillon == 1 ? msg += `使用技能${user_skill}\n` : msg += `使用普通攻擊\n`;
            criton == 1 ? msg += `對 ${master_name} (Lv：${master_level})造成了 **${atkv}** 的爆擊傷害\n` : msg += `對 ${master_name} (Lv：${master_level})造成了 ${atkv} 的傷害\n`;
            msg += `剩餘魔力：${user_mp}\n`;
            msg += `獲得經驗值：${master_exp}\n`;
            msg += `獲得輸輸幣：${master_money}\n`;
            dropweapon == 1 ? msg += `獲得武器： ${master_item}\n` : msg;
            dropaccessories == 1 ? msg += `獲得飾品： ${master_item}\n` : msg;
            msg += `-------------------`;
            msgObject.channel.send(msg);
        }
        catch (_a) {
            msgObject.channel.send(`系統錯誤wined`);
        }
    });
    connection5.end();
}
function lose(user_id, user_cd, user_lastatk, user_mp, master_name, master_level, master_hp, atkv, msgObject, user_skill, criton, skillon) {
    const mysql7 = require('mysql');
    const connection7 = mysql7.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection7.connect();
    let sql11 = `UPDATE attack SET master_name='${master_name}',master_hp='${master_hp}'  WHERE user_id='${user_id}'`;
    connection7.query(sql11, (error, results) => {
        let ntime = Date.now();
        user_cd = 2;
        user_lastatk = ntime + (user_cd * 1000);
        losend(user_id, user_cd, user_lastatk, user_mp, master_name, master_level, master_hp, atkv, msgObject, user_skill, criton, skillon);
    });
    connection7.end();
}
function losend(user_id, user_cd, user_lastatk, user_mp, master_name, master_level, master_hp, atkv, msgObject, user_skill, criton, skillon) {
    const mysql8 = require('mysql');
    const connection8 = mysql8.createConnection({
        host: 'localhost',
        user: 'root',
        password: '27351648',
        database: 'discord'
    });
    connection8.connect();
    let sql12 = `UPDATE games SET user_cd='${user_cd}',user_lastatk='${user_lastatk}',user_mp='${user_mp}' WHERE user_id='${user_id}'`;
    let msg;
    connection8.query(sql12, (error, results) => {
        try {
            msg = `<@!${user_id}>\n`;
            msg += `-------------------\n`;
            skillon == 1 ? msg += `使用技能${user_skill}\n` : msg += `使用普通攻擊\n`;
            criton == 1 ? msg += `對 ${master_name} (Lv：${master_level})造成了 **${atkv}** 的爆擊傷害\n` : msg += `對 ${master_name} (Lv：${master_level})造成了 ${atkv} 的傷害\n`;
            msg += `剩餘魔力：${user_mp}\n`;
            msg += `${master_name} 的血量還剩下 ${master_hp}\n`;
            msg += `-------------------\n`;
            msgObject.channel.send(msg);
        }
        catch (_a) {
            msgObject.channel.send(`系統錯誤losend`);
        }
    });
    connection8.end();
}
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2F0ay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUlBLE1BQXFCLEdBQUc7SUFBeEI7UUFDa0IsYUFBUSxHQUFHLEtBQUssQ0FBQTtJQXVEbEMsQ0FBQztJQXJEQSxJQUFJO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWM7UUFDM0IsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWEsRUFBQyxTQUF5QixFQUFDLE1BQXFCOztZQUM3RSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDbEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDekMsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsU0FBUzthQUNuQixDQUFDLENBQUM7WUFDSCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsSUFBSSxVQUFpQixFQUFDLFNBQWdCLEVBQUMsWUFBbUIsRUFBQyxXQUFrQixFQUFDLFFBQWUsRUFBQyxZQUFtQixDQUFDO1lBQ2xILElBQUksT0FBYyxFQUFDLFVBQWlCLEVBQUMsT0FBYyxFQUFDLFFBQWUsRUFBQyxRQUFlLEVBQUMsVUFBaUIsRUFBQyxnQkFBdUIsQ0FBQztZQUM5SCxJQUFJLEdBQUcsR0FBRyx3Q0FBd0MsT0FBTyxHQUFHLENBQUM7WUFDN0QsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsQ0FBQyxLQUFTLEVBQUMsT0FBVyxF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