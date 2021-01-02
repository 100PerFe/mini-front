### 社团账务管理小程序
#### 完成进度
* 出账/入账js

* 更新tag的js

* 个人中心用户名& 用户身份 &用户所属社团的获取js

  **以上经过测试均可成功使用**
  
* 用户管理及权限修改 ：需要一个有关clubid社团的所有用户的用户名&身份&头像的json数组(**已经完成**)

#### 已修改及完善
* 用户管理的页面功能由删除——>修改用户权限（**通过popup实现**）
* 2020-12-26 将administrator模块融合进personal模块，故只需通过权限等级rank即可判断呈现的功能_（之所以如此，是因为本人不知道怎么通过json跳转到不同页面，鉴于不想在globalData里加rank,于是乎采取该策略）
* 对finance、addtag和usermanagement模块添加Toast修改成功/失败提示信息
* **2021-01-02 将finance的活动tag由input改为picker,picker内的值由/getTagList获取**

#### 全局app.js
* 设置了一个globalData的全局变量集合，目前包含userId、clubId、url
* 放入出账/入账的函数toFinance、修改用户信息的函数toChangeU

#### 对于全局app.js的当前设想
* 可能需要把用户身份作为全局变量，从而在进入到个人中心前用身份判断显示的功能。
* 在小程序加载时，在onLaunch需要写一个函数，获取userId和clubId，在切换社团是可以改变clubId.