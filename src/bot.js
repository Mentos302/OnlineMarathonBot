const { Telegraf } = require('telegraf')
const config = require('./config')

const bot = new Telegraf(config.TOKEN)
config.startmsg()

bot.on('message', (ctx) => ctx.reply(ctx.message.text))
bot.catch(e => console.log(e))
bot.launch()