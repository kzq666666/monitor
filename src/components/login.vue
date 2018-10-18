<template>
    <div class="login-container">
        <div class="login">
            <img src="../assets/skyeye.jpg" class="sky_eye">
            <h2>天眼系统V1.0.0</h2>
            <input type="text" name="username" id="username" placeholder="请输入用户名" v-model="loginForm.username">
            <input type="password" name="password" id="password" placeholder="密码" v-model="loginForm.password"
                @keydown.enter="login">
            <button id="login_button" @click="login">登录</button>
            <!-- 注册新账号 -->
            <!-- <div class="register" @click="register">注册新账号</div> -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            login: function () {
                var login_time = new Date();
                this.$http.post(this.GLOBAL.url + '/api/user/token', this.loginForm).then(
                    (response) => {
                        if (response.data['code'] == 0) {
                            window.sessionStorage.setItem('token', response.data['token'])
                            window.sessionStorage.setItem('user_name', this.loginForm.username)
                            this.GLOBAL.headers.headers = { 'Authorization': window.sessionStorage.token }
                            localStorage.setItem("login_time", login_time.toLocaleString());
                            this.$router.push('/main');
                        } else {
                            alert('用户名和密码错误');
                        }
                    }
                )
            },
            register() {
                this.$router.push('/register')
            }
        },
        created() {
            if(window.sessionStorage.token){
                this.$router.push('/main')
            }
        },
    }
</script>
<style>
    .login-container {
        position: relative;
        height: 100vh;
        background: url(../assets/loginBG.jpg);
        background-size: 100%;
    }

    .login {
        box-sizing: border-box;
        padding: 10px 10px;
        position: absolute;
        width: 468px;
        height: 356px;
        top: 50%;
        left: 50%;
        margin-top: -178px;
        margin-left: -234px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 10px 10px 55px #3c598b,
            -10px -10px 55px #3c598b;
        text-align: center;
    }

    .sky_eye {
        width: 100px;
        height: 100px;
    }

    #username,
    #password,
    #login_button {
        width: 268px;
        height: 38px;
        box-sizing: border-box;
        padding: 10px 0 10px 10px;
        border: 1px solid rgb(51, 51, 51);
        margin-top: 15px;
        font-size: 17px;

    }

    #login_button {
        color: #fff;
        background: #86ce2f;
        cursor: pointer;
        line-height: 20px;
    }

    .register {
        position: absolute;
        right: 187px;
        bottom: 20px;
        cursor: pointer;
    }
</style>