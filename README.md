# async/await 的一个小实践

刚看了[闰土哥转欲三更的一个文章](https://mp.weixin.qq.com/s?__biz=MzIyNDg5MzM4Ng==&mid=2247483995&idx=1&sn=cdd0e8555b06d19d5c0b6c0774b00d7b&chksm=e80942fedf7ecbe8ee32a2fc42bec9a539e7775e24fa10ada367d806b62e992c43beec2791b0&mpshare=1&scene=23&srcid=1212uKo3Hnhg255DxE8Aafwf#rd)。

第一个常见闭包问题没什么好说的。

就是第二个场景的问题似乎有点意思，然后试着写了一下。

> 某个应用模块由文本框 input，以及按钮 A，按钮 B 组成。点击按钮 A，会向地址 urlA 发出一个 ajax 请求，并将返回的字符串填充到 input 中（覆盖 input 中原有的数据），点击按钮 B，会向地址 urlB 发出一个 ajax 请求，并将返回的字符串填充到 input 中（覆盖 input 中原有的数据）。

> 当用户依次点击按钮 A、B 的时候，预期的效果是 input 依次被 urlA、urlB 返回的数据填充，但是由于到 urlA 的请求返回比较慢，导致 urlB 返回的数据被 urlA 返回的数据覆盖了，与用户预期的顺序不一致。

> 请问如何设计代码，解决这个问题？

我的思路就是用 `EventHub` 将方法封装成一个`返回 Promise 对象的方法`，然后通过 `async/await` 来实现类似同步的效果，然后用 `订阅/发布模式` 来设计 `EventHub` 的逻辑。

PS: `parcel` 拿来折腾小东西真方便。(¦3[▓▓]=
