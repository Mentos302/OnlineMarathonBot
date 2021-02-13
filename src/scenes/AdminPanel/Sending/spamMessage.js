module.exports = {
    f(params) {
        const spamMessage = new params.Scene('spam_message')

        spamMessage.enter((ctx) => {
            ctx.reply(params.assets.textreq(), params.Extra.HTML().markup((m) =>
                m.inlineKeyboard([
                    [m.callbackButton(params.assets.addcliname(), `addname`)],
                    [m.callbackButton(params.assets.edexit(), `exit`)]
                ])
            ))
        })
        spamMessage.on('message', async(ctx) => {
            if (ctx.scene.state.cliname) {
                // params.db.query(params.sql.getClient(ctx.from.id), function(err, r) {
                ctx.scene.state.spam_msg = ctx.message
                let named = {...ctx.scene.state.spam_msg }
                named.text = `<b>[ Ім'я клієнта ]</b>, ${ctx.scene.state.spam_msg.text}`
                named.caption = `<b>[ Ім'я клієнта ]</b>, ${ctx.scene.state.spam_msg.caption}`
                sendCopy(named)
                    // })
            } else {
                ctx.scene.state.spam_msg = ctx.message
                sendCopy(ctx.scene.state.spam_msg)
            }

            function sendCopy(msg) {
                ctx.telegram.sendCopy(ctx.from.id, msg, params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.callbackButton(params.assets.spam1(), `spam_addbtn`)],
                        [m.callbackButton(params.assets.spam2(), `spam_goon`)],
                        [m.callbackButton(params.assets.edexit(), `exit`)]
                    ])
                ))
            }
        })
        spamMessage.action('spam_addbtn', (ctx) => {
            ctx.scene.enter(`spam_addbtns`, ctx.scene.state)
        })
        spamMessage.action('spam_goon', (ctx) => {
            ctx.scene.enter(`spam_method`, ctx.scene.state)
        })
        spamMessage.action('addname', (ctx) => {
            ctx.scene.state.cliname = true
            ctx.reply(params.assets.textreqwithname(), params.Extra.HTML().markup((m) =>
                m.inlineKeyboard([
                    [m.callbackButton(params.assets.edexit(), `exit`)]
                ])
            ))
        })
        spamMessage.action('exit', (ctx) => {
            ctx.scene.enter('admin-snd')
        })

        return spamMessage
    }
}