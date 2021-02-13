const { Telegraf } = require('telegraf')
const config = require('./config')
const scenes = require(`./modules/scenes`)
const login = require(`./modules/login`)
const assets = require(`./modules/assets`)
const sql = require(`./modules/sql`)

const bot = new Telegraf(config.TOKEN)
config.startmsg()

let params = { bot, login, assets, sql }

scenes.f(params)
bot.on('message', (ctx) => {
    login.f(ctx, params)
        // ctx.scene.enter('admin-main')
})
bot.on('callback_query', (ctx) => login.f(ctx, params))
bot.catch(e => console.log(e))
bot.launch()