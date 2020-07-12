<template>
  <div class="login_conteinr">
    <div class="login_box">
      <div class="logon_img">
        <img src="../assets/logo.png" alt="">
      </div>
       <!-- 表单 -->
        <el-form ref="loginRes" :model="loginFrom" :rules="loginRules" label-width="0px" class="login_form">
            <!-- 用户名 -->
          <el-form-item label="" prop="username">
            <el-input  v-model="loginFrom.username" prefix-icon="el-icon-user"></el-input>
          </el-form-item>

            <!-- 密码 -->
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="loginFrom.password" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>

          <el-form-item class="btns">
            <el-button type="primary" @click="login"> 登陆</el-button>
            <el-button type="info" @click="rese">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginFrom:{
        username:"admin",
        password:"123456"
      },
      // 表单验证规则
      loginRules:{
         username:[
           { required: true, message: '请输入登陆名称', trigger: 'blur' },
           { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
         ],
         password:[
           { required: true, message: '请输入登陆名称', trigger: 'blur' },
           { min: 6,  message: '密码最少需要六位', trigger: 'blur' }
         ]
      }
    }
  },
  methods:{
    rese(){
      // console.log(this)
      this.$refs.loginRes.resetFields();
    },
    login(){
      this.$refs.loginRes.validate(async res =>{
        // console.log(res)
        if(!res) return;
        const {data:rest}= await this.$axios.post("login" ,this.loginFrom);
        if(rest.meta.status !== 200) return this.$message({ message: '没有该用户',type:'error'});
        this.$message({
          message: '恭喜你，登陆成功！',
          type: 'success'
        });
        window.sessionStorage.setItem("token",rest.data.token)
        console.log(rest.data.token);
        this.$router.push('/home')
      });
    }
  }
}
// lang='less'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
  .login_conteinr{
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box{
    height: 300px;
    width: 450px;
    background: #fff;
    border-radius:3px; 
    position: absolute;
    left: 50%;
    top:50%;
    transform:translate(-50%,-50%);
    position: relative;
    .logon_img{
      width: 130px;
      height: 130px;
      border: 1px #eee solid;
      border-radius:50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      top: -50%;
      transform: translate(-50%,50%);
      background: #fff;
        img{
          width: 100%;
          height: 100%;
          border-radius:50%;
          background: #ddd;
        }
    }
  }
  .btns{display: flex;justify-content:flex-end;}
  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>
