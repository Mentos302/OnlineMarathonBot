module.exports = {
    getClient(user_id) { return `SELECT * FROM users WHERE chat_id = ${user_id}` },
    getAssets() { return `SELECT * FROM assets` },
    newUser(ctx, date) { return `INSERT INTO users (chat_id, first_name, reg_date) VALUES ('${ctx.from.id}','${ctx.scene.state.cliname}','${date}')` },

    isAdmin(user_id) { return `SELECT * FROM users WHERE chat_id = ${user_id} AND is_admin = 1` },
    todaysUsers(date) { return `SELECT * FROM users WHERE reg_date = '${date}'` },

    changeBlockTitle(block_id, text, photo = 0) { return `UPDATE assets SET maintext = '${text}', photo='${photo}' WHERE id = '${block_id}'` },
    addNewBtn(id, textfield_name, textfield_link, text, link) { return `UPDATE assets SET ${textfield_name} = '${text}', ${textfield_link} = '${link}' WHERE id='${id}'` },
    castling(content) { return `UPDATE assets SET firstbtntext = '${content.secondbtntext}', firstbtnlink = '${content.secondbtnlink}', secondbtntext = '${content.thirdbtntext}', secondbtnlink = '${content.thirdbtnlink}' WHERE id=${content.id}` },
    castlingClean(content) { return `UPDATE assets SET thirdbtntext = '', thirdbtnlink = '' WHERE id = '${content.id}'` },
    castlingSecond(content) { return `UPDATE assets SET secondbtntext = '${content.thirdbtntext}', secondbtnlink = '${content.thirdbtnlink}' WHERE id=${content.id}` },
    changeDelay(ctx) { return `UPDATE assets SET delay = ${ctx.message.text} WHERE id = ${ctx.scene.state.id}` },

    getUsers() { return `SELECT chat_id FROM users` },
    deleteUser(user_id) { return `DELETE FROM users WHERE chat_id='${user_id}` },

    getUsersByRegistDate(date) { return `SELECT chat_id FROM users WHERE reg_date = '${date}'` },
    changeCliNameAblt(block_id, value) { return `UPDATE assets SET cliname = ${value} WHERE id = ${block_id}` }
}