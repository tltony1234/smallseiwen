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
class join {
    constructor() {
        this._command = "join";
    }
    help() {
        return "加入語音頻道";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            if (msgObject.member.voiceChannel) {
                if (!msgObject.guild.voiceConnection) {
                    msgObject.member.voiceChannel.join()
                        .then(connection => {
                        msgObject.channel.send("成功加入！")
                            .then(msg => {
                            msg.delete(5000)
                                .catch(console.error);
                        });
                    });
                }
            }
            else {
                msgObject.channel.send("你必須先加入一個語音頻道");
            }
        });
    }
}
exports.default = join;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9qb2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBR0EsTUFBcUIsSUFBSTtJQUF6QjtRQUNrQixhQUFRLEdBQUcsTUFBTSxDQUFBO0lBMEJuQyxDQUFDO0lBeEJBLElBQUk7UUFDSCxPQUFPLFFBQVEsQ0FBQztJQUNqQixDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWM7UUFDM0IsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWEsRUFBQyxTQUF5QixFQUFDLE1BQXFCOztZQUM3RSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBQztnQkFDaEMsSUFBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFDO29CQUNuQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7eUJBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDbEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzZCQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQ1YsR0FBdUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2lDQUNwQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN2QixDQUFDLENBQUMsQ0FBQztvQkFDSixDQUFDLENBQUMsQ0FBQTtpQkFDSDthQUNEO2lCQUFJO2dCQUNKLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3ZDO1FBQ0YsQ0FBQztLQUFBO0NBQ0Q7QUEzQkQsdUJBMkJDIn0=