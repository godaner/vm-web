import React from "react";
import {Button, Icon, Input, Layout, Menu, message, Select, Table} from "antd";
import {withRouter} from "react-router-dom";
import "antd/dist/antd.css";
import "../base/events_dispatcher";
import "../../scss/admin/admin_login_logs_table.scss";
import {ajax, commons} from "../base/vm_util";
const Option = Select.Option;
const {Header, Content, Footer, Slider} = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const TextArea = Input.TextArea;
var AdminLoginLogsTable = React.createClass({
    getInitialState: function () {

        return {
            adminEditDialog: {
                echoData: undefined
            },
            adminLoginLogsTable: {
                title: '管理员登录日志列表',
                dataSourceUrl: "/admin/login/logs/info/list",
                editable: false,
                haveSearchAdminname: false,
                adminnameDropdownVisible: false,
                bordered: false,
                tableLoading: false,
                refreshBtnLoading: false,
                data: [],//displayData
                originalData: [],
                page: {
                    start: 0,
                    size: 5,
                    orderBy: "",
                    orderType: "",
                    total: 0
                },
                query: {
                    adminname: "",
                    adminId: null
                },
                columns: [],
                deletingTip: "正在删除"
            }
        }
    },
    updateAdminIdOfQuery(adminId){
        var state = this.state;
        state.adminLoginLogsTable.query.adminId = adminId;
        this.setState(state);
    },
    loadDataByAdminId(adminId){
        this.updateAdminIdOfQuery(adminId);
        this.loadAdminLoginLogsTableData();
    },
    onSearchAdminname(adminname)
    {
        this.updateAdminnameOfQuery(adminname);
        if (!isEmptyString(this.state.adminLoginLogsTable.query.adminname)) {
            this.updateHaveSearchAdminname(true);
        } else {

            this.updateHaveSearchAdminname(false);
        }
        this.loadAdminLoginLogsTableData();
    },
    updateHaveSearchAdminname(haveSearchAdminname)
    {
        var state = this.state;
        state.adminLoginLogsTable.haveSearchAdminname = haveSearchAdminname;
        this.setState(state);
    },
    updateAdminnameOfQuery(adminname)
    {
        var state = this.state;
        state.adminLoginLogsTable.query.adminname = adminname;
        this.setState(state);
    },
    updateAdminLoginLogsTableData(data)
    {
        var state = this.state;
        state.adminLoginLogsTable.data = data;
        this.setState(state);
    },
    updateAdminLoginLogsTableRefreshBtnLoading(loading)
    {
        var state = this.state;
        state.adminLoginLogsTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateAdminLoginLogsTablePage(page)
    {
        var state = this.state;
        state.adminLoginLogsTable.page = page;
        this.setState(state);
    },
    updateAdminLoginLogsTableQuery(query)
    {
        var state = this.state;
        state.adminLoginLogsTable.query = query;
        this.setState(state);
    },
    updateAdminLoginLogsTableLoading(flag)
    {
        var state = this.state;
        state.adminLoginLogsTable.tableLoading = flag;
        this.setState(state);
    },
    updateAdminLoginLogsTableColumns(columns)
    {

        var state = this.state;
        state.adminLoginLogsTable.columns = columns;
        this.setState(state);
    },
    updateAdminLoginLogsTableOriginalData(originalData){
        var state = this.state;
        state.adminLoginLogsTable.originalData = originalData;
        this.setState(state);
    },
    componentDidMount()
    {
        // "id":4,
        //     "status":1,
        //     "createTime":1520845823,
        //     "updateTime":1520845823,
        //     "isDeleted":2,
        //     "adminId":41,
        //     "loginIp":"171.221.142.90",
        //     "system":"Windows 7",
        //     "dpi":"1920*1080",
        //     "brower":"chrome 62.0.3202.94",
        //     "country":"中国",
        //     "province":"四川",
        //     "city":"成都",
        //     "loginTime":1520845823,
        //     "result":1
        const {query, haveSearchAdminname} = this.state.adminLoginLogsTable;
        this.updateAdminLoginLogsTableColumns([
            {
                title: 'id',
                width: 100,
                dataIndex: 'id',
                sorter: true
            },
            // {
            //     title: '用户id',
            //     width: 100,
            //     dataIndex: 'admin_id',
            //     sorter: true
            // },
            {
                title: '用户名',
                width: 100,
                dataIndex: 'adminname',
                render: (text, record) => {
                    if (isUndefined(text)) {
                        return "未知";
                    }
                    return commons.highLight(text, query.adminname);
                },
                sorter: true,
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Search
                            placeholder="搜索用户名"
                            onSearch={this.onSearchAdminname}
                            style={{width: 200}}
                        />
                    </div>
                ),
                filterIcon: <Icon type="search"
                                  style={{color: haveSearchAdminname ? '#108ee9' : '#aaa'}}/>,
                // filterDropdownVisible: this.state.adminTable.adminnameDropdownVisible,

            },
            {
                title: '登录ip',
                width: 100,
                dataIndex: 'login_ip',
                sorter: true
            },
            {
                title: '操作系统',
                width: 100,
                dataIndex: 'system',
                sorter: true
            },

            {
                title: '分辨率',
                width: 100,
                dataIndex: 'dpi',
                sorter: true
            },

            {
                title: '浏览器',
                width: 100,
                dataIndex: 'brower',
                sorter: true
            },

            {
                title: '国家',
                width: 100,
                dataIndex: 'country',
                sorter: true
            },

            {
                title: '省份',
                width: 100,
                dataIndex: 'province',
                sorter: true
            },

            {
                title: '城市',
                width: 100,
                dataIndex: 'city',
                sorter: true
            },

            {
                title: '登陆时间',
                width: 100,
                dataIndex: 'login_time',
                render: (text) => {
                    return timeFormatter.formatTime(text * 1000);
                },
                sorter: true
            },


        ]);

        // this.loadAdminLoginLogsTableData();
        // 外部执行加载数据
    },

    handleTableChange(pagination, filters, sorter)
    {

        const page = this.state.adminLoginLogsTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateAdminLoginLogsTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadAdminLoginLogsTableData();
    },
    adminLoginLogsTableDataFiledsConverter(originalData){
        const data = [];
        $.each(originalData, function (i, item) {


            data.push({
                key: i,
                id: item.id,
                adminname: item.adminname,
                create_time: item.createTime,
                update_time: item.updateTime,
                admin_id: item.adminId,
                login_ip: item.loginIp,
                system: item.system,
                dpi: item.dpi,
                brower: item.brower,
                country: item.country,
                province: item.province,
                city: item.city,
                login_time: item.loginTime,
                result: item.result,
            });
        }.bind(this));
        return data;
    },
    loadAdminLoginLogsTableData()
    {
        this.updateAdminLoginLogsTableLoading(true);
        this.updateAdminLoginLogsTableRefreshBtnLoading(true);
        const {page, query} = this.state.adminLoginLogsTable;
        //filter
        var orderType = page.orderType;
        if (orderType == "descend") {
            orderType = "desc";
        }
        if (orderType == "ascend") {
            orderType = "asc";
        }
        page.orderType = orderType;

        //ajax
        ajax.get({
            url: this.state.adminLoginLogsTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.adminLoginLogsTableDataFiledsConverter(originalData)
                //save data

                this.updateAdminLoginLogsTableOriginalData(originalData);

                this.updateAdminLoginLogsTableData(data);

                var page = this.state.adminLoginLogsTable.page;
                this.updateAdminLoginLogsTablePage({
                    start: page.start,
                    size: page.size,
                    orderBy: page.orderBy,
                    orderType: page.orderType,
                    total: result.data.total
                });

            }.bind(this),
            failure: function (result) {
                message.error(result.msg);
            }.bind(this),
            error: function () {

            }.bind(this),
            complete: function () {
                this.updateAdminLoginLogsTableLoading(false);
                this.updateAdminLoginLogsTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    render: function () {

        var {title, columns, data, page, tableLoading, refreshBtnLoading, bordered} = this.state.adminLoginLogsTable;


        //set now page's props
        return (
            <div id="admin_login_logs_table">
                <div style={{marginBottom: 16}}>
                    <Button
                        loading={refreshBtnLoading}
                        onClick={this.loadAdminLoginLogsTableData}
                    >
                        刷新
                    </Button>
                </div>
                <Table
                    locale={{emptyText: "暂无用户数据"}}
                    columns={columns}
                    dataSource={data}
                    pagination={
                        {
                            total: page.total,
                            showTotal: (total, range) => {
                                return `第 ${range[0]}-${range[1]} 条记录 , 共 ${total} 条记录`;
                            },
                            pageSize: page.size,
                            defaultCurrent: 1
                        }
                    }
                    loading={tableLoading}
                    onChange={this.handleTableChange}
                    bordered={bordered}
                    title={() => title}
                    // footer={() => 'Footer'}
                    scroll={{x: "100%", y: "100%"}}/>


            </div>
        );
    }
});


export default AdminLoginLogsTable;   //将App组件导出
