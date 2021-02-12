module.exports = {
    f(ctx, params) {
        params.db.query(params.sql.getClient(ctx.from.id), function(err, r) {
            if (r.length) {
                console.log('Є ТАКИЙ')
            } else {
                params.db.query(params.sql.getAssets(), function(err, res) {
                    ctx.scene.enter('reg-wlcm', { assets: res })
                })
            }
        })
    }
}