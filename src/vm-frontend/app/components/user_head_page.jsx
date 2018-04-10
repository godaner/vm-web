import React from "react";
import {ajax,commons} from './vm_util'; //引入react组件
import "../scss/user_head_page.scss";
import ImgUploader from "./img_uploader";


/*用户头像页面*/
var UserHeadPage = React.createClass({
    getInitialState: function () {
        var config = {
            aspectRatio: 1 / 1,
            fileTypes: ["jpg", "png"],
            fileMaxsize: 1024 * 1024 * 1,//2M
            saveImgUrl: "/user/online/img",
            uploadTempImgUrl: "/src/img"
        };
        return {
            loading:false,
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
                const imgUrl = commons.generateImgUrl({
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
        this.getUserHeadUploader().previewImg(commons.generateImgUrl({
            imgUrl: result.data.imgUrl,
            width: 300
        }));
        window.EventsDispatcher.updateHeadComponentUser(result.data.user);
    },
    onUpdateImgStart(){

    },
    onUpdateImgEnd(){

    },
    onUploadTempImgSuccess(result){

        this.getUserHeadUploader().previewImg(commons.generateImgUrl({
            imgUrl: result.data.imgUrl
        }));
    },
    onUploadTempImgStart(){

    },
    onUploadTempImgEnd(){

    },
    updateLoading(loading){
        this.setState({loading});
    },
    render: function () {
        const {loading} = this.state;
        return (
            <div id="user_head_content" className="clearfix">

                <div id="react_img_uploader">
                    <ImgUploader ref="userHeadUploader"
                                 config={this.state.config}
                                 loading={loading}
                                 onUpdateImgSuccess={this.onUpdateImgSuccess}
                                 onUpdateImgStart={this.onUpdateImgStart}
                                 onUpdateImgEnd={this.onUpdateImgEnd}
                                 onUploadTempImgSuccess={this.onUploadTempImgSuccess}
                                 onUploadTempImgStart={this.onUploadTempImgStart}
                                 onUploadTempImgEnd={this.onUploadTempImgEnd}/>
                </div>

                <div id="tip">
                    <p>在这里可以上传您的头像</p>
                </div>
            </div>
        );
    }
});
export default UserHeadPage;