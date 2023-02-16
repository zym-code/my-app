<template>
    <div class="login-outside">
        <div class="container" :class="changeSlide">
            <a-form :model="formState" name="normal_login" @finish="onFinish" labelAlign="right">
            <div class="form-container sign-up-container">
                <div class="form-main">
                    <h1>注册</h1>           
                    <a-form-item label="用户名" name="userName">
                        <a-input class="txtb" v-model:value="formState.userName" :bordered="false"/>
                    </a-form-item>
                    <a-form-item label="邮箱" name="email">
                        <a-input class="txtb" v-model:value="formState.email" :bordered="false"/>
                    </a-form-item>
                    <a-form-item label="密码" name="passWord">
                        <a-input class="txtb" v-model:value="formState.passWord" :bordered="false"/>
                    </a-form-item>
                    <a-form-item label="确认密码" name="confirmPassWord">
                        <a-input class="txtb" v-model:value="formState.confirmPassWord" :bordered="false"/>
                    </a-form-item>
                    <button>注册</button>
                </div>
            </div>
            <div class="form-container sign-in-container">
                <div class="form-main">
                    <h1>登录</h1>
                    <a-form-item label="用户名" name="userName">
                        <a-input class="txtb" v-model:value="formState.userName" :bordered="false"/>
                    </a-form-item>
                    <a-form-item label="密码" name="passWord">
                        <a-input class="txtb" v-model:value="formState.passWord" :bordered="false"/>
                    </a-form-item>
                    <div class="forgetPwd" @click="signIn">忘记密码？</div>
                    <button>登录</button>
                </div>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>已有账号？</h1>
                        <p>请使用您的账号进行登录</p>
                        <button class="ghost" @click="toChangeSignType('signIn')" >登录</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>没有账号?</h1>
                        <p>立即注册加入我们，和我们一起开始旅程吧</p>
                        <button class="ghost" @click="toChangeSignType('signUP')">注册</button>
                    </div>
                </div>
            </div>
        </a-form>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { reactive, computed, ref, toRaw} from "vue"
    import axios from "axios"

    interface FormState  {
        userName:string,
        passWord:string,
        email:string,
        confirmPassWord:string,
        isRemember:boolean,
    }
  
    const userNameInput = ref(null)
    const defultType = ref('signIn')
    const isDisabled = computed(() => {
        return formState.userName && formState.passWord
    })
    const formState = reactive<FormState>({
        userName:'',
        passWord:'',
        email:'',
        confirmPassWord:'',
        isRemember:false,
    })
    const rules = {
        userName:{ required: true, message: '请输入用户名!' },
        passWord:{ required: true, message: '请输入密码!' },
        email:{ required: true, message: '请输入邮箱!' },
        confirmPassWord:{ required: true,validator:(_, value: string, callback: any) =>{
            if(!value){
                callback('请确认密码')
            }
            if(formState.passWord != value){
                callback('两次输入的密码不一致，请重新输入!')
            }
        }},
    }
    function onFinish(value:any){
        console.log(value,'valuevalue');
    }
    function signIn(){
        axios.post('http://localhost:3000/api/user/register').then(res =>{
            console.log(res,'res');
            
        })
    }
    function forgetPwd(){

    }
    const changeSlide = computed(() =>{
        return defultType.value == 'signIn' ? '' : 'right-panel-active'
    })
    function toChangeSignType(val: string){
        defultType.value = val
    }
</script>

<style lang="scss" scoped>
    .login-outside{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(120deg,#3498db,#8e44ad);;
        
        h1 {
            font-weight: bold;
            margin: 0;
        }
        p {
            font-size: 14px;
            line-height: 20px;
            letter-spacing: .5px;
            margin: 20px 0 30px;
        }
        span {
            font-size: 12px;
        }
        .container {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
            position: relative;
            overflow: hidden;
            width: 768px;
            max-width: 100%;
            min-height: 480px;   

        }
        .txtb {
            border-bottom: 2px solid #adadad;
        }
        .txtb input {
            font-size: 15px;
            color: #333;
            border: none;
            width: 100%;
            outline: none;
            background: none;
            padding: 0 3px;
            height: 35px;
        }

        .txtb span::before {
            content: attr(data-placeholder);
            position: absolute;
            top: 50%;
            left: 5px;
            color: #adadad;
            transform: translateY(-50%);
            transition: .5s;
        }
        .txtb span::after {
            content: '';
            position: absolute;
            left: 0%;
            top: 100%;
            width: 0%;
            height: 2px;
            background-image: linear-gradient(120deg,#3498db,#8e44ad);
            transition: .5s;
        }
        button {
            border-radius: 20px;
            border: 1px solid #ff4b2b;
            background: #ff4b2b;
            color: #fff;
            font-size: 15px;
            // font-weight: bold;
            padding: 12px 45px;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: transform 80ms ease-in;
            cursor: pointer;
        }
        button:active {
            transform: scale(.95);
        }

        button:focus {
            outline: none;
        }
        button.ghost {
            background: transparent;
            border-color: #fff;
        }
        .form-container {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all .6s ease-in-out;
            .form-main {
                background: #fff;
                display: flex;
                flex-direction: column;
                padding: 0 50px;
                height: 100%;
                justify-content: center;
                text-align: center;
                h1{
                    margin-bottom: 30px;
                }
                .forgetPwd{
                    margin-bottom: 20px;
                }
                button {
                    background: linear-gradient(120deg, #3498db, #8e44ad);
                    border: none;
                    background-size: 200%;
                    color: #fff;
                    transition: .5s;
                    &:hover {
                        background-position: right;
                    }
                }
            }
        }
        .sign-in-container {
            left: 0;
            width: 50%;
            z-index: 2;
        }
        .sign-up-container {
            left: 0;
            width: 50%;
            z-index: 1;
            opacity: 0;
        }
        .sign-up-container button {
            margin-top: 20px;
        }
        .overlay-container {
            position:absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: transform .6s ease-in-out;
            z-index: 100;
        }
        .overlay {
            background-image: linear-gradient(120deg,#3498db,#8e44ad);
            color: #fff;
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateY(0);
            transition: transform .6s ease-in-out;
        }
        .overlay-panel {
            position: absolute;
            top: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 40px;
            height: 100%;
            width: 50%;
            text-align: center;
            transform: translateY(0);
            transition: transform .6s ease-in-out;
        }
        .overlay-right {
            right: 0;
            transform: translateY(0);
        }
        .overlay-left {
            transform: translateY(-20%);
        }
        .container.right-panel-active .sign-in-container {
            transform: translateY(100%);
        }
        .container.container.right-panel-active .overlay-container {
            transform: translateX(-100%);
        }
        .container.right-panel-active .sign-up-container {
            transform: translateX(100%);
            opacity: 1;
            z-index: 5;
        }
        .container.container.right-panel-active .overlay {
            transform: translateX(50%);
        }
        .container.container.right-panel-active .overlay-left {
            transform: translateY(0);
        }
        .container.container.right-panel-active .overlay-right {
            transform: translateY(20%);
        }
    }
</style>
