import { ts_menu_edit } from "@/interface/menu.type"
export function flatToTree (flat: ts_menu_edit[]) {
  let result: any = []
  if (flat) {
    result = flat.filter(o => !o.parent);
    const child = flat.filter(o => o.parent);
    child.forEach((item: any) => {
      const target = result.find((e: any)=> e.menu === item.parent)
      if (!target.children) target.children = []
      target.children.push(item)
    })
  }
  return result
}

export function isDateInLastMonth(date: Date) {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  return date >= oneMonthAgo && date <= new Date();
}