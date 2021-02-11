module.exports = {
    f(params) {
        const adminEdTitleChng = new params.Scene('admin-edt-title')

        adminEdTitleChng.enter((ctx) => {
            ctx.reply(params.assets.edttitle())
        })
        adminEdTitleChng.on('text', (ctx) => {
            params.db.query(params.sql.changeBlockTitle(ctx.scene.state.id, ctx.message.text), function(err, r) {
                ctx.scene.state.maintext = ctx.message.text
                ctx.scene.enter('admin-edt')
            })
        })
        adminEdTitleChng.on('message', (ctx) => {
            ctx.scene.reenter('reg-name')
        })

        return adminEdTitleChng
    }
}