module.exports = {
    async f(params) {
        const session = require('telegraf/session')
        const Stage = require('telegraf/stage')
        params.Scene = require('telegraf/scenes/base')
        params.Extra = require('telegraf/extra')
        params.moment = require('moment')
        params.reply = require('./reply')
        const { enter, leave } = Stage

        // Registration
        const regWelcMsg = require('../scenes/Registration/regWelcMsg').f(params)
        const regName = require('../scenes/Registration/regName').f(params)
        const regConf = require('../scenes/Registration/regConf').f(params)

        // Admin Panel
        const adminLogin = require('../scenes/AdminPanel/adminLogin').f(params)
        const adminMain = require('../scenes/AdminPanel/adminMain').f(params)
        const adminSending = require('../scenes/AdminPanel/adminSending').f(params)
        const adminEditing = require('../scenes/AdminPanel/adminEditing').f(params)
        const adminEdUpdate = require('../scenes/AdminPanel/BlocksEditing/adminEdUpdate').f(params)
        const adminEdTitleChng = require('../scenes/AdminPanel/BlocksEditing/Title/adminEdTitleChng').f(params)
        const adminEdAddBtn = require('../scenes/AdminPanel/BlocksEditing/Add/adminEdAddBtn').f(params)
        const adminEdAddBtnLink = require('../scenes/AdminPanel/BlocksEditing/Add/adminEdAddBtnLink').f(params)
        const adminEdEdBtn = require('../scenes/AdminPanel/BlocksEditing/Editing/adminEdEdBtn').f(params)
        const adminEdEdBtnLink = require('../scenes/AdminPanel/BlocksEditing/Editing/adminEdEdBtnLink').f(params)
        const adminEdDelBtn = require('../scenes/AdminPanel/BlocksEditing/Delete/adminEdDelBtn').f(params)
        const adminEdBtnChoose = require('../scenes/AdminPanel/BlocksEditing/adminEdBtnChoose').f(params)
        const adminEdDelay = require('../scenes/AdminPanel/BlocksEditing/Delay/adminEdDelay').f(params)

        const stage = new Stage([
            regWelcMsg,
            regName,
            regConf,
            adminLogin,
            adminMain,
            adminSending,
            adminEditing,
            adminEdUpdate,
            adminEdTitleChng,
            adminEdAddBtn,
            adminEdAddBtnLink,
            adminEdEdBtn,
            adminEdEdBtnLink,
            adminEdDelBtn,
            adminEdBtnChoose,
            adminEdDelay
        ], { ttl: 120 })

        params.bot.use(session())
        params.bot.use(stage.middleware())
        params.bot.command('admin', (ctx) => ctx.scene.enter('admin-login'))
        params.bot.catch(e => {
            console.log(e)
        })
    }
}