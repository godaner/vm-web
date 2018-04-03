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
var TagGroupAddDialog = React.createClass({
    getInitialState() {
        return {
            title: "添加标签分组",
            addTagGroupUrl: "/tagGroup/info",
            tipOfAddingTagGroup: "正在标签分组"
        };
    },
    showDialog() {
        this.getTagGroupAddDialog().showDialog();
    }
    ,
    getTagGroupAddDialog() {
        return this.refs.tagGroup_add_dialog;
    },
    handleSubmit(values) {
        const {tipOfAddingTagGroup} = this.state;
        const hideMessage = message.loading(tipOfAddingTagGroup, 0);
        const {addTagGroupUrl} = this.state;
        var filterValues = function (values) {
            return values;
        }
        values = filterValues(values);
        ajax.post({
            url: addTagGroupUrl,
            data: values,
            success: function (result) {
                const {onAddSuccess} = this.props;

                message.success(result.msg);
                this.getTagGroupAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.tagGroup) : undefined;

                //clear form
                this.getTagGroupAddDialog().clearForm();

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getTagGroupAddDialog().formLeaveLoading();
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
                            id: "name",
                            config: {
                                rules: [{required: true, message: '请输入标签分组名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入标签分组名称" name="name"/>
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
                                {commons.getStatusOptions()}
                            </Select>
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
            ref="tagGroup_add_dialog"/>;
    }
});

export default TagGroupAddDialog;   //将App组件导出
