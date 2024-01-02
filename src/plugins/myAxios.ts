import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8081/api",
    timeout: 10000,
    headers: {},
})

//添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        //2..范围内触发
        //对响应数据
        const data = response.data;
        if (data.code === 0) {
            return data.data;
        }
        return response.data;
    },
    function (error) {
        //超出2..范围触发
        //对响应错误做点什么
        return Promise.reject(error);
    }
);

export default instance;