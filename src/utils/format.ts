
/**
 * 01 将数字取整为10的倍数
 * @param {Number} num 需要取整的值
 * @param {Number} prec 需要用0占位的数量
 * @param {Boolean} ceil 是否向上取整
 */
const formatInt = (num: number, prec: number, ceil: boolean) => {
  const len = String(num).length;
  if (len <= prec) { return num }; 

  const mult = Math.pow(10, prec);
  return ceil ? 
    Math.ceil(num / mult) * mult : 
    Math.floor(num / mult) * mult ;
}

/**
 * 02 获取当月的最后一天
 * @param {Number} year 当前时间的年份
 * @param {Number} month 当前时间的月份
 */

const getLastDay = (year: number, month: number) => {
  const isLeapYear = ((year % 4)==0) && ((year % 100)!=0) || ((year % 400)==0)
  const maxDays = [1,3,5,7,8,10,12]  
  const middleDays = [4,6,9,11]  
  month = Number(month)
  if (month == 2) {
      if (isLeapYear) {
          return 29
      } else {
          return 28
      }
  }  else  if (maxDays.includes(month)) {
      return 31
  } else if (middleDays.includes(month)) {
      return 30
  }
}

/**
 * 03 一位小数显示n位,例如1显示01
 * @param {Number} num 传入需要处理的数
 * @param {Number} length 显示的位数
 */
const fixInt = (num: number, length: number) => {
  if(length < 0) throw console.error('Parameter length must be greater than 0');
  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}
export {
  formatInt,
  getLastDay,
  fixInt
}

/**
 * 04 手机、邮箱、密码、用户名/昵称正则校验
 * @param {string} value 校验的内容
 * @param {String} type 校验类型：phone,email,password,name
 */
const regExp = (value: string, type: string) => {
  switch (type) {
    case 'phone': {
      let phoneReg = /^1[3-578]\d{9}$/
    }
    case 'email': {
      let emailReg = /^[a-zA-Z0-9]{1}[\w|\-|\.|\_]{1,31}@[a-zA-Z0-9]+\.[a-zA-Z0-9]*\.*([a-zA-Z]{2,4})$/
    }
    case 'password': {
      let passwordReg = /(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}/
    }
    case 'name': {
      // 重名校验需结合后端数据库
    }
  }
}