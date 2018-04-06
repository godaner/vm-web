import React from "react";
import {Button, DatePicker, Icon, Input, Layout, Menu, message, Select, Table, Upload} from "antd";
import moment from 'moment';
import {withRouter} from "react-router-dom";
//import "antd/dist/antd.css";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const Option = Select.Option;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var AdminAddDialog = React.createClass({
    getInitialState() {
        return {
            title: "添加管理员",
            addAdminUrl: "/admin/info",
            tipOfAddingAdmin: "正在添加管理员",
            roles: [],
            roleUrl: "/admin/role/info/all",
        };
    },
    updateRoles(roles){
        this.setState({roles});
    },
    loadRolesData () {
        const {roleUrl} = this.state;
        ajax.get({
            url: roleUrl,
            success: function (result) {

                this.updateRoles(result.data.list);


            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    },
    showDialog() {
        this.getAdminAddDialog().showDialog();
        this.loadRolesData();
    }
    ,
    getAdminAddDialog() {
        return this.refs.admin_add_dialog;
    },
    handleSubmit(values) {
        const {tipOfAddingAdmin} = this.state;
        const hideMessage = message.loading(tipOfAddingAdmin, 0);
        const {addAdminUrl} = this.state;
        var filterValues = function (values) {

            if(isUndefined(values.roleIds)){
                values.roleIds = [];
            }
            values.roleIds = values.roleIds.join(",");
            return values;
        }
        values = filterValues(values);
        ajax.post({
            url: addAdminUrl,
            data: values,
            success: function (result) {
                const {onAddSuccess} = this.props;

                message.success(result.msg);
                this.getAdminAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.admin) : undefined;

                //clear form
                this.getAdminAddDialog().clearForm();

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getAdminAddDialog().formLeaveLoading();
            }.bind(this)
        });

    },
    handleCancel() {

        c("handleCancel");
    },
    componentDidMount() {

    },
    render() {

        const {title, roles} = this.state;

        var roleOptions = [];
        if (!isUndefined(roles) && roles.length >= 1) {
            roleOptions = roles.map(function (item, i) {
                const val = item.id + '';
                const title = "角色：" + item.roleName + "\r\n简介:" + item.description;
                return <Option title={title} key={item.id} value={val}>{item.roleName}</Option>;
            }.bind(this));
        }

        var formLayout = "horizontal";

        var formRows = [
                {
                    cols: [


                        {
                            col: {span: 11},
                            label: "名称",
                            id: "username",
                            config: {
                                rules: [{required: true, message: '请输入管理员名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入管理员名称"/>
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
                                rules: [{required: true, message: '请输入管理员密码!'}],

                            }
                            ,
                            input: <Input placeholder="请输入管理员密码"/>
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
                            label: "角色",
                            id: "roleIds",
                            config: {
                                rules: [{required: false, message: '请选择角色!'}],
                            }
                            ,
                            input: <Select
                                showSearch
                                mode="multiple"
                                optionFilterProp="children"
                                notFoundContent="无相关角色"
                                placeholder="请选择角色"
                                style={{width: '100%'}}
                            >
                                {roleOptions}
                            </Select>
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
            ref="admin_add_dialog"/>;
    }
});

export default AdminAddDialog;   //将App组件导出
