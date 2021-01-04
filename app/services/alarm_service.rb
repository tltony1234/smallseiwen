require 'line/bot'
class AlarmService
    def line
        @line ||= Line::Bot::Client.new{|config|
            config.channel_secret = '*'
            config.channel_token = '*'
        }
    end
    def week(text)
        time = Time.zone.now
        if text =='星期日'
            return 0
        elsif text == '星期天'
            return 0
        elsif text == '星期一'
            return 1
        elsif text == '星期二'
            return 2
        elsif text == '星期三'
            return 3
        elsif text == '星期四'
            return 4
        elsif text == '星期五'
            return 5
        elsif text == '星期六'
            return 6
        elsif text == '禮拜日'
            return 0
        elsif text == '禮拜天'
            return 0
        elsif text == '禮拜一'
            return 1
        elsif text == '禮拜二'
            return 2
        elsif text == '禮拜三'
            return 3
        elsif text == '禮拜四'
            return 4
        elsif text == '禮拜五'
            return 5
        elsif text == '禮拜六'
            return 6
        elsif text == '每天'
            return time.wday
        elsif text == '每日'
            return time.wday
        else
            return nil
        end
    end
    def one
        time = Time.zone.now
        timew = String(time.hour).rjust(2, '0')+'30'
        RemindMapping.where(time:timew).all.each do |remind_mappings| 
            week = remind_mappings.week
            weekn = week(week)
            return nil unless weekn == time.wday
            channel = remind_mappings.channel_id
            channel = remind_mappings.user_id if channel == nil
            remind = remind_mappings.remind
            return nil if remind == nil
            return nil if remind == 'off'    
            message = {
                type: "text",                    
                text: remind
            }
            line.push_message(channel, message)      
        end      
    end
end
