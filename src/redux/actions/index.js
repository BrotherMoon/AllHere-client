import config from '../../../config';
import {message} from 'antd';
import {ASYNC} from 'redux-amrc';
import {request} from '../../../utils';

export const TOGGLE_SILDER = 'TOGGLE_SILDER';
export const TOGGLE_MESSAGEFORM = 'TOGGLE_MESSAGEFORM';

export const toggleSilder = () => ({type: TOGGLE_SILDER});
export const toggleMessageForm = () => ({type: TOGGLE_MESSAGEFORM});
export const fetchNews = (what) => {
    const serverAddress = config.serverAddress ? config.serverAddress : 'localhost:3001';
    return {
        [ASYNC]: {
            key: 'news',
            promise: () => request(`http://${serverAddress}/api/${what}/hot`, 'get').then(json => {
                message.success('加载成功');
                return json.data.news;
            }).catch(ex => {
                console.error('parsing failed', ex);
                message.error('加载失败，请重新再试');
            })
        }
    }
};