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


var TagEditDialog = React.createClass({
    getInitialState(){
        return {
            width: 400,
            title: "修改标签信息",
            editUrl: "/tag/info",
            tipOfEditing: '正在保存标签修改',
            echoData:{}
        };
    },

    showDialog(record){


        this.getTagEditDialog().showDialog();

    },
    getTagEditDialog(){
        return this.refs.tag_edit_dialog;
    },
    handleSubmit(values){
        const {editUrl, tipOfEditing} = this.state;
        const hideMessage = message.loading(tipOfEditing, 0);
        var filterValues = function (values) {
            return values;
        }
        values = filterValues(values);
        // c(values);
        ajax.put({
            url: editUrl,
            data: values,
            success: function (result) {
                const {onEditSuccess} = this.props;


                message.success(result.msg);
                this.getTagEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.tag) : undefined;


                //clear form
                this.getTagEditDialog().clearForm();
            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getTagEditDialog().formLeaveLoading();
            }.bind(this)
        });

    },
    handleCancel(){
        this.getTagEditDialog().clearForm();//!!防止触发reuqired后在关闭的bug
        c("handleCancel");
    },
    componentDidMount(){

    },
    render(){

        var {echoData} = this.props;

        const {title, width} = this.state;

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
        }
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
                            input: <Input autoComplete="off"
                                          disabled={true}/>
                        },
                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "名称",
                            id: "name",
                            config: {
                                initialValue: echoData.name,
                                rules: [{required: true, message: '请输入标签名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入标签名称" name="name"/>
                        },


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
                                {commons.getStatusOptions()}
                            </Select>
                        },

                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {
                                span: 11
                            }
                            ,
                            label: "创建时间",
                            id: "ignore_createTime",
                            config: {
                                initialValue: echoData.createTime,
                            }
                            ,
                            input: <Input disabled={true}/>
                        }

                    ]


                },

                {
                    cols: [


                        {
                            col: {span: 11},
                            label: "最后更新时间",
                            id: "ignore_updateTime",
                            config: {
                                initialValue: echoData.updateTime,
                            }
                            ,
                            input: <Input disabled={true}/>
                        },
                        {
                            col: {span: 2},
                            input: <div></div>
                        },


                    ]


                }


            ]
        ;
        return <EditDialogTemple
            width={width}
            title={title}
            formRows={formRows}
            formLayout={formLayout}
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            ref="tag_edit_dialog"/>;
    }
});

export default TagEditDialog;   //将App组件导出
