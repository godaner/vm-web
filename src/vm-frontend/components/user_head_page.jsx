import React from "react"; //引入react组件
import "../scss/user_head_page.scss";
import ImgUploader from "./img_uploader";


/*用户头像页面*/
var UserHeadPage = React.createClass({
    getInitialState: function () {
        var config = {
            aspectRatio: 1 / 1,
            fileTypes: ["jpg", "png"],
            fileMaxsize: 1024 * 1024 * 2,//2M
            saveImgUrl: "/user/online/img",
            uploadTempImgUrl: "/src/img"
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
        window.VmFrontendEventsDispatcher.getOnlineUser({
            onGetOnlineUser: function (u) {
                const imgUrl = generateImgUrl({
                    imgUrl: u.imgUrl,
                    width: this.state.userHeadRequestWidth
                });
                //预览头像
                this.getUserHeadUploader().previewImg(imgUrl);

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
        this.getUserHeadUploader().previewImg(generateImgUrl({
            imgUrl: result.data.imgUrl,
            width: 300
        }));
        window.EventsDispatcher.updateHeadComponentUser(result.data.user);
    },
    onUploadTempImgSuccess(result){

        this.getUserHeadUploader().previewImg(generateImgUrl({
            imgUrl: result.data.imgUrl
        }));
    },
    render: function () {
        return (
            <div id="user_head_content" className="clearfix">

                <div id="react_img_uploader">
                    <ImgUploader ref="userHeadUploader"
                                 config={this.state.config}
                                 onUpdateImgSuccess={this.onUpdateImgSuccess}
                                 onUploadTempImgSuccess={this.onUploadTempImgSuccess}/>
                </div>

                <div id="tip">
                    <p>在这里可以上传您的头像</p>
                </div>
            </div>
        );
    }
});
export default UserHeadPage;