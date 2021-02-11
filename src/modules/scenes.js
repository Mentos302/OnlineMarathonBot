module.exports = {
    async f(params) {
        const session = require('telegraf/session')
        const Stage = require('telegraf/stage')
        params.Scene = require('telegraf/scenes/base')
        params.Extra = require('telegraf/extra')
        params.reply = require('./reply')
        const { enter, leave } = Stage

        // Registration
        const regWelcMsg = require('../scenes/Registration/regWelcMsg').f(params)
        const regName = require('../scenes/Registration/regName').f(params)
        const regConf = require('../scenes/Registration/regConf').f(params)

        // Admin Panel
        const adminLogin = require('../scenes/AdminPanel/adminLogin').f(params)
        const adminMain = require('../scenes/AdminPanel/adminMain').f(params)

        const stage = new Stage([regWelcMsg, regName, regConf, adminLogin, adminMain], { ttl: 120 })
        params.bot.use(session())
        params.bot.use(stage.middleware())
        params.bot.command('admin', (ctx) => ctx.scene.enter('admin-login'))
        params.bot.catch(e => {
            console.log(e)
        })
    }
}