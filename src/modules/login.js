module.exports = {
    f(ctx, params) {
        const config = require('../config')

        params.db = config.sqlConnect();

        params.db.query(params.sql.getClient(ctx.from.id), function(err, r) {
            if (err) { console.log(err.message) }
            params.db.query(params.sql.getAssets(), function(err, res) {
                if (r.length) {
                    ctx.reply(`Підключайся в закритий чат для учасників марафону. Там ти зможеш задавати питання по марафону і спілкуватись з іншими учасниками: t.me/xxxxxxxxxxxx`)
                } else {
                    ctx.scene.enter('reg-wlcm', { assets: res })
                }
            })
        })
    }
}