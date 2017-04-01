var yonyou = yonyou || {};
yonyou.browser = {
    versions: function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile/) || !!u.match(/Windows Phone/) || !!u.match(/Android/) || !!u.match(/MQQBrowser/), //是否为移动终端
            mQQBrowser: !!u.match(/MQQBrowser/), //是否为QQ
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            microMessenger: u.indexOf('MicroMessenger') > -1,	//是否为微信内置浏览器
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
function addressTransfer(addressData) {
    /*sort 排序*/
    var by = function (name) {
        return function (o, p) {
            var a, b;
            if (typeof o === "object" && typeof p === "object" && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            }
            else {
                throw ("error");
            }
        }
    }
    //处理数据
    for (var i = 0; i < addressData.length; i++) {
        if (yonyou.browser.versions.ios) {
            if (addressData[i].name && addressData[i].name.formatted) {
                //alert(1+JSON.stringify(addressData[i]))
                //name属性须存在，转拼音首字母
                var char = makePy(addressData[i].name.formatted)[0];
                addressData[i].charName = char
            } else if(addressData[i].name && typeof addressData[i].name ==='string') {
                //alert(2+JSON.stringify(addressData[i]))
                var char = makePy(addressData[i].name)[0];
                addressData[i].charName = char
            }else {
                //alert(3+JSON.stringify(addressData[i]))
                //不存在定为空字符串
                 addressData[i].charName = ''
            }
        }else {
            if (addressData[i].displayName) {
                //displayName属性须存在，转拼音首字母
                var char = makePy(addressData[i].displayName)[0];
                addressData[i].charName = char
            } else {
                //不存在定为空字符串
                addressData[i].charName = ''
            }
        }

    }
    //排序
    addressData.sort(by("charName"));
    var map = {}
    var html = '';
    for (var i = 0; i < addressData.length; i++) {
        var ch = addressData[i].charName[0];
        var showName;
        if (yonyou.browser.versions.ios) {
            if (addressData[i].name && addressData[i].name.formatted) {
                showName = addressData[i].name.formatted;
                addressData[i].chinaName = showName;
            }else if(addressData[i].name && typeof addressData[i].name ==='string'){
                showName = addressData[i].name;
                addressData[i].chinaName = showName;
            } else {
                showName = '无姓名';
                addressData[i].chinaName = '无姓名';
            }
        }else {
            if (addressData[i].displayName) {
                showName = addressData[i].displayName;
                addressData[i].chinaName = showName;
            } else {
                showName = '无姓名';
                addressData[i].chinaName = showName;
            }
        }

        if (!ch) {
            html = html + '<li data-id="'+addressData[i].id+'" onclick="clickUser(this)">' + showName + '</li>'
        } else if (!map[ch] && ((ch.charCodeAt(0)) < 91 && (ch.charCodeAt(0)) > 64)) {
            map[ch] = true;
            html = html + '<li data-ch="' + ch + '" class="chLi" style="background-color: #f3f3f3;padding-top: 3px;padding-bottom: 3px;border: none;font-weight: bolder;">' + ch + '</li>'
            html = html + '<li data-id="'+addressData[i].id+'" onclick="clickUser(this)">' + showName + '</li>'
        } else {
            html = html + '<li data-id="'+addressData[i].id+'" onclick="clickUser(this)">' + showName + '</li>'
        }
    }
    return html;
}

function TRANPHONES(EN) {
    switch(EN)
    {
        case 'mobile':
            return '手机';
            break;
        case 'work':
            return '工作电话';
            break;
        case 'home':
            return '家庭电话';
            break;
        default:
            return '其他电话';
    }
};
function TRANEMAIL(EN) {
    switch(EN)
    {
        case 'work':
            return '工作邮箱';
            break;
        case 'home':
            return '家庭邮箱';
            break;
        default:
            return '其他邮箱';
    }
};
function TRANOTHER(EN) {
    switch(EN)
    {
        case 'birthday':
            return '生日';
            break;
        case 'note':
            return '备注';
            break;
        case 'urls':
            return '网站';
            break;
        default:
            return '其他';
    }
};

