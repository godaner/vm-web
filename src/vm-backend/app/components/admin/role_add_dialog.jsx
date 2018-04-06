import React from "react";
import {Input, Layout, Menu, message, Select} from "antd";
//import "antd/dist/antd.css";
import "../base/events_dispatcher";
import {ajax} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const {Option,OptGroup} = Select;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var RoleAddDialog = React.createClass({
    getInitialState() {
        return {
            title: "添加角色",
            addRoleUrl: "/admin/role/info",
            tipOfAddingRole: "正在添加角色",
            auths: [],
            authUrl: "/admin/auth/info/all",
            menus: [],
            menuUrl: "/admin/menu/tree/all",
        };
    },
    updateAuths(auths){
        this.setState({auths});
    },
    loadAuthsData () {
        const {authUrl} = this.state;
        ajax.get({
            url: authUrl,
            success: function (result) {

                this.updateAuths(result.data.list)

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    },
    updateMenus(menus){
        this.setState({menus});
    },
    loadMenusData () {
        const {menuUrl} = this.state;
        ajax.get({
            url: menuUrl,
            success: function (result) {

                this.updateMenus(result.data.tree)

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    },
    showDialog() {
        this.getRoleAddDialog().showDialog();
        this.loadAuthsData();
        this.loadMenusData();
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
            if(isUndefined(values.authIds)){
                values.authIds = [];
            }
            values.authIds = values.authIds.join(",");

            if(isUndefined(values.menuIds)){
                values.menuIds = [];
            }
            values.menuIds = values.menuIds.join(",");
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


        const {title,auths,menus} = this.state;

        var authOptions = [];

        if (!isUndefined(auths) && auths.length >= 1) {
            authOptions = auths.map(function (item, i) {
                const val = item.id + '';
                const title = "权限：" + item.authName + "\r\n简介:" + item.description;
                return <Option title={title} key={item.id} value={val}>{item.authName}</Option>;
            }.bind(this));
        }
        var menuOptions = [];
        if(!isUndefined(menus) && menus.length >= 1){
            // c("menus");
            // c(menus);
            menuOptions = menus.map(function (menu, i) {
                return <OptGroup key={i} label={menu.menuName}>
                    {
                        menu.child.map(function (ch, i) {
                            // c(tag);
                            const v = ch.id + '';
                            return <Option key={ch.id} value={v}>{ch.menuName}</Option>;
                        })
                    }
                </OptGroup>

            }.bind(this));
        }

        var formLayout = "horizontal";

        var formRows = [
                {
                    cols: [


                        {
                            col: {span: 11},
                            label: "名称",
                            id: "roleName",
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
                            col: {span: 24},
                            label: "权限",
                            id: "authIds",
                            config: {
                                rules: [{required: false, message: '请选择权限!'}],
                            }
                            ,
                            input: <Select
                                showSearch
                                mode="multiple"
                                optionFilterProp="children"
                                notFoundContent="无相关权限"
                                placeholder="请选择权限"
                                style={{width: '100%'}}
                            >
                                {authOptions}
                            </Select>
                        }
                    ]
                },
                {
                    cols: [
                        {
                            col: {span: 24},
                            label: "菜单",
                            id: "menuIds",
                            config: {
                                rules: [{required: false, message: '请选择菜单!'}],
                            }
                            ,
                            input: <Select
                                showSearch
                                mode="multiple"
                                optionFilterProp="children"
                                notFoundContent="无相关菜单"
                                placeholder="请选择菜单"
                                style={{width: '100%'}}
                            >
                                {menuOptions}
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
            ref="role_add_dialog"/>;
    }
});

export default RoleAddDialog;   //将App组件导出
