module.exports = {
    f(params) {
        const adminEdDelBtn = new params.Scene('admin-edt-delbtn')

        adminEdDelBtn.enter((ctx) => {
            console.log(ctx.scene.state)
            if (ctx.scene.state.actionbtn == 'firstbtn') {
                params.db.query(params.sql.castlingClean(ctx.scene.state.block), function(err, r) {
                    if (err) { console.log(err.sqlMessage) }
                    params.db.query(params.sql.castling(ctx.scene.state.block), function(err, r) {
                        if (err) { console.log(err.sqlMessage) }
                        ctx.scene.enter('admin-edt')
                    })
                })
            } else if (ctx.scene.state.actionbtn == 'secondbtn') {
                params.db.query(params.sql.castlingClean(ctx.scene.state.block), function(err, r) {
                    if (err) { console.log(err.sqlMessage) }
                    params.db.query(params.sql.castlingSecond(ctx.scene.state.block), function(err, r) {
                        if (err) { console.log(err.sqlMessage) }
                        ctx.scene.enter('admin-edt')
                    })
                })
            } else {
                params.db.query(params.sql.castlingClean(ctx.scene.state.block), function(err, r) {
                    if (err) { console.log(err.sqlMessage) }
                    ctx.scene.enter('admin-edt')
                })
            }
        })

        return adminEdDelBtn
    }
}