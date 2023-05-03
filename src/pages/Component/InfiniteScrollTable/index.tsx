import { useInfiniteScroll } from "ahooks";
import { Alert, Table, TableProps } from "antd";
import React from "react";
import service, { DataType } from "./service";

const columns: Required<TableProps<DataType>>["columns"] = [
  {
    title: "No.",
    dataIndex: "index",
    width: 80,
    render: (_value, _record, index) => index + 1,
  },
  { title: "picture", dataIndex: ["picture", "thumbnail"], width: 120, render: (text) => <img src={text} /> },
  {
    title: "name",
    dataIndex: "name",
    width: 200,
    ellipsis: true,
    render: (value) => `${value.title}-${value.first}-${value.last}`,
  },
  { title: "gender", dataIndex: "gender", width: 120 },
  { title: "phone", dataIndex: "phone", width: 180 },
  { title: "nat", dataIndex: "nat", width: 100 },
  { title: "email", dataIndex: "email", width: 300 },
  {
    title: "registered date",
    dataIndex: ["registered", "date"],
    width: 240,
  },
];

const InfiniteScrollTable: React.FC = () => {
  const { data = { list: [] }, loading } = useInfiniteScroll(service, {
    target: () => document.getElementsByClassName("ant-table-body")[0],
    isNoMore: () => false,
    threshold: 0,
  });

  return (
    <div className="page-container">
      <Alert
        message="使用 ahooks 中的 useInfiniteScroll 对表格的 ant-table-body 进行监听，从而达到滚动加载目的"
        style={{ marginBottom: 20 }}
      />
      <Table
        rowKey="phone"
        columns={columns}
        dataSource={data.list}
        loading={loading}
        pagination={false}
        scroll={{ y: "75vh" }}
      />
    </div>
  );
};

export default InfiniteScrollTable;
