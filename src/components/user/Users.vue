<!-- user -->
<template>
  <div>
    <!-- 面包屑导航块 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select" v-model="queryInfo.query"
          clearable @clear="getUserList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="地址"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop label="操作" width="190px">
          <el-tooltip content="修改信息" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip content="删除用户" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>

      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$axios.get("users", { params: this.queryInfo }).then(res => {
        console.log(res.data, "111111");
        console.log(res.data.data.users, "---------------");
        if (res.data.meta.status !== 200) {
          return this.$message({
            message: "获取用户列表失败！",
            type: "error"
          });
        }
        this.userList = res.data.data.users;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    async userStatus(status) {
      console.log(status,">>>>>>");
      const { data: res } = await this.$axios.put(`users/${status.id}/state/${status.mg_state}`);
      console.log(res.meta.status)
      if (res.meta.status !== 200) {
        status.mg_state = !status.mg_state
        return this.$message.error("更新失败！");
      }
      this.$message.success("更新成功！")
    }
  }
};
</script>
<style scoped>
</style>