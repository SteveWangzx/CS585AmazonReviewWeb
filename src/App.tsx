import React, { useEffect, useRef } from 'react';
import { createIntl, ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ActionType, ProColumnType } from '@ant-design/pro-table';
import enUSIntl from 'antd/lib/locale/en_US';
import ReviewsServices from '../src/services/ReviewsServices'
import {
  Button,
  ConfigProvider,
  Space,
  Modal,
  Drawer,
  Form,
  Input,
  message,
  Layout,
  Menu
} from 'antd';

const intlMap = {
  enUSIntl,
};

type recordsType = {
  productTitle: string,
  productId: string,
  productCategory: string,
  averageReviewScore: Number,
  helpfulVotes: Number
}

const { Header, Content, Footer } = Layout;


function App() {

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<recordsType>[] = [
    {
      title: 'Product Title',
      dataIndex: 'productTitle',
      search: false,
      ellipsis: true,
      width: 100,
    },
    {
      title: 'Product ID',
      dataIndex: 'productId',
      search: false,
      width: 50,
    },
    {
      title: 'Product Category',
      dataIndex: 'productCategory',
      width: 50,
    },
    {
      title: 'Average Score',
      dataIndex: 'averageReviewScore',
      width: 30,
    },
    {
      title: 'Percentage of helpful votes',
      dataIndex: 'helpfulVotes',
      search: false,
      width: 30,
    }
  ];
  return (
    <Layout>
      <Header className='header'>
        <div className="logo" />
        <div style={{
          color: '#fff',
          fontSize: '100%',
        }}><h1>Amazon Reviews Analysis</h1></div>
      </Header>
      <Content>
      <div>
        <ConfigProvider locale={intlMap.enUSIntl}>
          <ProTable<recordsType>
            columns={columns}
            actionRef={actionRef}
            headerTitle="Amazon Reviews"
            search={{
              labelWidth: 'auto',
            }}
            pagination={{
              showSizeChanger: true,
              defaultCurrent: 1,
              defaultPageSize: 7,
              showQuickJumper: true
            }}
            request={async (params, sort) => {
              const res = await ReviewsServices.getReviews(params)
              const data = res.data
              return {
                data: data.datas,
                success: true,
                total: data.total
              }
            }}
          />
        </ConfigProvider>
        </div>
        </Content>
      <Footer style={{ textAlign: 'center' }}>CS585 Final Project Created by Zhixiang Wang, Yibo Teng</Footer>
    </Layout>
  );
}

export default App;
