module.exports = {
    f(params) {
        const adminEdEdBtn = new params.Scene('admin-edt-edtbtn')

        adminEdEdBtn.enter((ctx) => {
            ctx.reply(params.assets.newbtntext())
        })
        adminEdEdBtn.on('text', (ctx) => {
            ctx.scene.state.btntext = ctx.message.text
            ctx.scene.enter('admin-edt-edtbtnlink', ctx.scene.state)
        })
        adminEdEdBtn.on('message', (ctx) => {
            ctx.scene.reenter('admin-edt-edtbtn', ctx.scene.state)
        })

        return adminEdEdBtn
    }
}