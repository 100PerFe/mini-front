### 社团账务管理小程序
#### 完成进度
* 出账/入账js
* 更新tag的js
* 个人中心用户名& 用户身份 &用户所属社团的获取js
#### 待完成
* 用户管理 ：需要一个有关clubid社团的所有用户的用户名&身份&头像的json数组
#### 修改
* 用户管理的页面功能由删除——>修改用户权限（通过popup实现）

#### 全局app.js
* 设置了一个globalData的全局变量集合，目前包含userId、clubId、url
* 放入出账/入账的函数toFinance、修改用户信息的函数toChangeU

#### 对于全局app.js的当前设想
* 可能需要把用户身份作为全局变量，从而在进入到个人中心前用身份判断显示的功能。
* 在小程序加载时，在onLaunch需要写一个函数，获取userId和clubId，在切换社团是可以改变clubId.