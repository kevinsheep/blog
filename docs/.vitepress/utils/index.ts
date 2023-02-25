// 从 url 取参
export const getUrlParam = (key: string) => {
    const str = window.location.search;
    const reg = new RegExp('[?|&]' + key + '=([^&]+)');
    const match = str.match(reg);
    const param = match && match[1];
    return param ? decodeURIComponent(param) : null;
};

// 兼容alert的通知
export const notify = (body: string) => {
    const title = '提个醒：';
    const icon = '/assets/img/avatar-head.png';
    if (!('Notification' in window)) {
        alert(body);
    } else if (Notification.permission === 'granted') {
        new Notification(title, { icon, body });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification(title, { icon, body });
            }
        });
    }
};

// 基于theme.sidebar生成扁平列表
export const getFlatList = (sidebar: object) => {
    const list = [];
    Object.keys(sidebar).forEach((dir) => {
        const onlyChild = sidebar[dir][0]; // ASSERT 有且仅有一个子栏目
        onlyChild.items.forEach((item) =>
            list.push({
                ...item,
                parentLink: dir,
                parentText: onlyChild.text,
                tags: item.tags && item.tags.split('|'),
            })
        );
    });
    return list;
};
