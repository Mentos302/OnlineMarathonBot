module.exports = {
    f(params) {
        const adminMain = new params.Scene('admin-main')

        adminMain.enter((ctx) => {
            let now = params.moment().format('DD.MM.YYYY')
            params.db.query(params.sql.todaysUsers(now), function(err, r) {
                if (err) { console.log(err) }
                ctx.reply(params.assets.admmain(ctx, r, now), params.Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.callbackButton(params.assets.adminbtn1(), `editing`)],
                        [m.callbackButton(params.assets.adminbtn2(), `sending`)],
                    ])
                ))
            })
        })
        adminMain.action('editing', (ctx) => ctx.scene.enter(`admin-edt`))
        adminMain.action('sending', (ctx) => ctx.scene.enter(`admin-snd`))

        return adminMain
    }
}