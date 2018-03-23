import React from "react";
import {Button, DatePicker, Icon, InputNumber, Input, Layout, Menu, message, Select, Table, Upload} from "antd";
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


var MovieEditDialog = React.createClass({
    getInitialState(){
        return {
            width: 600,
            title: "修改电影信息",
            editMovieUrl: "/movie/info",
            getFilmmakersUrl: "/filmmaker/info/list",
            getActorIdsUrl: "/filmmaker/id/list/",//   ---/filmmaker/id/{movieId}
            getTagGroupsUrl: "/tagGroup/list",
            tipOfEditing: '正在保存电影修改',
            filmmakers: [],
            actorIds: [],
            tagGroups: []
        };
    },
    updateFilmmakers(filmmakers){
        this.setState({filmmakers: filmmakers});
    },
    updateActorIds(actorIds){
        this.setState({actorIds: actorIds});
    },
    updateTagGroups(tagGroups){
        this.setState({tagGroups: tagGroups});
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
    loadActorIdsData (movieId) {
        const {getActorIdsUrl} = this.state;
        ajax.get({
            url: getActorIdsUrl + movieId,
            success: function (result) {

                this.updateActorIds(result.data.list)

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            }.bind(this),
            complete: function () {

            }.bind(this)
        });
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
    showDialog(record){

        this.getMovieEditDialog().showDialog();

        this.loadFilmmakerData();

        this.loadTagGroupsData();

        this.loadActorIdsData(record.id);

    },
    getMovieEditDialog(){
        return this.refs.movie_edit_dialog;
    },
    handleSubmit(values){
        const {editMovieUrl, tipOfEditing} = this.state;
        const hideMessage = message.loading(tipOfEditing, 0);
        var filterValues = function (values) {
            values.releaseTime = timeFormatter.long2Int(new Date(values.releaseTime._d).getTime());
            values.actorIds = values.actorIds.join(",");
            values.tagIds = values.tagIds.join(",");
            return values;
        }
        values = filterValues(values);
        // c(values);
        ajax.put({
            url: editMovieUrl,
            data: values,
            success: function (result) {
                const {onEditSuccess} = this.props;


                message.success(result.msg);
                this.getMovieEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.movie) : undefined;


                //clear form
                // this.getMovieEditDialog().clearForm();
            }.bind(this),
            failure: function (result) {
                message.error(result.msg);

            },
            complete: function () {
                hideMessage();
                this.getMovieEditDialog().formLeaveLoading();
            }.bind(this)
        });

    },
    handleCancel(){
        this.getMovieEditDialog().clearForm();//!!防止触发reuqired后在关闭的bug
        c("handleCancel");
    },
    componentDidMount(){

    },
    render(){

        var {echoData} = this.props;

        const {title, width, filmmakers, actorIds, tagGroups} = this.state;

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
            if (!isUndefined(echoData.releaseTime)) {
                echoData.releaseTime = moment(timeFormatter.int2Long(echoData.releaseTime));

            }
            return echoData;
        }
        echoData = filterEchoData(echoData);


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
                            id: "name",
                            config: {
                                initialValue: echoData.name,
                                rules: [{required: true, message: '请输入电影名称!'}],

                            }
                            ,
                            input: <Input placeholder="请输入电影名称" name="name"/>
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
                                {commons.getStatusOptions()}
                            </Select>
                        }
                    ]

                },
                {
                    cols: [


                        {
                            col: {span: 7},
                            label: "别名",
                            id: "alias",
                            config: {
                                initialValue: echoData.alias,
                                rules: [{required: true, whitespace: true, message: '请输入别名!'}],
                            },
                            input: <Input name="alias"
                                          autoComplete="off"
                                          placeholder="别名"/>
                        },

                        {
                            col: {span: 1},
                            input: <div></div>
                        },
                        {
                            col: {span: 7},
                            label: "发布时间",
                            id: "releaseTime",
                            config: {
                                initialValue: echoData.releaseTime,
                                rules: [{type: 'object', required: true, whitespace: true, message: '请输入发布时间!'}],
                            }
                            ,
                            input: <DatePicker name="releaseTime"
                                               style={{
                                                   width: "100%"
                                               }}
                                               autoComplete="off"
                                               placeholder="请输入发布时间"/>
                        },

                        {
                            col: {span: 1},
                            input: <div></div>
                        },
                        {
                            col: {span: 7},
                            label: "评分",
                            id: "ignore_score",
                            config: {
                                initialValue: echoData.score,
                            }
                            ,
                            input: <Input name="ignore_score"
                                          autoComplete="off"
                                          disabled={true}/>
                        }
                    ]


                },
                {
                    cols: [
                        {
                            col: {span: 7},
                            label: "观看数",
                            id: "ignore_watchNum",
                            config: {
                                initialValue: echoData.watchNum,
                            }
                            ,
                            input: <Input disabled={true}/>
                        }
                        ,
                        {
                            col: {span: 1},
                            input: <div></div>
                        },
                        {
                            col: {span: 7},
                            label: "电影时长(分钟)",
                            id: "movieTime",
                            config: {
                                initialValue: echoData.movieTime,
                                rules: [{required: true, message: '请输入电影时长!'}],
                            }
                            ,
                            input: <InputNumber autoComplete="off"
                                                style={{width: '100%'}}
                                                placeholder="请输入电影时长"
                                                min={1}
                                                max={600}/>
                        },
                        {
                            col: {
                                span: 1
                            }
                            ,
                            input: <div></div>
                        }
                        ,
                        {
                            col: {
                                span: 7
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
                            col: {span: 7},
                            label: "最后更新时间",
                            id: "ignore_updateTime",
                            config: {
                                initialValue: echoData.updateTime,
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
                            label: "导演",
                            id: "directorId",
                            config: {
                                initialValue: echoData.directorId,
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
                        }
                    ]


                }
                ,
                {
                    cols: [

                        {
                            col: {span: 11},
                            label: "演员",
                            id: "actorIds",
                            config: {
                                initialValue: commons.toStrArr(actorIds),
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
                                // initialValue: commons.toStrArr(actorIds),
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
                                                    return <Option key={i} value={tag.id}>{tag.name}</Option>;
                                                })
                                            }
                                        </OptGroup>
                                    })
                                }
                            </Select>
                        },

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

export default MovieEditDialog;   //将App组件导出
