const Router = require('koa-router');
const db = require('../libs/database')

let router = new Router();

// 收集用户的体验数据,collect。type: 操作类型；data: 数据
router.get('collect/:type/:data', async ctx => {
    let {
        type,
        data
    } = ctx.params;

    await db.insert('collect_table', {
        type,
        data
    });
});

// restaurant
router.get('restaurant/:page/:size', async ctx => {
    // 数据校验
    let {
        page,
        size
    } = ctx.params;

    if (isNaN(page)) {
        page = 0;
    }
    if (isNaN(size)) {
        size = 8;
    }

    let sql = `SELECT * FROM restaurant_table LIMIT ${page*size},${size}`;
    ctx.body = await db.query(sql);
});

// menu。test:156514940
router.get('menu/:restaurant_id', async ctx => {
    let {
        restaurant_id
    } = ctx.params;

    ctx.body = await db.select('menu_table', '*', {
        restaurant_id
    });
});

// cart 购物车
router.post('cart/:item_id/:count', async ctx => {
    let {
        item_id,
        count
    } = ctx.params;
    let user_id = ctx.user_id;

    // 判断购物车有没有该数据
    let rows = await db.select('cart_table', 'ID,count', {
        item_id,
        user_id
    });
    console.log(rows);
    if (rows.length) { // 有。更新数据
        let data = rows[0];
        await db.update('cart_table', data.ID, {
            count: Number(data.count) + Number(count)
        });
    } else { // 没有。插入数据
        await db.insert('cart_table', {
            item_id,
            user_id,
            count
        });
    }
});

// 购物车删除
//TODO test bug
router.delete('cart/:item_id/', async ctx => {
    console(ctx.params);
    let {
        item_id
    } = ctx.params;
    let user_id = ctx.user_id;

    await db.delete('cart_table', {
        item_id,
        user_id
    });

    ctx.body = {
        'OK': true
    }
});

module.exports = router.routes();