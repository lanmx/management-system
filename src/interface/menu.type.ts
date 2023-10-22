export interface menuTabType {
	path: string;
	menu: string;
}

export interface StateType {
	token: string;
	userInfo: object;
	menuTabs: menuTabType[];
}