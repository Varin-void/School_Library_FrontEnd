
function setCookie(token_value) {
    const d = new Date();
    d.setTime(d.getTime() + (1 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "Token=" + token_value + ";" + expires + ";path=/";
}

function getCookie() {
    let name = "Token=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export { getCookie, setCookie };