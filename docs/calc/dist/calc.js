var MAX = 100;
function getNumber(max) {
    return Math.ceil(Math.random() * max);
}
function getPlus() {
    var r1 = getNumber(MAX);
    var r2 = getNumber(MAX - r1);
    var res = r1 + r2;
    return { r1: r1, r2: r2, res: res, operator: '+' };
}
function getMinus() {
    var _a = getPlus(), p1 = _a.r1, p2 = _a.r2, res = _a.res;
    return { r1: res, r2: p2, res: p1, operator: '-' };
}
function getFList() {
    var list = [];
    for (var i = 0; i < 8; ++i) {
        var d = Math.random();
        var f = d > .5
            ? getPlus()
            : getMinus();
        list.push(f);
    }
    return list;
}
function formatList(list, isShowResult) {
    if (isShowResult === void 0) { isShowResult = false; }
    var str = [];
    str = list.map(function (f) { return (f.r1 + " " + f.operator + " " + f.r2 + " = " + (isShowResult ? f.res : '')); });
    return str.join('<br />');
}
(function () {
    var list = document.createElement('div');
    var btn = document.createElement('button');
    var btn2 = document.createElement('button');
    list.className = 'calcBox';
    btn.innerText = '显示结果';
    btn2.innerText = '换一组';
    document.body.appendChild(list);
    document.body.appendChild(btn);
    document.body.appendChild(btn2);
    var flist = getFList();
    list.innerHTML = formatList(flist);
    btn.onclick = function () {
        list.innerHTML = formatList(flist, true);
    };
    btn2.onclick = function () {
        flist = getFList();
        list.innerHTML = formatList(flist);
    };
})();
