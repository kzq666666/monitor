<template>
    <div class="bilibili">
        <div class="breadcrumb" id="anchor">
            <router-link to='/main/system'>天眼系统首页</router-link>
            <span>/</span>
            <h1>BiliBili监控系统</h1>
            <img src="../assets/bilibili.jpg" alt="">
            <router-link to="/main/system/bili_video">
                <button class="video" :class="{active:module=='video'}" @click="Video_md">视频</button>
            </router-link>
            <router-link to="/main/system/bili_article">
                <button class="acticle" :class="{active:module=='article'}"  @click="Acticle_md">文章</button>
            </router-link>
            <div class="bili_setting" @click="goSetting">
                <img src="../assets/setting.png" alt="">系统设置
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //当前模块
                module: 'video'
            }
        },
        methods: {
            //跳转到设置页面
            goSetting() {
                this.$router.push('/main/system/bilibili/setting')
            },
            //点击进入视频模块
            Video_md() {
                this.module = 'video'
            },
            //点击进入文章模块
            Acticle_md() {
                this.module = 'article'
            }
        },
        created() {
            if (this.$router.history.current.fullPath == '/main/system/bili_article') {
                this.module = 'article'
            } else {
                this.module = 'video'
            }
        }
    }
</script>


<style scoped>
    .bilibili {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 30px;
        overflow: scroll;
        background: #032d3b;
    }

    .breadcrumb a {
        color: brown;
        font-size: 16px;
        margin-left: 10px;
    }

    .breadcrumb>span {
        color: #777;
        font-size: 12px;
    }

    .breadcrumb h1 {
        display: inline-block;
        color: #fff;
    }

    .breadcrumb>img {
        width: 200px;
        height: 100px;
        vertical-align: middle;
        margin-top: -10px;
    }

    .breadcrumb .bili_setting {
        display: inline-block;
        margin-left: 20px;
        color: red;
        font-size: 20px;
        cursor: pointer;
    }

    .breadcrumb .bili_setting img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
        position: relative;
        top: -1px;
    }

    .breadcrumb .bili_setting span {
        color: #fff;
        font-size: 20px
    }

    /* B站添加的视频和文章按钮 */
    .breadcrumb button {
        width: 80px;
        height: 40px;
        margin-left: 10px;
        box-shadow: 2px 5px 2px grey;
        font-size: 18px;
        border-radius: 5px;
        line-height: 40px;
        border: 1px solid black;
        cursor: pointer;

    }

    /* 点击按钮变色 */
    .active {
        background: #2d8cf0;
    }
</style>