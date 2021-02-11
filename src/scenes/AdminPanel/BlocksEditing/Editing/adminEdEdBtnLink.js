module.exports = {
    f(params) {
        const adminEdAddBtnLink = new params.Scene('admin-edt-edtbtnlink')

        adminEdAddBtnLink.enter((ctx) => {
            ctx.reply(params.assets.newbtnlink())
            if (ctx.scene.state.actionbtn == 'firstbtn') {
                ctx.scene.state.newbtn_text = 'firstbtntext'
                ctx.scene.state.newbtn_link = 'firstbtnlink'
            } else if (ctx.scene.state.actionbtn == 'secondbtn') {
                ctx.scene.state.newbtn_text = 'secondbtntext'
                ctx.scene.state.newbtn_link = 'secondbtnlink'
            } else {
                ctx.scene.state.newbtn_text = 'thirdbtntext'
                ctx.scene.state.newbtn_link = 'thirdbtnlink'
            }
        })
        adminEdAddBtnLink.on('text', (ctx) => {
            params.db.query(params.sql.addNewBtn(ctx.scene.state.block.id, ctx.scene.state.newbtn_text, ctx.scene.state.newbtn_link, ctx.scene.state.btntext, ctx.message.text), function(err, r) {
                if (err) { console.log(err.sqlMessage) }
                ctx.scene.enter('admin-edt')
            })
        })
        adminEdAddBtnLink.on('message', (ctx) => {
            ctx.scene.reenter('admin-edt-edtbtnlink', ctx.scene.state)
        })

        return adminEdAddBtnLink
    }
}