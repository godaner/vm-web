import React from "react";
import {Input, Layout, Menu, message, Select} from "antd";
import "antd/dist/antd.css";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const {Option, OptGroup} = Select;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;


var RoleEditDialog = React.createClass({

    getInitialState(){

        return {
            width: 666,
            title: "修改角色信息",
            editRoleUrl: "/admin/role/info",
            tipOfEditing: '正在保存角色修改',
            auths: [],
            selectAuthIds: [],
            authUrl: "/admin/auth/info/all",
            selectAuthUrl: "/admin/auth/id/list/byRoleId/",
            menus: [],
            selectMenuIds: [],
            menuUrl: "/admin/menu/tree/all",
            selectMenuUrl: "/admin/menu/leaf/id/list/byRoleId/",
        };
    },
    updateAuths(auths){
        this.setState({auths});
    },
    updateSelectAuthIds(selectAuthIds){

        this.setState({selectAuthIds});
    },
    loadAuthsData (args) {
        const {onSuccess} = args;
        const {authUrl} = this.state;
        ajax.get({
            url: authUrl,
            success: function (result) {

                this.updateAuths(result.data.list)

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

                isUndefined(onSuccess) ? undefined : onSuccess(result);
            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    },
    loadSelectAuthIdsData (roleId) {
        const {selectAuthUrl} = this.state;
        ajax.get({
            url: selectAuthUrl + roleId,
            success: function (result) {

                this.updateSelectAuthIds(result.data.list)

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
    updateSelectMenuIds(selectMenuIds){

        this.setState({selectMenuIds});
    },
    loadMenusData (args) {
        const {onSuccess} = args;
        const {menuUrl} = this.state;
        ajax.get({
            url: menuUrl,
            success: function (result) {

                this.updateMenus(result.data.tree)

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

                isUndefined(onSuccess) ? undefined : onSuccess(result);
            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    },
    loadSelectMenuIdsData (roleId) {
        const {selectMenuUrl} = this.state;
        ajax.get({
            url: selectMenuUrl + roleId,
            success: function (result) {

                this.updateSelectMenuIds(result.data.list)

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    },
    showDialog(record){

        const {id} = record;
        this.getRoleEditDialog().showDialog();
        this.loadAuthsData({
            onSuccess: this.loadSelectAuthIdsData(id)
        });
        this.loadMenusData({
            onSuccess: this.loadSelectMenuIdsData(id)
        });
    }
    ,
    getRoleEditDialog(){
        return this.refs.role_edit_dialog;
    },
    handleSubmit(values){
        const {editRoleUrl, tipOfEditing} = this.state;
        const hideMessage = message.loading(tipOfEditing, 0);
        var filterValues = function (values) {
            values.authIds = values.authIds.join(",");
            values.menuIds = values.menuIds.join(",");
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
    render(){
        var {echoData} = this.props;

        const {title, auths, selectAuthIds, menus, selectMenuIds, width} = this.state;

        echoData = commons.clone(echoData);//!!!!!!!!!!!!!important
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


        var authOptions = [];

        if (!isUndefined(auths) && auths.length >= 1) {
            authOptions = auths.map(function (item, i) {
                const val = item.id + '';
                const title = "权限：" + item.authName + "\r\n简介:" + item.description;
                return <Option title={title} key={item.id} value={val}>{item.authName}</Option>;
            }.bind(this));
        }
        var menuOptions = [];
        if (!isUndefined(menus) && menus.length >= 1) {
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
                            col: {span: 7},
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
                            col: {span: 1},
                            input: <div></div>
                        },
                        {
                            col: {span: 7},
                            label: "名称",
                            id: "roleName",
                            config: {
                                initialValue: echoData.roleName,
                                rules: [{required: true, message: '请输入角色名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入角色名称" name="name"/>
                        },
                        {
                            col: {span: 1},
                            input: <div></div>
                        },
                        {
                            col: {span: 7},
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
                    ]

                },
                {
                    cols: [


                        {
                            col: {span: 7},
                            label: "创建时间",
                            id: "ignore_createTime",
                            config: {
                                initialValue: echoData.createTime,
                            }
                            ,
                            input: <Input disabled={true}/>
                        },
                        {
                            col: {span: 1},
                            input: <div></div>
                        },
                        {
                            col: {span: 7},
                            label: "最后更新时间",
                            id: "ignore_updateTime",
                            config: {
                                initialValue: echoData.updateTime,
                            }
                            ,
                            input: <Input disabled={true}/>
                        },
                    ]


                },

                {
                    cols: [
                        {
                            col: {span: 24},
                            label: "权限",
                            id: "authIds",
                            config: {
                                initialValue: commons.toStrArr(selectAuthIds),
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
                                initialValue: commons.toStrArr(selectMenuIds),
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
                }
                ,
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
            width={width}
            formRows={formRows}
            formLayout={formLayout}
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            ref="role_edit_dialog"/>;
    }
});

export default RoleEditDialog;   //将App组件导出
