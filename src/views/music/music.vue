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
        <el-icon><Plus /></el-icon>新增音乐
      </el-button>
    </div>

    <el-table :data="list" style="width: 100%" height="999px" empty-text="无数据">
      <el-table-column
        v-for="item in tableHead"
        :key="item.key"
        :prop="item.key"
        :label="item.name"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="icon blue" @click="handleOpen(scope.$index, scope.row)">
            <span>编辑</span>
          </div>
          <el-popconfirm
            confirm-button-text="删除"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.$index, scope.row)"
            title="您确定要删除该菜单吗?"
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

  <!-- 编辑弹框 -->
  <el-dialog
    v-model="visible"
    :title="isAdd ? '新增' : '编辑'"
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
          <el-input v-model="form[item.key]" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确定
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import {
  editMusic,
  addMusic,
  getMusic,
  deleteMusic,
  searchMusic,
} from "@/api/music";
import { Search, Plus } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import { ElMessage } from "element-plus";

export default {
  components: {
    Search,
    Plus,
  },
  setup() {
    type FormInstance = InstanceType<typeof ElForm>;
    type FormRules = InstanceType<typeof ElForm>;
    const ruleFormRef = ref<FormInstance>();

    const list = ref([]);
    const getList = async () => {
      const res = await getMusic();
      const { status, data } = res;
      if (status === 0 && data) {
        list.value = data;
      }
    };
    getList();

    // 用户编辑和删除
    const visible = ref(false);
    // 编辑表单
    const form = reactive({
      id: null,
      songname: "",
      songlink: "",
      author: "",
      lyric: "",
      cover: "",
    });
    const handleOpen = (e: any, row: any) => {
      isAdd.value = false;
      console.log(e, row);
      form.id = row.id;
      form.songname = row.songname;
      form.songlink = row.songlink;
      form.author = row.author;
      form.lyric = row.lyric;
      form.cover = row.cover;
      visible.value = true;
    };
    const handleDelete = async (e: any, row: any) => {
      console.log(e, row);
      const res = await deleteMusic({ id: row.id });
      const { status } = res;
      if (status === 0) {
        ElMessage.success("删除成功！");
        getList();
      } else {
        ElMessage.success("删除失败！");
      }
    };
    const handleClose = () => {
      visible.value = false;
    };
    const rules = reactive<FormRules>({
      menu: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
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

    // 添加菜单
    const addMenuFn = async () => {
      const res = await addMusic({
        songname: form.songname,
        songlink: form.songlink,
        author: form.author,
        lyric: form.lyric,
        cover: form.cover,
      });
      const { status, message } = res;
      if (status === 0) {
        ElMessage.success("添加成功！");
        visible.value = false;
        getList();
      } else {
        ElMessage.error("添加失败！" + message);
      }
    };
    // 编辑菜单
    const editMenuFn = async () => {
      const res = await editMusic({
        id: form.id,
        songname: form.songname,
        songlink: form.songlink,
        author: form.author,
        lyric: form.lyric,
        cover: form.cover,
      });
      const { status, message } = res;
      if (status === 0) {
        ElMessage.success("修改成功！");
        visible.value = false;
        getList();
      } else {
        ElMessage.error("修改失败！" + message);
      }
    };
    // 搜索
    const searchValue = ref("");
    const searchChange = async (e: any) => {
      const res = await searchMusic({ search: e });
      const { data, status } = res;
      if (status === 0) {
        const result = data || [];
        list.value = result;
      }
    };

    // 新增菜单
    let isAdd = ref(false);
    const handleAdd = () => {
      isAdd.value = true;
      form.id = null;
      form.songname = "";
      form.songlink = "";
      form.author = "";
      form.lyric = "";
      form.cover = "";
      visible.value = true;
    };
    return {
      list,
      getList,
      handleDelete,
      handleOpen,
      visible,
      handleClose,
      submitForm,
      form,
      ruleFormRef,
      rules,
      resetForm,
      searchValue,
      searchChange,
      isAdd,
      handleAdd,
    };
  },
  data() {
    return {
      tableHead: [
        { name: "歌名", key: "songname" },
        { name: "作者", key: "author" },
        { name: "链接", key: "songlink" },
        { name: "封面", key: "cover" },
        { name: "歌词", key: "lyric" },
      ],
      editFields: [
        { name: "歌名", key: "songname" },
        { name: "作者", key: "author" },
        { name: "链接", key: "songlink" },
        { name: "封面", key: "cover" },
        { name: "歌词", key: "lyric" },
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
