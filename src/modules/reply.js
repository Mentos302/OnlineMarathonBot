const Extra = require('telegraf/extra')


function f(ctx, content, rules = 0, params) {
    if (content.cliname) {
        params.db.query(params.sql.getClient(ctx.from.id), function(err, r) {
            console.log(r)
            try {
                content.maintext = `<b>${r[0].first_name},</b> ` + content.maintext
                send()
            } catch (err) {
                console.log('YOY BIDA')
            }
        })
    } else { send() }

    function send() {
        if (content.thirdbtntext && content.thirdbtnlink) {
            if (rules) {
                ctx.reply(content.maintext, Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.callbackButton(content.firstbtntext, content.firstbtnlink)],
                        [m.urlButton(content.secondbtntext, content.secondbtnlink)],
                        [m.urlButton(content.thirdbtntext, content.thirdbtnlink)],
                    ])
                ))
            } else {
                ctx.reply(content.maintext, Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.urlButton(content.firstbtntext, content.firstbtnlink)],
                        [m.urlButton(content.secondbtntext, content.secondbtnlink)],
                        [m.urlButton(content.thirdbtntext, content.thirdbtnlink)],
                    ])
                ))
            }
        } else if (content.secondbtntext && content.secondbtnlink) {
            if (rules) {
                ctx.reply(content.maintext, Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.callbackButton(content.firstbtntext, content.firstbtnlink)],
                        [m.urlButton(content.secondbtntext, content.secondbtnlink)],
                    ])
                ))
            } else {
                ctx.reply(content.maintext, Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        [m.urlButton(content.firstbtntext, content.firstbtnlink)],
                        [m.urlButton(content.secondbtntext, content.secondbtnlink)],
                    ])
                ))
            }
        } else if (content.firstbtntext && content.firstbtnlink) {
            if (rules) {
                ctx.reply(content.maintext, Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        m.callbackButton(`${content.firstbtntext}`, `${content.firstbtnlink}`),
                    ])
                ))
            } else {
                ctx.reply(content.maintext, Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        m.urlButton(`${content.firstbtntext}`, `${content.firstbtnlink}`),
                    ])
                ))
            }
        } else { ctx.reply(content.maintext, Extra.HTML()) }
    }
}

function delay(ctx, content, params) {
    console.log('DELAY FUNC')
    const schedule = require('node-schedule');

    let date = new Date()
    date.setSeconds(date.getSeconds() + 3)

    const job = schedule.scheduleJob(date, function() {
        f(ctx, content, 0, params);
    });
}

module.exports = { f, delay }