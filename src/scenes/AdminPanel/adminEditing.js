module.exports = {
    f(params) {
        const adminEditing = new params.Scene('admin-edt')

        adminEditing.enter((ctx) => {
            params.db.query(params.sql.getAssets(), function(err, r) {
                if (err) { console.log(err) }
                ctx.scene.state.blocks = r
                ctx.reply(params.assets.blockchoose(), params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.callbackButton(r[0].maintext, `ed1`)],
                        [m.callbackButton(r[1].maintext, `ed2`)],
                        [m.callbackButton(r[2].maintext, `ed3`)],
                        [m.callbackButton(r[3].maintext, `ed4`)],
                        [m.callbackButton(params.assets.edexit(), `exit`)],
                    ])
                ))
            })
        })
        adminEditing.action('ed1', (ctx) => ctx.scene.enter(`admin-edupdt`, ctx.scene.state.blocks[0]))
        adminEditing.action('ed2', (ctx) => ctx.scene.enter(`admin-edupdt`, ctx.scene.state.blocks[1]))
        adminEditing.action('ed3', (ctx) => ctx.scene.enter(`admin-edupdt`, ctx.scene.state.blocks[2]))
        adminEditing.action('ed4', (ctx) => ctx.scene.enter(`admin-edupdt`, ctx.scene.state.blocks[3]))
        adminEditing.action('exit', (ctx) => ctx.scene.enter('admin-main'))

        return adminEditing
    }
}