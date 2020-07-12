<!-- Home -->
<template>
     <el-container class="home-container">
        <el-header>
            <div class="imgs">
                 <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="change">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="toggle ? '64px':'200px'">
                <div class="toggle" @click="istoggle">
                    |||
                </div>
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="toggle" :collapse-transition="false"
                router :default-active="'/'+active">

                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                        <template slot="title">
                        <i :class="icon[item.id]"></i>
                        <span>{{item.authName}}</span>
                        </template>

                        <!-- 二级菜单 -->
                            <el-menu-item-group>
                                <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="isavtive(subItem.path)">
                                    <template slot="title">
                                        <i class="el-icon-menu"></i>
                                        <span>{{subItem.authName}}</span>
                                    </template>
                                </el-menu-item>
                            </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data () {
        return {
            menulist:[],
            icon:{
                '125':'el-icon-user',
                '103':'el-icon-upload',
                '101':'el-icon-goods',
                '102':'el-icon-tickets',
                '145':'el-icon-edit-outline'
            },
            toggle:false,
            active:""
        };
    },
    created() {
        this.getMenuList(),
        this.active = window.sessionStorage.getItem('active')
    },
    methods:{
        change(){
            window.sessionStorage.clear();
            this.$router.push("/login")
        },
       async getMenuList(){
          const {data:res} =await this.$axios.get('menus')
          if(res.meta.status !==200){
              return this.$message.error(res.meta.$msg)
          }else{
              this.menulist = res.data
          }
          console.log(res)
       },
       istoggle(){
           this.toggle = !this.toggle
       },
       isavtive(activePath){
           window.sessionStorage.setItem('active',activePath)        
           this.active = activePath
       }
    }
}

</script>
<style scoped lang="less">
.el-header{
    background: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .imgs{
        color: #fff;
    }
}
.el-aside{
    background: #333744;
    .el-menu{
        border-right: none;
    }
}
.el-main{
    background: #EAEDF1
}
.home-container{
    height: 100%;
}
.toggle{
    background: #4a5064;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    font-size: 10px;
    cursor: pointer;
}
</style>