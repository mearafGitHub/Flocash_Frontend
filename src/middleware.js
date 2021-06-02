const jwt = require('jsonwebtoken');
const {createProxyMiddleware} = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        "/pay",
        createProxyMiddleware({
            target: "https://localhost:7000/",
            changeOrigin: true
        })  
    )
}