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
var AdminAddDialog = React.createClass({
    getInitialState() {
        return {
            title:"添加管理员",
            addAdminUrl: "/admin/info",
            tipOfAddingAdmin: "正在添加管理员"
        };
    },
    showDialog() {
        this.getAdminAddDialog().showDialog();
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
