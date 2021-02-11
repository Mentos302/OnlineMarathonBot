const Extra = require('telegraf/extra')

function f(ctx, content) {
    if (content.thirdbtntext && content.thirdbtnlink) {
        console.log(`3`)
        ctx.reply(content.maintext, Extra.HTML().markup((m) =>
            m.inlineKeyboard([
                [m.callbackButton(content.firstbtntext, content.firstbtnlink)],
                [m.callbackButton(content.secondbtntext, content.secondbtnlink)],
                [m.callbackButton(content.thirdbtntext, content.thirdbtnlink)],
            ])
        ))
    } else if (content.secondbtntext && content.secondbtnlink) {
        console.log(`2`)
        ctx.reply(content.maintext, Extra.HTML().markup((m) =>
            m.inlineKeyboard([
                [m.callbackButton(content.firstbtntext, content.firstbtnlink)],
                [m.callbackButton(content.secondbtntext, content.secondbtnlink)],
            ])
        ))
    } else if (content.firstbtntext && content.firstbtnlink) {
        console.log(`1`)
        ctx.reply(content.maintext, Extra.HTML().markup((m) =>
            m.inlineKeyboard([
                m.callbackButton(`${content.firstbtntext}`, `${content.firstbtnlink}`),
            ])
        ))
    } else { ctx.reply(content.maintext) }

}

function delay(ctx, content) {
    const schedule = require('node-schedule');

    let date = new Date();
    date.setSeconds(date.getSeconds() + content.delay);
    const job = schedule.scheduleJob(date, function() {
        f(ctx, content);
    });
}

module.exports = { f, delay }