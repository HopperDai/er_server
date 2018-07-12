# er_server

- vue + mysql + 爬虫 + 部署

- 仿饿了么服务端

- 两个程序：server 和 clawer

1.  跟踪用户-全面
    浏览、下单、停留
2.  性能：数据压缩
3.  vue

## 数据库

- 店铺

- 菜单

- 购物车

## 抓取数据

- 店铺

  - https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=23.12908&longitude=113.264359&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5

  - https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=23.12908&longitude=113.264359&offset=0&limit=8

- 详情

  - https://h5.ele.me/restapi/shopping/v2/menu?restaurant_id=156514940&terminal=h5

## 校验

- 爬虫-clawer.js 校验-业务逻辑

- 数据库-database.js 校验-安全性

## server

接口：/api/

1.  收集数据 /collect
    类型、数据

2.  饭店数据 /restaurant/:page/:size

3.  菜单数据 /menu/:restaurant_id

4.  购物车 /cart
    加入 POST/cart/:item/:count
    删除 DELET/cart
    结算
