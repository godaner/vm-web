import React from "react";
import {Button, Input, Layout, Menu, Modal, Select, Upload, Icon, message} from "antd";
import "antd/dist/antd.css";
import "../base/events_dispatcher";
import "../../scss/movie/movie_video_upload_dialog.scss";
import {ajax, commons} from "../base/vm_util";
const Option = Select.Option;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;


var MovieSrcVersionAddDialog = React.createClass({
    getInitialState(){
        return {
            width: 300,
            title: "上传视频资源",
            uploadUrl: "/movie/version/info",
            loading: false,
            visible: false,
            maskClosable: false,
            fileList: [],
            movieId: undefined,
            sharpness:undefined
        };
    },

    showDialog(record){
        this.updateMovieId(record.id);
        this.setState({visible: true});
    },
    updateMovieId(movieId){

        this.setState({movieId: movieId});
    },
    updateLoading(loading){

        this.setState({loading: loading});
    },
    handleSubmit(values){


    },
    handleCancel(){

    },
    updateFileList(fileList){
        this.setState({fileList});
    },
    handleUpload  ()  {

        const {fileList, uploadUrl, movieId,sharpness} = this.state;
        const {onMovieSrcVersionAddSuccess} = this.props;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file);
            // formData.append('files[]', file);
        });
        formData.append("movieId", movieId);
        formData.append("sharpness", sharpness);

        this.updateLoading(true);

        ajax.post({
            url: uploadUrl,
            data: formData,
            enctype: 'multipart/form-data',
            contentType: false, //必须false才会避开jQuery对 formdata 的默认处理 XMLHttpRequest会对 formdata 进行正确的处理
            processData: false, //必须false才会自动加上正确的Content-Type
            beforeSend: function () {

            }.bind(this),
            success: function (result) {
                // c(result);
                message.success(result.msg);

                this.updateVisible(false);

                this.updateSharpness(undefined);

                this.updateFileList([]);

                onMovieSrcVersionAddSuccess(result.data.video);

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            }.bind(this),
            complete: function () {
                this.updateLoading(false);
            }.bind(this),

        })

    },

    updateVisible(visible){
        this.setState({visible: visible});
    },
    onCancel(){
        this.updateVisible(false);
    },
    onSelectSharpness(value, option){
        this.updateSharpness(value);
    },
    updateSharpness(sharpness){
        this.setState({sharpness});
    },
    render(){
        const {width, title, uploadUrl, loading, visible, maskClosable} = this.state;


        const props = {
            // action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: (file) => {
                this.setState(({fileList}) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({fileList}) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };

        return (
            <Modal
                width={width}
                title={title}
                uploadUrl={uploadUrl}
                loading={loading}
                visible={visible}
                closable={!loading}
                maskClosable={maskClosable}
                onCancel={this.onCancel}
                footer={null}
                style={{textAlign: "center"}}>


                <Upload {...props}>
                    <Button
                        disabled={this.state.fileList.length >= 1}
                    >
                        <Icon type="upload"/> 选择视频文件
                    </Button>
                </Upload>
                <Select name="sharpness"
                        value={this.state.sharpness}
                        disabled={loading}
                        onSelect={this.onSelectSharpness}
                        placeholder="请输入清晰度"
                        style={{width: "65%", margin: 15}}>
                    {commons.getSharpnessOptions()}
                </Select>
                <Button
                    className="upload-demo-start"
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={this.state.fileList.length == 0|| isEmptyString(this.state.sharpness)}
                    loading={loading}
                >
                    {loading ? '上传中' : '开始上传' }
                </Button>

            </Modal>
        );
    }
});

export default MovieSrcVersionAddDialog;   //将App组件导出
