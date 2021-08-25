export default {
    // baseUrl: '',
    baseUrl: 'http://192.168.50.142:9083',
    // baseUrl: 'http://192.168.1.128:8094',
    // baseUrl:'https://www.tuanxiaotuan.com',
    login: '/admin/login', //登录
    productList:'/admin/product/list',//商品列表
    loginInfo:'/admin/login/info',
    productUpload:'/admin/product/upload',//上传商品图片
    categorySave:'/admin/category/save',//商品分类保存和编辑
    categoryIndex:'/admin/category/index',//商品分类列表
    productSave:'/admin/product/save',//添加商品和编辑
    categoryDel:'/admin/category/del',//商品分类删除
    productAttrs:'/admin/product/attrs',//获取商品规格属性
    productDescription:'/admin/product/description',//获取商品详情
    combinationSave:'/admin/combination/save',//添加拼团商品
    combinationList:'/admin/combination/list',//拼团商品列表
    combinationAttrs:'/admin/combination/attrs',//获取拼团商品规格
    combinationDescription:'/admin/combination/description',//获取拼团商品详情
    combinationShow:'/admin/combination/show',//拼团商品上下架
    productShow:'/admin/product/show',//商品上下架
    activitySave:'/admin/activity/save',//添加卖场活动
    activityIndex:'/admin/activity/index',//卖场活动列表
    activityDel:'/admin/activity/del',//删除卖场活动
    orderIndex:'/admin/order/index',//订单列表
    activityAdd_product:'/admin/activity/add_product',//添加卖场商品
    activityList_product:'admin/activity/list_product',//活动商品列表
    orderDelivery:'/admin/order/delivery',//订单发货
    activityList_gift:'/admin/activity/list_gift',//拼团有礼主题列表
    activityAdd_gift:'/admin/activity/add_gift',//添加和编辑拼团有礼主题
    activityDel_gift:'/admin/activity/del_gift',//删除拼团有礼主题
    activityDel_cate_gift:'/admin/activity/del_cate_gift',//删除拼团有礼下属分类
    activityAdd_cate_gift:'admin/activity/add_cate_gift',//添加拼团有礼下属分类
    activityDel_product:'admin/activity/del_product',//删除卖场活动商品
    uniqidIndex:'/admin/uniqid/index',//靓号列表
    uniqidAdd:'/admin/uniqid/add',//靓号添加
    uniqidDel:'/admin/uniqid/del',//靓号删除
    combinationAdd_product_cate:'/admin/combination/add_product_cate',//商品加入拼拼有礼分类
    combinationList_product_cate:'/admin/combination/list_product_cate',//拼团有礼分类下的商品,
    combinationDel_product_cate:'/admin/combination/del_product_cate',//删除拼拼有礼分类下的商品
    userIndex:'/admin/user/index',//用户列表
    webconfigSave:'/admin/webconfig/save',//配置文件修改
    webconfigIndex:'/admin/webconfig/index',//配置文件列表
    sell_order_list:'/admin/sell_order_list',//寄售列表
    confirm_sell_order:'/admin/confirm_sell_order',//同意寄售
    save_shipping_templates:'/admin/save_shipping_templates',//添加和编辑运费模版
    list_shipping_templates:'/admin/list_shipping_templates',//运费模板列表
    detail_shipping_templates:'/admin/detail_shipping_templates',//查看运费模版详情
    del_shipping_templates:'/admin/del_shipping_templates',//删除运费模板
    dashboard:'/admin/dashboard',//后台首页数据
    user_bill_log:'/admin/user_bill_log',//用户账户变动明细
    template_message_list:'/admin/template_message_list',//消息模版列表
    template_message_save:'/admin/template_message_save',//模板消息编辑
    user_extract:'/admin/user_extract',//用户提现列表
}