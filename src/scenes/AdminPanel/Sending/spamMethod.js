module.exports = {
    f(params) {
        const spamMethod = new params.Scene('spam_method')

        spamMethod.enter((ctx) => {
            ctx.reply(params.assets.spamMethod(), params.Extra.HTML().markup((m) =>
                m.inlineKeyboard([
                    [m.callbackButton(params.assets.method1(), `direct`)],
                    [m.callbackButton(params.assets.method2(), `delay`)],
                    [m.callbackButton(params.assets.edexit(), `exit`)],
                ])
            ))
        })
        spamMethod.action('direct', (ctx) => {
            ctx.scene.enter('spam_confirm', ctx.scene.state)
        })
        spamMethod.action('delay', (ctx) => {
            ctx.reply(params.assets.getsendtime())
        })
        spamMethod.action('exit', (ctx) => {
            ctx.scene.enter('spam_message', ctx.scene.state)
        })
        spamMethod.on('message', (ctx) => {
            let date = {}
            let items = ctx.message.text.split(' ')
            date.min = items[1].split('-')[1]
            date.hour = items[1].split('-')[0]
            date.day = items[0].split('.')[0]
            date.month = items[0].split('.')[1]
            ctx.scene.state.send_date = date

            ctx.scene.enter('spam_confirm', ctx.scene.state)
        })


        return spamMethod
    }
}