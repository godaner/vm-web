import React from "react";
import {Button, DatePicker, Icon, Input, Layout, Menu, message, Select, Table, Upload} from "antd";
import moment from 'moment';
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const Option = Select.Option;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;


var RoleEditDialog = React.createClass({

    getInitialState(){

        return {
            title: "修改角色信息",
            editRoleUrl: "/role/info",
            tipOfEditing: '正在保存角色修改',
        };
    },
    componentWillReceiveProps(){

    },
    showDialog(){
        this.getRoleEditDialog().showDialog();
    },
    getRoleEditDialog(){
        return this.refs.role_edit_dialog;
    },
    handleSubmit(values){
        const {editRoleUrl, tipOfEditing} = this.state;
        const hideMessage = message.loading(tipOfEditing, 0);
        var filterValues = function (values) {
            return values;
        }
        values = filterValues(values);
        // c(values);
        ajax.put({
            url: editRoleUrl,
            data: values,
            success: function (result) {
                const {onEditSuccess} = this.props;


                message.success(result.msg);
                this.getRoleEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.role) : undefined;


                //clear form
                this.getRoleEditDialog().clearForm();
            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getRoleEditDialog().formLeaveLoading();
            }.bind(this)
        });

    },
    handleCancel(){
        this.getRoleEditDialog().clearForm();//!!防止触发reuqired后在关闭的bug
        c("handleCancel");
    },
    componentDidMount(){
    },
    updateConstellationObj(obj){
        this.setState({
            constellationObj: obj
        });
    },
    onBirthdayChange(date, dateString){

        var {echoData} = this.props;
        echoData.constellation = commons.transConStrByDate(date._d)

    },
    render(){
        var {echoData} = this.props;

        const {title} = this.state;

        // filterEchoData
        var filterEchoData = function (echoData) {
            if (isUndefined(echoData)) {
                return {};
            }
            if (!isUndefined(echoData.createTime)) {
                echoData.createTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.createTime));
            }
            if (!isUndefined(echoData.updateTime)) {
                echoData.updateTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.updateTime));

            }
            


            return echoData;
        }.bind(this)

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
                            label: "名称",
                            id: "username",
                            config: {
                                initialValue: echoData.username,
                                rules: [{required: true, message: '请输入角色名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入角色名称" name="name"/>
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
                            label: "密码",
                            id: "password",
                            config: {
                                initialValue: echoData.password,
                                rules: [{required: true, whitespace: true, message: '请输入密码!'}],
                            },
                            input: <Input autoComplete="off"
                                          placeholder="密码"/>
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
        return <EditDialogTemple
            title={title}
            formRows={formRows}
            formLayout={formLayout}
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            ref="role_edit_dialog"/>;
    }
});

export default RoleEditDialog;   //将App组件导出
