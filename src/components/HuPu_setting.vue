<template>
    <div class="hupu_s">
        <div class="breadcrumb">
            <span @click="back" class="back_system">返回/</span>
            <h1>虎扑电竞系统设置</h1>
        </div>
        <div class="hupu_con">
            <div class="set_keyword">
                <span class="header">监控关键词及添加</span>
                <div v-for="(item,index) in keyword" :key="index">
                    板块名:<span id="part_name">{{item.part_name}}</span>
                    关键词:<span id="keyword">{{item.keyword}}</span>
                    监控状态:<span id="keyword_status">{{item.status}}</span>
                    <div>
                        <button class="switch_button" @click="switch_keyword(item)">切换关键词状态</button>
                        <button class="del_button" @click="del_keyword(item,index)">删除关键词</button>
                    </div>
                </div>
                <div class="tips">(tips: 0 为未监控状态, 1 为监控状态)</div>
                <div class="addKeyword">
                    <div>
                        添加板块名:<input type="text" v-model="add_keyword.part_name" placeholder="请输入板块名">
                    </div>
                    <div>
                        添加关键词:<input type="text" v-model="add_keyword.keyword" placeholder="请输入要添加的关键词">
                    </div>
                </div>
                <div>
                    <button @click="sure_addkeyword">确定添加</button>
                </div>
            </div>
            <div class="add_post">
                <span class="header">添加自定义帖子</span>
                <div class="add_video_id">添加帖子:<input type="number" placeholder="请输入帖子的id" v-model="add_form.post_id"></div>
                <div>截止时间:<input type="date" id="input_date" v-model="add_form.end_time"></div>
                <div>最大阀值:<input type="number" placeholder="请输入最大阀值" v-model="add_form.max"></div>
                <div>
                    <button @click='add_hupu'>确定添加</button>
                </div>
            </div>
            <div class="reset">
                <span class="header">重置阀值和天数</span>
                <div>重置默认阀值:<input type="number" :placeholder="'当前默认为'+de_max_comment" v-model="reset_form.hupu_post_default_max_comment"></div>
                <div>重置默认天数:<input type="number" :placeholder="'当前默认为'+de_end_time+'天'" v-model="reset_form.hupu_post_default_end_time"></div>
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
                //获取全局的变量
                url: this.GLOBAL.url,
                headers: this.GLOBAL.headers,
                //默认的阀值和监控天数
                de_max_comment: '',
                de_end_time: '',
                //初始化页面时获取的关键词的列表
                keyword: '',
                //添加关键词的表单
                add_keyword: {
                    part_name: '',
                    keyword: ''
                },
                //添加自定义帖子的表单
                add_form: {
                    post_id: '',
                    end_time: '',
                    max: ''
                },
                //重置默认的阀值和天数的表单
                reset_form: {
                    hupu_post_default_max_comment: '',
                    hupu_post_default_end_time: ''
                }
            }
        },
        methods: {
            //返回到天眼系统首页
            back: function () {
                this.$router.push('/main/system/hupu')
            },
            //添加自定义的虎扑帖子
            add_hupu() {
                if (!this.add_form.post_id) {
                    alert('请输入帖子id')
                } else if (!this.add_form.end_time) {
                    alert('请输入截止时间')
                } else if (!this.add_form.max) {
                    alert('请输入阀值')
                }
                if (this.add_form.post_id && this.add_form.end_time && this.add_form.max) {
                    this.add_form.end_time = (new Date(this.add_form.end_time).getTime()) / 1000;
                    this.$http.post(this.url + '/api/hupu/userpost', this.add_form, this.headers).then(
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
            //重置默认的阀值和监控天数
            reset() {
                this.reset_form.hupu_post_default_max_comment = this.reset_form.hupu_post_default_max_comment == '' ? this.de_max_comment : this.reset_form.hupu_post_default_max_comment
                this.reset_form.hupu_post_default_end_time = this.reset_form.hupu_post_default_end_time == '' ? this.de_end_time : this.reset_form.hupu_post_default_end_time
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
            //切换关键词状态
            switch_keyword(item) {
                this.$http.put(this.url + '/api/hupu/keyword', { "keyword_id": item.id, "status": item.status }, this.headers).then(
                    (res) => {
                        if (res.data.code == 0) {
                            item.status = item.status == 0 ? 1 : 0;
                            alert('切换状态成功')
                        } else {
                            alert('切换状态失败')
                        }
                    }
                )
            },
            //删除关键词
            del_keyword(item, index) {
                let mksure = confirm('是否删除该关键词(tips:删除该关键词会同时删除正在监控的该关键词的所有数据)');
                if (mksure == true) {
                    this.$http({
                        method: 'delete',
                        url: this.url + '/api/hupu/keyword',
                        headers: {
                            'Authorization': window.sessionStorage.token
                        },
                        data: {
                            name: item.keyword,
                            keyword_id: item.id
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
            //添加新的关键词
            sure_addkeyword() {
                this.$http.post(this.url + '/api/hupu/keyword', this.add_keyword, this.headers).then(
                    (res) => {
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
        //初始化页面加载默认的阀值和监控天数,以及正在监控的关键词
        created() {
            this.$http.get(this.url + '/api/user/defaultset', this.headers).then(
                (res) => {
                    this.de_max_comment = res.data.data.hupu_post_default_max_comment;
                    this.de_end_time = res.data.data.hupu_post_default_end_time;
                }
            )
            this.$http.get(this.url + '/api/hupu/keyword', this.headers).then(
                (res) => {
                    this.keyword = res.data.data;
                }
            )
        }

    }

</script>

<style scoped>
    .hupu_s {
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

    .hupu_con {
        padding: 30px;

    }

    .hupu_con>div {
        border: 1px solid #424242;
    }

    .hupu_con>div div {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        font-size: 20px;
        text-align: center;
    }

    .hupu_con>div input {
        margin-left: 5px;
        height: 25px;
        font-size: 20px;
        padding: 2px 2px 2px 10px;
    }

    .hupu_con>div span {
        display: block;
        text-align: center;
    }

    .hupu_con .header {
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

    .tips {
        color: rgb(238, 81, 81);
    }

    #keyword,
    #part_name {
        display: inline-block;
        margin-right: 25px;
        color: red;
    }

    #keyword_status {
        display: inline-block;
        color: red;
    }
</style>