<template>
    <div class="reg_wrap">
        <div class="reg_con">
            <div class="reg_title">
                <h1>天眼系统V1.0.0注册</h1>
            </div>
            <div class="username">
                <input type="text" placeholder="用户名(必填)" v-model="reg_form.username">
            </div>
            <div class="nickname">
                <input type="text" placeholder="昵称(必填)" v-model="reg_form.nickname">
            </div>
            <div class="email">
                <input type="text" placeholder="邮箱(选填)" v-model="reg_form.email">
            </div>
            <div class="password">
                <input type="password" placeholder="密码" v-model="reg_form.password">
            </div>
            <div class="make_sure">
                <input type="password" placeholder="确认密码" v-model="confirm_pwd">
            </div>
            <button @click="register">
                立即注册
            </button>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                confirm_pwd: '',
                reg_form: {
                    username: '',
                    password: '',
                    nickname: '',
                    email: ''
                }
            }
        },
        methods: {
            register() {
                if (!(this.confirm_pwd == this.reg_form.password)) {
                    alert("两次输入的密码不相同")
                }else if(!this.reg_form.nickname){
                    alert("请输入昵称")
                }else{
                    this.$http.post(this.GLOBAL.url+'/api/user/rootuser',this.reg_form,this.GLOBAL.headers).then(
                        (res)=>{
                            if(res.data.code==0){
                                alert('注册成功,点击确认跳转到登录页面');
                                this.$router.push('/login');
                            }
                        }
                    )
                }
            }
        }
    }
    
    
</script>

<style scoped>
    .reg_wrap {
        height: 100%;
        background: url(../assets/reg.jpg) no-repeat;
        background-size: 100%;
    }

    .reg_con {
        position: absolute;
        box-sizing: border-box;
        padding: 10px;
        width: 600px;
        height: 520px;
        border: 1px solid black;
        top: 50%;
        left: 50%;
        margin-top: -260px;
        margin-left: -300px;
        text-align: center;
        background: #fff;
        border-radius: 10px;
        box-shadow: 10px 10px 55px #3c598b,
            -10px -10px 55px #3c598b;
    }

    .reg_title {
        margin-top: 20px
    }

    input,
    button {
        box-sizing: border-box;
        width: 438px;
        height: 50px;
        padding: 0 20px;
        font-size: 20px;
        margin-top: 20px;
    }

    button {
        background: #3580eb;
        font-size: 24px;
        border: none;
        color: #fff;
    }
</style>