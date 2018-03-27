import React from "react";
import {Input, Layout, Menu, message, Select} from "antd";
import "antd/dist/antd.css";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const Option = Select.Option;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;


var AdminEditDialog = React.createClass({

    getInitialState(){

        return {
            title: "修改管理员信息",
            editAdminUrl: "/admin/info",
            tipOfEditing: '正在保存管理员修改',
            roles: [],
            roleUrl: "/admin/role/info/all",
            selectRoleIds: [],
            selectRoleUrl: "/admin/role/id/list/byAdminId/",
        };
    },
    updateRoles(roles){
        this.setState({roles});
    },
    updateSelectRoleIds(selectRoleIds){

        this.setState({selectRoleIds});
    },
    loadRolesData (args) {
        const {onSuccess} = args;
        const {roleUrl} = this.state;
        ajax.get({
            url: roleUrl,
            success: function (result) {

                this.updateRoles(result.data.list);

                isUndefined(onSuccess) ? undefined : onSuccess(result);

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    },
    loadSelectAuthIdsData (adminId) {
        const {selectRoleUrl} = this.state;
        ajax.get({
            url: selectRoleUrl + adminId,
            success: function (result) {

                this.updateSelectRoleIds(result.data.list)

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    },
    showDialog(record){
        this.getAdminEditDialog().showDialog();
        this.loadRolesData({
            onSuccess: function () {
                this.loadSelectAuthIdsData(record.id)
            }.bind(this)
        })
    },
    getAdminEditDialog(){
        return this.refs.admin_edit_dialog;
    },
    handleSubmit(values){
        const {editAdminUrl, tipOfEditing} = this.state;
        const hideMessage = message.loading(tipOfEditing, 0);
        var filterValues = function (values) {
            values.roleIds = values.roleIds.join(",");
            return values;
        }
        values = filterValues(values);
        // c(values);
        ajax.put({
            url: editAdminUrl,
            data: values,
            success: function (result) {
                const {onEditSuccess} = this.props;


                message.success(result.msg);
                this.getAdminEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.admin) : undefined;


                //clear form
                this.getAdminEditDialog().clearForm();
            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getAdminEditDialog().formLeaveLoading();
            }.bind(this)
        });

    },
    handleCancel(){
        this.getAdminEditDialog().clearForm();//!!防止触发reuqired后在关闭的bug
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

        const {title, roles, selectRoleIds} = this.state;

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
                                rules: [{required: true, message: '请输入管理员名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入管理员名称" name="name"/>
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
                            label: "角色",
                            id: "roleIds",
                            config: {
                                initialValue: commons.toStrArr(selectRoleIds),
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
            ref="admin_edit_dialog"/>;
    }
});

export default AdminEditDialog;   //将App组件导出
