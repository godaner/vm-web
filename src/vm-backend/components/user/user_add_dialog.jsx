import React from "react";
import {Button, DatePicker, Icon, Input, Layout, Menu, message, Select, Table} from "antd";
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
var UserAddDialog = React.createClass({
    getInitialState(){
        return {
            addUserUrl: "/user/info",
        };
    },
    showDialog(){
        this.getUserAddDialog().showDialog();
    }
    ,
    getUserAddDialog(){
        return this.refs.user_add_dialog;
    },
    handleSubmit(values){
        const hideMessage = message.loading('正在添加用户', 0);
        const {addUserUrl} = this.state;
        var filterValues = function (values) {
            values.birthday = timeFormatter.long2Int(new Date(values.birthday._d).getTime());
            return values;
        }
        values = filterValues(values);
        ajax.post({
            url: addUserUrl,
            data: values,
            success: function (result) {
                const {onAddSuccess} = this.props;

                message.success(result.msg);
                this.getUserAddDialog().closeDialog();

                //callback
                onAddSuccess(result.data.user);
                c("onAddSuccess");
                c(result.data.user);

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getUserAddDialog().formLeaveLoading();
            }.bind(this)
        });

    },
    handleCancel(){

        c("handleCancel");
    },
    componentDidMount(){

    },
    render(){
        // var getFieldDecorator = this.getUserAddDialog().getFieldDecorator();
        var formItems = [
            {

                filed: {
                    id: "username",
                    config: {
                        rules: [{required: true, whitespace: true, message: '请输入用户名!'}],
                    },
                    input: <Input autoComplete="off"
                                  name="username"
                                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                  placeholder="用户名"/>
                }
            }
            ,
            {
                filed: {
                    id: "password",
                    config: {
                        rules: [{required: true, whitespace: true, message: '请输入密码!'}],
                    },
                    input: <Input name="password"
                                  autoComplete="off"
                                  prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                  placeholder="密码"/>
                }
            },
            {
                filed: {
                    id: "sex",
                    config: {
                        rules: [
                            {required: true, message: '请输入你的性别!'}],
                    },
                    input: <Select placeholder="请输入你的性别">
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                        <Option value="3">未知</Option>
                    </Select>
                }
            },
            {
                filed: {
                    id: "birthday",
                    config: {
                        rules: [{type: 'object', required: true, message: '请输入你的生日!'}],

                    },
                    input: <DatePicker placeholder="请输入生日"/>
                }
            }
            ,
            {
                filed: {
                    id: "description",
                    config: {
                        rules: [
                            {required: true, message: '请输入简介!'}],
                        // initialValue: "1"
                    },
                    input: <TextArea placeholder="请输入简介" autosize={{minRows: 4, maxRows: 8}}/>
                }
            }
            ,
            {
                filed: {
                    id: "status",
                    config: {
                        rules: [
                            {required: true, message: '请输入状态!'}],
                        // initialValue: "1"
                    },
                    input: <Select placeholder="请输入状态">
                        <Option value="1">正常</Option>
                        <Option value="2">冻结</Option>
                    </Select>
                }
            }

        ];
        return <EditDialogTemple
            title="添加用户"
            formItems={formItems}
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            ref="user_add_dialog"/>;
    }
});

export default UserAddDialog;   //将App组件导出
