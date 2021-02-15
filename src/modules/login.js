module.exports = {
    f(ctx, params) {
        const config = require('../config')

        params.db = config.sqlConnect(ctx.from.first_name);

        params.db.query(params.sql.getClient(ctx.from.id), function(err, r) {
            if (err) { console.log(err.message) }
            params.db.query(params.sql.getAssets(), function(err, res) {
                if (r.length) {
                    params.reply.f(ctx, res[6], 0, params)
                } else {
                    ctx.scene.enter('reg-wlcm', { assets: res })
                }
            })
        })
    }
}