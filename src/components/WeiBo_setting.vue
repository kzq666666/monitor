<template>
    <div class="weibo_s">
        <div class="breadcrumb">
            <span @click="back" class="back_system">返回/</span>
            <h1>新浪微博系统设置</h1>
        </div>
        <div class="weibo_con">
            <div class="set_keyword">
                <span class="header">监控关键词及添加</span>
                <div v-for="(item,index) in keyword" :key="index">
                    关键词:<span id="keyword">{{item.keyword}}</span>
                    监控状态:<span id="keyword_status">{{item.status}}</span>
                    <div>
                        <button class="switch_button" @click="switch_keyword(item)">切换关键词状态</button>
                        <button class="del_button" @click="del_keyword(item,index)">删除关键词</button>
                    </div>
                </div>
                <div class="tips">(tips: 0 为未监控状态, 1 为监控状态)</div>
                <div class="addKeyword">添加关键词:<input type="text" v-model="add_keyword" placeholder="请输入要添加的关键词"></div>
                <div>
                    <button @click="sure_addkeyword">确定添加</button>
                </div>
            </div>
            <div class="add_weibo">
                <span class="header">添加一条微博</span>
                <div class="add_wid">添加微博:<input type="number" placeholder="请输入微博的id" v-model="add_form.wid"></div>
                <div>截止时间:<input type="date" id="input_date" v-model="add_form.end_time"></div>
                <div>最大阀值:<input type="number" placeholder="请输入最大阀值" v-model="add_form.max"></div>
                <div>
                    <button @click='add_weibo'>确定添加</button>
                </div>
            </div>
            <div class="reset">
                <span class="header">重置阀值和天数</span>
                <div>重置默认阀值:<input type="number" :placeholder="'当前默认为'+de_max_comment" v-model="reset_form.weibo_default_max_comment"></div>
                <div>重置默认天数:<input type="number" :placeholder="'当前默认为'+de_end_time+'天'" v-model="reset_form.weibo_default_end_time"></div>
                <div>
                    <button @click='reset'>确定重置</button>
                </div>

            </div>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                url: this.GLOBAL.url,
                headers: this.GLOBAL.headers,
                de_max_comment: '',
                de_end_time: '',
                keyword: '',
                add_keyword: '',
                need_addemail: '',
                add_form: {
                    wid: '',
                    end_time: '',
                    max: ''
                },
                reset_form: {
                    weibo_default_max_comment: '',
                    weibo_default_end_time: ''
                }
            }
        },
        methods: {
            back: function () {
                this.$router.push('/main/system/weibo')
            },
            add_weibo() {
                if (!this.add_form.wid) {
                    alert('请输入微博id')
                } else if (!this.add_form.end_time) {
                    alert('请输入截止时间')
                } else if (!this.add_form.max) {
                    alert('请输入阀值')
                }
                if (this.add_form.wid && this.add_form.end_time && this.add_form.max) {
                    this.add_form.end_time = (new Date(this.add_form.end_time).getTime()) / 1000;
                    this.$http.post(this.url + '/api/weibo/userweibo', this.add_form, this.headers).then(
                        (res) => {
                            if (res.data.code == 0) {
                                alert('视频添加成功');
                                this.$router.go(0);
                            } else {
                                alert('添加失败,请确定微博id是否存在或已经添加过了')
                            }
                        }

                    )
                }
            },
            reset() {
                    this.reset_form.weibo_default_max_comment = this.reset_form.weibo_default_max_comment == '' ? this.de_max_comment : this.reset_form.weibo_default_max_comment
                    this.reset_form.weibo_default_end_time = this.reset_form.weibo_default_end_time == '' ? this.de_end_time : this.reset_form.weibo_default_end_time
                    this.$http.put(this.url + '/api/user/defaultset', this.reset_form, this.headers).then(
                        (res) => {
                            if (res.data.code == 0) {
                                alert('重置成功');
                                this.$router.go(0);
                            } else {
                                alert('重置失败')
                            }
                        }
                    )
            },
            switch_keyword(item) {
                this.$http.put(this.url + '/api/weibo/keyword', { "name": item.keyword,"status":item.status }, this.headers).then(
                    function (res) {
                        if (res.data.code == 0) {
                            item.status = item.status == 0 ? 1 : 0;
                            alert('切换状态成功')
                        } else {
                            alert('切换状态失败')
                        }
                    }
                )
            },
            del_keyword(item,index) {
                let mksure = confirm('是否删除该关键词(tips:删除该关键词会同时删除正在监控的该关键词的所有数据)');
                if (mksure == true) {
                    this.$http({
                        method: 'delete',
                        url: this.url + '/api/weibo/keyword',
                        headers: {
                            'Authorization': window.sessionStorage.token
                        },
                        data: {
                            name: item.keyword
                        }
                    }).then(
                        (res) => {
                            if (res.data.code == 0) {
                                alert('删除关键词成功');
                                this.keyword.splice(index, 1);
                            } else {
                                alert('删除失败')
                            }
                        }
                    )
                }
            },
            sure_addkeyword() {
                this.$http.post(this.url + '/api/weibo/keyword', { "name": this.add_keyword }, this.headers).then(
                    (res)=> {
                        if (res.data.code == 0) {
                            alert('添加关键词成功');
                            this.$router.go(0);
                        } else {
                            alert('添加词失败')
                        }
                    }
                )
            },
        },
        created() {
            this.$http.get(this.url + '/api/user/defaultset', this.headers).then(
                (res) => {
                    this.de_max_comment = res.data.data.weibo_default_max_comment;
                    this.de_end_time = res.data.data.weibo_default_end_time;
                }
            )
            this.$http.get(this.url + '/api/weibo/keyword', this.headers).then(
                (res) => {
                    this.keyword = res.data.data;
                }
            )
        }

    }

</script>

<style scoped>
    .weibo_s {
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

    .weibo_con {
        padding: 30px;

    }

    .weibo_con>div {
        border: 1px solid #424242;
    }

    .weibo_con>div div {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        font-size: 20px;
        text-align: center;
    }

    .weibo_con>div input {
        margin-left: 5px;
        height: 25px;
        font-size: 20px;
        padding: 2px 2px 2px 10px;
    }

    .weibo_con>div span {
        display: block;
        text-align: center;
    }

    .weibo_con .header {
        font-size: 25px;
        background: #FC9D99;
        margin-bottom: 5px;
    }

    #input_date {
        width: 243px;
        height: 25px;
    }

    button {
        text-align: center;
        background: #19be6b;
        border: none;
        outline: none;
        width: 80px;
        height: 40px;
        color: #fff;
        font-size: 17px;
        line-height: 40px;
        cursor: pointer;
        border-radius: 5px;
    }

    .switch_button {
        width: 130px;
        margin-right: 20px;
    }

    .del_button {
        width: 130px;
        background: red;
    }

    .addKeyword,
    .add_email {
        border-top: 1px solid #999;
        padding-top: 10px;
        margin-top: 10px;
    }

    .addKeyword input {
        margin-top: 10px;
    }

    #email_box,
    #watch_status {
        display: inline-block;
    }

    #email_content {
        display: inline-block;
        color: red;
        margin-right: 2px;
    }

    .bili_con>div .add_email {
        padding-top: 15px;
    }
    .tips{
        color:rgb(238, 81, 81);
    }
    #keyword{
        display: inline-block;
        margin-right: 25px;
        color: red;
    }
    #keyword_status{
        display: inline-block;
        color:red;
    }
</style>