module.exports = {
    f(params) {
        const adminSending = new params.Scene('admin-snd')
        const schedule = require('node-schedule');

        adminSending.enter((ctx) => {
            ctx.reply(params.assets.segmentchoose(), params.Extra.HTML().markup((m) =>
                m.inlineKeyboard([
                    [m.callbackButton(params.assets.segment1(), `whole`)],
                    [m.callbackButton(params.assets.segment2(), `redist_date`)],
                    [m.callbackButton(params.assets.edexit(), `exit`)]
                ])
            ))
        })
        adminSending.action('whole', (ctx) => ctx.scene.enter('spam_audience', { segment: 'whole' }))
        adminSending.action('redist_date', (ctx) => ctx.scene.enter('spam_audience', { segment: 'regist_date' }))
        adminSending.action('exit', (ctx) => ctx.scene.enter('admin-main'))

        return adminSending
    }
}