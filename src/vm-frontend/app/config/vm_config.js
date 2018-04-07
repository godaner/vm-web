module.exports = {
    http_url_prefix: ENV.http_url_prefix,
    key_of_access_token: "accessToken",
    //受保护的页面
    protectedUserPageLists: ["/user/[0-9/_-a-zA-Z]*"],
    offline_code:-5
};