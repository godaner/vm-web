import React from "react";
import {Form, Layout, Menu, Modal} from "antd";

import "../base/events_dispatcher";


import "antd/dist/antd.css";
import "../../scss/base/edit_dialog.scss";
import ImgUploaderDialogTemplate from "../base/img_uploader_dialog_template";
const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;

var UserImgUploaderDialog = React.createClass({
    getInitialState: function () {

        return {
            // modelWidth: "350px",
            title: "更细用户头像",
            width: 550,
            height: 700,
            config: {
                fileTypes: ["jpg", "png"],
                fileMaxsize: 1024 * 1024 * 2,//2M
                saveImgUrl: "/user/img/v2",
                uploadTempImgUrl: "/src/img",
                server_url_prefix: vm_config.http_url_prefix,
                displayImgUrl: undefined,
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
    updateStateConfigDisPlayImgUrl(displayImgUrl){
        var state = this.state;
        this.state.config.displayImgUrl = displayImgUrl;
        this.setState(state);
    },
    updateStateConfigExtraInfo(extraInfo){
        var state = this.state;
        this.state.config.extraInfo = extraInfo;
        this.setState(state);
    },
    showDialog(record){
        this.updateStateConfigDisPlayImgUrl(record.imgUrl);

        this.updateStateConfigExtraInfo(record);

        this.refs.img_uploader_dialog_template.showDialog();
    },
    componentDidMount(){

    },
    onUpdateImgSuccess(result){
        const {onUpdateImgSuccess} = this.props;
        if (!isUndefined(onUpdateImgSuccess)) {
            onUpdateImgSuccess(result);
        }
    },
    render: function () {

        //get state
        const {width, height, title, config} = this.state;
        return (
            <div id="user_img_uploader_dialog">
                <ImgUploaderDialogTemplate
                    ref="img_uploader_dialog_template"
                    title={title}
                    handleCancel={this.handleCancel}
                    afterClose={this.afterClose}
                    width={width}
                    height={height}
                    onUpdateImgSuccess={this.onUpdateImgSuccess}
                    config={config}/>
            </div>
        );
    }
})

export default UserImgUploaderDialog;   //将App组件导出