<template>
    <div class="main_info">
        <div class="breadcrumb">
            <router-link to="/main/system">首页</router-link>
            <span>/</span>
            <span>个人资料</span>
        </div>
        <div class="detail">
            <div class="detail_nav">
                <span>基本信息</span>
            </div>
            <div class="detail_c">
                <div class="avatar">
                    <span class="key_text">头像</span>
                    <img src="../assets/avatar.png" alt="">
                </div>
                <div class="username">
                    <span class="key_text">用户名</span>
                    <span class="value_text">{{account_data.username}}</span>
                </div>
                <div class="nickname">
                    <span class="key_text">昵称</span>
                    <span class="value_text">{{account_data.nickname}}</span>
                </div>
                <div class="last_loginT" v-if="last_loginT">
                    <span class="key_text">上次登录时间</span>
                    <span class="value_text">{{last_loginT}}</span>
                </div>
                <div class="login_T">
                    <span class="key_text">本次登录时间</span>
                    <span class="value_text">{{login_T}}</span>
                </div>
                <div id="root_con" v-show="root_authority">
                    <div class="child_account" v-for="(item, index) in child_accounts" :key="index">
                        <span class="key_text">子账号{{index+1}}</span>
                        <span class="value_text account_text">{{item.username}}</span>
                        <button @click="enter_accInfo(item.username)" id="account_infoB">查询</button>
                        <button @click="del_account(item.username)" id="del_account">删除</button>
                    </div>
                    <div class="add_button">
                        <button @click="show_con">添加子账号</button>
                    </div>
                </div>
            </div>
            <div class="add_account_page" v-show="key">
                <h2>添加子账号</h2>
                <input type="text" v-model="subaccount.username" placeholder="子账号">
                <input type="password" v-model="subaccount.password" placeholder="密码">
                <input type="password" v-model="confirm_pwd" placeholder="确认密码">
                <button @click="add_account">添加</button>
                <button class="cancle" @click="cancle">取消</button>
            </div>
            <div class="acc_info" v-show="acc_infoKey">
                <span @click="back_infoPage" class="back_infoPage">返回</span>
                <span>/</span>
                <span class="acc_username">{{acc_username}}的登录信息</span>
                <div class="detail_con">
                    <table border="1">
                        <tr class="tab_title">
                            <th>次数</th>
                            <th>登录时间</th>
                            <th>登录IP</th>
                            <th>登录地点</th>
                        </tr>
                        <tr v-for="(item, index) in account_loginInfo" :key="index" class="info_detail">
                            <th>{{(active_keynumber*20)+index+1}}</th>
                            <th>{{new Date(item.login_time*1000).toLocaleString()}}</th>
                            <th>{{item.login_ip}}</th>
                            <th>{{item.login_city}}</th>
                        </tr>
                    </table>
                    <div class="page_control"  v-show="account_loginInfo.length">
                        <button @click="acc_first_page">首页</button>
                        <button @click="prePage" v-if="max_page!=10">上一页</button>
                        <button :class="{active:index==active_keynumber}"  v-show = "index+1<=max_page&(index+1)>max_page-10" v-for="(item,index) in page" @click=get_page(acc_username,index+1)>{{(index+1)}}</button>
                        <button @click="nextPage" v-if="max_page<=page[page.length-1]">下一页</button>
                        <button @click="acc_last_page">尾页</button>
                    </div>
                    <div class="none_login" v-show="!account_loginInfo.length">该用户未登录过</div>
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 控制查询子账号页面显示的key
                acc_infoKey: false,
                key: false,
                root_authority: '',
                url: this.GLOBAL.url,
                headers: this.GLOBAL.headers,
                account_data: '',
                login_T: window.localStorage.login_time,
                last_loginT: window.localStorage.logout_time,
                confirm_pwd: '',
                child_accounts: '',
                page: [],
                //当前页码最大值
                max_page:10,
                //当前页码背景高亮
                active_keynumber: 0,
                //子账号名
                acc_username:'',
                //子账号登录信息
                account_loginInfo: '',
                subaccount: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            show_con() {
                this.key = true;
            },
            add_account() {
                if (!this.subaccount.username) {
                    alert('子账号不能为空')
                } else if (this.confirm_pwd !== this.subaccount.password) {
                    alert('两次输入密码不相同')
                } else {
                    this.$http.post(this.url + '/api/user/childuser', this.subaccount, this.headers).then(
                        (res) => {
                            if (res.data.code == 0) {
                                alert('添加成功');
                                this.key = false;
                                this.$router.go(0);
                            } else {
                                alert('添加失败');
                                this.key = false;
                            }
                        }
                    )
                }

            },
            cancle() {
                this.key = false;
            },
            del_account(username) {
                let confm = confirm('确定删除吗');
                if (confm == true) {
                    this.$http({
                        method: 'delete',
                        url: this.url + '/api/user/childuser',
                        headers: {
                            'Authorization': window.sessionStorage.token
                        },
                        data: {
                            "username": username
                        }
                    }).then(
                        (res) => {
                            if (res.data.code == 0) {
                                alert("删除成功");
                                this.$router.go(0)

                            } else {
                                alert("删除失败")
                            }
                        }
                    )
                }
            },
            //获取子账号的登录信息页数
            get_page(username,page){
                this.active_keynumber = page-1;
                this.$http.get(this.url + '/api/user/loginrecord/' + username + '/'+page, this.headers).then(
                    (res) => {
                        this.account_loginInfo = res.data.data;
                    }
                )
            },
            //查看子账号的登录时间
            enter_accInfo(username) {
                this.page = [];
                this.max_page = 10;
                this.active_keynumber = 0;
                this.acc_username = username;
                this.acc_infoKey = true;
                this.$http.get(this.url + '/api/user/loginrecord/' + username + '/1', this.headers).then(
                    (res) => {
                        this.account_loginInfo = res.data.data;
                        for (let i = 0; i < res.data.pages; i++) {
                            this.page.push(i + 1);
                        }
                    }
                )
            },
            back_infoPage() {
                this.acc_infoKey = false;
            },
            acc_first_page() {
                this.get_page(this.acc_username,1);
                this.max_page = 10;
            },
            acc_last_page() {
                this.get_page(this.acc_username,this.page[this.page.length-1]);
                this.max_page = Math.ceil(this.page[this.page.length-1]/10)*10
            },
            nextPage(){
                this.max_page += 10;
            },
            prePage(){
                this.max_page += -10;
            }
        },
        created() {
            this.$http.get(this.url + '/api/user/rootuser', this.headers).then(
                (res) => {
                    this.account_data = res.data.data;
                    if (this.account_data.user_type == 'root') {
                        this.root_authority = true;
                    } else {
                        this.root_authority = false
                    }
                }
            );
            this.$http.get(this.url + '/api/user/childuser', this.headers).then(
                (res) => {
                    this.child_accounts = res.data.data;
                }
            )

        }
    }
</script>

<style scoped>
    .main_info {
        width: 100%;
        padding: 20px;
    }

    .breadcrumb a {
        color: brown;
    }

    .breadcrumb span {
        color: #777;
    }

    .detail {
        position: relative;
        border: 1px solid #ddd;
        width: 100%;
    }

    .detail_nav {
        height: 40px;
        background: #f5f5f5;
        line-height: 40px;
        padding-left: 10px;
        text-align: center;
    }

    .detail_c div {
        padding: 10px 0;
    }

    .avatar img {
        width: 100px;
        height: 100px;
        vertical-align: text-top;
    }

    .key_text {
        box-sizing: border-box;
        display: inline-block;
        width: 50%;
        padding-right: 20px;
        text-align: right;
        font-weight: bold;
    }

    .value_text,
    .avatar img {
        margin-left: 10px;
    }

    .add_account_page {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -200px;
        margin-top: -125px;
        width: 400px;
        height: 250px;
        padding: 10px;
        border: 1px solid black;
        text-align: center;
        background: paleturquoise;
    }

    .add_account_page input {
        display: inline-block;
        width: 260px;
        height: 25px;
        padding: 5px 5px 5px 15px;
        font-size: 20px;
        margin-top: 10px;

    }

    .child_account span {
        color: red;
    }

    .add_button {
        text-align: center;
    }

    .add_button button {
        margin: 0;
    }

    button {
        margin: 0 auto;
        width: 120px;
        height: 40px;
        background: #1ca6ef;
        border: none;
        color: #fff;
        font-size: 18px;
        margin-top: 20px;
        cursor: pointer;
    }

    .add_account_page .cancle {
        background: #adacaa
    }

    .account_text {
        display: inline-block;
        width: 14%;
    }

    #del_account {
        background: red;
        width: 60px;
        height: 30px;
        font-size: 15px;
    }

    #account_infoB {
        width: 60px;
        height: 30px;
        font-size: 15px;
        margin-right: 10px;
    }

    #root_con {
        margin-top: -20px;
    }

    .acc_info {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        padding-top: 5px;
        background: #f5f5f5;
    }

    .detail_con {
        width: 100%;
        height:98%;
        overflow: scroll;
    }

    .acc_info .back_infoPage {
        cursor: pointer;
        color: firebrick;
        padding-left: 10px;

    }

    .acc_info .acc_username{
        color:red;
        font-weight: bold;
        
    }
    .acc_info .none_login {
        text-align: center;
        color: red;
        font-size: 25px;
        margin: 100px;
    }

    table {
        margin-top: 10px;
        width: 100%;
        border: 1;
        border-collapse:collapse;
    }
    th{
        border-bottom: 1px solid black;
    }
    .acc_info .tab_title th {
        width: 25%;
    }

    .page_control {
        position: absolute;
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
        bottom: 0;
    }

    .page_control button {
        width: 60px;
        height: 30px;
        margin: 10px;
        line-height: 30px;
        opacity: 0.6;
    }
    .active{
        background: red;
    }
</style>