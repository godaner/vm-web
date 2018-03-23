import React from "react";
import {Button, DatePicker, Icon, Input, InputNumber, Layout, Menu, message, Select, Table, Upload} from "antd";
import moment from 'moment';
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../../scss/movie/movie_page.scss";
import "../base/events_dispatcher";
import {ajax, commons} from "../base/vm_util";
import EditDialogTemple from "../base/edit_dialog_temple";
const {Option, OptGroup} = Select;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var MovieAddDialog = React.createClass({
    getInitialState() {
        return {
            title: "添加电影",
            addMovieUrl: "/movie/info",
            getFilmmakersUrl: "/filmmaker/info/list",
            getTagGroupsUrl: "/tagGroup/tag/list",
            tipOfAddingMovie: "正在添加电影",
            filmmakers: [],
            tagGroups: []
        };
    },
    updateTagGroups(tagGroups){
        this.setState({tagGroups: tagGroups});
    },
    loadTagGroupsData () {
        const {getTagGroupsUrl} = this.state;
        ajax.get({
            url: getTagGroupsUrl,
            success: function (result) {

                this.updateTagGroups(result.data.list)

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    },
    showDialog() {
        this.getMovieAddDialog().showDialog();

        this.loadFilmmakerData();

        this.loadTagGroupsData();

    }
    ,
    getMovieAddDialog() {
        return this.refs.movie_add_dialog;
    },
    handleSubmit(values) {
        const {tipOfAddingMovie} = this.state;
        const hideMessage = message.loading(tipOfAddingMovie, 0);
        const {addMovieUrl} = this.state;
        var filterValues = function (values) {
            values.releaseTime = timeFormatter.long2Int(new Date(values.releaseTime._d).getTime());
            values.actorIds = values.actorIds.join(",");
            values.tagIds = values.tagIds.join(",");
            return values;
        }
        values = filterValues(values);
        ajax.post({
            url: addMovieUrl,
            data: values,
            success: function (result) {
                const {onAddSuccess} = this.props;

                message.success(result.msg);
                this.getMovieAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.movie) : undefined;

                //clear form
                this.getMovieAddDialog().clearForm();

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getMovieAddDialog().formLeaveLoading();
            }.bind(this)
        });

    },

    updateFilmmakers(filmmakers){
        this.setState({filmmakers: filmmakers});
    },
    loadFilmmakerData () {
        const {getFilmmakersUrl} = this.state;
        ajax.get({
            url: getFilmmakersUrl,
            success: function (result) {

                this.updateFilmmakers(result.data.list)

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            }.bind(this),
            complete: function () {

            }.bind(this)
        });
    },
    handleCancel() {

        c("handleCancel");
    },
    componentDidMount() {

    },
    render() {

        const {filmmakers, title, tagGroups} = this.state;

        //filmmakerOptions,actorOptions
        var filmmakerOptions = [];

        if (!isUndefined(filmmakers)) {
            filmmakerOptions = filmmakers.map(function (item, i) {
                const val = item.id + '';
                const title = "姓名：" + item.name + "\r\n别名：" + item.alias + "\r\n简介:" + item.description;
                return <Option title={title} key={item.name} value={val}>{item.name}</Option>;
            }.bind(this));
        }


        var formLayout = "horizontal";

        var formRows = [
                {
                    cols: [


                        {
                            col: {span: 11},
                            label: "名称",
                            id: "name",
                            config: {
                                rules: [{required: true, message: '请输入电影名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入电影名称" name="name"/>
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
                                rules: [{required: true, whitespace: true, message: '请输入电影别名!'}],
                            },
                            input: <Input autoComplete="off"
                                          placeholder="请输入电影别名"/>
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
                                {commons.getStatusOptions()}
                            </Select>
                        }
                        ,
                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "电影时长(分钟)",
                            id: "movieTime",
                            config: {

                                rules: [{required: true, message: '请输入时长!'}],
                            }
                            ,
                            input: <InputNumber autoComplete="off"
                                                style={{width: '100%'}}
                                                placeholder="请输入电影时长"
                                                min={1}
                                                max={600}/>
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
                            input: <DatePicker autoComplete="off"
                                               placeholder="请输入发布时间"/>
                        },

                        {
                            col: {span: 2},
                            input: <div></div>
                        }, {
                            col: {span: 11},
                            label: "演员",
                            id: "actorIds",
                            config: {
                                rules: [{required: true, message: '请选择演员!'}],
                            }
                            ,
                            input: <Select
                                mode="multiple"
                                optionFilterProp="children"
                                notFoundContent="无相关电影人"
                                placeholder="请选择演员"
                                style={{width: '100%'}}
                            >
                                {filmmakerOptions}
                            </Select>
                        }
                    ]


                },
                {
                    cols: [
                        {
                            col: {span: 11},
                            label: "导演",
                            id: "directorId",
                            config: {
                                rules: [{required: true, message: '请选择导演!'}],
                            }
                            ,
                            input: <Select
                                showSearch
                                optionFilterProp="children"
                                notFoundContent="无相关电影人"
                                placeholder="请选择导演"
                                style={{width: '100%'}}
                            >
                                {filmmakerOptions}
                            </Select>
                        },
                        {
                            col: {span: 2},
                            input: <div></div>
                        },
                        {
                            col: {span: 11},
                            label: "标签",
                            id: "tagIds",
                            config: {
                                rules: [{required: true, message: '请选择标签!'}],
                            }
                            ,
                            input: <Select
                                mode="multiple"
                                optionFilterProp="children"
                                notFoundContent="无相关标签"
                                placeholder="请选择标签"
                                style={{width: '100%'}}
                            >
                                {
                                    tagGroups.map(function (group, i) {
                                        // c(group);
                                        return <OptGroup key={i} label={group.name}>
                                            {
                                                group.items.map(function (tag, i) {
                                                    // c(tag);
                                                    const v = tag.id + '';
                                                    return <Option key={i} value={v}>{tag.name}</Option>;
                                                })
                                            }
                                        </OptGroup>
                                    })
                                }
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
            ref="movie_add_dialog"/>;
    }
});

export default MovieAddDialog;   //将App组件导出
