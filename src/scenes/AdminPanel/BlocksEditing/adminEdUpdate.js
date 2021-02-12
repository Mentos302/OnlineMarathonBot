module.exports = {
    f(params) {
        const adminEdUpdate = new params.Scene('admin-edupdt')

        adminEdUpdate.enter((ctx) => {
            if (ctx.scene.state.cliname) {
                ctx.scene.state.maintextout = `<b>Ім'я клієнта</b>, ` + ctx.scene.state.maintext
                params.db.query(params.sql.changeCliNameAblt(ctx.scene.state.id, true), function(err, r) {
                    preview()
                })
            } else {
                ctx.scene.state.maintextout = ctx.scene.state.maintext
                preview()
            }

            function preview() {
                ctx.reply(params.assets.blockprevw(ctx.scene.state), params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.callbackButton(params.assets.upd1(), `ed1`)],
                        [m.callbackButton(params.assets.upd2(), `ed2`),
                            m.callbackButton(params.assets.upd3(), `ed3`),
                            m.callbackButton(params.assets.upd4(), `ed4`)
                        ],
                        [m.callbackButton(params.assets.addcliname(), `ed6`),
                            m.callbackButton(params.assets.removecliname(), `ed7`)
                        ],
                        [m.callbackButton(params.assets.upd5(), `ed5`),
                            m.callbackButton(params.assets.edexit(), `exit`)
                        ],
                    ])
                ))
            }
        })
        adminEdUpdate.action('ed1', (ctx) => ctx.scene.enter(`admin-edt-title`, ctx.scene.state))
        adminEdUpdate.action('ed2', (ctx) => ctx.scene.enter(`admin-edt-addbtn`, ctx.scene.state))
        adminEdUpdate.action('ed3', (ctx) => ctx.scene.enter(`admin-edt-btnchoose`, { block: ctx.scene.state, operation: 'edit' }))
        adminEdUpdate.action('ed4', (ctx) => ctx.scene.enter(`admin-edt-btnchoose`, { block: ctx.scene.state, operation: 'delete' }))
        adminEdUpdate.action('ed5', (ctx) => ctx.scene.enter(`admin-edt-delay`, ctx.scene.state))
        adminEdUpdate.action('ed6', (ctx) => {
            ctx.scene.state.cliname = true
            ctx.scene.enter(`admin-edupdt`, ctx.scene.state)
        })
        adminEdUpdate.action('ed7', (ctx) => {
            ctx.scene.state.cliname = false
            ctx.scene.state.maintextout = ctx.scene.state.maintext
            params.db.query(params.sql.changeCliNameAblt(ctx.scene.state.id, false), function(err, r) {
                ctx.scene.enter(`admin-edupdt`, ctx.scene.state)
            })
        })
        adminEdUpdate.action('exit', (ctx) => ctx.scene.enter('admin-edt'))

        return adminEdUpdate
    }
}