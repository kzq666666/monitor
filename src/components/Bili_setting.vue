<template>
    <div>
        <div class="bili_s">
            <div class="breadcrumb">
                <span @click="back" class="back_system">返回/</span>
                <h1>BiliBili系统设置</h1>
                <router-link to="/main/system/bilibili/video_setting">
                    <button :class="{active:cur_setting=='video'}" @click="cur_setting='video'">视频</button>
                </router-link>
                <router-link to="/main/system/bilibili/article_setting">
                    <button :class="{active:cur_setting=='article'}" @click="cur_setting='article'">文章</button>
                </router-link>
            </div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
            
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                cur_setting: 'video'
            }
        },
        methods: {
            back: function () {
                this.$router.push('/main/system/bilibili')
            },
        }
    }
</script>
<style scoped>
    .bili_s {
        width: 100%;
        height: 100%;
        background: rgb(220, 226, 241);
        padding: 30px;
        box-sizing: border-box;
        overflow: scroll;
    }

    .back_system {
        color: brown;
        font-size: 16px;
        cursor: pointer;
    }

    .breadcrumb {
        padding-left: 30px;
    }

    .breadcrumb h1 {
        display: inline-block;
        position: relative;
        top: 3px;
    }

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

    .active {
        background: #f40;
    }
</style>