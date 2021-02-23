module.exports = {
    f(params) {
        const regName = new params.Scene('reg-name')

        regName.enter((ctx) => params.reply.f(ctx, ctx.scene.state.assets[1], 'phone', params)) // Assets ID 2
        regName.on('text', (ctx) => {
            ctx.scene.state.cliname = ctx.from.first_name
            ctx.scene.state.cliphone = ctx.message.text
            ctx.scene.enter(`reg-conf`, ctx.scene.state)
        })
        regName.on('contact', (ctx) => {
            ctx.scene.state.cliname = ctx.message.contact.first_name
            ctx.scene.state.cliphone = ctx.message.contact.phone_number
            ctx.scene.enter(`reg-conf`, ctx.scene.state)
        })
        regName.on('message', (ctx) => {
            ctx.scene.reenter('reg-name')
        })

        return regName
    }
}