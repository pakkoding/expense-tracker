import React, { useEffect } from 'react'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { Card, Input, Form, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { signIn } from '../store/actions/auth'
import { useRouter } from 'next/router'

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}

export default function Login () {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loggedIn } = useSelector(state => state.auth)

  const onFinish = (formValues) => {
    dispatch(signIn(formValues.username, formValues.password))
  }

  useEffect(() => {
    if (loggedIn) {
      router.push('/home')
    }
  }, [loggedIn])

  return (
    <div className={styles.container}>
      <Head>
        <title>Expense Tracker Login</title>
        <link rel="icon" href="/icons/expense-tracker.png" />
      </Head>

      <main className={styles.main}>
        <div className="site-card-border-less-wrapper">
          <Image className={styles.logo} src={'/icons/expense-tracker.png'} width={100} height={20} />
          <Card title="Login" bordered style={{ width: 300 }}>
            <Form name="login-form"
                  onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  name="ipt-username"
                  autoComplete={false}
                  placeholder="username"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input name="ipt-password"
                       autoComplete={false}
                       type="password"
                       placeholder="password"
                       prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </main>
    </div>
  )
}
