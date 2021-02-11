module.exports = {
    f(params) {
        const adminEdDelay = new params.Scene('admin-edt-delay')

        adminEdDelay.enter((ctx) => {
            ctx.reply(params.assets.delayvalue(ctx.scene.state.delay))
        })
        adminEdDelay.on('text', (ctx) => {
            params.db.query(params.sql.changeDelay(ctx), function(err, r) {
                if (err) { console.log(err.sqlMessage) }
                ctx.scene.enter('admin-edt')
            })
        })
        adminEdDelay.on('message', (ctx) => {
            ctx.scene.reenter('admin-edt-delay', ctx.scene.state)
        })

        return adminEdDelay
    }
}