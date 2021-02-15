async function f(ctx, params) {
    const config = require('../config')

    function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    for (let i = 0; i < ctx.scene.state.audience.length; i++) {
        if (ctx.scene.state.cliname) {
            function getClient() {
                params.db.query(params.sql.getClient(ctx.scene.state.audience[i].chat_id), function(err, r) {
                    if (err) {
                        console.log(err)
                        params.db = config.sqlConnect();
                        getClient()
                    } else {
                        try {
                            let msg = {...ctx.scene.state.spam_msg }
                            msg.text = `<b>${r[0].first_name}</b>, ${ctx.scene.state.spam_msg.text}`
                            msg.caption = `<b>${r[0].first_name}</b>, ${ctx.scene.state.spam_msg.caption}`
                            send(msg)
                        } catch (e) {
                            console.log(e)
                        }
                    }
                })
            }
            getClient()
        } else {
            send(ctx.scene.state.spam_msg)
        }

        async function send(msg) {
            try {
                if (ctx.scene.state.btns) {
                    if (ctx.scene.state.btns.thirdbtntext) {
                        await ctx.telegram.sendCopy(ctx.scene.state.audience[i].chat_id, msg, params.Extra.HTML().markup((m) =>
                            m.inlineKeyboard([
                                [m.urlButton(ctx.scene.state.btns.firstbtntext, ctx.scene.state.btns.firstbtnlink)],
                                [m.urlButton(ctx.scene.state.btns.secondbtntext, ctx.scene.state.btns.secondbtnlink)],
                                [m.urlButton(ctx.scene.state.btns.thirdbtntext, ctx.scene.state.btns.thirdbtnlink)]
                            ])
                        ))
                    } else if (ctx.scene.state.btns.secondbtntext) {
                        await ctx.telegram.sendCopy(ctx.scene.state.audience[i].chat_id, msg, params.Extra.HTML().markup((m) =>
                            m.inlineKeyboard([
                                [m.urlButton(ctx.scene.state.btns.firstbtntext, ctx.scene.state.btns.firstbtnlink)],
                                [m.urlButton(ctx.scene.state.btns.secondbtntext, ctx.scene.state.btns.secondbtnlink)]
                            ])
                        ))
                    } else {
                        await ctx.telegram.sendCopy(ctx.scene.state.audience[i].chat_id, msg, params.Extra.HTML().markup((m) =>
                            m.inlineKeyboard([
                                [m.urlButton(ctx.scene.state.btns.firstbtntext, ctx.scene.state.btns.firstbtnlink)]
                            ])
                        ))
                    }
                } else {
                    await ctx.telegram.sendCopy(ctx.scene.state.audience[i].chat_id, msg, params.Extra.HTML())
                }
                await console.log(`${ctx.scene.state.audience[i].chat_id} have just got a message`)
                sleep(50)
            } catch (err) {
                if (err.response && err.response.error_code === 403) {
                    params.db.query(params.sql.deleteUser(ctx.scene.state.audience[i].chat_id), async function(err, res) {
                        console.log(`${ctx.scene.state.audience[i].chat_id} is unSub, so i delete it from DB`)
                    })
                }
                console.log(err.message)
            }
        }
    }

}

function delay(ctx, params, date) {
    const schedule = require('node-schedule');

    const job = schedule.scheduleJob(`${date.min} ${date.hour} ${date.day} ${date.month} *`, function(fireDate) {
        f(ctx, params)
    });
}

module.exports = { f, delay }