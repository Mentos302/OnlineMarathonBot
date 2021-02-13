module.exports = {
    f(params) {
        const regConf = new params.Scene('reg-conf')
        const moment = require('moment')

        regConf.enter((ctx) => {
            let now = moment().format('DD.MM.YYYY');
            params.db.query(params.sql.newUser(ctx, now), function(err, r) {
                if (err) { console.log(err) }
                params.reply.f(ctx, ctx.scene.state.assets[2], 0, params) // Assets ID 3
                params.reply.delay(ctx, ctx.scene.state.assets[3], params) // Assets ID 4
                params.reply.delay(ctx, ctx.scene.state.assets[4], params) // Assets ID 5
                params.reply.delay(ctx, ctx.scene.state.assets[5], params) // Assets ID 6
            })
        })


        return regConf
    }
}