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


var FilmmakerEditDialog = React.createClass({

    getInitialState(){

        return {
            title: "修改电影人信息",
            editFilmmakerUrl: "/filmmaker/info",
            tipOfEditing: '正在保存电影人修改',
        };
    },
    componentWillReceiveProps(){

    },
    showDialog(){
        this.getFilmmakerEditDialog().showDialog();
    },
    getFilmmakerEditDialog(){
        return this.refs.filmmaker_edit_dialog;
    },
    handleSubmit(values){
        const {editFilmmakerUrl, tipOfEditing} = this.state;
        const hideMessage = message.loading(tipOfEditing, 0);
        var filterValues = function (values) {
            values.birthday = timeFormatter.long2Int(values.birthday._d.getTime());
            return values;
        }
        values = filterValues(values);
        // c(values);
        ajax.put({
            url: editFilmmakerUrl,
            data: values,
            success: function (result) {
                const {onEditSuccess} = this.props;


                message.success(result.msg);
                this.getFilmmakerEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.filmmaker) : undefined;


                //clear form
                this.getFilmmakerEditDialog().clearForm();
            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getFilmmakerEditDialog().formLeaveLoading();
            }.bind(this)
        });

    },
    handleCancel(){
        this.getFilmmakerEditDialog().clearForm();//!!防止触发reuqired后在关闭的bug
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

        const {title} = this.state;

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
            if (!isUndefined(echoData.birthday)) {
                echoData.birthday = moment(timeFormatter.int2Long(echoData.birthday));

            }


            return echoData;
        }.bind(this)

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
                            id: "name",
                            config: {
                                initialValue: echoData.name,
                                rules: [{required: true, message: '请输入电影人名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入电影人名称" name="name"/>
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
                            label: "别名",
                            id: "alias",
                            config: {
                                initialValue: echoData.alias,
                                rules: [{required: true, whitespace: true, message: '请输入别名!'}],
                            },
                            input: <Input autoComplete="off"
                                          placeholder="别名"/>
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
                                initialValue: echoData.birthday,
                                rules: [{type: 'object', required: true, whitespace: true, message: '请输入生日!'}],
                            }
                            ,
                            input: <DatePicker onChange={this.onBirthdayChange}
                                               autoComplete="off"
                                               placeholder="请输入生日"/>
                        },

                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "性别",
                            id: "sex",
                            config: {
                                initialValue: echoData.sex,
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
                            label: "职业",
                            id: "profession",
                            config: {
                                initialValue: echoData.profession,
                                rules: [{required: true, whitespace: true, message: '请输入职业!'}],
                            }
                            ,
                            input: <Input placeholder="请输入职业"/>
                        },

                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "血型",
                            id: "bloodType",
                            config: {
                                initialValue: echoData.bloodType,
                                rules: [{required: true, whitespace: true, message: '请输入血型!'}],
                            }
                            ,
                            input: <Select placeholder="请输入请输入血型">
                                {
                                    commons.getBloodTypeOptions()
                                }
                            </Select>
                        }
                    ]


                },
                {
                    cols: [
                        {
                            col: {span: 11},
                            label: "国家",
                            id: "country",
                            config: {
                                initialValue: echoData.country,
                                rules: [{required: true, whitespace: true, message: '请输入国家!'}],
                            }
                            ,
                            input: <Input placeholder="请输入国家"/>
                        }
                        ,
                        {
                            col: {span: 2},
                            input: <div></div>
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
            ref="filmmaker_edit_dialog"/>;
    }
});

export default FilmmakerEditDialog;   //将App组件导出
