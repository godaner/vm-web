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

var MovieImgUploaderDialog = React.createClass({
    getInitialState: function () {

        return {
            // modelWidth: "350px",
            title: "更新电影图片",
            width: 650,
            config: {
                aspectRatio:2/1,
                fileTypes: ["jpg", "png"],
                fileMaxsize: 1024 * 1024 * 2,//2M
                saveImgUrl: "/movie/img",
                uploadTempImgUrl: "/src/img",
                server_url_prefix: vm_config.http_url_prefix,
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
        this.refs.img_uploader_dialog_template.previewImg(commons.addUrlParam({
            url:record.imgUrl,
            obj:{
                width:"300"
            }
        }))

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
        const {width, title, config} = this.state;
        return (
            <div id="movie_img_uploader_dialog">
                <ImgUploaderDialogTemplate
                    ref="img_uploader_dialog_template"
                    title={title}
                    handleCancel={this.handleCancel}
                    afterClose={this.afterClose}
                    width={width}
                    onUpdateImgSuccess={this.onUpdateImgSuccess}
                    config={config}/>
            </div>
        );
    }
})

export default MovieImgUploaderDialog;   //将App组件导出