import React from "react"; //引入react组件
import "../scss/user_head_page.scss";
import ImgUploader from "./img_uploader";


/*用户头像页面*/
var UserHeadPage = React.createClass({
    getInitialState: function () {
        var config = {
            fileTypes: ["jpg", "png"],
            fileMaxsize: 1024 * 1024 * 2,//2M
            saveImgUrl: "/user/img",
            uploadTempImgUrl: "/user/img/temp",
            server_url_prefix: vm_config.http_url_prefix
        };
        return {
            config: config,
            // userId: this.props.match.params.userId,
            getInfoFailure: "获取信息失败",
            userHeadRequestWidth: 300,
            user: {}
        };
    },
    componentDidMount(){
        window.VmFrontendEventsDispatcher.getAndCheckOnlineUser({
            onGetOnlineUser: function (u) {
                this.previewHeadImg(u.imgUrl + "?width=" + this.state.userHeadRequestWidth + "&t=" + Date.now());

            }.bind(this)
        });
    },
    getUserHeadUploader(){
        return this.refs.userHeadUploader;
    },
    previewHeadImg(imgUrl){
        this.getUserHeadUploader().previewImg(imgUrl);
    },
    onUpdateImgSuccess(result){
        window.EventsDispatcher.updateHeadComponentUser(result.data.user);
    },
    render: function () {
        return (
            <div id="user_head_content" className="clearfix">

                <div id="react_img_uploader">
                    <ImgUploader ref="userHeadUploader"
                                 config={this.state.config}
                                 onUpdateImgSuccess={this.onUpdateImgSuccess}/>
                </div>

                <div id="tip">
                    <p>在这里可以上传您的头像</p>
                </div>
            </div>
        );
    }
});
export default UserHeadPage;