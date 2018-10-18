//导入相关文件和组件
import login from './components/login'
import register from './components/register'
import main from './components/main'
import system from './components/system'
import info from './components/info'
import message from './components/message'
import Bili from './components/Bili'
import Bili_video from './components/Bili_video'
import Bili_article from './components/Bili_article'
import Bili_setting from './components/Bili_setting'
import Bili_setting_video from './components/Bili_setting_video'
import Bili_setting_article from './components/Bili_setting_article'
import WeiBo from './components/WeiBo'
import WeiBo_setting from './components/WeiBo_setting'
import HuPu from './components/HuPu'
import HuPu_setting from './components/HuPu_setting'




//配置并输出路由
export const routes = [
    {
        path: '/login',
        component: login,

    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/main',
        component: main,
        redirect: '/main/system',
        children: [
            { path: '/main/system', component: system },
            { path: '/main/info', component: info },
            { path: '/main/message', component: message },
            {
                path: '/main/system/bilibili', component: Bili,
                redirect: '/main/system/bili_video',
                children: [
                    { path: '/main/system/bili_video', component: Bili_video },
                    { path: '/main/system/bili_article', component: Bili_article }
                ]
            },
            {
                path: '/main/system/bilibili/setting',
                component: Bili_setting,
                redirect: '/main/system/bilibili/video_setting',
                children: [
                    { path: '/main/system/bilibili/video_setting', component: Bili_setting_video },
                    { path: '/main/system/bilibili/article_setting', component: Bili_setting_article }
                ]
            },
            { path: '/main/system/weibo', component: WeiBo },
            { path: '/main/system/weibo/setting', component: WeiBo_setting },
            { path: '/main/system/hupu', component: HuPu },
            { path: '/main/system/hupu/setting', component: HuPu_setting },
        ]
    },
    {
        path: '*',
        redirect: '/login'
    }
]







