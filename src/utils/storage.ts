// 默认过期时间为1天
const DEFAULT_CACHE_TIMEOUT = 2 * 24 * 60 * 60 * 1000;

/**
 * @description 从localStorage中拿数据
 * @param key 键
 * @param defaultValue 默认值
 * @returns 
 */
export function getLocalStorage(key: string, defaultValue: any = null) {
	const stringData = localStorage.getItem(key);
	if (stringData) {
		try {
			const { expire, value } = JSON.parse(stringData);
			// 没过期直接返回token 过期则返回默认值
			if (expire * 1000 > Date.now()) return value;
		} catch (error) {
			return defaultValue;
		}
	}
	return defaultValue;
}


/**
 * @description 往localStorage中存储数据(利用字符串形式存放，让数据具备有效期)
 * @param key 
 * @param value 设置的值
 * @param expire 过期时间, 默认过期时间为一天
 */
export function setLocalStorage(key: string, value: any, expire?: number | null) {
	const stringData = JSON.stringify({
		value,
		expire: expire || Date.now() + DEFAULT_CACHE_TIMEOUT,
	});
	localStorage.setItem(key, stringData);
}
