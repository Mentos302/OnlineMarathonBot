module.exports = {
    f(params) {
        const spamAudience = new params.Scene('spam_audience')

        spamAudience.enter((ctx) => {
            if (ctx.scene.state.segment == 'regist_date') {
                ctx.reply(params.assets.regSegment(), params.Extra.HTML())
            } else {
                params.db.query(params.sql.getUsers(), function(err, r) {
                    if (err) { console.log(err.sqlMessage) }
                    ctx.scene.state.audience = r
                    ctx.scene.enter('spam_message', ctx.scene.state)
                })
            }
        })
        spamAudience.on('message', (ctx) => {
            let days = ctx.message.text.split(' - ')
            if (days.length == 1) {
                let date = days[0] + '.' + params.moment().format('YYYY')
                params.db.query(params.sql.getUsersByRegistDate(date), function(err, r) {
                    if (err) { console.log(err.sqlMessage) }
                    ctx.scene.state.audience = r
                    ctx.scene.enter('spam_message', ctx.scene.state)
                })
            } else {
                let dayFrom = days[0].split('.')[0]
                let dayTo = days[1].split('.')[0]
                let monthFrom = days[0].split('.')[1]
                let monthTo = days[1].split('.')[1]
                let audience = []

                if (monthFrom == monthTo) {
                    for (let i = dayFrom; i <= dayTo; i++) {
                        if (i < 10 && i != dayFrom) { i = '0' + i }
                        let date = i + '.' + monthFrom + '.' + params.moment().format('YYYY')
                        params.db.query(params.sql.getUsersByRegistDate(date), async function(err, res) {
                            res.forEach(e => {
                                audience.push(e)
                            });
                            if (i == dayTo) {
                                ctx.scene.state.audience = audience
                                ctx.scene.enter('spam_message', ctx.scene.state)
                            }
                        })
                    }
                } else if (monthFrom < monthTo) {
                    if (monthTo - monthFrom < 2) {
                        let darray = []
                        let audience = []
                        for (let i = dayFrom; i <= 31; i++) {
                            if (i < 10 && i != dayFrom) { i = '0' + i }
                            darray.push(i + '.' + monthFrom + '.' + params.moment().format('YYYY'))
                        }
                        for (let i = 1; i <= dayTo; i++) {
                            if (i < 10 && i != dayFrom) { i = '0' + i }
                            darray.push(i + '.' + monthTo + '.' + params.moment().format('YYYY'))
                        }
                        for (let i = 0; i < darray.length; i++) {
                            params.db.query(params.sql.getUsersByRegistDate(darray[i]), async function(err, res) {
                                res.forEach(e => {
                                    audience.push(e)
                                });
                                if (i == darray.length - 1) {
                                    ctx.scene.state.audience = audience
                                    ctx.scene.enter('spam_message', ctx.scene.state)
                                }
                            })
                        }
                    } else {
                        let darray = []
                        let audience = []
                        for (let i = dayFrom; i <= 31; i++) {
                            if (i < 10 && i != dayFrom) { i = '0' + i }
                            darray.push(i + '.' + monthFrom + '.' + params.moment().format('YYYY'))
                        }
                        for (let i = 1; i <= dayTo; i++) {
                            if (i < 10 && i != dayFrom) { i = '0' + i }
                            darray.push(i + '.' + monthTo + '.' + params.moment().format('YYYY'))
                        }
                        for (let i = parseInt(monthFrom) + 1; i < monthTo; i++) {
                            if (i < 10) { i = '0' + i }
                            for (let s = 1; s <= 31; s++) {
                                if (s < 10) { s = '0' + s }
                                darray.push(s + '.' + i + '.' + params.moment().format('YYYY'))
                            }
                        }
                        for (let i = 0; i < darray.length; i++) {
                            params.db.query(params.sql.getUsersByRegistDate(darray[i]), async function(err, res) {
                                res.forEach(e => {
                                    audience.push(e)
                                });
                                if (i == darray.length) {
                                    ctx.scene.state.audience = audience
                                    ctx.scene.enter('spam_message', ctx.scene.state)
                                }
                            })
                        }
                    }
                }

            }
        })

        return spamAudience
    }
}