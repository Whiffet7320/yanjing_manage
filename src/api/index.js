import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
    timeout: 1000,
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
    timeout: 1000,
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
    timeout: 1000,
})

myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            // 'Access-Control-Allow-Origin': '*',
            // "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

myGet.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myGet.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})

export default {
    login(account, password) {
        return myPost({
            url: urls.login,
            data: {
                account,
                password,
            }
        })
    },
    productList(obj) {
        return myGet({
            url: urls.productList,
            params: {
                ...obj
            }
        })
    },
    async productUpload(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/product/upload`, image, configs)
        return res.data
    },
    loginInfo() {
        return myGet({
            url: urls.loginInfo,
        })
    },
    categorySave(obj) {
        return myPost({
            url: urls.categorySave,
            data: {
                ...obj
            }
        })
    },
    categoryIndex(obj) {
        return myGet({
            url: urls.categoryIndex,
            params: {
                ...obj
            }
        })
    },
    productSave(obj) {
        return myPost({
            url: urls.productSave,
            data: {
                ...obj
            }
        })
    },
    categoryDel(id) {
        return myPost({
            url: urls.categoryDel,
            data: {
                id
            }
        })
    },
    productAttrs(id) {
        return myGet({
            url: urls.productAttrs,
            params: {
                id
            }
        })
    },
    productDescription(id) {
        return myGet({
            url: urls.productDescription,
            params: {
                id
            }
        })
    },
    combinationSave(obj) {
        return myPost({
            url: urls.combinationSave,
            data: {
                ...obj
            }
        })
    },
    combinationList(obj) {
        return myGet({
            url: urls.combinationList,
            params: {
                ...obj
            }
        })
    },
    combinationAttrs(id) {
        return myGet({
            url: urls.combinationAttrs,
            params: {
                id
            }
        })
    },
    combinationDescription(id) {
        return myGet({
            url: urls.combinationDescription,
            params: {
                id
            }
        })
    },
    combinationShow(obj) {
        return myPost({
            url: urls.combinationShow,
            data: {
                ...obj
            }
        })
    },
    productShow(obj) {
        return myPost({
            url: urls.productShow,
            data: {
                ...obj
            }
        })
    },
    activitySave(obj) {
        return myPost({
            url: urls.activitySave,
            data: {
                ...obj
            }
        })
    },
    activityIndex(obj) {
        return myGet({
            url: urls.activityIndex,
            params: {
                ...obj
            }
        })
    },
    activityDel(obj) {
        return myPost({
            url: urls.activityDel,
            data: {
                ...obj
            }
        })
    },
    orderIndex(obj) {
        return myGet({
            url: urls.orderIndex,
            params: {
                ...obj
            }
        })
    },
    activityAdd_product(obj) {
        return myPost({
            url: urls.activityAdd_product,
            data: {
                ...obj
            }
        })
    },
    activityList_product(obj) {
        return myGet({
            url: urls.activityList_product,
            params: {
                ...obj
            }
        })
    },
    orderDelivery(obj) {
        return myPost({
            url: urls.orderDelivery,
            data: {
                ...obj
            }
        })
    },
    activityList_gift() {
        return myGet({
            url: urls.activityList_gift,
        })
    },
    activityAdd_gift(obj) {
        return myPost({
            url: urls.activityAdd_gift,
            data: {
                ...obj
            }
        })
    },
    activityDel_gift(obj) {
        return myPost({
            url: urls.activityDel_gift,
            data: {
                ...obj
            }
        })
    },
    activityDel_cate_gift(obj) {
        return myPost({
            url: urls.activityDel_cate_gift,
            data: {
                ...obj
            }
        })
    },
    activityAdd_cate_gift(obj) {
        return myPost({
            url: urls.activityAdd_cate_gift,
            data: {
                ...obj
            }
        })
    },
    activityDel_product(obj) {
        return myPost({
            url: urls.activityDel_product,
            data: {
                ...obj
            }
        })
    },
    uniqidIndex(obj) {
        return myGet({
            url: urls.uniqidIndex,
            params: {
                ...obj
            }
        })
    },
    uniqidAdd(obj) {
        return myPost({
            url: urls.uniqidAdd,
            data: {
                ...obj
            }
        })
    },
    uniqidDel(obj) {
        return myPost({
            url: urls.uniqidDel,
            data: {
                ...obj
            }
        })
    },
    combinationAdd_product_cate(obj) {
        return myPost({
            url: urls.combinationAdd_product_cate,
            data: {
                ...obj
            }
        })
    },
    combinationList_product_cate(obj) {
        return myGet({
            url: urls.combinationList_product_cate,
            params: {
                ...obj
            }
        })
    },
    combinationDel_product_cate(obj) {
        return myPost({
            url: urls.combinationDel_product_cate,
            data: {
                ...obj
            }
        })
    },
    userIndex(obj) {
        return myGet({
            url: urls.userIndex,
            params: {
                ...obj
            }
        })
    },
    webconfigSave(obj) {
        return myPost({
            url: urls.webconfigSave,
            data: {
                ...obj
            }
        })
    },
    webconfigIndex() {
        return myGet({
            url: urls.webconfigIndex,
        })
    },
    sell_order_list(obj) {
        return myGet({
            url: urls.sell_order_list,
            params: {
                ...obj
            }
        })
    },
    confirm_sell_order(obj) {
        return myPost({
            url: urls.confirm_sell_order,
            data: {
                ...obj
            }
        })
    },
    save_shipping_templates(obj) {
        return myPost({
            url: urls.save_shipping_templates,
            data: {
                ...obj
            }
        })
    },
    list_shipping_templates(obj) {
        return myGet({
            url: urls.list_shipping_templates,
            params: {
                ...obj
            }
        })
    },
    detail_shipping_templates(obj) {
        return myGet({
            url: urls.detail_shipping_templates,
            params: {
                ...obj
            }
        })
    },
    del_shipping_templates(obj) {
        return myPost({
            url: urls.del_shipping_templates,
            data: {
                ...obj
            }
        })
    },
    dashboard() {
        return myGet({
            url: urls.dashboard,
        })
    },
    user_bill_log(obj) {
        return myGet({
            url: urls.user_bill_log,
            params: {
                ...obj
            }
        })
    },
    template_message_list(obj) {
        return myGet({
            url: urls.template_message_list,
            params: {
                ...obj
            }
        })
    },
    template_message_save(obj) {
        return myPost({
            url: urls.template_message_save,
            data: {
                ...obj
            }
        })
    },
    user_extract(obj) {
        return myGet({
            url: urls.user_extract,
            params: {
                ...obj
            }
        })
    },
}