<template>
    <div class="message">
        <div class="breadcrumb">
            <router-link to="/main/system">首页</router-link>
            <span>/</span>
            <span>通知中心</span>
        </div>
        <ul class="msg_nav">
            <li class="qq">
                <img src="../assets//qq.png" alt="">
                <span>QQ</span>
            </li>
            <li class="email">
                <img src="../assets/email.png" alt="">
                <span>邮箱</span>
            </li>
            <li class="phone">
                <img src="../assets/phone.png" alt="">
                <span>电话</span>
            </li>
        </ul>
        <div class="detail">
            <div class="qq_c">
                <div v-for="(item, index) in qq" :key="index">
                    <span class="qq_t">{{item}}</span>
                    <button class="delete_button" @click='delete_msg("qq",item,index)' v-show='qq_lock'>删除</button>
                </div>

            </div>
            <div class="email_c">
                <div v-for="(item, index) in email" :key="index">
                    <span class="email_t">{{item}}</span>
                    <button class="delete_button" @click='delete_msg("email",item,index)' v-show='email_lock'>删除</button>

                </div>

            </div>
            <div class="phone_c">
                <div v-for="(item, index) in phone" :key="index">
                    <span class="phone_t">{{item}}</span>
                    <button class="delete_button" @click='delete_msg("phone",item,index)' v-show='phone_lock'>删除</button>

                </div>
            </div>
            <div id="add_msg">
                <select v-model="add_form.type">
                    <option value="qq" selected="selected">QQ</option>
                    <option value="email">邮箱</option>
                    <option value="phone">电话</option>
                </select>
                <input type="text" v-model="add_form.receiver" :placeholder="'请输入'+add_form.type">
                <button class="add_button" @click="submit(add_form.type)">添加</button>
            </div>

        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                qq_lock: true,
                email_lock: true,
                phone_lock: true,
                url: this.GLOBAL.url,
                headers: this.GLOBAL.headers,
                email: [],
                qq: [],
                phone: [],
                add_form: {
                    type: 'email',
                    receiver: ''
                }
            }
        },
        methods: {
            submit(type) {
                this.$http.post(this.url + '/api/user/receiver', this.add_form, this.headers).then(
                    (res) => {
                        if (res.data.code == 0) {
                            alert('添加成功');
                            this.$router.go(0);
                        } else {
                            alert('添加失败')
                        }
                    }
                )
            },
            delete_msg(type, receiver, index) {
                let mksure = confirm('是否删除此条' + type);
                if (mksure == true) {
                    this.$http({
                        method: 'delete',
                        url: this.url + '/api/user/receiver',
                        headers: {
                            'Authorization': window.sessionStorage.token
                        },
                        data: {
                            "type": type,
                            "receiver": receiver
                        }
                    }).then(
                        (res) => {
                            if (res.data.code == 0) {
                                alert('删除成功');
                                this.$router.go(0);
                            } else {
                                alert('删除失败')
                            }
                        }
                    )
                }
            }
        },
        created() {
            this.$http.get(this.url + '/api/user/receiver', this.headers).then(
                (res) => {
                    for (let item of res.data.data) {
                        switch (item.type) {
                            case "email":
                                this.email.push(item.receiver);
                                break;
                            case "qq":
                                this.qq.push(item.receiver);
                                break;
                            case "phone":
                                this.phone.push(item.receiver);
                                break;

                        }
                    }
                    if (this.qq.length == 0) {
                        this.qq.push('无')
                        this.qq_lock = false;
                    }
                    if (this.email.length == 0) {
                        this.email.push('无');
                        this.email_lock = false;
                    }
                    if (this.phone.length == 0) {
                        this.phone.push('无');
                        this.phone_lock = false;
                    }

                }
            )

        },
    }
</script>

<style scoped>
    .active {
        border-bottom: 3px solid red;
    }

    .message {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 50px;
        background: #fff;
    }

    .breadcrumb a {
        color: brown;
    }

    .msg_nav {
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }


    .msg_nav li {
        display: inline-block;
        width: 32%;
        text-align: center;
        cursor: pointer;
    }

    .msg_nav span {
        width: 20px;
        font-size: 25px;
    }

    .qq {
        background: #3587ff;
    }

    .qq img,
    .email img,
    .phone img {
        width: 26px;
        vertical-align: text-bottom;
    }

    .email {
        background: #ffcc00
    }

    .phone {
        background: #8ea4d1
    }

    .detail>div {
        float: left;
        width: 32%;
        text-align: center;
        margin-left: 10px;
    }

    .detail span {
        display: inline-block;
        width: 60%;
        font-size: 20px;
        margin-top: 10px;
        text-align: center;
    }

    .delete_button {
        background: red;
        border: none;
        width: 50px;
        height: 25px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
    }

    .add_button {
        margin-top: 10px;
        width: 50px;
        height: 25px;
        color: #fff;
        font-size: 16px;
        background: #19be6b;
        text-align: center;
        border: none;
        cursor: pointer;
    }

    .qq_t {
        color: #3587ff;
    }

    .email_t {
        color: #ccb34f;
    }

    .phone_t {
        color: #8ea4d1;
    }

    #add_msg {
        width: 98%;

        margin-top: 100px;
    }

    #add_msg select {
        width: 60px;
        height: 34px;
        font-size: 15px;
    }

    #add_msg input {
        height: 20px;
        width: 220px;
        padding: 5px;
        font-size: 15px;
    }

    #add_msg button {
        width: 100px;
        height: 34px;
    }
</style>