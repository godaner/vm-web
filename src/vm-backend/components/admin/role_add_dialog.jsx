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
var RoleAddDialog = React.createClass({
    getInitialState() {
        return {
            title:"添加角色",
            addRoleUrl: "/role/info",
            tipOfAddingRole: "正在添加角色"
        };
    },
    showDialog() {
        this.getRoleAddDialog().showDialog();
    }
    ,
    getRoleAddDialog() {
        return this.refs.role_add_dialog;
    },
    handleSubmit(values) {
        const {tipOfAddingRole} = this.state;
        const hideMessage = message.loading(tipOfAddingRole, 0);
        const {addRoleUrl} = this.state;
        var filterValues = function (values) {
            return values;
        }
        values = filterValues(values);
        ajax.post({
            url: addRoleUrl,
            data: values,
            success: function (result) {
                const {onAddSuccess} = this.props;

                message.success(result.msg);
                this.getRoleAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.role) : undefined;

                //clear form
                this.getRoleAddDialog().clearForm();

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getRoleAddDialog().formLeaveLoading();
            }.bind(this)
        });

    },
    handleCancel() {

        c("handleCancel");
    },
    componentDidMount() {

    },
    render() {

        const {title} = this.state;

        var formLayout = "horizontal";

        var formRows = [
                {
                    cols: [


                        {
                            col: {span: 11},
                            label: "名称",
                            id: "username",
                            config: {
                                rules: [{required: true, message: '请输入角色名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入角色名称"/>
                        },
                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "状态",
                            id: "status",
                            config: {
                                rules: [{required: true, message: '请输入状态!'}],
                            }
                            ,
                            input: <Select placeholder="请输入状态">
                                <Option value="1">正常</Option>
                                <Option value="2">冻结</Option>
                            </Select>
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
                            rules: [{required: true, message: '请输入角色密码!'}],

                        }
                        ,
                        input: <Input placeholder="请输入角色密码"/>
                    },
                    {
                        col: {span: 2},
                        input: <div></div>
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
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            ref="role_add_dialog"/>;
    }
});

export default RoleAddDialog;   //将App组件导出
