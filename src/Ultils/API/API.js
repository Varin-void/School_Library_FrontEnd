import { Host } from "./URL";

const API = {
    POST: (url, param) => {
        const DATA = fetch(Host + url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(param)
        }).then(res => res.json())
        return DATA;
    },
    POST_FORM_DATA: (url, param) => {
        const DATA = fetch(Host + url, {
            method: 'POST',
            mode: 'cors',
            body: param
        }).then(res => res.json())
        return DATA;
    }
}

export default API;