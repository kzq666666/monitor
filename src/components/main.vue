<template>
    <div class="main">
        <div class="main_top">
            <div class="main_info">
                <img src="../assets/control.png" class="control">
                <span class="title">天眼</span class="title">
                <span class="e_title">监控系统</span>
            </div>
        </div>
        <div class="self_info">
            <div class="avtor"></div>
            <div class="user">{{user_name}}</div>
            <ul>
                <router-link to="/main/system">
                    <li class="system">
                        天眼系统
                    </li>
                </router-link>
                <router-link to="/main/info">
                    <li class="info">
                        个人资料
                    </li>
                </router-link>
                <router-link to="/main/message">
                    <li class="message">
                        通知中心
                    </li>
                </router-link>
                <li class="exit" @click="logout">
                    退出系统
                </li>
            </ul>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                user_name:window.sessionStorage.user_name
            }
        },
        methods: {
            logout: function () {
                let logout_time = new Date();
                localStorage.setItem('logout_time', logout_time.toLocaleString())
                sessionStorage.clear();
                this.$router.push('/login');
            }
        },
    }
</script>
<style>
    .main {
        height: 100%;
        
    }

    .main_top {
        height: 50px;
        background: #5f6468;
    }

    .main_info {
        width: 210px;
        height: 50px;
        box-sizing: border-box;
        padding: 10px 10px;
        line-height: 30px;
    }

    .control {
        width: 50px;
        height: 40px;
        vertical-align: middle;
        margin: -10px 0;
    }

    .main_info .title {
        font-size: 18px;
        color: #fff;
        line-height: 30px;
        margin-left: -5px;
    }

    .main_info .e_title {
        font-size: 14px;
        color: #999;
    }

    .self_info {
        position: absolute;
        width: 210px;
        top: 50px;
        bottom: 0;
        left: 0;
        background: #f5f5f5;
        text-align: center;
    }

    .self_info .avtor {
        width: 100px;
        height: 100px;
        background: url(../assets/avatar.png);
        background-size: 100px 100px;
        margin: auto;
        margin-top: 20px;
        margin-bottom: 10px;
    }


    .self_info .user {
        color: #333;
        font-size: 14px;
        margin-bottom: 10px;
    }

    .self_info ul li {
        position: relative;
        width: 100%;
        height: 30px;
        padding: 5px 0;
        line-height: 30px;
        cursor: pointer;
        color: #666;
    }

    .self_info ul li:hover {
        color: black;
        font-weight: bold;
    }

    .self_info .system::before {
        position: absolute;
        content: "";
        width: 20px;
        height: 20px;
        background: url(../assets/systeam.png);
        background-size: 100%;
        left: 50px;
        top: 50%;
        margin-top: -10px;
    }

    .self_info .info::before {
        position: absolute;
        content: "";
        width: 20px;
        height: 20px;
        background: url(../assets/self_info.png);
        background-size: 100%;
        left: 50px;
        top: 50%;
        margin-top: -10px;
    }

    .self_info .message::before {
        position: absolute;
        content: "";
        width: 20px;
        height: 20px;
        background: url(../assets/message.png);
        background-size: 100%;
        left: 50px;
        top: 50%;
        margin-top: -10px;
    }
    .self_info .exit::before {
        position: absolute;
        content: "";
        width: 20px;
        height: 20px;
        background: url(../assets/exit.png);
        background-size: 100%;
        left: 50px;
        top: 50%;
        margin-top: -10px;
    }

    .self_info .router-link-active li {
        background: #999;
        color: #000;
        font-weight: bold;
    }
    .main .content{
        position: absolute;
        left: 210px;
        right: 0;
        top: 50px;
        bottom: 0;
        background: #fff;
        min-width:1200px;
    }
</style>