module.exports = {
    f(params) {
        const adminMain = new params.Scene('admin-main')

        adminMain.enter((ctx) => {
            ctx.reply('OK')
        })

        return adminMain
    }
}