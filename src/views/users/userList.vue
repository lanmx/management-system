<template>
  <div class="outer">
    <div class="top-box">
      <el-input
        v-model="searchValue"
        class="w-50 m-2"
        placeholder="请输入搜索"
        suffix-icon="Search"
        @input="searchChange"
      />
    </div>
    <el-table
      :data="userList" 
      style="width: 100%"
      empty-text="无数据">
      <el-table-column 
        v-for="item in tableHead"
        :key="item.key"
        :prop="item.key"
        :label="item.name"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="icon blue" @click="handleEdit(scope.$index, scope.row)" >
            <span>编辑</span>
          </div>
          <el-popconfirm
            confirm-button-text="删除"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.$index, scope.row)"
            title="您确定要删除该用户吗?"
            >
            <template #reference>
              <div class="icon red">
                <span>删除</span>
              </div>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  
  <!-- 弹框 -->
  <el-dialog
    v-model="visible"
    title="用户信息编辑"
    width="600px"
    :before-close="handleClose"
  >
    <div>
      <el-form 
        ref="ruleFormRef"
        :model="form" 
        :rules="rules"
        label-width="120px">
          <el-form-item 
            v-for="item in editFields" 
            :key="item.key"
            :label="item.name"
            :prop="item.key">
            <el-input v-if="item.key !=='signature'" v-model="form[item.key]"/>
            <el-input v-if="item.key ==='signature'" v-model="form.signature" type="textarea" />
          </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确定
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import { getUserList, userDelete, userSearch, userUpdate } from "@/api/user";
import moment from "moment";
import { Search } from '@element-plus/icons-vue'

import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus';
// import type { FormRules, FormInstance } from 'element-plus'

export default {
  components: {
    Search
  },
  setup() {
    type FormInstance = InstanceType<typeof ElForm>
    type FormRules = InstanceType<typeof ElForm>
		const ruleFormRef = ref<FormInstance>()

    // 用户列表
    const userList = ref([]);
    const getUsers = async () => {
      const res = await getUserList();
      const { status, data } = res;
      if (status === 0 && data) {
        data.forEach((item: any) => {
          item.create_date = moment(item.create_date).format('YYYY-MM-DD HH:mm:ss')
        })
        userList.value = data;
      }
      console.log(res, 'xxxxx');
    }
    getUsers();

    // 用户编辑和删除
    const visible = ref(false);
    // 编辑表单
    const form = reactive({
      id: null,
      username: '',
      email: '',
      signature: '',
      create_date: '',
    })
    const handleEdit = (e: any, row: any) => {
      console.log(e, row);
      form.id = row.id;
      form.username = row.username;
      form.email = row.email;
      form.signature = row.signature;
      visible.value = true;
    }
    const handleDelete = async (e: any, row: any) => {
      console.log(e, row);
      const res = await userDelete({id: row.id})
      const { status } = res;
      if (status === 0) {
        ElMessage.success('删除成功！')
        getUsers();
      } else {
        ElMessage.success('删除失败！')
      }
    }
    const handleClose = () => {
      visible.value = false;
    }

    const rules = reactive<FormRules>({
      username: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
      ],
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
      ],
    })

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    const submitForm = async (formEl: FormInstance | undefined) => {
      console.log(formEl, 111);
      if (!formEl) return
      await formEl.validate(async (valid: boolean, fields: any) => {
        console.log(valid, fields)
        if (valid) {
          console.log('submit!', fields)
          const res = await userUpdate({
            id: form.id,
            username: form.username,
            email: form.email,
            signature: form.signature,
          });
          const { status, message } = res;
          if (status === 0) {
            ElMessage.success('修改成功！')
            visible.value = false;
            getUsers();
          } else {
            ElMessage.error('修改失败！' + message)
          }
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    // 搜索
    const searchValue = ref('');
    const searchChange = async (e: any) => {
      const res = await userSearch({ username: e });
      const { data, status } = res;
      if (status === 0) {
        const result = data || [];
        result.forEach((item: any) => {
          item.create_date = moment(item.create_date).format('YYYY-MM-DD HH:mm:ss')
        })
        userList.value = result;
      }
    }
    return {
      userList,
      getUsers,
      handleDelete, 
      handleEdit,
      visible,
      handleClose,
      submitForm,
      form,
      ruleFormRef,
      rules,
      resetForm,
      searchValue,
      searchChange
    };
  },
  data() {
    return {
      tableHead: [
        { name: "昵称", key: "username" },
        { name: "邮箱", key: "email" },
        { name: "个性签名", key: "signature" },
        { name: "创建日期", key: "create_date" },
      ],
      editFields: [
        { name: "昵称", key: "username" },
        { name: "邮箱", key: "email" },
        { name: "个性签名", key: "signature" },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.icon {
  display: inline-block;
  padding-right: 15px;
  cursor: pointer;
}
.blue {
  color: #409eff;
}
.red {
  color: #f56c6c;
}
.outer {
  padding: 20px 15px;
}
.top-box {
  display: inline-block;
  width: 300px;
  padding-bottom: 10px;
}
</style>