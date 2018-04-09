import React from "react";
import {Form, Layout, Menu, Modal} from "antd";

import "./events_dispatcher";


//import "antd/dist/antd.css";
import "../../scss/base/edit_dialog.scss";
import ImgUploader from "./img_uploader";
const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
import {commons, ajax} from "./vm_util";

var ImgUploaderDialogTemplate = React.createClass({
    getInitialState: function () {
        var {width, config, title} = this.props;
        if (isUndefined(width)) {
            width = "650px";
        }
        return {
            // modelWidth: "350px",
            loading: false,
            maskClosable: false,
            width: width,
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
        this.getImgUploader().clearSelectFileInfo();
    },
    showDialog(){
        this.updateStateVisible(true);

    },
    updateExtraInfo(extraInfo){
        var state = this.state;
        this.state.config.extraInfo = extraInfo;
        this.setState(state);
    },
    previewImg(imgUrl){

        setTimeout(function () {
            this.getImgUploader().previewImg(imgUrl);
        }.bind(this));

    },
    getImgUploader(){
        return this.refs.img_uploader;
        ;
    },
    updateStateVisible(visible){
        var state = this.state;
        state.visible = visible;
        this.setState(state);
    },
    componentDidMount(){

    },
    onUpdateImgSuccess(result){

        this.updateStateVisible(false);

        //callback
        const {onUpdateImgSuccess} = this.props;
        onUpdateImgSuccess(result);
    },
    onUpdateImgStart(){

        this.updateLoading(true);

    },
    onUpdateImgEnd(){

        this.updateLoading(false);
    },
    onUploadTempImgSuccess(result){

        //callback
        const {onUploadTempImgSuccess} = this.props;
        onUploadTempImgSuccess(result);
    },
    onUploadTempImgStart(){

        this.updateLoading(true);

    },
    onUploadTempImgEnd(){
        this.updateLoading(false);
    },
    updateLoading(loading){
        this.setState({loading});
    },
    render: function () {

        //get props
        const {title} = this.props;

        //get state
        const {width, visible, config, maskClosable, loading} = this.state;
        return (
            <Modal
                className='extra'
                visible={visible}
                title={title}
                onCancel={this.handleCancel}
                afterClose={this.afterClose}
                width={width}
                closable={!loading}
                maskClosable={maskClosable}
                footer={null}
            >
                <ImgUploader
                    ref="img_uploader"
                    onUpdateImgSuccess={this.onUpdateImgSuccess}
                    onUpdateImgStart={this.onUpdateImgStart}
                    onUpdateImgEnd={this.onUpdateImgEnd}
                    onUploadTempImgSuccess={this.onUploadTempImgSuccess}
                    onUploadTempImgStart={this.onUploadTempImgStart}
                    onUploadTempImgEnd={this.onUploadTempImgEnd}
                    config={config}
                    loading={loading}/>

            </Modal>
        );
    }
})

export default ImgUploaderDialogTemplate;   //将App组件导出