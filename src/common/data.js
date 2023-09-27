const getURL = (dir, img) => {
  return new URL(`../assets/img/${dir}/${img}`, import.meta.url)
}

export const backgroundImg = [
  getURL('home', '1.png'),
  getURL('home', '2.png'),
  getURL('home', '3.png'),
  getURL('home', '4.png'),
  getURL('home', '5.png'),
  getURL('home', '6.png')
]

export const storyList = [
  { title: '在一起',
    url: getURL('story', '1.png'),
    color: '#4b79a1',
    text: '&emsp;2019/6/21，那天我们约好一起去电影院看千与千寻，这也是我们第一次一起去看电影，但是你并不知道其实我对你“图谋不轨”哈哈哈哈。\
          <br><br>&emsp;电影院里你看得很认真，但其实我的心思早就飞出动画了，我心里一直在预想着如何对你说，嘴笨的我最后还是选择了最直接的方式：冰洁，我们在一起吧！\
          也不知道你当时是什么心情，没有吓到你吧...'
  },
	{ title: '异地', 
    url: getURL('story', '2.png'),
    color: '#64b3e4',
    text: '&emsp;后来我们在一起了，在校园里躲躲藏藏地谈了一年多的恋爱。不久我们迎来了高中毕业，幸运的是，我们并没有分隔太远，你在珠海，我在深圳。\
          进入大学，也开始了我们的异地恋之旅...<br/><br/>&emsp;后来我们之间的故事有快乐的时候，有时候也会有忍不住掉下的眼泪，还有些不那么愉快的争吵，\
          也有我们两个憨憨一起犯傻的时候...<br/><br/>&emsp;真的太快了，不知不觉我们一起走过了3年了，多希望能早早结束我们的异地恋，可以时刻陪在你身边，\
          不想再一次次地靠近你，又一次次地远离你...'
  },
	{ title: '旅行的意义', 
    url: getURL('story', '3.png'),
    color: '#e8935b',
    text: '&emsp;这三年我们一起走过了许多地方，我们去了对方的城市，珠海和深圳，看了日月贝，逛了水母馆...还去了广州去看了广州塔，游了北京街，去了佛山吃好吃的（鱼皮...踩坑了），\
          还去桂林游山玩水（想起来就后悔没去阳朔...），还开车带你去阿西里西玩，我们的第一次自驾游真的好累呀，但真的很值得很开心，嘿嘿，真想多去一些像阿西里西一样漂亮的地方。\
          <br/><br/>&emsp;还有一些答应带你去的还没去呢，还要一起去云南，一起去新疆，一起去看五月天的演唱会...之后的旅行一定会很快乐，很不一样的，至少旅行结束之后不再会是告别了。'
  },
	{ title: '不想你先S', 
    url: getURL('story', '4.png'),
    color: '#348ac7',
    text: '&emsp;你这憨憨跟我在一起后好像变得爱哭了，哭了好多次，记得刚上大学每次去找你玩分开的时候你都会哭得稀里哗啦得（现在都不会了，都不会舍不得我了，哇呜呜呜）。\
          <br/><br/>&emsp;有一天我们在一起，啥事都没发生，但是你却突然哭了，不知所措的我在脑子里过了好几遍：“我是不是又哪里没做好惹冰洁生气了？\
          冰洁是不是又想起之前我做过的坏事了？是不是因为我......？待会该怎么哄她呀...”。<br/><br/>&emsp;想了半天，结果你居然说：“我不想你先死”\
          ......哈哈哈哈，你咋那么憨呀，好好好，那你先...不是，那咱还是一起吧，干啥都要一起，谁先抛下对方谁就是大傻子。'
  },
	{ title: '平凡的一天', 
    url: getURL('story', '5.png'),
    color: '#1e272e',
    text: '&emsp;我这个贪玩的孩子总是尽想着玩了，跟你一起谈恋爱总是想着带你去哪好玩的地方耍。但爱情是一起过日子，得学会一起吃苦，一生有几十年呢，快乐的日子再多也不过是生活的点缀，\
          咱大部分时间不过是穿着拖鞋游大街，而不是去哪个景点到处瞎逛。<br/><br/>&emsp;穿着拖鞋走在大街上有种一起过了好久日子的感觉，好像咱都已经在一起生活好长一段时间了\
          （穿拖鞋出去也不嫌丢人哈哈哈哈），以后跟你过日子就是这个样子啊，我脸皮这么薄，怪不好意思的...<br/><br/>&emsp;期待与你度过平凡的每一天，每一天都与你虚度着年华^-^'
  }
]

export const albumList = [
  { title: '一起坐在海边吹海风', url: getURL('album', '1.png') },
	{ title: '小兔子滴妈妈', url: getURL('album', '2.png') },
	{ title: '小兔子滴爸爸', url: getURL('album', '3.png') },
	{ title: '抱抱~', url: getURL('album', '4.png') },
	{ title: '在晴天的海边，一起爱的魔力转圈圈~', url: getURL('album', '5.png') },
	{ title: '亲亲~', url: getURL('album', '6.png') },
	{ title: '光着脚丫感受大海', url: getURL('album', '7.png') },
	{ title: '两蜘蛛', url: getURL('album', '8.png') },
	{ title: '两个憨憨的迷惑行为', url: getURL('album', '9.png') },
	{ title: '阿西里西~阿西里西~', url: getURL('album', '10.png') },
	{ title: '赶地铁呀呀呀', url: getURL('album', '11.png') },
	{ title: '坐公交呀呀呀', url: getURL('album', '12.png') },
	{ title: '生气了，哄不好了。', url: getURL('album', '13.png') },
	{ title: '网友奔现啦~', url: getURL('album', '14.png') },
	{ title: '表面上：吹海风。实际上：在风中凌乱~', url: getURL('album', '15.png') },
	{ title: '这谁家修狗长得真别致', url: getURL('album', '16.png') },
	{ title: '剪刀脚', url: getURL('album', '17.png') },
	{ title: '卡姿兰大眼睛~', url: getURL('album', '18.png') },
	{ title: '好兄弟就要一辈子！', url: getURL('album', '19.png') },
	{ title: '来看五月天啦！', url: getURL('album', '20.png') },
]