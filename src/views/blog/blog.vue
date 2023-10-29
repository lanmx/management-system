<template>
  <div class="outer">
    <div class="top-box">
      <div class="w300 pr10">
        <el-input
          v-model="searchValue"
          class="w-50 m-2"
          placeholder="请输入搜索"
          suffix-icon="Search"
          @input="searchChange"
        />
      </div>
      <el-button @click="handleAdd()">
        <el-icon><Plus /></el-icon>新增文章
      </el-button>
    </div>
    <el-table
      :data="blogList"
      style="width: 100%"
      height="999px"
      empty-text="无数据"
      :default-sort="{ prop: 'publish_time', order: 'descending' }"
    >
      <el-table-column
        v-for="item in tableHead"
        :key="item.key"
        :prop="item.key"
        :label="item.name"
        :sortable="item.sortable"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="icon blue" @click="handleEdit(scope.$index, scope.row)">
            <span>编辑</span>
          </div>
          <el-popconfirm
            confirm-button-text="删除"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.$index, scope.row)"
            title="您确定要删除该文章吗?"
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
    :title="isAdd ? '新增文章' : '编辑文章'"
    width="600px"
    :before-close="handleClose"
  >
    <div>
      <el-form
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item
          v-for="item in editFields"
          :key="item.key"
          :label="item.name"
          :prop="item.key"
        >
          <el-input
            v-if="item.type !== 'date'"
            v-model="form[item.key]"
            :type="item.type"
          />
          <el-date-picker
            v-if="item.type === 'date'"
            v-model="form[item.key]"
            type="date"
            placeholder="请选择日期"
            size="small"
          />
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
import {
  getBlogs,
  addBlog,
  editBlog,
  deleteBlog,
  searchBlog,
} from "@/api/blog";
import moment from "moment";
import { Search } from "@element-plus/icons-vue";

import type { ElForm } from "element-plus";
import { ElMessage } from "element-plus";

export default {
  components: {
    Search,
  },
  setup() {
    type FormInstance = InstanceType<typeof ElForm>;
    type FormRules = InstanceType<typeof ElForm>;
    const ruleFormRef = ref<FormInstance>();

    const blogList = ref([]);
    const getBlogList = async () => {
      const res = await getBlogs();
      const { status, data } = res;
      if (status === 0) {
        data.forEach((item: any) => {
          item.publish_time = moment(item.publish_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          item.update_time = moment(item.update_time).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        blogList.value = data || [];
      }
    };
    getBlogList();

    // 文章编辑和删除
    const visible = ref(false);
    // 编辑表单
    const form = reactive({
      id: null,
      text: "",
      link: "",
      parent: "",
      label: "",
      description: "",
      cate: "",
      read_count: null,
      good: null,
      publish_time: "",
      update_time: "",
    });
    const handleEdit = (e: any, row: any) => {
      console.log(e, row);
      form.id = row.id;
      form.text = row.text;
      form.link = row.link;
      form.parent = row.parent;
      form.label = row.label;
      form.description = row.description;
      form.cate = row.cate;
      form.read_count = row.read_count;
      form.good = row.good;
      form.publish_time = row.publish_time;
      form.update_time = row.update_time;
      visible.value = true;
    };
    const handleDelete = async (e: any, row: any) => {
      const res = await deleteBlog({ id: row.id });
      const { status } = res;
      if (status === 0) {
        ElMessage.success("删除成功！");
        getBlogList();
      } else {
        ElMessage.success("删除失败！");
      }
    };
    const handleClose = () => {
      visible.value = false;
    };

    const rules = reactive<FormRules>({
      text: [{ required: true, message: "请输入标题", trigger: "blur" }],
      link: [{ required: true, message: "请输入路径", trigger: "blur" }],
      parent: [{ required: true, message: "请输入所属父级", trigger: "blur" }],
      cate: [{ required: true, message: "请输入分类", trigger: "blur" }],
    });

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate(async (valid: boolean, fields: any) => {
        console.log(valid, fields);
        if (valid) {
          console.log("submit!", fields);
          if (isAdd.value) {
            addMenuFn();
          } else {
            editMenuFn();
          }
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    // 添加
    const addMenuFn = async () => {
      const res = await addBlog({
        text: form.text,
        link: form.link,
        parent: form.parent,
        label: form.label,
        description: form.description,
        cate: form.cate,
        read_count: form.read_count,
        good: form.good,
        publish_time: form.publish_time,
        update_time: form.update_time,
      });
      const { status, message } = res;
      if (status === 0) {
        ElMessage.success("添加成功！");
        visible.value = false;
        getBlogList();
      } else {
        ElMessage.error("添加失败！" + message);
      }
    };
    // 编辑
    const editMenuFn = async () => {
      const res = await editBlog({
        id: form.id,
        text: form.text,
        link: form.link,
        parent: form.parent,
        label: form.label,
        description: form.description,
        cate: form.cate,
        read_count: form.read_count,
        good: form.good,
        publish_time: form.publish_time,
        update_time: form.update_time,
      });
      const { status, message } = res;
      if (status === 0) {
        ElMessage.success("修改成功！");
        visible.value = false;
        getBlogList();
      } else {
        ElMessage.error("修改失败！" + message);
      }
    };
    // 搜索
    const searchValue = ref("");
    const searchChange = async (e: any) => {
      const res = await searchBlog({ search: e });
      const { data, status } = res;
      if (status === 0) {
        const result = data || [];
        blogList.value = result;
      }
    };

    // 新增菜单
    let isAdd = ref(false);
    const handleAdd = () => {
      isAdd.value = true;
      form.id = null;
      form.text = "";
      form.link = "";
      form.parent = "";
      form.label = "";
      form.description = "";
      form.cate = "";
      form.read_count = null;
      form.good = null;
      form.publish_time = "";
      form.update_time = "";
      visible.value = true;
    };
    return {
      blogList,
      getBlogList,
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
      searchChange,
      handleAdd,
      isAdd,
    };
  },
  data() {
    return {
      tableHead: [
        { name: "标题", key: "text", sortable: false },
        { name: "路径", key: "link", sortable: false },
        { name: "所属父类", key: "parent", sortable: false },
        { name: "标签", key: "label", sortable: false },
        { name: "描述", key: "description", sortable: false },
        { name: "分类", key: "cate", sortable: false },
        { name: "阅读量", key: "read_count", sortable: true },
        { name: "点赞量", key: "good", sortable: true },
        { name: "发布日期", key: "publish_time", sortable: true },
        { name: "更新日期", key: "update_time", sortable: true },
      ],
      editFields: [
        { name: "标题", key: "text", type: '' },
        { name: "路径", key: "link", type: '' },
        { name: "所属父类", key: "parent", type: '' },
        { name: "标签", key: "label", type: '' },
        { name: "描述", key: "description", type: 'textarea' },
        { name: "分类", key: "cate", type: '' },
        { name: "阅读量", key: "read_count", type: '' },
        { name: "点赞量", key: "good", type: '' },
        { name: "发布日期", key: "publish_time", type: 'date' },
        { name: "更新日期", key: "update_time", type: 'date' },
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
  width: 100%;
  padding-bottom: 10px;
  display: flex;
}
.w300 {
  width: 300px;
}
.pr10 {
  padding-right: 10px;
}
</style>
