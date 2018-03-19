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
            title: "修改用户信息",
            editUserUrl: "/user/info",
            tipOfEditing: "正在修改用户"
        };
    },
    showDialog(){
        this.getUserEditDialog().showDialog();
    },
    getUserEditDialog(){
        return this.refs.user_edit_dialog;
    },
    handleSubmit(values){
        const {editUserUrl, tipOfEditing} = this.state;
        const hideMessage = message.loading(tipOfEditing, 0);
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


        var formLayout = "horizontal";

        var formRows = [
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
                        }
                        ,
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
                                {
                                    commons.getSexOptions()
                                }
                            </Select>
                        }
                    ]


                },
                {
                    cols: [
                        {
                            col: {span: 11},
                            label: "创建时间",
                            id: "ignore_createTime",
                            config: {
                                initialValue: echoData.createTime,
                            }
                            ,
                            input: <Input disabled={true}/>
                        }
                        ,
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
        const {title} = this.state;
        return <EditDialogTemple
            title={title}
            formRows={formRows}
            formLayout={formLayout}
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            ref="user_edit_dialog"/>;
    }
});

export default UserEditDialog;   //将App组件导出
