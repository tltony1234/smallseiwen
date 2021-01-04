require 'line/bot'

class WswController < ApplicationController
	protect_from_forgery with: :null_session
	
	def webhook
		Channel.find_or_create_by(channel_id: channel_id)
		reply_text = join(channel_id,memberJoin_text)
		reply_text = other(user_id,received_text) if reply_text.nil?
		reply_text = learn(received_text) if reply_text.nil?
		#reply_text = remind_group(received_text,user_id,channel_s) if reply_text.nil?
		#reply_text = remind_single(received_text,user_id) if reply_text.nil?
		#reply_text = remind_all(received_text,user_id,channel_s) if reply_text.nil?
		#reply_text = remind_updata(received_text,user_id,channel_s) if reply_text.nil?
		#reply_text = remind_del(received_text,user_id,channel_s) if reply_text.nil?
		reply_text = keyword_reply(received_text) if reply_text.nil?
		reply_text = echo2(channel_id, received_text) if reply_text.nil?
		save_to_received(channel_id, received_text)
		save_to_reply(channel_id, reply_text)
		response = reply_to_line(reply_text,channel_id)
		head :ok
	end
	
	def channel_id
		source = params['events'][0]['source']
		return source['groupId'] unless source['groupId'].nil?
		return source['roomId'] unless source['roomId'].nil?
		source['userId']
	end
	def channel_s
		source = params['events'][0]['source']
		return source['groupId'] unless source['groupId'].nil?
		return source['roomId'] unless source['roomId'].nil?
		return nil
	end
	def user_id
		source = params['events'][0]['source']
		source['userId']
	end
	def memberJoin_text
		memberjoin = params['events'][0]['type']
	end
	
	def save_to_received(channel_id, received_text)
		return if received_text.nil?
		Received.create(channel_id: channel_id, text: received_text)
	end
	def join(channel_id,memberJoin_text)
		return nil unless memberJoin_text == 'memberJoined'
		return nil unless channel_id == 'Cfe9136da18bf7966e329389f91ba3962'
		'樣板新人規章'
	end
	def save_to_reply(channel_id, reply_text)
		return if reply_text.nil?
		Reply.create(channel_id: channel_id, text: reply_text)
	end
	
	def echo2(channel_id, received_text)
		return nil if received_text[0] == '!'
		recent_received_texts = Received.where(channel_id: channel_id).last(5)&.pluck(:text)
		return nil unless received_text.in? recent_received_texts
		
		last_reply_text = Reply.where(channel_id: channel_id).last&.text
		return nil if last_reply_text == received_text
		received_text
	end
	
	def received_text
		message = params['events'][0]['message']
		message['text'] unless message.nil?
	end
	def other(user_id,received_text)
		if received_text[0..7] == '!easyfix'
			msg = easyfix(user_id,received_text)
		elsif received_text[0..2] == '入坑點'
			msg = gacha(received_text)
		elsif received_text[0..3] == '打王頻道'
			msg = bosschannel(received_text)
		elsif received_text[0..2] == '亂源 '
			msg = "樣板"+received_text
		elsif received_text == '王團'
			msg = "樣板"+received_text
		elsif received_text == '普王團'
			msg = "樣板"+received_text
		else
			return nil
		end
		msg
	end
	def easyfix(user_id,received_text)
		
		return nil unless received_text[0..7] == '!easyfix'
		if user_id == 'Udf1ba220eaec9f507eec4745579cfc98'
			if received_text == '!easyfix'
				res_num = Received.count()
				rep_num = Reply.count()
				msg = "最大資料行數：10000\n"
				msg += '目前資料行數：'+String(res_num+rep_num)+"\n"
				msg += "droptable  清空資料表 \n"
				msg += "rm 重開叔叔\n"
			elsif
				semicolon_index = received_text.index(' ')
				return nil if semicolon_index.nil?
				received_text = received_text [9..-1]
				if received_text == "droptable"
					Received.delete_all
					Reply.delete_all
					msg = '已清空資料表!'
				elsif received_text == "rm"
					msg = '3秒後叔叔將重開機'
				end
			end
			msg
		elsif user_id == 'U208362ff1fcb33ac45c426d8f55e8e04'
			if received_text == '!easyfix'
				res_num = Received.count()
				rep_num = Reply.count()
				msg = "最大資料行數：10000\n"
				msg += '目前資料行數：'+String(res_num+rep_num)+"\n"
				msg += "droptable  清空資料表 \n"
				msg += "rm 重開叔叔\n"
			elsif
				semicolon_index = received_text.index(' ')
				return nil if semicolon_index.nil?
				received_text = received_text [9..-1]
				if received_text == "droptable"
					Received.delete_all
					Reply.delete_all
					msg = '已清空資料表!'
				elsif received_text == "rm"
					msg = '3秒後叔叔將重開機'
				end
			end
			msg
		else
			return nil
		end
		
		
	end
	def bosschannel(received_text)
		return nil unless received_text[0..3] == '打王頻道'
		if received_text == '打王頻道'
			Time.zone='Taipei'
			time2 = Time.zone.now.to_s[0..9]
			converter = LunarSolarConverter.new
			solar = Solar.new
			solar.solar_year = time2[0..3].to_i
			solar.solar_month = time2[5..6].to_i
			solar.solar_day = time2[8..9].to_i
			dump(solar)
			lunar = converter.solar_to_lunar(solar)
			slunar=lunar.lunar_year.to_s+'-'+lunar.lunar_month.to_s+'-'+lunar.lunar_day.to_s
			randnum = rand(1..30)
			'國曆：'+time2+"\n"+'---------------'+"\n"+'農曆：'+slunar+"\n"+'---------------'+"\n"+'隨機頻道：'+randnum.to_s
		elsif received_text == '打王頻道改'
			Time.zone='Taipei'
			time2 = Time.zone.now.to_s[0..9]
			converter = LunarSolarConverter.new
			solar = Solar.new
			solar.solar_year = time2[0..3].to_i
			solar.solar_month = time2[5..6].to_i
			solar.solar_day = time2[8..9].to_i
			dump(solar)
			lunar = converter.solar_to_lunar(solar)
			slunar=lunar.lunar_year.to_s+'-'+lunar.lunar_month.to_s+'-'+lunar.lunar_day.to_s
			randnum = rand(1..30)
			randnum2 = rand(0..10)
			randnum3 = rand(0..8)
			randnum4 = rand(19..23)
			randnum5 = rand(0..59)
			holy_relic = [
				'身上倒數第2件可丟裝備','查。克羅斯','裝備第2行最後一件可丟裝備','任意武器一把','任意裝備一件',
				'任意口袋道具','核心寶石','10000楓幣','大坨糞便','小坨糞便','河童的黃瓜'
			]
			hard_code = [
				'不開天上','不開任何無敵技能','拔萌獸','不開任何綁王技能(含露耳)','不使用任何現金道具',
				'不能集魂','不使用黑翼','不能穿滅龍','使用10等武器'
			]
			'國曆：'+time2+"\n"+'---------------'+"\n"+'農曆：'+slunar+"\n"+'---------------'+"\n"+'隨機頻道：'+
			randnum.to_s+"\n"+'---------------'+"\n"+'聖遺物：'+holy_relic[randnum2]+"\n"+'---------------'+"\n"+
			'挑戰任務：'+hard_code[randnum3] + "\n" + "---------------\n"+'良辰吉時：' + randnum4.to_s.rjust(2,'0')+'：'+randnum5.to_s.rjust(2,'0')
		else
			return nil
		end
	end
	
	def gacha(received_text)
		return nil unless received_text[0..2] == '入坑點'
		holy_relic = [
			'身上倒數第2件可丟裝備','查。克羅斯','裝備第2行最後一件可丟裝備','任意武器一把','任意裝備一件',
			'任意口袋道具','核心寶石','10000楓幣','大坨糞便','小坨糞便','河童的黃瓜'
		]
		place = [
			'不夜城的天上','精靈之島','偉大的精神降臨','櫻花處','雨霧瀑布',
			'高級桑拿房','天空之塔塔頂','魔法森林上方平台','會地','自由市場最右邊',
			'自由市場最左邊','鯨魚號鳥頭','露希妲裙子下','水井底','金博士旁邊',
			'往天空之城的船上','閒人勿入','瑪雅的家','傑伊的家','武陵道場頂樓',
			'星光之塔頂樓','大木林之巔','勇士之村非洲酋長旁邊','她沉睡的大海','秘密據點',
			'武藤上鎖的地方','相遇之丘','麗娜的家','黑魔法師的研究室','煉金術師的家',
			'德克斯特的實驗室','生命之穴','鏡光神座','小心掉落','巨人的心臟',
			'世界的眼淚','慾望祭壇入口','墜落地點','前哨基地','傾斜之塔',
			'大笨鐘','新葉城','西門町','鯨魚島','太公的渡船',
			'海怒斯洞穴','動力室','大砲室','船長室','遺跡深處',
			'佛堂','垃圾山','機械蜘蛛洞穴','洞穴裡的小洞穴','靠近盡頭之處',
			'黑暗神殿','黑暗王座','開始與結束的邊境','不存在的空間','巴洛古的墳墓',
			'寵物公園','海邊碼頭','黃金寺廟','三扇門','怪物公園',
			'墮落城市後街','詩文的小屋','詩文旁邊','墮落城市醫院','武器庫',
			'秘密花園上層','雪姬的房間','史匹奈爾的森林','鏡子洞窟','長老公館',
			'老婆之屋','英雄之殿','艾利傑的庭園','錯覺的森林','從地圖消失的村莊',
			'凶宅','可怕的橋','克里提亞斯','楓葉丘陵','菇菇神社',
			'狐狸神的寶座','黃金地帶入口','商團秘密接洽地','楓之谷地平線','西格諾斯的庭院',
			'九靈龍巢穴','復活的記憶','遺跡挖掘團營區','森林深處內泉水流經之處','奇怪的海洋',
			'雪原聖地','去秘密祭壇的路','研究所地底秘密通道','非公開的地底通道','試驗之塔入口'
		]
		randnum1 = rand(1..30) 
		randnum2 = rand(0..99)
		randnum3 = rand(0..23)
		randnum4 = rand(0..59)
		randnum5 = rand(0..10)
		if received_text == '入坑點'
			'祝您一抽入魂'+"\n"+'頻道：'+randnum1.to_s+' 地點：'+place[randnum2]
		elsif received_text == '入坑點pro'
			'祝您一抽入魂'+"\n"+'-----------------------'+"\n"+'頻道：'+randnum1.to_s+' 地點：'+place[randnum2]+"\n"+'-----------------------'+"\n"+
			'良辰吉時：' + randnum3.to_s.rjust(2,'0')+'：'+randnum4.to_s.rjust(2,'0')+"\n"+'-----------------------'+"\n"+
			'聖遺物：'+holy_relic[randnum5]
		else
			return nil
		end
	end

	def learn(received_text)
		return nil if received_text.nil?
		return nil unless received_text[0..8] == '麥當勞叔叔說你好 '
		received_text = received_text[9..-1]
		semicolon_index = received_text.index(' ')
		return nil if semicolon_index.nil?
		keyword = received_text[0..semicolon_index-1]
		message = received_text[semicolon_index+1..-1]
		
		
		KeywordMapping.create(keyword: keyword, message: message)
		'可樂好喝'
	end
	def remind_group(received_text,user_id,channel_s)
		return nil unless received_text[0..4] == '群組公告 '
		return nil if channel_s == 'Cfe9136da18bf7966e329389f91ba3962' 
		received_text = received_text[5..-1]
		semicolon_index = received_text.index(' ')
		return nil if semicolon_index.nil?
		week = received_text[0..semicolon_index-1]
		received_text = received_text[semicolon_index+1..-1]
		semicolon_index = received_text.index(' ')
		return nil if semicolon_index.nil?
		time = received_text[0..semicolon_index-1]
		remind = received_text[semicolon_index+1..-1]
		if channel_s == nil 
			RemindMapping.create(time:time,remind:remind,week:week,user_id:user_id)
		else
			RemindMapping.create(time:time,remind:remind,channel_id:channel_s,week:week)
		end
		'放我一個人生活'
	end
	def remind_single(received_text,user_id)
		return nil unless received_text[0..4] == "溫馨提醒 "
		received_text = received_text[5..-1]
		semicolon_index = received_text.index(' ')
		return nil if semicolon_index.nil?
		week = received_text[0..semicolon_index-1]
		received_text = received_text[semicolon_index+1..-1]
		semicolon_index = received_text.index(' ')
		return nil if semicolon_index.nil?
		time = received_text[0..semicolon_index-1]
		remind = received_text[semicolon_index+1..-1]
		RemindMapping.create(time:time,remind:remind,week:week,user_id:user_id)
		'我可以跟在你身後'
	end
	def remind_updata(received_text,user_id,channel_s)
		return nil unless received_text[0..4] == '修改公告 '
		received_text = received_text[5..-1]
		semicolon_index = received_text.index(' ')
		return nil if semicolon_index.nil?
		id = received_text[0..semicolon_index-1]
		remind = received_text[semicolon_index+1..-1]
		if channel_s == nil
			upda=RemindMapping.find_by(id:id,user_id:user_id)
			upda.remind = remind
			upda.save
		else
			upda=RemindMapping.find_by(id:id,channel_id:channel_s)
			upda.remind = remind
			upda.save
		end
		
		'已修改公告No.'+String(id)
	end
	def remind_all(received_text,user_id,channel_s)
		return nil unless received_text[0..3] == '查詢公告'
		msg=''
		if channel_s == nil
			RemindMapping.where(user_id:user_id).all.each do |remind_mappings|
				id = remind_mappings.id
				week = remind_mappings.week
				time = remind_mappings.time
				remind = remind_mappings.remind
				msg = msg + String(id)+". "+week+" - "+time+" - 個人公告："+remind+"\n\n"
			end
		else
			RemindMapping.where(channel_id:channel_s).all.each do |remind_mappings|
				id = remind_mappings.id
				week = remind_mappings.week
				time = remind_mappings.time
				remind = remind_mappings.remind
				msg = msg + String(id)+". "+week+" - "+time+" - 群組公告："+remind+"\n\n"
			end
		end
		msg
	end
	def remind_del(received_text,user_id,channel_s)
		return nil unless received_text[0..4] == '刪除公告 '
		if channel_s == nil
			id = received_text[5..-1]
			upda=RemindMapping.find_by(id:id,user_id:user_id)
			upda.delete
			'已刪除公告No.'+String(id)
		else
			id = received_text[5..-1]
			upda=RemindMapping.find_by(id:id,channel_id:channel_s)
			upda.delete
			'已刪除公告No.'+String(id)
		end	
		
	end
	def keyword_reply(received_text)
		KeywordMapping.where(keyword: received_text).last&.message
	end
	def reply_to_line(reply_text,channel_id)
		return nil if reply_text.nil?
		reply_token = params['events'][0]['replyToken']
		if reply_text[-7..-6]== '貼圖'
			as=reply_text[-5..-4]
			bs=reply_text[-3..-1]
			if reply_text.length== 7	
				message= {
					type: 'sticker',
					packageId: as,
					stickerId: bs
				}
				line.reply_message(reply_token, message)
			else
				message= [{
					type: 'text',
					text: reply_text[0..-8]
				},{
					type: 'sticker',
					packageId: as,
					stickerId: bs
				}]
				line.reply_message(reply_token, message)
			end
		elsif reply_text[-15..-14]== '動圖'
			aw=reply_text[-13..-9]
			bw=reply_text[-8..-1]
			if reply_text.length== 15
				message= {
					type: 'sticker',
					packageId: aw,
					stickerId: bw
				}
				line.reply_message(reply_token, message)
			else
				message= [{
					type: 'text',
					text: reply_text[0..-16]
				},{
					type: 'sticker',
					packageId: aw,
					stickerId: bw
				}]
				line.reply_message(reply_token, message)
			end
		elsif reply_text[0..2] == "圖片 " 
			reply_text = reply_text[3..-1]
			semicolon_index = reply_text.index(" ")
			if semicolon_index == nil
				message = {
					type: 'image',
					originalContentUrl: reply_text ,
					previewImageUrl: reply_text
				}
				line.reply_message(reply_token, message)
			else
				msg = reply_text[0..semicolon_index-1]
				reply_text = reply_text[semicolon_index+1..-1]
				semicolon_index = reply_text.index(" ")
				if semicolon_index == nil
					originalContentUrl = reply_text
					message = [{
						type: 'text',
						text: msg
					},{
						type: 'image',
						originalContentUrl: originalContentUrl ,
						previewImageUrl: originalContentUrl
					}]
				else
					originalContentUrl_1 = reply_text[0..semicolon_index-1]
					reply_text = reply_text[semicolon_index+1..-1]
					semicolon_index = reply_text.index(" ")
					if semicolon_index == nil
						originalContentUrl_2 = reply_text
						message = [{
							type: 'text',
							text: msg
						},{
							type:'image',
							originalContentUrl: originalContentUrl_1 ,
							previewImageUrl: originalContentUrl_1
						},{
							type:'image',
							originalContentUrl: originalContentUrl_2 ,
							previewImageUrl: originalContentUrl_2
						}]
					else
						originalContentUrl_2 = reply_text[0..semicolon_index-1]
						reply_text = reply_text[semicolon_index+1..-1]
						semicolon_index = reply_text.index(" ")
						if semicolon_index == nil
							originalContentUrl_3 = reply_text
							message = [{
								type: 'text',
								text: msg
							},{
								type:'image',
								originalContentUrl: originalContentUrl_1 ,
								previewImageUrl: originalContentUrl_1
							},{
								type:'image',
								originalContentUrl: originalContentUrl_2 ,
								previewImageUrl: originalContentUrl_2
							},{
								type:'image',
								originalContentUrl: originalContentUrl_3 ,
								previewImageUrl: originalContentUrl_3
							}]
						else
							originalContentUrl_3 = reply_text[0..semicolon_index-1]
							originalContentUrl_4 = reply_text[semicolon_index+1..-1]
							message =  [{
								type: 'text',
								text: msg
							},{
								type:'image',
								originalContentUrl: originalContentUrl_1 ,
								previewImageUrl: originalContentUrl_1
							},{
								type:'image',
								originalContentUrl: originalContentUrl_2 ,
								previewImageUrl: originalContentUrl_2
							},{
								type:'image',
								originalContentUrl: originalContentUrl_3 ,
								previewImageUrl: originalContentUrl_3
							},{
								type:'image',
								originalContentUrl: originalContentUrl_4 ,
								previewImageUrl: originalContentUrl_4
							}]
						end
					end
				end
				line.reply_message(reply_token, message)
			end
		elsif reply_text == "樣板推廣"
			msgd = KeywordMapping.where(keyword: '王團').last&.message
			msgs = KeywordMapping.where(keyword: '普王團').last&.message
			urld = KeywordMapping.where(keyword: '王團連結').last&.message
			urls = KeywordMapping.where(keyword: '普王團連結').last&.message
			message = {
				type: "flex",
				altText: '推廣',
				contents: {
					"type": "bubble",
					"body": {
					  "type": "box",
					  "layout": "vertical",
					  "contents": [
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "text",
							  "text": "🎶 Discord 🎶",
							  "size": "xl",
							  "weight": "bold",
							  "gravity": "center",
							  "align": "center"
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "text",
							  "size": "md",
							  "weight": "bold",
							  "gravity": "center",
							  "align": "start",
							  "wrap": true,
							  "text": "Discord是我們用的語音軟體，通常大家打王或是聊天會使用到。裡面有播歌機器人，有時也會有人開直播。\n#加入後記得知會下會長副會長領麥當當身份組\n#當然也不強迫開麥"
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "點擊前往",
								  "gravity": "center",
								  "align": "center",
								  "size": "xl",
								  "weight": "bold",
								  "decoration": "underline",
								  "color": "#0000E3",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": "https://discord.gg/uq3hhTV"
								  }
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ],
						  "borderWidth": "3px",
						  "borderColor": "#000000",
						  "backgroundColor": "#FFDAC8"
						},
						{
						  "type": "separator",
						  "color": "#000000",
						  "margin": "md"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "text",
							  "text": "⚔ 困王團 ⚔",
							  "size": "xl",
							  "gravity": "center",
							  "align": "center",
							  "weight": "bold"
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "text",
							  "size": "md",
							  "weight": "bold",
							  "gravity": "center",
							  "align": "start",
							  "wrap": true,
							  "text": msgd
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "檢視王團表單",
								  "gravity": "center",
								  "align": "center",
								  "size": "xl",
								  "weight": "bold",
								  "decoration": "underline",
								  "color": "#0000E3",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": urld
								  }
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ],
						  "borderWidth": "3px",
						  "borderColor": "#000000",
						  "backgroundColor": "#FFDAC8"
						},
						{
						  "type": "separator",
						  "color": "#000000",
						  "margin": "md"
						},
						{
						  "type": "separator",
						  "color": "#000000",
						  "margin": "none"
						},
						{
						  "type": "separator",
						  "color": "#000000",
						  "margin": "none"
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "text",
							  "text": "🗡 普王團 🗡",
							  "size": "xl",
							  "gravity": "center",
							  "align": "center",
							  "weight": "bold"
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "text",
							  "size": "md",
							  "weight": "bold",
							  "gravity": "center",
							  "align": "start",
							  "wrap": true,
							  "text": msgs
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "普通王團群組\n(只能使用手機加入呦)",
								  "gravity": "center",
								  "align": "center",
								  "size": "xl",
								  "wrap": true,
								  "weight": "bold",
								  "decoration": "underline",
								  "color": "#0000E3",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": urls
								  }
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ],
						  "borderWidth": "3px",
						  "borderColor": "#000000",
						  "backgroundColor": "#FFDAC8"
						}
					  ]
					}
				  }
			}
			line.reply_message(reply_token, message)
		elsif reply_text == "樣板指令列表"
			message = {
				type: "flex",
				altText: '指令列表',
				contents: {
					"type": "bubble",
					"body": {
					  "type": "box",
					  "layout": "vertical",
					  "contents": [
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "text",
							  "text": "指令列表",
							  "size": "xl",
							  "weight": "bold",
							  "gravity": "center",
							  "align": "center"
							}
						  ]
						},
						{
						  "type": "separator",
						  "color": "#000000",
						  "margin": "md"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "box",
						  "layout": "horizontal",
						  "contents": [
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "新人\n規章",
								  "action": {
									"type": "message",
									"label": "新人規章",
									"text": "新人規章"
								  },
								  "align": "center",
								  "gravity": "center",
								  "weight": "bold",
								  "decoration": "underline",
								  "color": "#0000E3",
								  "size": "lg",
								  "wrap": true
								}
							  ],
							  "borderWidth": "2px",
							  "borderColor": "#000000",
							  "backgroundColor": "#FFD2D2"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "指令\n列表",
								  "gravity": "center",
								  "align": "center",
								  "weight": "bold",
								  "action": {
									"type": "message",
									"label": "指令列表",
									"text": "指令列表"
								  },
								  "decoration": "underline",
								  "color": "#0000E3",
								  "wrap": true,
								  "size": "lg"
								}
							  ],
							  "borderWidth": "2px",
							  "borderColor": "#000000",
							  "backgroundColor": "#FFD2D2",
							  "margin": "md"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "Boss\n攻略",
								  "action": {
									"type": "message",
									"label": "Boss攻略",
									"text": "Boss攻略"
								  },
								  "gravity": "center",
								  "align": "center",
								  "decoration": "underline",
								  "weight": "bold",
								  "color": "#0000E3",
								  "wrap": true,
								  "size": "lg"
								}
							  ],
							  "borderColor": "#000000",
							  "borderWidth": "2px",
							  "backgroundColor": "#FFD2D2",
							  "margin": "md"
							}
						  ],
						  "margin": "md"
						},
						{
						  "type": "box",
						  "layout": "horizontal",
						  "contents": [
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "五轉\n攻略",
								  "action": {
									"type": "message",
									"label": "五轉攻略",
									"text": "五轉攻略"
								  },
								  "align": "center",
								  "gravity": "center",
								  "weight": "bold",
								  "decoration": "underline",
								  "color": "#0000E3",
								  "size": "lg",
								  "wrap": true
								}
							  ],
							  "borderWidth": "2px",
							  "borderColor": "#000000",
							  "backgroundColor": "#FFD2D2"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "帳號\n防護",
								  "gravity": "center",
								  "align": "center",
								  "weight": "bold",
								  "action": {
									"type": "message",
									"label": "帳號防護",
									"text": "帳號防護"
								  },
								  "decoration": "underline",
								  "color": "#0000E3",
								  "wrap": true,
								  "size": "lg"
								}
							  ],
							  "borderWidth": "2px",
							  "borderColor": "#000000",
							  "backgroundColor": "#FFD2D2",
							  "margin": "md"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "打王\n頻道",
								  "action": {
									"type": "message",
									"label": "打王頻道",
									"text": "打王頻道"
								  },
								  "gravity": "center",
								  "align": "center",
								  "decoration": "underline",
								  "weight": "bold",
								  "color": "#0000E3",
								  "wrap": true,
								  "size": "lg"
								}
							  ],
							  "borderColor": "#000000",
							  "borderWidth": "2px",
							  "backgroundColor": "#FFD2D2",
							  "margin": "md"
							}
						  ],
						  "margin": "md"
						},
						{
						  "type": "box",
						  "layout": "horizontal",
						  "contents": [
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "尋找\n幹部",
								  "action": {
									"type": "message",
									"label": "找幹部",
									"text": "找幹部"
								  },
								  "align": "center",
								  "gravity": "center",
								  "weight": "bold",
								  "decoration": "underline",
								  "color": "#0000E3",
								  "size": "lg",
								  "wrap": true
								}
							  ],
							  "borderWidth": "2px",
							  "borderColor": "#000000",
							  "backgroundColor": "#FFD2D2"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "安安\n你好",
								  "gravity": "center",
								  "align": "center",
								  "weight": "bold",
								  "action": {
									"type": "message",
									"label": "安安",
									"text": "安安"
								  },
								  "decoration": "underline",
								  "color": "#0000E3",
								  "wrap": true,
								  "size": "lg"
								}
							  ],
							  "borderWidth": "2px",
							  "borderColor": "#000000",
							  "backgroundColor": "#FFD2D2",
							  "margin": "md"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "溫馨\n會地",
								  "action": {
									"type": "message",
									"label": "會地",
									"text": "會地"
								  },
								  "gravity": "center",
								  "align": "center",
								  "decoration": "underline",
								  "weight": "bold",
								  "color": "#0000E3",
								  "wrap": true,
								  "size": "lg"
								}
							  ],
							  "borderColor": "#000000",
							  "borderWidth": "2px",
							  "backgroundColor": "#FFD2D2",
							  "margin": "md"
							}
						  ],
						  "margin": "md"
						},
						{
						  "type": "box",
						  "layout": "horizontal",
						  "contents": [
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "Qrcord\nqrcord",
								  "action": {
									"type": "message",
									"label": "qrcord",
									"text": "qrcord"
								  },
								  "align": "center",
								  "gravity": "center",
								  "weight": "bold",
								  "decoration": "underline",
								  "color": "#0000E3",
								  "size": "lg",
								  "wrap": true
								}
							  ],
							  "borderWidth": "2px",
							  "borderColor": "#000000",
							  "backgroundColor": "#FFD2D2"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "Discord\ndiscord",
								  "gravity": "center",
								  "align": "center",
								  "weight": "bold",
								  "action": {
									"type": "message",
									"label": "discord",
									"text": "discord"
								  },
								  "decoration": "underline",
								  "color": "#0000E3",
								  "wrap": true,
								  "size": "lg"
								}
							  ],
							  "borderWidth": "2px",
							  "borderColor": "#000000",
							  "backgroundColor": "#FFD2D2",
							  "margin": "md"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "歡迎\n光臨",
								  "action": {
									"type": "message",
									"label": "歡迎",
									"text": "歡迎"
								  },
								  "gravity": "center",
								  "align": "center",
								  "decoration": "underline",
								  "weight": "bold",
								  "color": "#0000E3",
								  "wrap": true,
								  "size": "lg"
								}
							  ],
							  "borderColor": "#000000",
							  "borderWidth": "2px",
							  "backgroundColor": "#FFD2D2",
							  "margin": "md"
							}
						  ],
						  "margin": "md"
						},
						{
						  "type": "box",
						  "layout": "horizontal",
						  "contents": [
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "如何\n請假",
								  "action": {
									"type": "message",
									"label": "請假",
									"text": "請假"
								  },
								  "align": "center",
								  "gravity": "center",
								  "weight": "bold",
								  "decoration": "underline",
								  "color": "#0000E3",
								  "size": "lg",
								  "wrap": true
								}
							  ],
							  "borderWidth": "2px",
							  "borderColor": "#000000",
							  "backgroundColor": "#FFD2D2"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "公會\n王團",
								  "gravity": "center",
								  "align": "center",
								  "weight": "bold",
								  "action": {
									"type": "message",
									"label": "王團",
									"text": "王團"
								  },
								  "decoration": "underline",
								  "color": "#0000E3",
								  "wrap": true,
								  "size": "lg"
								}
							  ],
							  "borderWidth": "2px",
							  "borderColor": "#000000",
							  "backgroundColor": "#FFD2D2",
							  "margin": "md"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "入坑\n地點",
								  "action": {
									"type": "message",
									"label": "入坑點",
									"text": "入坑點"
								  },
								  "gravity": "center",
								  "align": "center",
								  "decoration": "underline",
								  "weight": "bold",
								  "color": "#0000E3",
								  "wrap": true,
								  "size": "lg"
								}
							  ],
							  "borderColor": "#000000",
							  "borderWidth": "2px",
							  "backgroundColor": "#FFD2D2",
							  "margin": "md"
							}
						  ],
						  "margin": "md"
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "text",
							  "text": "許願\n池子",
							  "size": "lg",
							  "color": "#0000E3",
							  "gravity": "center",
							  "align": "center",
							  "weight": "bold",
							  "decoration": "underline",
							  "action": {
								"type": "message",
								"label": "許願池",
								"text": "許願池"
							  },
							  "wrap": true
							}
						  ],
						  "margin": "md",
						  "borderWidth": "2px",
						  "borderColor": "#000000",
						  "backgroundColor": "#FFD2D2"
						}
					  ]
					}
				  }
			}
			line.reply_message(reply_token, message)
		elsif reply_text == "樣板Boss攻略"
			message = {
				type: "flex",
				altText: 'Boss攻略',
				contents: {
					"type": "bubble",
					"body": {
					  "type": "box",
					  "layout": "vertical",
					  "contents": [
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "Boss攻略",
								  "size": "xl",
								  "color": "#BB5E00",
								  "weight": "bold",
								  "align": "center",
								  "gravity": "center"
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "text",
								  "size": "xl",
								  "color": "#0072E3",
								  "weight": "bold",
								  "align": "center",
								  "gravity": "center",
								  "text": "Boss血量",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": "https://goo.gl/cjUHeP"
								  }
								},
								{
								  "type": "text",
								  "size": "xl",
								  "color": "#9F4D95",
								  "weight": "bold",
								  "align": "center",
								  "gravity": "center",
								  "text": "部分影片",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": "https://goo.gl/ad2QGj"
								  }
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "text",
								  "size": "xl",
								  "color": "#BB5E00",
								  "weight": "bold",
								  "align": "center",
								  "gravity": "center",
								  "text": "四王",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": "https://goo.gl/ZiekBV"
								  }
								},
								{
								  "type": "text",
								  "size": "xl",
								  "color": "#F75000",
								  "weight": "bold",
								  "align": "center",
								  "gravity": "center",
								  "text": "戴米安",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": "https://goo.gl/XbP4ck"
								  }
								},
								{
								  "type": "text",
								  "size": "xl",
								  "color": "#00BB00",
								  "weight": "bold",
								  "align": "center",
								  "gravity": "center",
								  "text": "史烏",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": "https://goo.gl/nS3VfU"
								  }
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "text",
								  "size": "xl",
								  "color": "#FF0080",
								  "weight": "bold",
								  "align": "center",
								  "gravity": "center",
								  "text": "露希妲",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": "https://goo.gl/GqkxRW"
								  }
								},
								{
								  "type": "text",
								  "size": "xl",
								  "color": "#4B0091",
								  "weight": "bold",
								  "align": "center",
								  "gravity": "center",
								  "text": "威爾",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": "https://goo.gl/41tKGf"
								  }
								},
								{
								  "type": "text",
								  "size": "xl",
								  "color": "#CE0000",
								  "weight": "bold",
								  "align": "center",
								  "gravity": "center",
								  "text": "真希拉",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": "https://goo.gl/nuXri6"
								  }
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ]
						}
					  ]
					}
				  }
			}
			line.reply_message(reply_token, message)
		elsif reply_text == "樣板五轉攻略"
			message = {
				type: "flex",
				altText: '五轉攻略',
				contents: {
					"type": "bubble",
					"body": {
					  "type": "box",
					  "layout": "vertical",
					  "contents": [
						{
						  "type": "box",
						  "layout": "horizontal",
						  "contents": [
							{
							  "type": "text",
							  "text": "🛠",
							  "align": "center",
							  "gravity": "center",
							  "size": "xl",
							  "style": "normal",
							  "weight": "bold"
							},
							{
							  "type": "text",
							  "text": "五",
							  "align": "center",
							  "gravity": "center",
							  "size": "xl",
							  "style": "normal",
							  "weight": "bold",
							  "color": "#000000"
							},
							{
							  "type": "text",
							  "text": "轉",
							  "align": "center",
							  "gravity": "center",
							  "size": "xl",
							  "style": "normal",
							  "weight": "bold",
							  "color": "#000000"
							},
							{
							  "type": "text",
							  "text": "攻",
							  "align": "center",
							  "gravity": "center",
							  "size": "xl",
							  "style": "normal",
							  "weight": "bold",
							  "color": "#000000"
							},
							{
							  "type": "text",
							  "text": "略",
							  "align": "center",
							  "gravity": "center",
							  "size": "xl",
							  "style": "normal",
							  "weight": "bold",
							  "color": "#000000"
							},
							{
							  "type": "text",
							  "text": "🛠",
							  "align": "center",
							  "gravity": "center",
							  "size": "xl",
							  "style": "normal",
							  "weight": "bold"
							}
						  ]
						},
						{
						  "type": "separator",
						  "margin": "md",
						  "color": "#000000"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "box",
								  "layout": "vertical",
								  "contents": [
									{
									  "type": "spacer"
									},
									{
									  "type": "text",
									  "text": "五轉流程",
									  "weight": "bold",
									  "decoration": "underline",
									  "align": "center",
									  "gravity": "center",
									  "size": "lg",
									  "color": "#0000E3",
									  "action": {
										"type": "uri",
										"label": "action",
										"uri": "https://forum.gamer.com.tw/C.php?bsn=7650&snA=1001822"
									  }
									},
									{
									  "type": "spacer"
									}
								  ],
								  "borderWidth": "2px",
								  "borderColor": "#000000",
								  "backgroundColor": "#FFFFCE"
								},
								{
								  "type": "box",
								  "layout": "vertical",
								  "contents": [
									{
									  "type": "spacer"
									},
									{
									  "type": "text",
									  "text": "V技選擇",
									  "align": "center",
									  "gravity": "center",
									  "weight": "bold",
									  "decoration": "underline",
									  "size": "lg",
									  "color": "#FF0000",
									  "action": {
										"type": "uri",
										"label": "action",
										"uri": "https://goo.gl/8xmBKE"
									  }
									},
									{
									  "type": "spacer"
									}
								  ],
								  "borderWidth": "2px",
								  "borderColor": "#000000",
								  "backgroundColor": "#BBFFBB"
								}
							  ]
							},
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "box",
								  "layout": "vertical",
								  "contents": [
									{
									  "type": "spacer"
									},
									{
									  "type": "text",
									  "text": "V技強化",
									  "weight": "bold",
									  "decoration": "underline",
									  "align": "center",
									  "gravity": "center",
									  "size": "lg",
									  "color": "#F75000",
									  "action": {
										"type": "uri",
										"label": "action",
										"uri": "https://goo.gl/Gg1XhY"
									  }
									},
									{
									  "type": "spacer"
									}
								  ],
								  "borderWidth": "2px",
								  "borderColor": "#000000",
								  "backgroundColor": "#FBFBFF"
								},
								{
								  "type": "box",
								  "layout": "vertical",
								  "contents": [
									{
									  "type": "spacer"
									},
									{
									  "type": "text",
									  "text": "V三技",
									  "align": "center",
									  "gravity": "center",
									  "weight": "bold",
									  "decoration": "underline",
									  "size": "lg",
									  "color": "#FF0080",
									  "action": {
										"type": "uri",
										"label": "action",
										"uri": "https://goo.gl/TN3fMh"
									  }
									},
									{
									  "type": "spacer"
									}
								  ],
								  "borderWidth": "2px",
								  "borderColor": "#000000",
								  "backgroundColor": "#FFF7FF"
								}
							  ],
							  "margin": "lg"
							},
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "box",
								  "layout": "vertical",
								  "contents": [
									{
									  "type": "spacer"
									},
									{
									  "type": "text",
									  "text": "祕法符文",
									  "weight": "bold",
									  "decoration": "underline",
									  "align": "center",
									  "gravity": "center",
									  "size": "lg",
									  "color": "#4F9D9D",
									  "action": {
										"type": "uri",
										"label": "action",
										"uri": "https://ppt.cc/fxFb5x"
									  }
									},
									{
									  "type": "spacer"
									}
								  ],
								  "borderWidth": "2px",
								  "borderColor": "#000000",
								  "backgroundColor": "#F5FFE8"
								},
								{
								  "type": "box",
								  "layout": "vertical",
								  "contents": [
									{
									  "type": "spacer"
									},
									{
									  "type": "text",
									  "text": "V四技",
									  "align": "center",
									  "gravity": "center",
									  "weight": "bold",
									  "decoration": "underline",
									  "size": "lg",
									  "color": "#FF0000"
									},
									{
									  "type": "spacer"
									}
								  ],
								  "borderWidth": "2px",
								  "borderColor": "#000000",
								  "backgroundColor": "#BBFFBB"
								}
							  ],
							  "margin": "lg"
							}
						  ],
						  "margin": "md"
						}
					  ]
					}
				  }
			}
			line.reply_message(reply_token, message)
		elsif reply_text == "樣板新人規章"
			msgd = KeywordMapping.where(keyword: '王團').last&.message
			urld = KeywordMapping.where(keyword: '王團連結').last&.message
			message = [{
				type: "flex",
				altText: '新人規章',
				contents: {
					"type": "bubble",
					"body": {
					  "type": "box",
					  "layout": "vertical",
					  "contents": [
						{
						  "type": "box",
						  "layout": "horizontal",
						  "contents": [
							{
							  "type": "text",
							  "size": "xxl",
							  "text": "⭐"
							},
							{
							  "type": "text",
							  "text": "新",
							  "size": "xxl",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center"
							},
							{
							  "type": "text",
							  "text": "人",
							  "size": "xxl",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center"
							},
							{
							  "type": "text",
							  "text": "規",
							  "align": "center",
							  "gravity": "center",
							  "weight": "bold",
							  "size": "xxl"
							},
							{
							  "type": "text",
							  "text": "章",
							  "align": "center",
							  "gravity": "center",
							  "weight": "bold",
							  "size": "xxl"
							},
							{
							  "type": "text",
							  "text": "⭐",
							  "size": "xxl"
							}
						  ]
						},
						{
						  "type": "separator",
						  "color": "#000000",
						  "margin": "md"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "新人注意以下事項",
								  "weight": "bold",
								  "size": "xl",
								  "gravity": "center",
								  "align": "center"
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "box",
								  "layout": "vertical",
								  "contents": [
									{
									  "type": "text",
									  "weight": "bold",
									  "size": "lg",
									  "text": "📝點我\n填寫ID\n對應表單",
									  "wrap": true,
									  "gravity": "center",
									  "align": "center",
									  "action": {
										"type": "uri",
										"label": "action",
										"uri": "https://goo.gl/forms/UcFzfQYEXAcEU4Sk1"
									  },
									  "color": "#FF0080",
									  "decoration": "underline"
									}
								  ],
								  "borderWidth": "2px",
								  "borderColor": "#000000",
								  "backgroundColor": "#ECFFFF"
								},
								{
								  "type": "box",
								  "layout": "vertical",
								  "contents": [
									{
									  "type": "text",
									  "weight": "bold",
									  "size": "lg",
									  "text": "🔎點我\n檢視ID\n對應表單",
									  "wrap": true,
									  "align": "center",
									  "gravity": "center",
									  "action": {
										"type": "uri",
										"label": "action",
										"uri": "https://goo.gl/At84T6"
									  },
									  "color": "#F75000",
									  "decoration": "underline"
									}
								  ],
								  "borderWidth": "2px",
								  "borderColor": "#000000",
								  "backgroundColor": "#FFD2D2"
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "text",
								  "weight": "bold",
								  "size": "lg",
								  "text": "內有Discord\n點我前往",
								  "wrap": true,
								  "gravity": "center",
								  "align": "center",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": "https://discord.gg/uq3hhTV"
								  },
								  "color": "#7289da",
								  "decoration": "underline"
								}
							  ],
							  "borderWidth": "2px",
							  "borderColor": "#000000"
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "text",
								  "text": "❣",
								  "gravity": "center",
								  "align": "center",
								  "weight": "bold",
								  "color": "#FF0000",
								  "size": "lg"
								},
								{
								  "type": "text",
								  "weight": "bold",
								  "size": "lg",
								  "text": "基",
								  "wrap": true,
								  "gravity": "center",
								  "align": "center",
								  "color": "#64A600"
								},
								{
								  "type": "text",
								  "weight": "bold",
								  "size": "lg",
								  "text": "本",
								  "wrap": true,
								  "gravity": "center",
								  "align": "center",
								  "color": "#64A600"
								},
								{
								  "type": "text",
								  "weight": "bold",
								  "size": "lg",
								  "text": "會",
								  "wrap": true,
								  "gravity": "center",
								  "align": "center",
								  "color": "#64A600"
								},
								{
								  "type": "text",
								  "weight": "bold",
								  "size": "lg",
								  "text": "規",
								  "wrap": true,
								  "gravity": "center",
								  "align": "center",
								  "color": "#64A600"
								},
								{
								  "type": "text",
								  "text": "❣",
								  "gravity": "center",
								  "align": "center",
								  "weight": "bold",
								  "color": "#FF0000",
								  "size": "lg"
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "image",
							  "url": "https://i.imgur.com/pAGOu8N.png",
							  "gravity": "center",
							  "align": "center",
							  "size": "full"
							},
							{
							  "type": "spacer",
							  "size": "lg"
							}
						  ]
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "text",
								  "text": "❣",
								  "gravity": "center",
								  "align": "center",
								  "weight": "bold",
								  "color": "#FF0000",
								  "size": "lg"
								},
								{
								  "type": "text",
								  "weight": "bold",
								  "size": "lg",
								  "text": "給",
								  "wrap": true,
								  "gravity": "center",
								  "align": "center",
								  "color": "#64A600"
								},
								{
								  "type": "text",
								  "weight": "bold",
								  "size": "lg",
								  "text": "新",
								  "wrap": true,
								  "gravity": "center",
								  "align": "center",
								  "color": "#64A600"
								},
								{
								  "type": "text",
								  "weight": "bold",
								  "size": "lg",
								  "text": "人",
								  "wrap": true,
								  "gravity": "center",
								  "align": "center",
								  "color": "#64A600"
								},
								{
								  "type": "text",
								  "weight": "bold",
								  "size": "lg",
								  "text": "的",
								  "wrap": true,
								  "gravity": "center",
								  "align": "center",
								  "color": "#64A600"
								},
								{
								  "type": "text",
								  "weight": "bold",
								  "size": "lg",
								  "text": "懶",
								  "wrap": true,
								  "gravity": "center",
								  "align": "center",
								  "color": "#64A600"
								},
								{
								  "type": "text",
								  "weight": "bold",
								  "size": "lg",
								  "text": "人",
								  "wrap": true,
								  "gravity": "center",
								  "align": "center",
								  "color": "#64A600"
								},
								{
								  "type": "text",
								  "weight": "bold",
								  "size": "lg",
								  "text": "包",
								  "wrap": true,
								  "gravity": "center",
								  "align": "center",
								  "color": "#64A600"
								},
								{
								  "type": "text",
								  "text": "❣",
								  "gravity": "center",
								  "align": "center",
								  "weight": "bold",
								  "color": "#FF0000",
								  "size": "lg"
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "box",
								  "layout": "vertical",
								  "contents": [
									{
									  "type": "text",
									  "text": "💰新手\n賺錢教學",
									  "align": "center",
									  "gravity": "center",
									  "weight": "bold",
									  "color": "#7E3D76",
									  "size": "xl",
									  "action": {
										"type": "uri",
										"label": "action",
										"uri": "https://goo.gl/EjRAum"
									  },
									  "wrap": true,
									  "decoration": "underline"
									}
								  ],
								  "borderWidth": "2px",
								  "borderColor": "#000000",
								  "backgroundColor": "#FFF8D7"
								},
								{
								  "type": "box",
								  "layout": "vertical",
								  "contents": [
									{
									  "type": "text",
									  "text": "👑新手\n配裝教學",
									  "align": "center",
									  "gravity": "center",
									  "weight": "bold",
									  "color": "#FF5809",
									  "size": "xl",
									  "action": {
										"type": "uri",
										"label": "action",
										"uri": "https://goo.gl/nj9KNQ"
									  },
									  "wrap": true,
									  "decoration": "underline"
									}
								  ],
								  "borderWidth": "2px",
								  "borderColor": "#000000",
								  "backgroundColor": "#ECECFF"
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "text",
								  "text": "⚠ 買裝前貼群詢問，保障你我",
								  "size": "md",
								  "weight": "bold",
								  "align": "center",
								  "gravity": "center",
								  "color": "#FF0000",
								  "decoration": "underline"
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ]
						}
					  ]
					}
				  }
			},{
				type: "flex",
				altText: '新人規章',
				contents: {
					"type": "bubble",
					"body": {
					  "type": "box",
					  "layout": "vertical",
					  "contents": [
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "text",
							  "text": "⚔ 困王團 ⚔",
							  "size": "xl",
							  "gravity": "center",
							  "align": "center",
							  "weight": "bold"
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "text",
							  "size": "md",
							  "weight": "bold",
							  "gravity": "center",
							  "align": "start",
							  "wrap": true,
							  "text": msgd
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "檢視王團表單",
								  "gravity": "center",
								  "align": "center",
								  "size": "xl",
								  "weight": "bold",
								  "decoration": "underline",
								  "color": "#0000E3",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": urld
								  }
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ],
						  "borderWidth": "3px",
						  "borderColor": "#000000",
						  "backgroundColor": "#FFDAC8"
						}
					  ]
					}
				}
			}
			]
			line.reply_message(reply_token, message)
		elsif reply_text == "呼叫彥超"
			message = {
				type: "flex",
				altText: '@YenChao',
				contents: {
					"type": "bubble",
					"body": {
					  "type": "box",
					  "layout": "vertical",
					  "contents": [
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "box",
							  "layout": "horizontal",
							  "contents": [
								{
								  "type": "box",
								  "layout": "vertical",
								  "contents": [
									{
									  "type": "text",
									  "text": "炒飯不要加辣",
									  "align": "center",
									  "gravity": "center",
									  "action": {
										"type": "message",
										"label": "@YenChao",
										"text": "@YenChao"
									  }
									}
								  ]
								},
								{
								  "type": "box",
								  "layout": "vertical",
								  "contents": [
									{
									  "type": "text",
									  "text": "@YenChao",
									  "gravity": "center",
									  "align": "start",
									  "action": {
										"type": "message",
										"label": "@YenChao",
										"text": "@YenChao"
									  },
									  "decoration": "underline",
									  "color": "#0072E3"
									}
								  ]
								}
							  ]
							}
						  ]
						}
					  ]
					}
				  }
			}
			line.reply_message(reply_token, message)
		elsif reply_text == '樣板傳授問題'
			message ={
				type: "flex",
				altText: '傳授v3',
				contents: {
					"type": "bubble",
					"body": {
					  "type": "box",
					  "layout": "vertical",
					  "contents": [
						{
						  "type": "box",
						  "layout": "horizontal",
						  "contents": [
							{
							  "type": "text",
							  "text": "傳",
							  "gravity": "center",
							  "align": "center",
							  "weight": "bold",
							  "size": "lg"
							},
							{
							  "type": "text",
							  "text": "授",
							  "gravity": "center",
							  "align": "center",
							  "weight": "bold",
							  "size": "lg"
							},
							{
							  "type": "text",
							  "text": "問",
							  "gravity": "center",
							  "align": "center",
							  "weight": "bold",
							  "size": "lg"
							},
							{
							  "type": "text",
							  "text": "題",
							  "gravity": "center",
							  "align": "center",
							  "weight": "bold",
							  "size": "lg"
							},
							{
							  "type": "text",
							  "text": "!",
							  "gravity": "center",
							  "align": "center",
							  "weight": "bold",
							  "size": "lg"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "image",
							  "url": "https://i.imgur.com/Y8MrZkO.jpg",
							  "align": "center",
							  "gravity": "center",
							  "size": "full"
							}
						  ],
						  "margin": "md"
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "image",
							  "url": "https://i.imgur.com/taQFulx.jpg",
							  "align": "center",
							  "gravity": "center",
							  "size": "full"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "image",
							  "url": "https://i.imgur.com/EFPt9Nd.jpg",
							  "align": "center",
							  "gravity": "center",
							  "size": "full"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "image",
							  "url": "https://i.imgur.com/bZyNyr6.jpg",
							  "align": "center",
							  "gravity": "center",
							  "size": "full"
							}
						  ]
						}
					  ]
					}
				  }
			}
			line.reply_message(reply_token, message) 
		elsif reply_text == "樣板王團"
			msgd = KeywordMapping.where(keyword: "王團").last&.message
			urld = KeywordMapping.where(keyword: "王團連結").last&.message
			message = {
				type: "flex",
				altText: '王團',
				contents:{
					"type": "bubble",
					"body": {
					  "type": "box",
					  "layout": "vertical",
					  "contents": [
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "text",
							  "text": "⚔ 困王團 ⚔",
							  "size": "xl",
							  "gravity": "center",
							  "align": "center",
							  "weight": "bold"
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "text",
							  "size": "md",
							  "weight": "bold",
							  "gravity": "center",
							  "align": "start",
							  "wrap": true,
							  "text": msgd
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "檢視王團表單",
								  "gravity": "center",
								  "align": "center",
								  "size": "xl",
								  "weight": "bold",
								  "decoration": "underline",
								  "color": "#0000E3",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": urld
								  }
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ],
						  "borderWidth": "3px",
						  "borderColor": "#000000",
						  "backgroundColor": "#FFDAC8"
						}
					  ]
					}
				}
			}
			line.reply_message(reply_token, message)
		elsif reply_text == "樣板普王團"
			msgs = KeywordMapping.where(keyword: "普王團").last&.message
			urls = KeywordMapping.where(keyword: "普王團連結").last&.message
			message = {
				type: "flex",
				altText: '王團',
				contents:{
					"type": "bubble",
					"body": {
					  "type": "box",
					  "layout": "vertical",
					  "contents": [
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "text",
							  "text": "🗡 普王團 🗡",
							  "size": "xl",
							  "gravity": "center",
							  "align": "center",
							  "weight": "bold"
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "text",
							  "size": "md",
							  "weight": "bold",
							  "gravity": "center",
							  "align": "start",
							  "wrap": true,
							  "text": msgs
							},
							{
							  "type": "spacer"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "spacer"
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": "檢視王團表單",
								  "gravity": "center",
								  "align": "center",
								  "size": "xl",
								  "weight": "bold",
								  "decoration": "underline",
								  "color": "#0000E3",
								  "action": {
									"type": "uri",
									"label": "action",
									"uri": urls
								  }
								}
							  ]
							},
							{
							  "type": "spacer"
							}
						  ],
						  "borderWidth": "3px",
						  "borderColor": "#000000",
						  "backgroundColor": "#FFDAC8"
						}
					  ]
					}
				}
			}
			line.reply_message(reply_token, message)
		elsif reply_text[0..4] == "樣板亂源 "
			name = reply_text[5..-1]
			time = Time.zone.now.to_s[0..9]
			message ={
				type: "flex",
				altText: '亂源證書',
				contents: {
					"type": "bubble",
					"body": {
					  "type": "box",
					  "layout": "vertical",
					  "contents": [
						{
						  "type": "box",
						  "layout": "horizontal",
						  "contents": [
							{
							  "type": "text",
							  "text": "🥇",
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center"
							},
							{
							  "type": "text",
							  "text": "亂",
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center"
							},
							{
							  "type": "text",
							  "text": "源",
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center"
							},
							{
							  "type": "text",
							  "text": "證",
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center"
							},
							{
							  "type": "text",
							  "text": "書",
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center"
							},
							{
							  "type": "text",
							  "text": "🥇",
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center"
							}
						  ]
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "text",
							  "text": "本會會員",
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center",
							  "wrap": true
							},
							{
							  "type": "text",
							  "text": name,
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center",
							  "wrap": true
							},
							{
							  "type": "text",
							  "text": "長期在公會作亂",
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center",
							  "wrap": true
							},
							{
							  "type": "text",
							  "text": "成為一位合格的亂源",
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center",
							  "wrap": true
							},
							{
							  "type": "text",
							  "text": "特別頒發此證",
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center",
							  "wrap": true
							},
							{
							  "type": "text",
							  "text": "(價值100振興券)",
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center",
							  "wrap": true
							},
							{
							  "type": "text",
							  "text": "以玆鼓勵",
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center",
							  "wrap": true
							},
							{
							  "type": "text",
							  "text": "會長：YC,黃"+time,
							  "size": "lg",
							  "weight": "bold",
							  "align": "center",
							  "gravity": "center",
							  "wrap": true
							}
						  ],
						  "borderWidth": "2px",
						  "margin": "md",
						  "borderColor": "#000000"
						}
					  ]
					}
				  }
			}
			line.reply_message(reply_token, message)
		elsif reply_text == "樣板1"
			title = KeywordMapping.where(keyword: "樣板1標題").last&.message
			flextext = KeywordMapping.where(keyword: "樣板1內容").last&.message
			message ={
				type: "flex",
				altText: title,
				contents: {
					"type": "bubble",
					"body": {
					  "type": "box",
					  "layout": "vertical",
					  "contents": [
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": title,
								  "size": "xl",
								  "margin": "none",
								  "weight": "bold",
								  "style": "normal",
								  "align": "center",
								  "gravity": "center",
								  "wrap": true
								}
							  ],
							  "borderWidth": "none"
							}
						  ]
						},
						{
						  "type": "separator",
						  "color": "#000000",
						  "margin": "md"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "separator",
						  "color": "#000000"
						},
						{
						  "type": "box",
						  "layout": "vertical",
						  "contents": [
							{
							  "type": "box",
							  "layout": "vertical",
							  "contents": [
								{
								  "type": "text",
								  "text": flextext,
								  "weight": "bold",
								  "wrap": true
								}
							  ],
							  "margin": "md"
							}
						  ]
						}
					  ]
					}
				  }
			}
			line.reply_message(reply_token, message)
		else
			message= {
				type: 'text',
				text: reply_text
			}	
			line.reply_message(reply_token, message)
		end	 
	end
	def	line
		@line ||= Line::Bot::Client.new{|config|
		config.channel_secret = '*'
		config.channel_token = '*'	
		}
	end

	def boss2
	end
	def dump(obj)
		puts "["
		obj.instance_variables.map{ |var| puts [var, obj.instance_variable_get(var)].join(": ") }
		puts "]"
	end
end

class Lunar
	attr_accessor :lunar_day, :lunar_month, :lunar_year, :is_leap
	def initialize(y = 0, m = 0, d = 0, leap = false)
	  	@lunar_year = y
	  	@lunar_month = m
	  	@lunar_day = d
	  	@is_leap = leap
	end
end
  
class Solar
	attr_accessor :solar_day, :solar_month, :solar_year
	def initialize(y = 0, m = 0, d = 0)
	  	@solar_year = y
	  	@solar_month = m
	  	@solar_day = d
	end
end

class LunarSolarConverter
	LUNAR_MONTH_DAYS = [
		1887, 0x1694, 0x16aa, 0x4ad5, 0xab6, 0xc4b7, 0x4ae, 0xa56, 0xb52a, 0x1d2a, 0xd54, 0x75aa, 0x156a, 0x1096d,
		0x95c, 0x14ae, 0xaa4d, 0x1a4c, 0x1b2a, 0x8d55, 0xad4, 0x135a, 0x495d, 0x95c, 0xd49b, 0x149a, 0x1a4a, 0xbaa5,
		0x16a8, 0x1ad4, 0x52da, 0x12b6, 0xe937, 0x92e, 0x1496, 0xb64b, 0xd4a, 0xda8, 0x95b5, 0x56c, 0x12ae, 0x492f,
		0x92e, 0xcc96, 0x1a94, 0x1d4a, 0xada9, 0xb5a, 0x56c, 0x726e, 0x125c, 0xf92d, 0x192a, 0x1a94, 0xdb4a, 0x16aa,
		0xad4, 0x955b, 0x4ba, 0x125a, 0x592b, 0x152a, 0xf695, 0xd94, 0x16aa, 0xaab5, 0x9b4, 0x14b6, 0x6a57, 0xa56,
		0x1152a, 0x1d2a, 0xd54, 0xd5aa, 0x156a, 0x96c, 0x94ae, 0x14ae, 0xa4c, 0x7d26, 0x1b2a, 0xeb55, 0xad4, 0x12da,
		0xa95d, 0x95a, 0x149a, 0x9a4d, 0x1a4a, 0x11aa5, 0x16a8, 0x16d4, 0xd2da, 0x12b6, 0x936, 0x9497, 0x1496, 0x1564b,
		0xd4a, 0xda8, 0xd5b4, 0x156c, 0x12ae, 0xa92f, 0x92e, 0xc96, 0x6d4a, 0x1d4a, 0x10d65, 0xb58, 0x156c, 0xb26d,
		0x125c, 0x192c, 0x9a95, 0x1a94, 0x1b4a, 0x4b55, 0xad4, 0xf55b, 0x4ba, 0x125a, 0xb92b, 0x152a, 0x1694, 0x96aa,
		0x15aa, 0x12ab5, 0x974, 0x14b6, 0xca57, 0xa56, 0x1526, 0x8e95, 0xd54, 0x15aa, 0x49b5, 0x96c, 0xd4ae, 0x149c,
		0x1a4c, 0xbd26, 0x1aa6, 0xb54, 0x6d6a, 0x12da, 0x1695d, 0x95a, 0x149a, 0xda4b, 0x1a4a, 0x1aa4, 0xbb54, 0x16b4,
		0xada, 0x495b, 0x936, 0xf497, 0x1496, 0x154a, 0xb6a5, 0xda4, 0x15b4, 0x6ab6, 0x126e, 0x1092f, 0x92e, 0xc96,
		0xcd4a, 0x1d4a, 0xd64, 0x956c, 0x155c, 0x125c, 0x792e, 0x192c, 0xfa95, 0x1a94, 0x1b4a, 0xab55, 0xad4, 0x14da,
		0x8a5d, 0xa5a, 0x1152b, 0x152a, 0x1694, 0xd6aa, 0x15aa, 0xab4, 0x94ba, 0x14b6, 0xa56, 0x7527, 0xd26, 0xee53,
		0xd54, 0x15aa, 0xa9b5, 0x96c, 0x14ae, 0x8a4e, 0x1a4c, 0x11d26, 0x1aa4, 0x1b54, 0xcd6a, 0xada, 0x95c, 0x949d,
		0x149a, 0x1a2a, 0x5b25, 0x1aa4, 0xfb52, 0x16b4, 0xaba, 0xa95b, 0x936, 0x1496, 0x9a4b, 0x154a, 0x136a5, 0xda4,
		0x15ac
	]

	SOLAR11 = [
		1887, 0xec04c, 0xec23f, 0xec435, 0xec649, 0xec83e, 0xeca51, 0xecc46, 0xece3a, 0xed04d, 0xed242, 0xed436,
		0xed64a, 0xed83f, 0xeda53, 0xedc48, 0xede3d, 0xee050, 0xee244, 0xee439, 0xee64d, 0xee842, 0xeea36, 0xeec4a,
		0xeee3e, 0xef052, 0xef246, 0xef43a, 0xef64e, 0xef843, 0xefa37, 0xefc4b, 0xefe41, 0xf0054, 0xf0248, 0xf043c,
		0xf0650, 0xf0845, 0xf0a38, 0xf0c4d, 0xf0e42, 0xf1037, 0xf124a, 0xf143e, 0xf1651, 0xf1846, 0xf1a3a, 0xf1c4e,
		0xf1e44, 0xf2038, 0xf224b, 0xf243f, 0xf2653, 0xf2848, 0xf2a3b, 0xf2c4f, 0xf2e45, 0xf3039, 0xf324d, 0xf3442,
		0xf3636, 0xf384a, 0xf3a3d, 0xf3c51, 0xf3e46, 0xf403b, 0xf424e, 0xf4443, 0xf4638, 0xf484c, 0xf4a3f, 0xf4c52,
		0xf4e48, 0xf503c, 0xf524f, 0xf5445, 0xf5639, 0xf584d, 0xf5a42, 0xf5c35, 0xf5e49, 0xf603e, 0xf6251, 0xf6446,
		0xf663b, 0xf684f, 0xf6a43, 0xf6c37, 0xf6e4b, 0xf703f, 0xf7252, 0xf7447, 0xf763c, 0xf7850, 0xf7a45, 0xf7c39,
		0xf7e4d, 0xf8042, 0xf8254, 0xf8449, 0xf863d, 0xf8851, 0xf8a46, 0xf8c3b, 0xf8e4f, 0xf9044, 0xf9237, 0xf944a,
		0xf963f, 0xf9853, 0xf9a47, 0xf9c3c, 0xf9e50, 0xfa045, 0xfa238, 0xfa44c, 0xfa641, 0xfa836, 0xfaa49, 0xfac3d,
		0xfae52, 0xfb047, 0xfb23a, 0xfb44e, 0xfb643, 0xfb837, 0xfba4a, 0xfbc3f, 0xfbe53, 0xfc048, 0xfc23c, 0xfc450,
		0xfc645, 0xfc839, 0xfca4c, 0xfcc41, 0xfce36, 0xfd04a, 0xfd23d, 0xfd451, 0xfd646, 0xfd83a, 0xfda4d, 0xfdc43,
		0xfde37, 0xfe04b, 0xfe23f, 0xfe453, 0xfe648, 0xfe83c, 0xfea4f, 0xfec44, 0xfee38, 0xff04c, 0xff241, 0xff436,
		0xff64a, 0xff83e, 0xffa51, 0xffc46, 0xffe3a, 0x10004e, 0x100242, 0x100437, 0x10064b, 0x100841, 0x100a53,
		0x100c48, 0x100e3c, 0x10104f, 0x101244, 0x101438, 0x10164c, 0x101842, 0x101a35, 0x101c49, 0x101e3d, 0x102051,
		0x102245, 0x10243a, 0x10264e, 0x102843, 0x102a37, 0x102c4b, 0x102e3f, 0x103053, 0x103247, 0x10343b, 0x10364f,
		0x103845, 0x103a38, 0x103c4c, 0x103e42, 0x104036, 0x104249, 0x10443d, 0x104651, 0x104846, 0x104a3a, 0x104c4e,
		0x104e43, 0x105038, 0x10524a, 0x10543e, 0x105652, 0x105847, 0x105a3b, 0x105c4f, 0x105e45, 0x106039, 0x10624c,
		0x106441, 0x106635, 0x106849, 0x106a3d, 0x106c51, 0x106e47, 0x10703c, 0x10724f, 0x107444, 0x107638, 0x10784c,
		0x107a3f, 0x107c53, 0x107e48
	]

	def lunar_to_solar(lunar)
	  	offset = 0
	  	days = LUNAR_MONTH_DAYS[lunar.lunar_year - LUNAR_MONTH_DAYS.first]
	  	leap = get_bit_int(days, 4, 13)
	  	loopend = leap
  
	  	unless lunar.is_leap
			loopend = if lunar.lunar_month <= leap || leap == 0
				lunar.lunar_month - 1
			else
				lunar.lunar_month
			end
	  	end
	  	(0..loopend-1).each do |i|
			tmp_offset = get_bit_int(days, 1, 12 - i) == 1 ? 30 : 29
			offset += tmp_offset
	  	end
		offset += lunar.lunar_day
		solar11 = SOLAR11[lunar.lunar_year - SOLAR11.first]
	 	y = get_bit_int(solar11, 12, 9)
	  	m = get_bit_int(solar11, 4, 5)
	  	d = get_bit_int(solar11, 5, 0)
	  	solar_from_int(solar_to_int(y, m, d) + offset - 1)
	end

	def solar_to_lunar(solar)
	  	lunar = Lunar.new(0, 0, 0, false)
	  	index = solar.solar_year - SOLAR11.first
	  	data = (solar.solar_year << 9) | (solar.solar_month << 5) | solar.solar_day
	  	index -= 1 if SOLAR11[index] > data
	  	solar11 = SOLAR11[index]
	  	y = get_bit_int(solar11, 12, 9)
	  	m = get_bit_int(solar11, 4, 5)
	  	d = get_bit_int(solar11, 5, 0)
	  	offset = solar_to_int(solar.solar_year, solar.solar_month, solar.solar_day) - solar_to_int(y, m, d)
	  	days = LUNAR_MONTH_DAYS[index]
	  	leap = get_bit_int(days, 4, 13)
	  	lunar_year = index + SOLAR11.first
	  	lunar_month = 1
	  	offset += 1
	  	(0..12).each do |i|
			dm = get_bit_int(days, 1, 12 - i) == 1 ? 30 : 29
			break if dm >= offset
			lunar_month += 1
			offset -= dm
	 	end
	  	lunar.lunar_year = lunar_year
	  	lunar.lunar_month = lunar_month
	  	lunar.lunar_day = offset.to_i
	  	lunar.is_leap = false
	  	if leap != 0 && lunar_month > leap
			lunar.lunar_month = lunar_month - 1
  
			lunar.is_leap = true if lunar_month == leap + 1
	  	end
	  	lunar
	end

	private

	def get_bit_int(data, length, shift)
		(data & (((1 << length) - 1) << shift)) >> shift
	end

	def solar_to_int(y, m, d)
	  	m = (m + 9) % 12
	  	y -= m / 10
	  	365 * y + y / 4 - y / 100 + y / 400 + (m * 306 + 5) / 10 + (d - 1)
	end

	def solar_from_int(g)
		y = (10000 * g + 14780) / 3652425
		ddd = g - (365 * y + y / 4 - y / 100 + y / 400)
		if ddd < 0
			y -= 1
			ddd = g - (365 * y + y / 4 - y / 100 + y / 400)
		end
		mi = (100 * ddd + 52) / 3060
		mm = (mi + 2) % 12 + 1
		y += (mi + 2) / 12
		dd = ddd - (mi * 306 + 5) / 10 + 1
		Solar.new(y, mm, dd)
	end
  end