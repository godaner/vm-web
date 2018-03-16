import React from "react";
import {Form, Layout, Menu, Modal} from "antd";

import "../base/events_dispatcher";


import "antd/dist/antd.css";
import "../../scss/base/edit_dialog.scss";
import ImgUploaderDialogTemplate from "../base/img_uploader_dialog_template";
const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
import {commons} from "../base/vm_util";

var UserImgUploaderDialog = React.createClass({
    getInitialState: function () {

        return {
            // modelWidth: "350px",
            title: "更新用户头像",
            width: 650,
            config: {
                aspectRatio:1/1,
                fileTypes: ["jpg", "png"],
                fileMaxsize: 1024 * 1024 * 2,//2M
                saveImgUrl: "/user/img",
                uploadTempImgUrl: "/src/img",
                extraInfo: {}
            }

        };
    },
    registEvents(){

    },
    componentDidMount(){

        this.registEvents();

    },
    handleCancel () {

        c("handleCancel");
        this.closeDialog();


    },
    afterClose () {

        c("afterClose");

    },
    closeDialog(){
        this.refs.img_uploader_dialog_template.closeDialog();
    },
    updateStateConfigExtraInfo(extraInfo){
        var state = this.state;
        this.state.config.extraInfo = extraInfo;
        this.setState(state);
    },
    showDialog(record){

        this.updateStateConfigExtraInfo(record);

        this.refs.img_uploader_dialog_template.showDialog();

    },
    previewImg(url){

    },
    componentDidMount(){

    },
    onUpdateImgSuccess(result){
        const {onUpdateImgSuccess} = this.props;
        if (!isUndefined(onUpdateImgSuccess)) {
            onUpdateImgSuccess(result);
        }
    },
    onUploadTempImgSuccess(result){
        const {onUploadTempImgSuccess} = this.props;
        if (!isUndefined(onUploadTempImgSuccess)) {
            onUploadTempImgSuccess(result);
        }
    },
    render: function () {

        //get state
        const {width, title, config} = this.state;
        return (
            <div id="user_img_uploader_dialog">
                <ImgUploaderDialogTemplate
                    ref="img_uploader_dialog_template"
                    title={title}
                    handleCancel={this.handleCancel}
                    afterClose={this.afterClose}
                    width={width}
                    onUpdateImgSuccess={this.onUpdateImgSuccess}
                    onUploadTempImgSuccess={this.onUploadTempImgSuccess}
                    config={config}/>
            </div>
        );
    }
})

export default UserImgUploaderDialog;   //将App组件导出