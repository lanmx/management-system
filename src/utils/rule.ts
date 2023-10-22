import { reactive } from "vue"

// 登录验证
interface loginUser {
  username: string
  password: string
}
export const loginUser:loginUser = reactive({
  username: '',
  password: ''
})
export const rules = {
  email: [ { required: true, message: "请输入邮箱", trigger: 'blur' } ],
  password: [ { required: true, message: "请输入密码", trigger: 'blur'  } ]
}

// 注册验证
interface registerUser {
  name: string
  email: string
  password: string
  checkpassword: string
}
export const registerUser:registerUser = reactive({
  name: '',
  email: '',
  password: '',
  checkpassword: ''
})
export const registerrules = {
  name: [ { required: true, message: "请输入昵称", trigger: 'blur' } ],
  email: [ { required: true, message: "请输入邮箱", trigger: 'blur' } ],
  password: [ { required: true, message: "请输入密码", trigger: 'blur'  } ],
  checkpassword: [ { required: true, message: "请再次输入密码", trigger: 'blur'  } ]
}