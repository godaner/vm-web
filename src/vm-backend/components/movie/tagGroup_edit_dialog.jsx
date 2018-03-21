import React from "react";
import {Button, DatePicker, Icon, InputNumber, Input, Layout, Menu, message, Select, Table, Upload} from "antd";
import moment from 'moment';
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/movie/movie_page.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const Option = Select.Option;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;


var TagGroupEditDialog = React.createClass({
    getInitialState(){
        return {
            width: 400,
            title: "修改标签组信息",
            editUrl: "/tagGroup/info",
            tipOfEditing: '正在保存标签组修改'
        };
    },

    showDialog(record){

        this.getTagGroupEditDialog().showDialog();


    },
    getTagGroupEditDialog(){
        return this.refs.movie_edit_dialog;
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
                this.getTagGroupEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.movie) : undefined;


                //clear form
                // this.getTagGroupEditDialog().clearForm();
            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getTagGroupEditDialog().formLeaveLoading();
            }.bind(this)
        });

    },
    handleCancel(){
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
                                rules: [{required: true, message: '请输入标签分组名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入标签分组名称" name="name"/>
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
            ref="movie_edit_dialog"/>;
    }
});

export default TagGroupEditDialog;   //将App组件导出
