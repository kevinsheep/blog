// 从 url 取参
export const getUrlParam = (key: string) => {
    const str = window.location.search;
    const reg = new RegExp('[?|&]' + key + '=([^&]+)');
    const match = str.match(reg);
    const param = match && match[1];
    return param ? decodeURIComponent(param) : null;
};

export const getAuthState = () => {
    return `${window.location.pathname.replace('/', '--')}|${Math.random()}`;
};

export const getSearch = () => {
    return window.location.search;
};

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
