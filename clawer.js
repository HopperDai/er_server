/* 爬虫：抓取数据 */
const fetchHtml = require('./libs/fetch-html-blue');
const zlib = require('zlib');
const assert = require('assert');
const common = require('./libs/common');
const path = require('path');

function fetch(options) {
    return new Promise((resolve, reject) => {
        fetchHtml(options).then(res => {
            let {
                buffer,
                headers
            } = res;
            if (headers['content-length'] && headers['content-length'] != buffer.length) { // 数据加载完全 
                reject();
            } else {
                if (headers['content-encoding'] == 'gzip') {
                    // 解压
                    zlib.gunzip(buffer, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                } else {
                    resolve(buffer);
                }
            }
        }, err => {
            reject(err);
        });
    });
}

// 店铺数据
(async () => {
    let url = 'https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=23.12908&longitude=113.264359&offset=0&limit=8';

    let buffer = await fetch(url);
    let json = JSON.parse(buffer.toString());
    let datas = json.items.map(({
        restaurant
    }) => {
        return {
            restaurant_id: restaurant.id,
            name: restaurant.name,
            address: restaurant.address,
            distance: restaurant.distance,
            float_delivery_fee: restaurant.float_delivery_fee,
            image_path: restaurant.image_path,
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            opening_hours: restaurant.opening_hours,
            phone: restaurant.phone,
            rating: restaurant.rating,
            rating_count: restaurant.rating_count,
            recent_order_num: restaurant.recent_order_num
        }
    });

    // 图片数据的处理
    for (let i = 0; i < datas.length; i++) {
        let data = datas[i];
        let img_url = `https://fuss10.elemecdn.com/${data.image_path[0]}/${data.image_path.substring(1,3)}/${data.image_path.substring(3)}`; // 图片路径处理

        if (img_url.endsWith('jpeg')) {
            img_url = `${img_url}.jpeg`;
        } else if (img_url.endsWith('png')) {
            img_url = `${img_url}.png`;
        } else {
            assert(0);
        }

        let img_buffer = await fetch(img_url); // 不会一次性请求，await 等待

        await common.writeFile(path.resolve(__dirname, './images', data.image_path), img_buffer);
    }

    // 图片地址：https://fuss10.elemecdn.com/1/e7/eeea2c0ea40aaf30e154439ac17f9png.png

})();






















// test
/* let api = 'https://h5.ele.me/restapi/shopping/v2/menu?restaurant_id=156514940';
fetch({
    url: api,
    headers: {
        'referer': 'https://h5.ele.me/shop/',
        'x-shard': 'shopid=1103973;loc=113.264359,23.12908'
    }
}).then(res => {
    // console.log(res.toString());
}, err => {
    console.log('抓取失败', err);
}); */

/* fetch(urlString).then(res => {
    let {
        buffer,
        headers
    } = res;
}, err => {});
fetch({
    url,
    headers
}); */