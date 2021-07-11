const MAX = 100;
const MIN = 6;
const AMOUNT = 12;
function getNumber(max) {
    return Math.ceil(Math.random() * max);
}
function getPlus() {
    const r1 = getNumber(MAX - MIN * 2) + MIN; // 避免出现太简单的
    const r2 = getNumber(MAX - r1 - MIN * 2) + MIN;
    const res = r1 + r2;
    console.log({ r1, r2, res });
    return { r1, r2, res, operator: '+' };
}
function getMinus() {
    const { r1: p1, r2: p2, res } = getPlus();
    return { r1: res, r2: p2, res: p1, operator: '-' };
}
function getFList() {
    const list = [];
    for (let i = 0; i < AMOUNT; ++i) {
        const d = Math.random();
        const f = d > .5
            ? getPlus()
            : getMinus();
        list.push(f);
    }
    return list;
}
function formatDigi(num) {
    return num.toString().padStart(2, ' ');
}
function formatList(list, isShowResult = false) {
    let str = [];
    str = list.map(f => (`<li>${formatDigi(f.r1)} ${f.operator} ${formatDigi(f.r2)} = ${isShowResult ? f.res : ''}</li>`));
    return `<ul>
        ${str.join('')}
        </ul>`;
}
(function () {
    const list = document.createElement('div');
    const btn = document.createElement('button');
    const btn2 = document.createElement('button');
    list.className = 'calcBox';
    btn.innerText = '显示结果';
    btn2.innerText = '换一组';
    document.body.appendChild(list);
    document.body.appendChild(btn);
    document.body.appendChild(btn2);
    let flist = getFList();
    list.innerHTML = formatList(flist);
    btn.onclick = () => {
        list.innerHTML = formatList(flist, true);
    };
    btn2.onclick = () => {
        flist = getFList();
        list.innerHTML = formatList(flist);
    };
})();
