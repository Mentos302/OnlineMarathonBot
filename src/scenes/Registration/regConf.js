module.exports = {
    f(params) {
        const regConf = new params.Scene('reg-conf')

        regConf.enter((ctx) => {
            let now = new Date().toLocaleDateString();
            params.db.query(params.sql.newUser(ctx, now), function(err, r) {
                if (err) { console.log(err) }
                params.reply.delay(ctx, ctx.scene.state.assets[3]) // Assets ID 4
            })
        })


        return regConf
    }
}