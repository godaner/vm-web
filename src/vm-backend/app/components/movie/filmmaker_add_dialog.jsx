import React from "react";
import {Button, DatePicker, Icon, Input, Layout, Menu, message, Select, Table, Upload} from "antd";
import moment from 'moment';
import {withRouter} from "react-router-dom";
//import "antd/dist/antd.css";
import "../../scss/movie/filmmaker_page.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const Option = Select.Option;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var FilmmakerAddDialog = React.createClass({
    getInitialState() {
        return {
            title:"添加电影人",
            addFilmmakerUrl: "/filmmaker/info",
            tipOfAddingFilmmaker: "正在添加电影人"
        };
    },
    showDialog() {
        this.getFilmmakerAddDialog().showDialog();
    }
    ,
    getFilmmakerAddDialog() {
        return this.refs.filmmaker_add_dialog;
    },
    handleSubmit(values) {
        const {tipOfAddingFilmmaker} = this.state;
        const hideMessage = message.loading(tipOfAddingFilmmaker, 0);
        const {addFilmmakerUrl} = this.state;
        var filterValues = function (values) {
            values.birthday = timeFormatter.long2Int(values.birthday._d.getTime());
            return values;
        }
        values = filterValues(values);
        ajax.post({
            url: addFilmmakerUrl,
            data: values,
            success: function (result) {
                const {onAddSuccess} = this.props;

                message.success(result.msg);
                this.getFilmmakerAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.filmmaker) : undefined;

                //clear form
                this.getFilmmakerAddDialog().clearForm();

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getFilmmakerAddDialog().formLeaveLoading();
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
                                rules: [{required: true, message: '请输入电影人名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入电影人名称" name="name"/>
                        },
                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "别名",
                            id: "alias",
                            config: {
                                rules: [{required: true, whitespace: true, message: '请输入电影人别名!'}],
                            },
                            input: <Input autoComplete="off"
                                          placeholder="请输入电影人别名"/>
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
                            label: "性别",
                            id: "sex",
                            config: {
                                rules: [{required: true, message: '请输入性别!'}],
                            }
                            ,
                            input: <Select placeholder="请输入性别">
                                {
                                    commons.getSexOptions()
                                }
                            </Select>
                        }
                    ]


                },
                {
                    cols: [

                        {
                            col: {span: 11},
                            label: "生日",
                            id: "birthday",
                            config: {
                                rules: [{type: 'object', required: true, whitespace: true, message: '请输入生日!'}],
                            }
                            ,
                            input: <DatePicker autoComplete="off"
                                               placeholder="请输入生日"/>
                        },
                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "职业",
                            id: "profession",
                            config: {
                                rules: [{required: true, whitespace: true, message: '请输入职业!'}],
                            }
                            ,
                            input: <Input placeholder="请输入职业"/>
                        },

                    ]


                },
                {
                    cols: [

                        {
                            col: {span: 11},
                            label: "血型",
                            id: "bloodType",
                            config: {
                                rules: [{required: true, whitespace: true, message: '请输入血型!'}],
                            }
                            ,
                            input: <Select placeholder="请输入请输入血型">
                                {
                                    commons.getBloodTypeOptions()
                                }
                            </Select>
                        },
                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "国家",
                            id: "country",
                            config: {
                                rules: [{required: true, whitespace: true, message: '请输入国家!'}],
                            }
                            ,
                            input: <Input placeholder="请输入国家"/>
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
            ref="filmmaker_add_dialog"/>;
    }
});

export default FilmmakerAddDialog;   //将App组件导出
