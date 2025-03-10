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

function isEmpty(str: string) {
    return str == null || str.toString().trim().length === 0;
}

function isPositiveInteger(str: string) {
    const regex = /^[1-9]\d*$/;
    return !isEmpty(str) && regex.test(str);
}

const $ = {
    post: post,
    isEmpty: isEmpty,
    isPositiveInteger: isPositiveInteger
};

export {$}
