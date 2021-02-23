module.exports = {
    f(params) {
        const spamConfirmation = new params.Scene('spam_confirm')
        const spamAction = require('./spamAction')

        spamConfirmation.enter((ctx) => {
            if (ctx.scene.state.send_date) {
                ctx.reply(params.assets.spamconfirmdelay(ctx.scene.state), params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.callbackButton(params.assets.conf(), `confirmdel`)],
                        [m.callbackButton(params.assets.edexit(), `exit`)],
                    ])
                ))
            } else {
                ctx.reply(params.assets.spamconfirmdir(ctx.scene.state), params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.callbackButton(params.assets.conf(), `confirmdir`)],
                        [m.callbackButton(params.assets.edexit(), `exit`)],
                    ])
                ))
            }
        })
        spamConfirmation.action('confirmdel', async(ctx) => {
            if (ctx.scene.state.cliname == undefined) { ctx.scene.state.cliname = false }
            if (ctx.scene.state.btns == undefined) { ctx.scene.state.btns = false }
            params.db.query(params.sql.newDelay(ctx.scene.state), async function(err, res) {
                if (err) { console.log(err) }
                await spamAction.delay(ctx, params, ctx.scene.state.send_date)
                ctx.reply(params.assets.spamdelback(ctx.scene.state), params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.callbackButton(params.assets.confapprove(), `getback`)]
                    ])
                ))
            })
        })
        spamConfirmation.action('confirmdir', (ctx) => {
            spamAction.f(ctx, params)
            ctx.reply(params.assets.spamdirback(ctx.scene.state), params.Extra.HTML().markup((m) =>
                m.inlineKeyboard([
                    [m.callbackButton(params.assets.confapprove(), `getback`)]
                ])
            ))
        })
        spamConfirmation.action('exit', (ctx) => {
            ctx.scene.enter('spam_method', ctx.scene.state)
        })
        spamConfirmation.action('getback', (ctx) => {
            ctx.scene.enter('admin-main')
        })

        return spamConfirmation
    }
}