module.exports = {
    f(params) {
        const adminLogin = new params.Scene('admin-login')

        adminLogin.enter((ctx) => {
            params.db.query(params.sql.isAdmin(ctx.from.id), function(err, r) {
                if (err) { console.log(err) }
                if (r.length) {
                    ctx.scene.state.admpass = r[0].adm_pass
                    ctx.reply(params.assets.passreq())
                    ctx.scene.state.passtries = 0
                } else {
                    ctx.reply(`NEMA DOSTYPY`)
                }
            })
        })
        adminLogin.on('text', (ctx) => {
            if (ctx.message.text == ctx.scene.state.admpass) {
                console.log(`Admin ${ctx.from.first_name} connected to admin panel`)
                ctx.scene.enter('admin-main')
            } else {
                ctx.scene.state.passtries++
                    if (ctx.scene.state.passtries > 5) {
                        ctx.reply(`HACKER, STOP!`)
                    } else {
                        ctx.reply(params.assets.passreq())
                    }
            }
        })
        adminLogin.on('message', (ctx) => {
            ctx.scene.reenter('admin-login')
        })

        return adminLogin
    }
}