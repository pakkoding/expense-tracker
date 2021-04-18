import React from 'react'
import Head from 'next/head'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BarChartOutlined,
  ContainerOutlined,
  UserOutlined
} from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'

function useMasterLayout (AnyContent) {
  class Master extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        collapsed: true
      }
    }

    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed
      })
    }

    render () {
      const { Header, Content, Sider } = Layout
      return (
        <Layout>
          <Head>
            <title>Expense Tracker</title>
            <link rel="icon" href="/icons/expense-tracker.png" />
          </Head>
          <Sider trigger={null} collapsedWidth={0} collapsible collapsed={this.state.collapsed}>
            <div className={'mt-1 text-center'}>
              <Image src="/icons/expense-tracker.png"
                     alt="expense-tracker-icon"
                     width="180px"
                     height="40px" />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['statement']}>
              <Menu.Item key="statement" icon={<ContainerOutlined />}>
                <Link href="/">Statement</Link>
              </Menu.Item>
              <Menu.Item key="login" icon={<UserOutlined />}>
                <Link href="/">Login</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header id="hamburger-menu"
                    className="site-layout-background"
                    style={{ padding: 0 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle
              })}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280
              }}
            >
              <AnyContent {...this.props} {...this.state} />
            </Content>
          </Layout>
        </Layout>)
    }
  }

  return Master
}

export default useMasterLayout
