import axios from 'axios';

// import { CHAT_CONFIG } from '../../../models/chat-config';

export const createUser = (user) => {
    console.log(user);
    axios.post('https://api.chatengine.io/users/', user
    ,
        {
            headers: {
                'PRIVATE-KEY': "43cda2a7-026c-4e75-a05a-a0bd5bcd0226"
            }
        }
    )
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}
