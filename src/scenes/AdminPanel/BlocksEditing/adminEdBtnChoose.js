module.exports = {
    f(params) {
        const adminEdBtnChoose = new params.Scene('admin-edt-btnchoose')

        adminEdBtnChoose.enter((ctx) => {
            ctx.reply(params.assets.btnchoose(), params.Extra.HTML().markup((m) =>
                m.inlineKeyboard([
                    [m.callbackButton(ctx.scene.state.block.firstbtntext, `ed1`)],
                    [m.callbackButton(ctx.scene.state.block.secondbtntext, `ed2`)],
                    [m.callbackButton(ctx.scene.state.block.thirdbtntext, `ed3`)],
                    [m.callbackButton(params.assets.edexit(), `exit`)],
                ])
            ))
        })
        adminEdBtnChoose.action('ed1', (ctx) => {
            if (ctx.scene.state.operation == 'edit') {
                ctx.scene.enter(`admin-edt-edtbtn`, { block: ctx.scene.state.block, actionbtn: 'firstbtn' })
            } else {
                ctx.scene.enter(`admin-edt-delbtn`, { block: ctx.scene.state.block, actionbtn: 'firstbtn' })
            }
        })
        adminEdBtnChoose.action('ed2', (ctx) => {
            if (ctx.scene.state.operation == 'edit') {
                ctx.scene.enter(`admin-edt-edtbtn`, { block: ctx.scene.state.block, actionbtn: 'secondbtn' })
            } else {
                ctx.scene.enter(`admin-edt-delbtn`, { block: ctx.scene.state.block, actionbtn: 'secondbtn' })
            }
        })
        adminEdBtnChoose.action('ed3', (ctx) => {
            if (ctx.scene.state.operation == 'edit') {
                ctx.scene.enter(`admin-edt-edtbtn`, { block: ctx.scene.state.block, actionbtn: 'thirdbtn' })
            } else {
                ctx.scene.enter(`admin-edt-delbtn`, { block: ctx.scene.state.block, actionbtn: 'thirdbtn' })
            }
        })
        adminEdBtnChoose.action('exit', (ctx) => ctx.scene.enter(`admin-edupdt`, ctx.scene.state.block))

        return adminEdBtnChoose
    }
}