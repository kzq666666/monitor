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
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                key: false,
                root_authority: '',
                url: this.GLOBAL.url,
                headers: this.GLOBAL.headers,
                account_data: '',
                login_T: window.localStorage.login_time,
                last_loginT: window.localStorage.logout_time,
                confirm_pwd: '',
                child_accounts: '',
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
        width: 16%;
    }

    #del_account {
        background: red;
        width: 60px;
        height: 30px;
        font-size: 15px;
    }
    #root_con{
        margin-top: -20px;
    }
</style>