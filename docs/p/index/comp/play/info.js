const TEMPLATE =
`
<div>
    <ul>
        <li>
            <a href="/i.html">
                流程说明，点我
            </a>        
        </li>       
        <li>
            <a href="https://szplay.net/img/zzz_tutorial/tutorial_img_load.jpg">
                图片加载问题，点我
            </a>        
        </li>            
        <li>
            <img-lazy 
                 :datasrc="C.SELF.github.pageUrl + '/img/zzz_tutorial/tutorial.jpg'"
                 alt=""
                 style="max-width: 95%"
            />
        </li>

    </ul>
        


<pre style="word-wrap: break-word;">
你好,
这里是出售资源 / 联系方式

--==--==--==--==--==--==--==--==--==

<a href="https://t.me/s/gmg99901">电报个号: gmg99991</a>
<a href="https://t.me/s/szplay999">电报频道: szplay999</a>

--==--==--==--==--==--==--==--==--==

⭐图和哪些妹最近在，能用这几个网站看

<a href="https://gmg991.github.io">https://gmg991.github.io</a>

<a href="https://t.me/s/szplay999">https://t.me/s/szplay999</a>

<a href="https://szplay.net">https://szplay.net</a>

⭐打不开这些网，可以试下
0. 用其他浏览器 (不要用微信和 QQ 浏览器)
1. 手机网络打开 (4G/5G)
2. 手机网络 + VPN 打开
3. wifi网络打开
4. wifi网络 + VPN 打开
5. 切換不同 wifi 网络

--==--==--==--==--==--==--==--==--==

⭐选好看中后
在电报 / 蝙蝠发我数字编号就可

价格是 25 ~ 35 一个
3 个是 85 折
  
少数特殊的妹 +25% ~ 50%

48 小时联系不上可以换或退

--==--==--==--==--==--==--==--==--==

⭐电报 <a href="https://t.me/s/szplay999">https://t.me/s/szplay999</a>
⭐珠海 <a href="https://t.me/s/gmg99901zh">https://t.me/s/gmg99901zh</a>
⭐广州 <a href="https://t.me/s/gmg999gz">https://t.me/s/gmg999gz</a>
⭐深圳 <a href="https://t.me/s/gmg999sz">https://t.me/s/gmg999sz</a>

--==--==--==--==--==--==--==--==--==

⭐ 确定后，可以用支付宝口令红包，发后告诉我数字就可以

<a href="/img/red.jpg">🧧如何发支付宝口令红包</a>


--==--==--==--==--==--==--==--==--==

⭐不要提 神志玩志 
⭐不要提资源哪里来           
⭐当成朋友分享拿到联系方式
⭐加时和加后不用提 电报 / 推特 任何事 ⭐ 不要截的图，会令妹反感
⭐不要提翻牆！⭐不要提中介
⭐加微信或 QQ 时，备注 "你好美女，有空约课" 或 "你好美女" 就 OK

--==--==--==--==--==--==--==--==--==

</pre>
        
    <ul>        
        <li>
            如何发<span style="color: red;">支付宝口令红包</span>，如下图
        </li>
        <li>
            <img-lazy 
                :datasrc="C.SELF.github.pageUrl + '/img/red.jpg'"                         
                 alt="如何发支付宝口令红包"
                 style="max-width: 95%"
            />
        </li>
    </ul>
</div>
`;


async function init(opts) {

    const Loader = opts.loader;
    const COMPONENTS = await Loader.imports(opts, {
        'img-lazy': '/js/vue/comp/imglazy.js'
    });

    const Comp = {};
    Comp.name = 'play-info';
    Comp.template = TEMPLATE;
    Comp.components = COMPONENTS;

    Comp.computed = {
        ...Vuex.mapState([
            'C'
        ])
    }

    return Comp;
}


export default init;