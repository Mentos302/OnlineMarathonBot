module.exports = {
    f(params) {
        const spamAddBtns = new params.Scene('spam_addbtns')

        spamAddBtns.enter((ctx) => {
            ctx.reply(params.assets.spamnewbtn(), params.Extra.HTML())
        })
        spamAddBtns.on('message', async(ctx) => {
            let str = ctx.message.text.split('\n')
            let btns = {}
            btns.firstbtntext = str[0].split('-')[0].trim()
            btns.firstbtnlink = str[0].split('-')[1].trim()
            try {
                btns.secondbtntext = str[1].split('-')[0].trim()
                btns.secondbtnlink = str[1].split('-')[1].trim()
                try {
                    btns.thirdbtntext = str[2].split('-')[0].trim()
                    btns.thirdbtnlink = str[2].split('-')[1].trim()
                } catch {
                    btns.thirdbtntext = 0
                    btns.thirdbtnlink = 0
                }
            } catch {
                btns.secondbtntext = 0
                btns.secondbtnlink = 0
            }
            if (btns.thirdbtntext) {
                await ctx.telegram.sendCopy(ctx.from.id, ctx.scene.state.spam_msg, params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.urlButton(btns.firstbtntext, btns.firstbtnlink)],
                        [m.urlButton(btns.secondbtntext, btns.secondbtnlink)],
                        [m.urlButton(btns.thirdbtntext, btns.thirdbtnlink)]
                    ])
                ))
            } else if (btns.secondbtntext) {
                await ctx.telegram.sendCopy(ctx.from.id, ctx.scene.state.spam_msg, params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.urlButton(btns.firstbtntext, btns.firstbtnlink)],
                        [m.urlButton(btns.secondbtntext, btns.secondbtnlink)]
                    ])
                ))
            } else {
                await ctx.telegram.sendCopy(ctx.from.id, ctx.scene.state.spam_msg, params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.urlButton(btns.firstbtntext, btns.firstbtnlink)]
                    ])
                ))
            }
            ctx.scene.state.btns = btns
            ctx.scene.enter(`spam_method`, ctx.scene.state)
        })

        return spamAddBtns
    }
}