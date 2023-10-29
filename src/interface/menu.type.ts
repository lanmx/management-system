export interface menuTabType {
	path: string;
	menu: string;
}

export interface StateType {
	token: string;
	userInfo: object;
	menuTabs: menuTabType[];
}

export interface ts_menu_add {
	menu: string
	parent: string | null | '',
	path: string
	icon: string
}

export interface ts_menu_edit {
	id: number | null
	menu: string
	parent: string | null | '',
	path: string,
	icon: string
}
export interface ts_menuName {
	menu: string
}

export interface ts_menu_id {
	id: number
}