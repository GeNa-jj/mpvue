import ipConfig from './ipConfig'

// 特权配置
const privilegeManageApis = {
  bookMark: ipConfig.book + 'mix-atoc',
  bookList: ipConfig.book + 'ranking',
  bookMain: ipConfig.bookMain + 'chapter',
  // 分类列表
  sort: ipConfig.book + 'cats/lv2/statistics',
  // 分类查询
  categories: ipConfig.book + 'book/by-categories',
  // 排行榜
  ranking: ipConfig.book + 'ranking/gender'
}

export {
  privilegeManageApis
}
