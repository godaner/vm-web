import React from "react";
import {Form, Layout, Menu, Modal} from "antd";

import "./events_dispatcher";


import "antd/dist/antd.css";
import "../../scss/base/edit_dialog.scss";
import ImgUploader from "./img_uploader";
const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;

var ImgUploaderDialog = React.createClass({
    getInitialState: function () {
        var {width, height, config, title} = this.props;
        if (isUndefined(width)) {
            width = "450px";
        }
        if (isUndefined(height)) {
            height = "300px";
        }
        return {
            // modelWidth: "350px",
            width: width,
            height: height,
            visible: false,
            title: title,
            config: config

        };
    },
    registEvents(){

    },
    componentDidMount(){

        this.registEvents();

    },
    handleCancel () {

        this.closeDialog();

        const {handleCancel} = this.props;

        if (!isUndefined(handleCancel)) {
            handleCancel();
        }
    },
    afterClose () {


        const {afterClose} = this.props;

        if (!isUndefined(afterClose)) {
            afterClose();
        }
    },
    closeDialog(){
        this.updateStateVisible(false);
    },
    showDialog(){
        this.updateStateVisible(true);
    },
    previewImg(imgUrl){
        
        setTimeout(function () {

            c(this.refs.img_uploader);
            this.refs.img_uploader.previewImg(imgUrl);
        }.bind(this));
    },
    updateStateVisible(visible){
        var state = this.state;
        state.visible = visible;
        this.setState(state);
    },
    componentDidMount(){

    },

    render: function () {

        //get props
        const {title, onUpdateImgSuccess} = this.props;

        //get state
        const {width, height, visible, config} = this.state;
        return (
            <Modal
                className='extra'
                visible={visible}
                title={title}
                onCancel={this.handleCancel}
                afterClose={this.afterClose}
                width={width}
                height={height}
                footer={null}
            >
                <ImgUploader
                    ref="img_uploader"
                    onUpdateImgSuccess={onUpdateImgSuccess}
                    config={config}/>

            </Modal>
        );
    }
})

export default ImgUploaderDialog;   //将App组件导出