import React from "react";
import {Button, DatePicker, Icon, Input, Layout, Menu, message, Select, Table, Upload} from "antd";
import moment from 'moment';
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
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
            addFilmmakerUrl: "/filmmaker/info",
            tipOfAddingFilmmaker: "正在添加电影"
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
            values.releaseTime = timeFormatter.long2Int(new Date(values.releaseTime._d).getTime());
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


        var formLayout = "horizontal";

        var formRows = [
                {
                    cols: [


                        {
                            col: {span: 24},
                            label: "名称",
                            id: "name",
                            config: {
                                rules: [{required: true, message: '请输入电影名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入电影名称" name="name"/>
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
                            label: "别名",
                            id: "alias",
                            config: {
                                rules: [{required: true, whitespace: true, message: '请输入电影别名!'}],
                            },
                            input: <Input name="alias"
                                          prefix={<Icon type="filmmaker"
                                                        style={{color: 'rgba(0,0,0,.25)'}}/>}
                                          autoComplete="off"
                                          placeholder="请输入电影别名"/>
                        }
                    ]


                },
                {
                    cols: [
                        {
                            col: {span: 11},
                            label: "发布时间",
                            id: "releaseTime",
                            config: {
                                rules: [{type: 'object', required: true, whitespace: true, message: '请输入发布时间!'}],
                            }
                            ,
                            input: <DatePicker name="releaseTime"
                                               autoComplete="off"
                                               placeholder="请输入发布时间"/>
                        },

                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "电影时长(分钟)",
                            id: "filmmakerTime",
                            config: {

                                rules: [{required: true, message: '请输入简介!'}],
                            }
                            ,
                            input: <Input name="filmmakerTime"
                                          autoComplete="off"
                                          placeholder="请输入电影时长"/>
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
            title="添加用户"
            formRows={formRows}
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            ref="filmmaker_add_dialog"/>;
    }
});

export default FilmmakerAddDialog;   //将App组件导出
