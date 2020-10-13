# Together后台

## 前言

后台由node+express+mysql编写

图片上传使用了阿的OSS

所以如果要运行项目,你需要注册一个阿里云账号,并且使用阿里云的oss

## 项目结构

```text
├─Config 配置文件
│ ├─dbconfig.js 数据库配置文件
│ ├─OSSconfig.js 阿里云OSS配置文集
│ └─rongSdkConfig.js 融云SDK配置文件
├─Controllers 控制器
│ ├─centerCtrl.js 广场控制器
│ ├─deleteCtrl.js 删除控制器
│ ├─indexCtrl.js 登录控制器
│ ├─OSSCtrl.js OSS控制器
│ └─updateCtrl.js 更新控制器
├─Models
│ ├─ArticleDelete.js 删除模型
│ ├─userCenter.js 广场模型
│ ├─userRegister.js 注册模型
│ └─userUpdate.js 更新模型
├─node_modules
├─public
│ ├─uploads 图片临时上传目录
├─Routers 路由
│ ├─centerRouter.js 广场路由
│ ├─deleteRouter.js 删除路由
│ ├─indexRouter.js 登录路由
│ └─updateRouter.js 更新路由
├─app.js 主程序
├─package.json
└─yarn.lock
```



## 准备

> node版本需 >= 14.9.0
>
> mysql版本需 >= 5.5
>
> 由于数据库需要存入emoji，需要在mysql.ini里面添加如下配置:
>
> ```text
> [client]
> 
> default-character-set = utf8mb4
> 
> [mysql]
> 
> default-character-set = utf8mb4
> 
> [mysqld]
> 
> character-set-client-handshake = FALSE
> 
> character-set-server = utf8mb4
> 
> collation-server = utf8mb4_unicode_ci
> 
> init_connect='SET NAMES utf8mb4'
> ```

## 配置

项目运行之前请到Config里面配置相关的配置项以正确✔运行程序

## 部署

程序使用yarn配置,需要安装yarn

```shell
npm install yarn -g
```

安装依赖

```shell
yarn add
```



运行项目:

```shell
yarn start
```

注:  线上推荐使用pm2部署

## 请求

### 用户路由

#### 用户登录

请求地址: `/login`

请求方式: `POST`

| 字段名      | 必须 | 默认值 | 说明     |
| ----------- | ---- | ------ | -------- |
| `uid`       | true |        | 用户id   |
| `passoword` | true |        | 用户密码 |

#### 用户注册

请求地址:`/register`

请求方式: `POST`

| 字段名        | 必须  | 默认值     | 说明     |
| ------------- | ----- | ---------- | -------- |
| `uid`         | true  |            | 用户id   |
| `passoword`   | true  |            | 用户密码 |
| `uname`       | false | 系统生成   | 用户昵称 |
| `portraitUri` | false | 系统生成   | 用户头像 |
| `gender`      | false | 保密       | 用户性别 |
| `bio`         | false | 系统默认值 | 用户简介 |

### 广场路由

#### 添加广场文章

请求地址: `/center/add`

请求方式: `POST`

| 字段名    | 必须 | 默认值       | 说明           |
| --------- | ---- | ------------ | -------------- |
| uid       | true |              | 用户id         |
| content   | true |              | 文章内容       |
| findMates | true | '0'          | 是否发布到广场 |
| lng       | true | 系统自动获取 | 经度           |
| lat       | true | 系统自动获取 | 纬度           |

响应:

| 字段      | 说明                      |
| --------- | ------------------------- |
| `code`    | 200为成功 400请联系管理员 |
| `message` | 提示信息                  |

#### 获取广场文章(不包括自己)

请求地址: `/center/getCenters`

请求方式: `GET`

| 字段名 | 必须 | 默认值 | 说明   |
| ------ | ---- | ------ | ------ |
| uid    | true |        | 用户id |

响应:

| 字段      | 说明                            |
| --------- | ------------------------------- |
| `code`    | 200为成功 400为参数不完整       |
| `data`    | 用户的信息,如果用户不存在为null |
| `message` | 提示信息                        |

#### 获取自己发表的文章

请求地址: `/center/getMeArticle`

请求方式: `GET`

| 字段名 | 必须 | 默认值 | 说明   |
| ------ | ---- | ------ | ------ |
| `uid`  | true |        | 用户id |

响应:

| 字段      | 说明                            |
| --------- | ------------------------------- |
| `code`    | 200为成功 400为参数不完整       |
| `data`    | 用户的信息,如果用户不存在为null |
| `message` | 提示信息                        |

#### 获取用户信息

请求地址: `/center/getUserInfo`

请求方式: `GET`

| 字段名 | 必须 | 默认值 | 说明   |
| ------ | ---- | ------ | ------ |
| `uid`  | true |        | 用户id |

响应:

| 字段      | 说明                            |
| --------- | ------------------------------- |
| `code`    | 200为成功 400为参数不完整       |
| `data`    | 用户的信息,如果用户不存在为null |
| `message` | 提示信息                        |

### 更新路由

#### 更新用户昵称

请求地址: `/update/updateName`

请求方式: `POST`

| 字段名  | 必须 | 默认值 | 说明         |
| ------- | ---- | ------ | ------------ |
| `uid`   | true |        | 用户id       |
| `uname` | true |        | 新的用户昵称 |

响应:

| 字段      | 说明                      |
| --------- | ------------------------- |
| `code`    | 200为成功 400为参数不完整 |
| `message` | 提示信息                  |

#### 更新用户简介

请求地址:`/update/updateBio`

请求方式: `POST`

| 字段名 | 必须 | 默认值 | 说明         |
| ------ | ---- | ------ | ------------ |
| `uid`  | true |        | 用户id       |
| `bio`  | true |        | 新的用户简介 |

响应:

| 字段      | 说明                      |
| --------- | ------------------------- |
| `code`    | 200为成功 400为参数不完整 |
| `message` | 提示信息                  |

#### 更新密码

请求地址: `/update/updatePasswd`

请求方式: `POST`

| 字段名     | 必须 | 默认值 | 说明         |
| ---------- | ---- | ------ | ------------ |
| `uid`      | true |        | 用户id       |
| `password` | true |        | 用户的新密码 |

响应:

| 字段      | 说明                      |
| --------- | ------------------------- |
| `code`    | 200为成功 400为参数不完整 |
| `message` | 提示信息                  |

#### 更新用户头像

请求地址; `/update/updateAvatar`

请求方式: `POST`

| 字段名   | 必须 | 默认值 | 说明           |
| -------- | ---- | ------ | -------------- |
| `uid`    | true |        | 用户id         |
| `avatar` | true |        | 用户头像问文件 |

响应:

| 字段      | 说明                      |
| --------- | ------------------------- |
| `code`    | 200为成功 400为参数不完整 |
| `url`     | 头像的地址                |
| `message` | 提示信息                  |



