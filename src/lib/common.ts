import {AxiosError, AxiosResponse} from "axios";
import axios from "axios";
import {config} from '@/lib/config.ts';

function post(action: string, success: Function) {
    axios.post(config.serverUrl + 'api', {
        action: action,
    })
        .then(function (response: AxiosResponse) {
            console.log(response);
            if (success) {
                success(response.data);
            }
            // return response.data;
        })
        .catch(function (error: AxiosError) {
            console.log(error);
        });
}

const $ = {
    post: post
};

export {$}
