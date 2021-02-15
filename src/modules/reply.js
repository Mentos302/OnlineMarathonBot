const Extra = require('telegraf/extra')
const config = require('../config')


function f(ctx, content, rules = 0, params) {
    if (content.cliname) {
        function getClient() {
            params.db.query(params.sql.getClient(ctx.from.id), function(err, r) {
                if (err) {
                    console.log(err)
                    params.db = config.sqlConnect();
                    getClient()
                } else {
                    try {
                        content.maintext = `<b>${r[0].first_name},</b> ` + content.maintext
                        send()
                    } catch (e) {
                        console.log(e)
                    }
                }
            })
        }
        getClient()
    } else { send() }

    function send() {
        if (content.thirdbtntext && content.thirdbtnlink) {
            if (content.photo != 0) {
                if (rules == 'wlcm') {
                    ctx.replyWithPhoto(content.photo, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            [m.callbackButton(content.firstbtntext, content.firstbtnlink)],
                            [m.urlButton(content.secondbtntext, content.secondbtnlink)],
                            [m.urlButton(content.thirdbtntext, content.thirdbtnlink)],
                        ])
                    ).caption(content.maintext))
                } else if (rules == 'phone') {
                    ctx.replyWithPhoto(content.photo, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            [m.contactRequestButton(content.firstbtntext)],
                            [m.urlButton(content.secondbtntext, content.secondbtnlink)],
                            [m.urlButton(content.thirdbtntext, content.thirdbtnlink)],
                        ])
                    ).caption(content.maintext))
                } else {
                    ctx.replyWithPhoto(content.photo, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            [m.urlButton(content.firstbtntext, content.firstbtnlink)],
                            [m.urlButton(content.secondbtntext, content.secondbtnlink)],
                            [m.urlButton(content.thirdbtntext, content.thirdbtnlink)],
                        ])
                    ).caption(content.maintext))
                }
            } else {
                if (rules == 'wlcm') {
                    ctx.reply(content.maintext, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            [m.callbackButton(content.firstbtntext, content.firstbtnlink)],
                            [m.urlButton(content.secondbtntext, content.secondbtnlink)],
                            [m.urlButton(content.thirdbtntext, content.thirdbtnlink)],
                        ])
                    ))
                }
                if (rules == 'phone') {
                    ctx.reply(content.maintext, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            [m.contactRequestButton(content.firstbtntext)],
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
            }
        } else if (content.secondbtntext && content.secondbtnlink) {
            if (content.photo != 0) {
                if (rules == 'wlcm') {
                    ctx.replyWithPhoto(content.photo, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            [m.callbackButton(content.firstbtntext, content.firstbtnlink)],
                            [m.urlButton(content.secondbtntext, content.secondbtnlink)],
                        ])
                    ).caption(content.maintext))
                } else if (rules == 'phone') {
                    ctx.replyWithPhoto(content.photo, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            [m.contactRequestButton(content.firstbtntext)],
                            [m.urlButton(content.secondbtntext, content.secondbtnlink)],
                        ])
                    ).caption(content.maintext))
                } else {
                    ctx.replyWithPhoto(content.photo, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            [m.urlButton(content.firstbtntext, content.firstbtnlink)],
                            [m.urlButton(content.secondbtntext, content.secondbtnlink)],
                        ])
                    ).caption(content.maintext))
                }
            } else {
                if (rules == 'wlcm') {
                    ctx.reply(content.maintext, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            [m.callbackButton(content.firstbtntext, content.firstbtnlink)],
                            [m.urlButton(content.secondbtntext, content.secondbtnlink)],
                        ])
                    ))
                } else if (rules == 'phone') {
                    ctx.reply(content.maintext, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            [m.contactRequestButton(content.firstbtntext)],
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
            }
        } else if (content.firstbtntext && content.firstbtnlink) {
            if (content.photo != 0) {
                if (rules == 'wlcm') {
                    ctx.replyWithPhoto(content.photo, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            m.callbackButton(`${content.firstbtntext}`, `${content.firstbtnlink}`),
                        ])
                    ).caption(content.maintext))
                } else if (rules == 'phone') {
                    ctx.replyWithPhoto(content.photo, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            m.contactRequestButton(content.firstbtntext),
                        ])
                    ).caption(content.maintext))
                } else {
                    ctx.replyWithPhoto(content.photo, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            m.urlButton(`${content.firstbtntext}`, `${content.firstbtnlink}`),
                        ])
                    ).caption(content.maintext))
                }
            } else {
                if (rules == 'wlcm') {
                    ctx.reply(content.maintext, Extra.HTML().markup((m) =>
                        m.inlineKeyboard([
                            m.callbackButton(`${content.firstbtntext}`, `${content.firstbtnlink}`),
                        ])
                    ))
                } else if (rules == 'phone') {
                    ctx.reply(content.maintext, Extra.markup((markup) => {
                        return markup.resize()
                            .keyboard([
                                markup.contactRequestButton(content.firstbtntext)
                            ])
                    }))
                } else {
                    ctx.reply(content.maintext, Extra.HTML().markup((m) => {
                        m.inlineKeyboard([
                            m.urlButton(`${content.firstbtntext}`, `${content.firstbtnlink}`),
                        ])
                    }))
                }
            }
        } else {
            if (content.photo != 0) {
                return ctx.replyWithPhoto(content.photo, Extra.HTML().caption(content.maintext).markup(m => m.removeKeyboard()))
            } else {
                return ctx.reply(content.maintext, Extra.markup(m => m.removeKeyboard()).HTML())
            }
        }
    }
}

function delay(ctx, content, params) {
    const schedule = require('node-schedule');

    let date = new Date()
    date.setMinutes(date.getMinutes() + content.delay)

    const job = schedule.scheduleJob(date, function() {
        f(ctx, content, 0, params);
    });
}

module.exports = { f, delay }