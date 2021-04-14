import React from 'react'
import styles from '../styles/Home.module.css'
import { Button } from 'antd'
import UseMasterLayout from '../layout/UseMasterLayout'

export default UseMasterLayout(function Home () {
  return (
    <div className={styles.container}>
      <p>test page</p>
      <p>{process.env.NEXT_PUBLIC_APP_API_ADDRESS}</p>
      <Button type="dashed">Dashed Button</Button>
    </div>
  )
})
