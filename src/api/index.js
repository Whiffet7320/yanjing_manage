import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
})
let myPut = axios.create({
    baseURL: urls.baseUrl,
    method: 'put',
})


myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'token': `${sessionStorage.getItem("token")}`,
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
            'token': `${sessionStorage.getItem("token")}`,
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
            'token': `${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPut.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': `${sessionStorage.getItem("token")}`,
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
myPut.interceptors.response.use(response => {
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
myDelete.interceptors.response.use(response => {
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
    category(obj) {
        return myGet({
            url: urls.category,
            params: {
                ...obj
            }
        })
    },
    addCategory(obj) {
        return myPost({
            url: urls.category,
            data: {
                ...obj
            }
        })
    },
    updateCategory(obj,id) {
        return myPut({
            url: `${urls.category}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteCategory(id) {
        return myDelete({
            url: `${urls.category}/${id}`,
        })
    },
    productstorehouse(obj) {
        return myGet({
            url: urls.productstorehouse,
            params: {
                ...obj
            }
        })
    },
    addProductstorehouse(obj) {
        return myPost({
            url: urls.productstorehouse,
            data: {
                ...obj
            }
        })
    },
    updateProductstorehouse(obj,id) {
        return myPut({
            url: `${urls.productstorehouse}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteProductstorehouse(id) {
        return myDelete({
            url: `${urls.productstorehouse}/${id}`,
        })
    },
    size(obj) {
        return myGet({
            url: urls.size,
            params: {
                ...obj
            }
        })
    },
    addSize(obj) {
        return myPost({
            url: urls.size,
            data: {
                ...obj
            }
        })
    },
    updateSize(obj,id) {
        return myPut({
            url: `${urls.size}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteSize(id) {
        return myDelete({
            url: `${urls.size}/${id}`,
        })
    },
    color(obj) {
        return myGet({
            url: urls.color,
            params: {
                ...obj
            }
        })
    },
    addColor(obj) {
        return myPost({
            url: urls.color,
            data: {
                ...obj
            }
        })
    },
    updateColor(obj,id) {
        return myPut({
            url: `${urls.color}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteColor(id) {
        return myDelete({
            url: `${urls.color}/${id}`,
        })
    },
    product_type(obj) {
        return myGet({
            url: urls.product_type,
            params: {
                ...obj
            }
        })
    },
    addProduct_type(obj) {
        return myPost({
            url: urls.product_type,
            data: {
                ...obj
            }
        })
    },
    updateProduct_type(obj,id) {
        return myPut({
            url: `${urls.product_type}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteProduct_type(id) {
        return myDelete({
            url: `${urls.product_type}/${id}`,
        })
    },
    coatings(obj) {
        return myGet({
            url: urls.coatings,
            params: {
                ...obj
            }
        })
    },
    addCoatings(obj) {
        return myPost({
            url: urls.coatings,
            data: {
                ...obj
            }
        })
    },
    updateCoatings(obj,id) {
        return myPut({
            url: `${urls.coatings}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteCoatings(id) {
        return myDelete({
            url: `${urls.coatings}/${id}`,
        })
    },
    product(obj) {
        return myGet({
            url: urls.product,
            params: {
                ...obj
            }
        })
    },
    addProduct(obj) {
        return myPost({
            url: urls.product,
            data: {
                ...obj
            }
        })
    },
    updateProduct(obj,id) {
        return myPut({
            url: `${urls.product}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteProduct(id) {
        return myDelete({
            url: `${urls.product}/${id}`,
        })
    },
    tags(obj) {
        return myGet({
            url: urls.tags,
            params: {
                ...obj
            }
        })
    },
    addTags(obj) {
        return myPost({
            url: urls.tags,
            data: {
                ...obj
            }
        })
    },
    updateTags(obj,id) {
        return myPut({
            url: `${urls.tags}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteTags(id) {
        return myDelete({
            url: `${urls.tags}/${id}`,
        })
    },
    product_status(obj) {
        return myPost({
            url: urls.product_status,
            data: {
                ...obj
            }
        })
    },
    basicindex(obj) {
        return myGet({
            url: urls.basicindex,
            params: {
                ...obj
            }
        })
    },
    addBasicindex(obj) {
        return myPost({
            url: urls.basicindex,
            data: {
                ...obj
            }
        })
    },
    updateBasicindex(obj,id) {
        return myPut({
            url: `${urls.basicindex}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteBasicindex(id) {
        return myDelete({
            url: `${urls.basicindex}/${id}`,
        })
    },
    user_list(obj) {
        return myGet({
            url: urls.user_list,
            params: {
                ...obj
            }
        })
    },
    addUser_list(obj) {
        return myPost({
            url: urls.user_list,
            data: {
                ...obj
            }
        })
    },
    updateUser_list(obj,id) {
        return myPut({
            url: `${urls.user_list}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteUser_list(id) {
        return myDelete({
            url: `${urls.user_list}/${id}`,
        })
    },
    async upload_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'token': `${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_pic`, image, configs)
        return res.data
    },
    country(obj) {
        return myGet({
            url: urls.country,
            params: {
                ...obj
            }
        })
    },
    addcountry(obj) {
        return myPost({
            url: urls.country,
            data: {
                ...obj
            }
        })
    },
    updatecountry(obj,id) {
        return myPut({
            url: `${urls.country}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deletecountry(id) {
        return myDelete({
            url: `${urls.country}/${id}`,
        })
    },
    order_list(obj) {
        return myGet({
            url: urls.order_list,
            params: {
                ...obj
            }
        })
    },
    order_send(obj) {
        return myPost({
            url: urls.order_send,
            data: {
                ...obj
            }
        })
    },
    coupon(obj) {
        return myGet({
            url: urls.coupon,
            params: {
                ...obj
            }
        })
    },
    addcoupon(obj) {
        return myPost({
            url: urls.coupon,
            data: {
                ...obj
            }
        })
    },
    updatecoupon(obj,id) {
        return myPut({
            url: `${urls.coupon}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deletecoupon(id) {
        return myDelete({
            url: `${urls.coupon}/${id}`,
        })
    },
    shipping_region(obj) {
        return myGet({
            url: urls.shipping_region,
            params: {
                ...obj
            }
        })
    },
    addshipping_region(obj) {
        return myPost({
            url: urls.shipping_region,
            data: {
                ...obj
            }
        })
    },
    updateshipping_region(obj,id) {
        return myPut({
            url: `${urls.shipping_region}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteshipping_region(id) {
        return myDelete({
            url: `${urls.shipping_region}/${id}`,
        })
    },
    productlevel(obj) {
        return myGet({
            url: urls.productlevel,
            params: {
                ...obj
            }
        })
    },
    addproductlevel(obj) {
        return myPost({
            url: urls.productlevel,
            data: {
                ...obj
            }
        })
    },
    updateproductlevel(obj,id) {
        return myPut({
            url: `${urls.productlevel}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deleteproductlevel(id) {
        return myDelete({
            url: `${urls.productlevel}/${id}`,
        })
    },
    webconfig_detail() {
        return myGet({
            url: `${urls.webconfig_detail}`,
        })
    },
    webconfig_update(obj) {
        return myPost({
            url: urls.webconfig_update,
            data: {
                ...obj
            }
        })
    },
}