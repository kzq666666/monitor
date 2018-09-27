<template>
    <div class="container">
        <div class="monitor">
            <div class="Bili" @click='Bili'>
                <img src="../assets/bilibili.jpg">
            </div>
            <div class="WeiBo" @click='WeiBo'>
                <img src="../assets/WeiBo.png">
                <span>新浪微博</span>
            </div>
            <div class="HuPu" @click='HuPu'>
                <span></span>
            </div>
        </div>
        <div class="view">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            Bili: function () {
                this.$router.push('/main/system/bilibili')
            },
            WeiBo(){
                this.$router.push('/main/system/WeiBo')
            },
            HuPu(){
                this.$router.push('/main/system/HuPu')
            }
        }
    }
</script>
<style scoped>
    .container {
        width: 100%;
        height: 100%;
        
    }

    .monitor {
        display: flex;
        width: 100%;
        
        height: 100%;
        background: url(../assets/contentBG.jpg);
        background-size: 100%;
    }

    .main .content .monitor div {
        position: relative;
        display: flex;
        margin: auto;
        width: 200px;
        height: 300px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 10px;
        opacity: 0.8;
    }

    .main .content .monitor div:hover {
        opacity: 1;
    }

    .main .content .monitor .Bili {
        background: #032d3b;
    }

    .main .content .Bili img {
        width: 200px;
        height: 100px;
    }

    .main .content .monitor .WeiBo {
        background: rgb(239, 110, 82);
    }

    .main .content .monitor .WeiBo img {
        position: absolute;
        width: 95px;
        height: 95px;
        left: 0;
    }

    .main .content .monitor .WeiBo span {
        position: absolute;
        font-size: 25px;
        font-style: italic;
        right: 6px;
    }

    .main .content .monitor .HuPu {
        background: #a75153;
    }

    .main .content .monitor .HuPu span {
        display: block;
        width: 140px;
        height: 30px;
        background: url(../assets/HuPu.png)
    }
</style>