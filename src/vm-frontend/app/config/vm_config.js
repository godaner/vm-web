module.exports = {
    http_url_prefix: ENV.http_url_prefix,
    key_of_access_token: "userAccessToken",
    //受保护的页面
    protectedUserPageLists: ["/user/[0-9/_-a-zA-Z]*"],
    offline_code:-5,
    online_user_polling_interval:ENV.online_user_polling_interval
};