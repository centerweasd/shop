<!--  -->
<template>
  <div>
    <!-- 面包屑导航块 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom',i1 === 0? 'bdtop':'','vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染2级和3级权限 -->
              <el-col :span="19">
                <el-row :class="[i2===0? '':'bdtop','vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>

                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id"
                   closable @close="removeRightById()">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <!-- <pre>
                {{scope.row}}
            </pre> -->
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="295px">
          <el-tooltip placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          </el-tooltip>
          <el-tooltip placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </el-tooltip>
          <el-tooltip placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: []
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$axios.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败！");
      }
      this.rolesList = res.data;
      console.log(this.rolesList);
    },
    async removeRightById(){
        const confireResult = await this.$confirm('此操作将永久删除该文件，是否继续？','提示',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning'
        }).catch(err=>err)
        if(confireResult !=='confirm'){
            return this.$message.info('取消了删除！')
        }
        console.log('确认了删除！')
    }
  }
};
</script>
<style scoped lang="less">
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px #eee solid;
}
.bdbottom {
  border-bottom: 1px #eee solid;
}
.vcenter{
    display: flex;
    align-items: center;
}
</style>