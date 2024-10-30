const setCookie = (name, value, days, path = "/", domain, secure) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  // qtdDay * 24 horas * 60 minutos * 60 segundos * 1000 milisegundos
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value}${expires}; path=${path}${domain ? `; domain=${domain}` : ""}${secure ? "; secure" : ""}`;
};


function getCookie(name) {
    let cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}

const eraseCookie = (name, path = "/") => {
    document.cookie = `${name}=; Max-Age=-99999999; path=${path}`;
};

export { setCookie, getCookie, eraseCookie };