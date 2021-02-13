module.exports = {
    f(params) {
        const adminEdAddBtnLink = new params.Scene('admin-edt-addbtnlink')

        adminEdAddBtnLink.enter((ctx) => {
            ctx.reply(params.assets.newbtnlink())
            if (ctx.scene.state.secondbtntext && ctx.scene.state.secondbtnlink) {
                ctx.scene.state.newbtn_text = 'thirdbtntext'
                ctx.scene.state.newbtn_link = 'thirdbtnlink'
            } else if (ctx.scene.state.firstbtntext && ctx.scene.state.firstbtnlink) {
                ctx.scene.state.newbtn_text = 'secondbtntext'
                ctx.scene.state.newbtn_link = 'secondbtnlink'
            } else {
                ctx.scene.state.newbtn_text = 'firstbtntext'
                ctx.scene.state.newbtn_link = 'firstbtnlink'
            }
        })
        adminEdAddBtnLink.on('text', (ctx) => {
            params.db.query(params.sql.addNewBtn(ctx.scene.state.id, ctx.scene.state.newbtn_text, ctx.scene.state.newbtn_link, ctx.scene.state.btntext, ctx.message.text), function(err, r) {
                if (err) { console.log(err.sqlMessage) }
                ctx.scene.enter('admin-edt')
            })
        })
        adminEdAddBtnLink.on('message', (ctx) => {
            ctx.scene.reenter('admin-edt-addbtnlink', ctx.scene.state)
        })

        return adminEdAddBtnLink
    }
}