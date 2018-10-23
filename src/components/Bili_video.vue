<template>
    <div>
        <div class="sort_list" v-if="!none_data_key">
            <div @click=sortDefault :class="{active:sortby=='default'}">
                <span>默认</span><img src="../assets/sort.png">
            </div>
            <div @click=sortPlay :class="{active:sortby=='play'}">
                <span>播放量</span><img src="../assets/sort.png">
            </div>
            <div @click=sortEndTime :class="{active:sortby=='end_time'}">
                <span>截止时间</span><img src="../assets/sort.png">
            </div>
        </div>
        <div class="box">
            <div class="box_item" v-for="(item, index) in data" :key="index">
                <a :href=item.arcurl target="_blank">
                    <div class="title" v-html="item.title">
                    </div>
                </a>
                <div class="id bulebule">
                    <span class="key">id:</span>
                    <span>{{item.video_id}}</span>
                </div>
                <div class="play bulebule">
                    <span class="key">播放量:</span>
                    <span class="play_value">{{item.play}}</span>
                </div>
                <div class="max_play bulebule">
                    <span class="key">阀值:</span>
                    <span>{{item.max_play}}</span>
                </div>
                <div class="keyword bulebule">
                    <span class="key">关键词:</span>
                    <span class="keyword_value">{{item.keyword}}</span>
                </div>
                <div class="pubdate bulebule">
                    <span class="key">发布时间:</span>
                    <span>{{new Date(item.pubdate*1000).toLocaleString()}}</span>
                </div>
                <div class="pubdate bulebule">
                    <span class="key">监控时间:</span>
                    <span>{{new Date(item.pubdate*1000).toLocaleString()}}----{{new
                        Date(item.end_time*1000).toLocaleString()}}</span>
                </div>
                <div class="controller bulebule">
                    <button class="delete" @click="delItem(index,item.video_id)">删除</button>
                    <button class="update" @click="show_update_content(item)">更新</button>
                </div>
            </div>
            <span id="none_data" v-if="none_data_key">当前页面暂时没有数据,请添加监控关键词或等待爬虫爬取数据</span>
            <div class="page_controller">
                <a href="#anchor" @click="first_page" class="a_button">首页</a>
                <button @click="pre_page" v-show="page_show !=10">
                    <上一页</button> <a href="#anchor" v-for="(page,index) in max_page" v-show="index+1<=page_show&&index+1>page_show-10"
                        class="page_number" :class="{BG_light:index==lighted}" @click="change_Bg(index)">{{page}}</a>
                        <button class="next_page" @click="next_page" v-show="(max_page.length-page_show)>0">下一页></button>
                        <a href="#anchor" @click="last_page" class="a_button">尾页</a>
            </div>
        </div>
        <div class="update_content" v-show="key">
            <div class="title" v-html="item.title">
            </div>
            <div class="max_play_con">
                <span>阀值:</span>
                <input type="text" v-model="update_form.max_play" placeholder="请输入新的阀值">
            </div>
            <div class="date">
                <span>监控结束日期:</span>
                <input type="date" v-model="end_date">
            </div>
            <div class="update_button">
                <button @click="update_data">确定</button>
                <button @click="exit_update">取消</button>
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
                data: [],
                max_page: [],
                len: 0,
                lighted: 0,
                end_date: '',
                key: false,
                none_data_key: false,
                //控制页码显示的参数
                page_show: 10,
                update_form: {
                    video_id: '',
                    max_play: '',
                    end_time: ''
                },
                item: {},
                //当前模块
                module: 'video',
                //排序方式
                sortby: 'default'
            }
        },
        methods: {
            //排序
            sortDefault() {
                this.sortby = 'default'
                this.get_page(1);
                this.lighted = 0;
            },
            sortPlay() {
                this.sortby = 'play'
                this.get_page(1);
                this.lighted = 0;
            },
            sortEndTime() {
                this.sortby = 'end_time';
                this.get_page(1);
                this.lighted = 0;
            },
            get_page(page) {
                this.$http.get(this.url + '/api/bilibili/uservideo/' + page + '?sortby=' + this.sortby, this.headers).then(
                    (res) => {
                        this.data = res.data.data;
                        this.len = res.data.pages;
                        if (this.len == 0) {
                            this.none_data_key = true;
                        }
                        if (!this.max_page[0]) {
                            let len = this.max_page.length;
                            for (var i = 0; i < this.len; i++) {
                                this.max_page[i] = i + 1
                            }
                        }
                    }
                )
            },
            change_Bg(index) {
                this.lighted = index;
                this.get_page(index + 1);
            },
            delItem(index, video_id) {
                let confm = confirm('确定删除吗');
                if (confm == true) {
                    this.$http({
                        method: 'delete',
                        url: this.url + '/api/bilibili/uservideo',
                        headers: {
                            'Authorization': window.sessionStorage.token
                        },
                        data: {
                            "video_id": video_id
                        }
                    }).then(
                        (res) => {
                            if (res.data.code == 0) {
                                alert("删除成功");
                                this.data.splice(index, 1);
                            } else {
                                alert("删除失败")
                            }
                        }
                    )
                }
            },
            show_update_content(item) {
                this.key = true;
                this.item = item;
            },
            update_data() {
                let day = new Date(this.end_date);
                this.update_form.end_time = day.getTime() / 1000;
                this.update_form.video_id = this.item.video_id;
                this.key = false;
                this.$http.put(this.url + '/api/bilibili/uservideo', this.update_form, this.headers).then(
                    (res) => {
                        if (res.data.code == 0) {
                            alert('数据完成更新');
                            this.item.end_time = this.update_form.end_time;
                            this.item.max_play = this.update_form.max_play;
                        } else {
                            alert('数据更新失败');

                        }
                    }
                )
            },
            exit_update() {
                this.key = false;
            },
            goSetting() {
                this.$router.push('/main/system/bilibili/setting')
            },
            pre_page() {
                this.page_show -= 10;
            },
            next_page() {
                this.page_show += 10;
            },
            first_page() {
                this.page_show = 10;
                this.change_Bg(0);
            },
            last_page() {
                let len = this.max_page.length;
                this.page_show = len - len % 10 + 10;
                this.change_Bg(len - 1);
            },

        },
        created() {
            this.get_page(1);
        },
    }
</script>


<style scoped>
    .sort_list {
        margin-left: 10px;
    }

    .sort_list div {
        display: inline-block;
        background: #dddddd;
        padding: 5px;
        box-shadow: 1px 1px 6px white;
        border-radius: 3px;
        cursor: pointer;
        margin-right: 5px;
    }

    .sort_list img {
        margin-left: 3px;
        width: 13px;
        height: 15px;
        vertical-align: middle
    }

    /* 当前排序方式高亮 */
    .sort_list .active {
        background: #FC9D99;
    }

    .box {
        display: flex;
        width: 100%;
        margin-top: 10px;
        flex-wrap: wrap;

    }

    .box_item {
        box-sizing: border-box;
        width: 48%;
        border: 1px solid #f5f5f5;
        border-radius: 3px;
        margin: 9px;
        font-size: 20px;
    }

    .title {
        text-align: center;
        background: #FC9D99;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .id {
        padding-top: 5px;
    }

    .box_item .key {
        display: inline-block;
        width: 20%;
        text-align: right;
    }

    .box_item .controller {
        text-align: center;
    }

    .bulebule {
        background: #D0D0D0;
    }

    .play_value {
        color: red;
    }

    .controller button {
        width: 60px;
        height: 35px;
        border: none;
        outline: none;
        background: red;
        border-radius: 5px;
        margin: 10px 10px;
        cursor: pointer;
        font-size: 20px;
        text-align: center;
        line-height: 35px;
    }

    .controller .update {
        background: #2d8cf0;
    }

    .page_controller {
        text-align: center;
        width: 98%;
        margin-top: 10px;
    }

    .page_controller a {
        cursor: pointer;
        margin-right: 2px;
        color: #fff;
    }

    .page_number {
        display: inline-block;
        width: 35px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #e1e2e3;
        margin: 10px;
    }

    .BG_light {
        background: #EB7347;
    }

    .update_content {
        position: absolute;
        top: 200px;
        left: 50%;
        margin-left: -400px;
        width: 50%;
        height: 245px;
        border: 1px solid black;
        background: #f5f5f5;
        padding: 20px;
        text-align: center;
    }

    .max_play_con {
        margin-top: 30px;
        height: 30px;

    }

    .max_play_con span,
    .date span {
        color: #EB7347;
        font-size: 20px;
    }

    .max_play_con input {
        height: 20px;
        padding: 2px 2px 2px 5px;
        font-size: 16px
    }

    .date {
        margin: 20px 80px 40px 0;
    }

    .date input {
        width: 195px;
        height: 22px;
        padding: 2px 2px 2px 5px;
        font-size: 16px
    }

    .update_button button {
        width: 60px;
        height: 30px;
        margin-right: 20px;
    }

    .update_content .title {
        font-size: 20px;
        background: transparent;
        margin-top: 10px;
    }

    .page_controller button,
    .a_button {
        display: inline-block;
        width: 70px;
        height: 30px;
        background: #032d3b;
        border: 1px solid #e1e2e3;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        cursor: pointer;
        outline: none;
        color: #fff;
    }

    .page_controller .next_page {
        margin-left: 10px;
        color: #ffffff;

    }

    #none_data {
        display: block;
        margin: 200px auto;
        font-size: 30px;
        color: #d81e06;
    }
</style>