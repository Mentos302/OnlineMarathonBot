module.exports = {
    getClient(user_id) { return `SELECT * FROM users WHERE chat_id = ${user_id}` },
    getAssets() { return `SELECT * FROM assets` },
    newUser(ctx, date) { return `INSERT INTO users (chat_id, first_name, reg_date) VALUES ('${ctx.from.id}','${ctx.scene.state.cliname}','${date}')` },

    isAdmin(user_id) { return `SELECT * FROM users WHERE chat_id = ${user_id} AND is_admin = 1` }
}