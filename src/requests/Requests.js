import Axios from 'axios';

export function getSubscriptions(name, pass) {
    Axios.post('api/v1/threads/getSubscriptions', {
        user_name: name,
        user_password: pass
    }).then((res) => {
        if (res.data.response == 'success') {
            return res.data.threads
        }
    })
}