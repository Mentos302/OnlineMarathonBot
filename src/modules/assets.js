module.exports = {
    passreq() { return `Введіть Ваш пароль:` },
    namereq() { return `Ваше ім'я?` },
    admmain(ctx, r, date) { return `👋 Доброго дня, <b>${ctx.from.first_name}</b>\n\n 📆 Сьогодні: <b>${date}</b>\n 📲 Приєдналось за сьогодні: <b>${r.length}</b> \n\n Щось робитимемо?` },
    adminbtn1() { return `Редагувати тексти 📝` },
    adminbtn2() { return `Розіслати повідомлення ✉️` },
    blockchoose() { return `✅ Готово, оберіть блок для подальшого редагування:` },
    blockprevw(content) { return `${content.maintextout}\n\n<em>Кнопки:</em>\n${content.firstbtntext}\n${content.secondbtntext}\n${content.thirdbtntext}` },
    upd1() { return `Змінити головний текст блоку` },
    upd2() { return `Додати кнопку` },
    upd3() { return `Редагувати кнопку` },
    upd4() { return `Видалити кнопку` },
    upd5() { return `Змінити час затримки` },
    edttitle() { return `Введіть новий текст для зміни:` },
    btnchoose() { return `Оберіть кнопку:` },
    edexit() { return `↩️ Повернутись назад` },
    maxbtns() { return `Ви додали максимальну к-сть кнопок.` },
    newbtntext() { return `Введіть текст для нової кнопки:` },
    newbtnlink() { return `Введіть посилання для нової кнопки:` },
    delayvalue(min) { return `Зараз затримка в цього повідомлення ${min} хв.\n\nВведіть нове значення:` },
    textreq() { return `Відправте мені повідомлення, яке потрібно буде надіслати під час розсилки:` },
    spam1() { return `Додати кнопки-посилання` },
    spam2() { return `Продовжити далі` },
    spamMethod() { return `Оберіть метод відправки:` },
    method1() { return `📩 Миттєва розсилка` },
    method2() { return `⏰ Відкладена розсилка` },
    segment1() { return `🗿 Відправити усім` },
    segment2() { return `🎯 Сегментування по даті реєстрації` },
    segmentchoose() { return `💬 Виберіть аудиторію отримувачів повідомлення :` },
    getsendtime() { return `Вкажіть дату і час розсилки\n\nУ форматі: "01.01 14-30"` },
    spamnewbtn() { return `Відправте мені список посилань (макс. 3)\n\nКожну кнопку потрібно писати в новому рядку.\n\n<em>Приклад:\nПошук Гугл - google.com\nЮтуб - youtube.com</em>` },
    spamconfirmdelay(state) { return `Повідомлення буде відправлено <b>${state.send_date.day}.${state.send_date.month} о ${state.send_date.hour}:${state.send_date.min}.</b>\nКількість отримувачів: <b>${state.audience.length}</b>` },
    spamconfirmdir(state) { return `Повідомлення буде відправлено <b>моментально.</b>\nКількість отримувачів: <b>${state.audience.length}</b>` },
    conf() { return `Підтвердити розсилку` },
    regSegment() { return `Відправте дату реєстрації або діапазон дат.\n\n<em>Приклад:\n"01.03" для одного дня\n"01.03 - 04.03" для діапазону</em>` },
    spamdelback() { return `Повідомлення відкладено та буде відправлено за вказаним часом 👍` },
    spamdirback() { return `Повідомлення відправлено і буде доставлено за лічені миті 👍` },
    confapprove() { return `↩️ Повернутись у головне меню` },
    addcliname() { return `Додати ім'я користувача` },
    removecliname() { return `Прибрати ім'я користувача` },
    textreqwithname() { return `<b>Ім'я клієнта,</b> [відправте текст, який потібно вставити]` },
}