module.exports = {
    f(params) {
        const adminEdAddBtn = new params.Scene('admin-edt-addbtn')

        adminEdAddBtn.enter((ctx) => {
            if (ctx.scene.state.thirdbtntext && ctx.scene.state.thirdbtnlink) {
                ctx.reply(params.assets.maxbtns())
            } else {
                ctx.reply(params.assets.newbtntext())
            }
        })
        adminEdAddBtn.on('text', (ctx) => {
            ctx.scene.state.btntext = ctx.message.text
            ctx.scene.enter('admin-edt-addbtnlink', ctx.scene.state)
        })
        adminEdAddBtn.on('message', (ctx) => {
            ctx.scene.reenter('admin-edt-addbtn', ctx.scene.state)
        })

        return adminEdAddBtn
    }
}