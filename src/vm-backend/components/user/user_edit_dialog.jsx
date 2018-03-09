import React from "react";
import {Button, DatePicker, Icon, Input, Layout, Menu, message, Select, Table, Upload} from "antd";
import moment from 'moment';
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/user/user_page.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const Option = Select.Option;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;


var UserEditDialog = React.createClass({
    getInitialState(){
        return {
            editUserUrl: "/user/info"
        };
    },
    showDialog(){
        this.getUserEditDialog().showDialog();
    },
    getUserEditDialog(){
        return this.refs.user_edit_dialog;
    },
    handleSubmit(values){
        const hideMessage = message.loading('正在修改用户', 0);
        const {editUserUrl} = this.state;
        var filterValues = function (values) {
            values.birthday = timeFormatter.long2Int(new Date(values.birthday._d).getTime());
            return values;
        }
        values = filterValues(values);
        ajax.put({
            url: editUserUrl,
            data: values,
            success: function (result) {
                const {onEditSuccess} = this.props;


                message.success(result.msg);
                this.getUserEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.user) : undefined;


                //clear form
                this.getUserEditDialog().clearForm();
            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getUserEditDialog().formLeaveLoading();
            }.bind(this)
        });

    },
    handleCancel(){

        c("handleCancel");
    },
    componentDidMount(){

    },
    render(){
        var {echoData} = this.props;


        // filterEchoData
        var filterEchoData = function (echoData) {
            if (isUndefined(echoData)) {
                return {};
            }
            if (!isUndefined(echoData.birthday)) {
                echoData.birthday = moment(echoData.birthday * 1000);
            }
            if (!isUndefined(echoData.createTime)) {
                echoData.createTime = timeFormatter.formatDate(echoData.createTime * 1000);
            }
            if (!isUndefined(echoData.updateTime)) {
                echoData.updateTime = timeFormatter.formatDate(echoData.updateTime * 1000);

            }
            return echoData;
        }
        echoData = filterEchoData(echoData);

        // Upload

        const imageUrl = vm_config.http_url_prefix + echoData.imgUrl;

        var beforeUpload = function (file) {
            // const isJPG = file.type === 'image/jpeg';
            // if (!isJPG) {
            //     message.error('You can only upload JPG file!');
            // }
            // const isLt2M = file.size / 1024 / 1024 < 2;
            // if (!isLt2M) {
            //     message.error('Image must smaller than 2MB!');
            // }
            // return isJPG && isLt2M;
            return true;
        }
        var handleChange = function (info) {
            // if (info.file.status === 'uploading') {
            //     this.setState({loading: true});
            //     return;
            // }
            // if (info.file.status === 'done') {
            //     // Get this url from response in real world.
            //     getBase64(info.file.originFileObj, imageUrl => this.setState({
            //         imageUrl,
            //         loading: false,
            //     }));
            // }
            c(info);
        }

        // const uploadButton = (
        //     <div>
        //         {/*<Icon type={this.state.loading ? 'loading' : 'plus'}/>*/}
        //         <Icon type={false ? 'loading' : 'plus'}/>
        //         <div className="ant-upload-text">Upload</div>
        //     </div>
        // );

        var formLayout = "horizontal";

        var formRows = [
                {
                    cols: [
                        {
                            col: {span: 11},
                            label: "头像",
                            id: "file",
                            config: {
                                rules: [{required: true, whitespace: true, message: '请选择头像!'}],
                            },
                            input: <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={vm_config.http_url_prefix + "/src/img"}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                <img style={{
                                    width: "100%"
                                }} src={imageUrl} alt=""/>
                            </Upload>
                        },
                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "生日",
                            id: "birthday",
                            config: {
                                initialValue: echoData.birthday,
                                rules: [{type: 'object', required: true, message: '请输入你的生日!'}],

                            }
                            ,
                            input: <DatePicker placeholder="请输入生日" name="birthday"/>
                        }
                    ]

                },
                {
                    cols: [
                        {
                            col: {span: 11},
                            label: "id",
                            id: "id",
                            config: {
                                initialValue: echoData.id,
                            },
                            input: <Input name="id"
                                          autoComplete="off"
                                          disabled={true}/>
                        },
                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "用户名",
                            id: "username",
                            config: {
                                initialValue: echoData.username,
                                rules: [{required: true, whitespace: true, message: '请输入用户名!'}],
                            },
                            input: <Input name="username"
                                          prefix={<Icon type="user"
                                                        style={{color: 'rgba(0,0,0,.25)'}}/>}
                                          autoComplete="off"
                                          placeholder="用户名"/>
                        }
                    ]


                },
                {
                    cols: [
                        {
                            col: {span: 11},
                            label: "密码",
                            id: "password",
                            config: {
                                initialValue: echoData.password,
                                rules: [{required: true, whitespace: true, message: '请输入密码!'}],
                            }
                            ,
                            input: <Input name="password"
                                          prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                          autoComplete="off"
                                          placeholder="密码"/>
                        },

                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "性别",
                            id: "sex",
                            config: {
                                initialValue: echoData.sex,
                                rules: [
                                    {required: true, message: '请输入你的性别!'}],
                            }
                            ,
                            input: <Select placeholder="请输入你的性别">
                                <Option value="1">男</Option>
                                <Option value="2">女</Option>
                                <Option value="3">未知</Option>
                            </Select>
                        }
                    ]


                },
                {
                    cols: [

                        {
                            col: {span: 11},
                            label: "状态",
                            id: "status",
                            config: {
                                initialValue: echoData.status,
                                rules: [{required: true, message: '请输入状态!'}],
                            }
                            ,
                            input: <Select placeholder="请输入状态">
                                <Option value="1">正常</Option>
                                <Option value="2">冻结</Option>
                            </Select>
                        },
                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "最后更新时间",
                            id: "ignore_updateTime",
                            config: {
                                initialValue: echoData.updateTime,
                            }
                            ,
                            input: <Input disabled={true}/>
                        }
                    ]


                },
                {
                    cols: [
                        {
                            col: {span: 24},
                            label: "创建时间",
                            id: "ignore_createTime",
                            config: {
                                initialValue: echoData.createTime,
                            }
                            ,
                            input: <Input disabled={true}/>
                        }
                    ]


                },
                {
                    cols: [
                        {
                            col: {span: 24},
                            label: "简介",
                            id: "description",
                            config: {
                                initialValue: echoData.description,
                                rules: [{required: true, message: '请输入简介!'}],
                            }
                            ,
                            input: <TextArea placeholder="请输入简介" autosize={{minRows: 4, maxRows: 8}}/>
                        }


                    ]


                },


            ]
        ;
        return <EditDialogTemple
            title="修改用户"
            formRows={formRows}
            formLayout={formLayout}
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            ref="user_edit_dialog"/>;
    }
});

export default UserEditDialog;   //将App组件导出
