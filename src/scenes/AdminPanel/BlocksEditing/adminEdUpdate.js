module.exports = {
    f(params) {
        const adminEdUpdate = new params.Scene('admin-edupdt')

        adminEdUpdate.enter((ctx) => {
            ctx.reply(params.assets.blockprevw(ctx.scene.state), params.Extra.HTML().markup((m) =>
                m.inlineKeyboard([
                    [m.callbackButton(params.assets.upd1(), `ed1`)],
                    [m.callbackButton(params.assets.upd2(), `ed2`)],
                    [m.callbackButton(params.assets.upd3(), `ed3`)],
                    [m.callbackButton(params.assets.upd4(), `ed4`)],
                    [m.callbackButton(params.assets.upd5(), `ed5`)],
                    [m.callbackButton(params.assets.edexit(), `exit`)],
                ])
            ))
        })
        adminEdUpdate.action('ed1', (ctx) => ctx.scene.enter(`admin-edt-title`, ctx.scene.state))
        adminEdUpdate.action('ed2', (ctx) => ctx.scene.enter(`admin-edt-addbtn`, ctx.scene.state))
        adminEdUpdate.action('ed3', (ctx) => ctx.scene.enter(`admin-edt-btnchoose`, { block: ctx.scene.state, operation: 'edit' }))
        adminEdUpdate.action('ed4', (ctx) => ctx.scene.enter(`admin-edt-btnchoose`, { block: ctx.scene.state, operation: 'delete' }))
        adminEdUpdate.action('ed5', (ctx) => ctx.scene.enter(`admin-edt-delay`, ctx.scene.state))
        adminEdUpdate.action('exit', (ctx) => ctx.scene.enter('admin-edt'))

        return adminEdUpdate
    }
}