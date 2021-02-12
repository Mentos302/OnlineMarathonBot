module.exports = {
    f(params) {
        const regWelcMsg = new params.Scene('reg-wlcm')

        regWelcMsg.enter((ctx) => params.reply.f(ctx, ctx.scene.state.assets[0], 'wlcm', params)) // Assets ID 1
        regWelcMsg.action('okay', (ctx) => ctx.scene.enter(`reg-name`, ctx.scene.state))

        return regWelcMsg
    }
}