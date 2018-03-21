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
var TagAddDialog = React.createClass({
    getInitialState() {
        return {
            title: "添加标签",
            addTagUrl: "/tag/info",
            tipOfAddingTag: "正在标签",
            echoData: {}
        };
    },
    showDialog(record) {

        this.updateEchoData(record);

        this.getTagAddDialog().showDialog();
    },
    updateEchoData(echoData){
        this.setState({echoData: echoData});
    }
    ,
    getTagAddDialog() {
        return this.refs.tag_add_dialog;
    },
    handleSubmit(values) {
        const {tipOfAddingTag} = this.state;
        const hideMessage = message.loading(tipOfAddingTag, 0);
        const {addTagUrl} = this.state;
        var filterValues = function (values) {
            return values;
        }
        values = filterValues(values);
        ajax.post({
            url: addTagUrl,
            data: values,
            success: function (result) {
                const {onAddSuccess} = this.props;

                message.success(result.msg);
                this.getTagAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.tag) : undefined;

                //clear form
                this.getTagAddDialog().clearForm();

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getTagAddDialog().formLeaveLoading();
            }.bind(this)
        });

    },
    handleCancel() {

        c("handleCancel");
    },
    componentDidMount() {

    },
    render() {

        const {title, echoData} = this.state;

        var formLayout = "horizontal";

        var formRows = [
                {
                    cols: [


                        {
                            col: {span: 11},
                            label: "所属标签组id",
                            id: "tagGroupId",
                            config: {
                                initialValue: echoData.id,
                                rules: [{required: true}],

                            },
                            input: <Input disabled={true}/>
                        },
                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "所属标签组",
                            id: "ignore_tagGroupName",
                            config: {
                                initialValue: echoData.name,
                                rules: [{required: true}],

                            },
                            input: <Input disabled={true} />
                        }
                    ],
                },
                {

                    cols: [


                        {
                            col: {span: 11},
                            label: "名称",
                            id: "name",
                            config: {
                                rules: [{required: true, message: '请输入标签名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入标签名称" name="name"/>
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
            ref="tag_add_dialog"/>;
    }
});

export default TagAddDialog;   //将App组件导出
