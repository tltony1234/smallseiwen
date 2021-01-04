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
class leave {
    constructor() {
        this._command = "leave";
    }
    help() {
        return "離開語音頻道";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            if (msgObject.guild.voiceConnection) {
                msgObject.guild.voiceConnection.disconnect();
            }
            else {
                msgObject.channel.send("你必再語音頻道內");
            }
        });
    }
}
exports.default = leave;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbGVhdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQSxNQUFxQixLQUFLO0lBQTFCO1FBQ2tCLGFBQVEsR0FBRyxPQUFPLENBQUE7SUFpQnBDLENBQUM7SUFmQSxJQUFJO1FBQ0gsT0FBTyxRQUFRLENBQUM7SUFDakIsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFjO1FBQzNCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFhLEVBQUMsU0FBeUIsRUFBQyxNQUFxQjs7WUFDN0UsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLElBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUM7Z0JBQ2xDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQzdDO2lCQUFJO2dCQUNKLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ25DO1FBQ0YsQ0FBQztLQUFBO0NBQ0Q7QUFsQkQsd0JBa0JDIn0=