# er_server
- vue + mysql + 爬虫 + 部署

- 仿饿了么服务端

- 两个程序：server 和 clawer

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
