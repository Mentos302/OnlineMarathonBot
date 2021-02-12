module.exports = {
    f(params) {
        const regName = new params.Scene('reg-name')

        regName.enter((ctx) => params.reply.f(ctx, ctx.scene.state.assets[1], 0, params)) // Assets ID 2
        regName.on('text', (ctx) => {
            params.reply.f(ctx, ctx.scene.state.assets[2], 0, params) // Assets ID 3
            ctx.scene.state.cliname = ctx.message.text
            ctx.scene.enter(`reg-conf`, ctx.scene.state)
        })
        regName.on('message', (ctx) => {
            ctx.scene.reenter('reg-name')
        })

        return regName
    }
}