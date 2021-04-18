import React, { useEffect, useState } from 'react'
import useMasterLayout from '../layout/UseMasterLayout'
import { useDispatch, useSelector } from 'react-redux'
import { setGroupStatementList } from '../store/actions/index'
import { Row, Col, Table, Card, Statistic, Divider, Button, List } from 'antd'
import Pie from '@ant-design/charts/lib/pie'
import {
  PlusOutlined, MinusOutlined, WalletOutlined,
  PlusSquareOutlined, ContainerOutlined, DeleteOutlined
} from '@ant-design/icons'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import Swal from 'sweetalert2'
import DataManagerModal from '../components/datamanager'
import FormDatePicker from '../components/formDatePicker'
import { _formatDatetime } from '../components/function/formatDatetime'
import { _alertMessage } from '../components/function/messenger'
import { _numberToPrice } from '../components/function/numberToPrice'
import { _translator } from '../components/function/translator'
import {
  _getGroupStatement,
  _findGroupStatementValue,
  _findGroupStatementText
} from '../components/function/getGroupStatement'
import { _findNullObject } from '../components/function/findNullObject'
import { _pieConfig } from '../components/chart/pieChart.config'
import { _sorterWithLocalCompare } from '../components/function/sorterWithLocalCompare'
import FormInputText from '../components/formInputText'

export default useMasterLayout(
  function StatementOverView () {
    const dispatch = useDispatch()
    const { statementGroupList } = useSelector(state => state.store)
    const API_URL = process.env.NEXT_PUBLIC_APP_API_ADDRESS
    const DATE_FORMAT = 'YYYY-MM-DD'
    const INIT_DATE = moment().format(DATE_FORMAT)
    const LAST_LIMIT_DATE = moment().subtract(10, 'days').format(DATE_FORMAT)
    const NUMBER_CURRENCY = 'บาท'
    const NUMBER_PRECISION = 2
    const [tableData, setTableData] = useState([])
    const [groupStatement, setGroupStatement] = useState(null)
    const [modalData, setModalData] = useState(null)
    const [modelMode, setModalMode] = useState(null)
    const [recordIndex, setRecordIndex] = useState(null)
    const [totalExpenseAmount, setTotalExpenseAmount] = useState(0)
    const [totalRevenueAmount, setTotalRevenueAmount] = useState(0)
    const [totalRemainAmount, setTotalRemainAmount] = useState(0)
    const [typeList] = useState([{ text: 'รายรับ', value: 'รายรับ' }, { text: 'รายจ่าย', value: 'รายจ่าย' }])
    const [dashboardConfig, setDashboardConfig] = useState({ start_date: INIT_DATE, end_date: INIT_DATE })
    const [pieExpense, setPieExpense] = useState(null)
    const [pieRevenue, setPieRevenue] = useState(null)
    const [isAddGroupStatement, setIsAddGroupStatement] = useState(true)
    const [groupStatementParam, setGroupStatementParam] = useState(null)
    const columns = [
      {
        title: _translator('datetime'),
        dataIndex: 'datetime',
        sorter: (a, b) => moment(a.datetime).unix() - moment(b.datetime).unix(),
        sortDirections: ['descend', 'ascend']
      },
      {
        title: _translator('name'),
        dataIndex: 'name',
        sorter: (a, b) => _sorterWithLocalCompare(a, b, 'name'),
        sortDirections: ['descend', 'ascend']
      },
      {
        title: _translator('type'),
        dataIndex: 'type',
        sorter: (a, b) => _sorterWithLocalCompare(a, b, 'type'),
        sortDirections: ['descend', 'ascend'],
        responsive: ['md']
      },
      {
        title: _translator('group'),
        dataIndex: 'group',
        sorter: (a, b) => _sorterWithLocalCompare(a, b, 'group'),
        sortDirections: ['descend', 'ascend'],
        responsive: ['md']
      },
      {
        title: _translator('amount'),
        dataIndex: 'amount',
        sorter: (a, b) => a.amount - b.amount,
        sortDirections: ['descend', 'ascend']
      }
    ]

    useEffect(async () => {
      await getStatement()
      await getGroupStatement()
    }, [])

    useEffect(() => {
      if (!groupStatementParam) {
        setIsAddGroupStatement(true)
      }
    }, [groupStatementParam])

    useEffect(() => {
      if (tableData && Array.isArray(tableData) && tableData.length > 0) {
        searchDashboard()
      }
    }, [tableData])

    async function getGroupStatement () {
      const groupStatementData = await _getGroupStatement()
      if (groupStatementData) {
        dispatch(setGroupStatementList(groupStatementData))
        setGroupStatement(groupStatementData)
      }
    }

    function searchDashboard () {
      const revenue = manageDashboard('รายรับ')
      const expense = manageDashboard('รายจ่าย')
      if (revenue) setPieRevenue(revenue)
      if (expense) setPieExpense(expense)
    }

    function getStatement () {
      axios.get(`${API_URL}/app/statement/`).then(resp => {
        if (resp?.data) {
          computeStatement(resp.data)
        }
      }).catch(error => {
        _alertMessage('error', 'เกิดข้อผิดพลาด', error)
      })
    }

    function computeStatement (data) {
      let totalRevenue = 0
      let totalExpense = 0
      const result = _.map(data, item => {
        item.datetime = _formatDatetime(item.datetime)
        item.key = item.id
        if (item.type === 'รายรับ') {
          totalRevenue = totalRevenue + parseFloat(item.amount)
        } else if (item.type === 'รายจ่าย') {
          totalExpense = totalExpense + parseFloat(item.amount)
        }
        return item
      })
      setTotalRevenueAmount(totalRevenue)
      setTotalExpenseAmount(totalExpense)
      setTotalRemainAmount(totalRevenue - totalExpense)
      setTableData(result)
    }

    function useModal (mode, item, recordIdx) {
      setModalData({ ...item })
      setModalMode(mode)
      setRecordIndex(recordIdx)
    }

    function saveEditData (credential = null) {
      if (credential) {
        credential.group = _findGroupStatementValue(credential.group, groupStatement)
        axios.patch(`${API_URL}/app/statement/${credential.id}/`, credential).then(resp => {
          let data = tableData
          resp.data.group = _findGroupStatementText(resp.data.group, groupStatement)
          data[recordIndex] = resp.data
          computeStatement(data)
          _alertMessage('success', 'แก้ไขสำเร็จ')
        }).catch(error => {
          _alertMessage('error', 'เกิดข้อผิดพลาด', error)
        }).finally(() => {
          resetState()
        })
      }
    }

    function resetState () {
      setModalData(null)
      setModalMode(null)
      setRecordIndex(null)
    }

    function addItem () {
      const initData = {
        amount: null,
        datetime: moment(),
        group: null,
        name: null,
        type: null
      }
      setModalMode('add')
      setModalData({ ...initData })
    }

    function createStatement (credential) {
      axios.post(`${API_URL}/app/statement/`, credential).then(resp => {
        _alertMessage('success', 'เพิ่มรายการสำเร็จ')
        resetState()
        getStatement()
      }).catch(error => {
        _alertMessage('error', 'เกิดข้อผิดพลาด', error)
      })
    }

    function deleteStatement (credential) {
      Swal.fire({
        icon: 'info',
        title: 'คุณต้องการลบรายการนี้ใช่ไหม?',
        showCancelButton: true,
        confirmButtonText: 'ใช่',
        denyButtonText: 'ยกเลิก',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${API_URL}/app/statement/${credential.id}`).then(resp => {
            _alertMessage('success', 'ลบสำเร็จ')
            resetState()
            getStatement()
          }).catch(error => {
            _alertMessage('error', 'เกิดข้อผิดพลาด', error)
          })
        }
      })
    }

    function changeDashboardConfig (key, date) {
      setDashboardConfig(obj => ({ ...obj, [key]: date }))
    }

    function manageDashboard (type = null) {
      const nullObj = _findNullObject(dashboardConfig)
      const { start_date, end_date } = dashboardConfig
      if (nullObj !== 0) {
        _alertMessage('warning', 'ไม่สามารถเรียกดูกราฟได้', 'กรุณาใส่วันที่ให้ครบถ้วน')
      } else {
        const dashboardFilter = _.filter(tableData, item =>
          _formatDatetime(item.datetime, DATE_FORMAT) <= _formatDatetime(end_date, DATE_FORMAT) &&
          _formatDatetime(item.datetime, DATE_FORMAT) >= _formatDatetime(start_date, DATE_FORMAT) &&
          item.type === type
        )
        const dashboardGroupBy = _.groupBy(dashboardFilter, 'group')
        const dashboardData = _.map(dashboardGroupBy, item => {
          const sumTotal = _.reduce(item, function (sum, item) {
            return sum + parseFloat(item.amount)
          }, 0)
          return {
            type: item[0].group,
            value: sumTotal
          }
        })
        return dashboardData
      }
    }

    function ChangeTextGroupStatement (name, value) {
      setGroupStatementParam({ ...groupStatementParam, name: value })
    }

    async function manageGroupStatement (id = null, text) {
      if (isAddGroupStatement) {
        await addGroupStatement()
      } else {
        await editGroupStatement()
      }
    }

    async function changeGroupStatementMode (id = null, text) {
      setIsAddGroupStatement(false)
      setGroupStatementParam({ name: text, id: id })
    }

    async function editGroupStatement () {
      axios.patch(`${API_URL}/app/statement/group/${groupStatementParam.id}/`, groupStatementParam).then(() => {
        getGroupStatement()
        resetGroupStatement()
        _alertMessage('success', 'แก้ไขหมวดหมู่สำเร็จ')
      }).catch(error => {
        _alertMessage('error', 'เกิดข้อผิดพลาด', error)
      })
    }

    async function addGroupStatement () {
      if (groupStatementParam?.name) {
        axios.post(`${API_URL}/app/statement/group/`, groupStatementParam).then(() => {
          getGroupStatement()
          resetGroupStatement()
          _alertMessage('success', 'เพิ่มหมวดหมู่สำเร็จ', `เพิ่มหมวดหมู่ ${groupStatementParam.name} แล้ว`)
        }).catch(error => {
          _alertMessage('error', 'เกิดข้อผิดพลาด', error)
        })
      }
    }

    function resetGroupStatement () {
      setGroupStatementParam(null)
      setIsAddGroupStatement(true)
    }

    function deleteGroupStatement (idx) {
      Swal.fire({
        icon: 'info',
        title: 'คุณต้องการลบหมวดหมู่นี้ใช่ไหม?',
        text: 'รายการที่คุณใช้อยู่ในกลุ่มนี้จะถูกรีเซ็ทเป็นค่าว่าง',
        showCancelButton: true,
        confirmButtonText: 'ใช่',
        denyButtonText: 'ยกเลิก',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          axios.delete(`${API_URL}/app/statement/group/${idx}`).then(() => {
            getGroupStatement()
            resetGroupStatement()
            _alertMessage('success', 'ลบสำเร็จ')
          }).catch(error => {
            _alertMessage('error', 'เกิดข้อผิดพลาด', error)
          })
        }
      })
    }

    return (<div className={'container'}>
      <Row gutter={[16, 16]}
           justify="end">
        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="รายรับ"
              value={_numberToPrice(totalRevenueAmount)}
              precision={NUMBER_PRECISION}
              valueStyle={{ color: '#3f8600' }}
              prefix={<PlusOutlined />}
              suffix={NUMBER_CURRENCY}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="รายจ่าย"
              value={_numberToPrice(totalExpenseAmount)}
              precision={NUMBER_PRECISION}
              valueStyle={{ color: '#cf1322' }}
              prefix={<MinusOutlined />}
              suffix={NUMBER_CURRENCY}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card>
            <Statistic
              title="คงเหลือ"
              value={_numberToPrice(totalRemainAmount)}
              precision={NUMBER_PRECISION}
              prefix={<WalletOutlined />}
              suffix={NUMBER_CURRENCY}
            />
          </Card>
        </Col>
      </Row>
      <Divider orientation="left">รายการ</Divider>
      <Button type="primary"
              className={'btn-add'}
              icon={<PlusSquareOutlined />}
              onClick={e => addItem()}>
        เพิ่มรายการ
      </Button>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            onRow={(record, recordIdx) => {
              return {
                onClick: () => { useModal('edit', record, recordIdx) }
              }
            }}
          />
        </Col>
      </Row>
      <Divider orientation="left" style={{ marginTop: '50px' }}>กราฟ</Divider>
      <Row style={{ margin: '20px 0' }}>
        <Col xs={24} md={4} className={'mx-1'}>
          <label>{_translator('start_date')}</label>
          <FormDatePicker
            name={'start_date'}
            isHideName
            oldValue={LAST_LIMIT_DATE}
            onCallback={changeDashboardConfig} />
        </Col>
        <Col xs={24} md={4} className={'mx-1'}>
          <label>{_translator('end_date')}</label>
          <FormDatePicker
            name={'end_date'}
            isHideName
            oldValue={INIT_DATE}
            onCallback={changeDashboardConfig} />
        </Col>
        <Col xs={24} md={2}
             className={'mx-1'}
             style={{
                    transform: 'translateY(-3%)',
                    alignSelf: 'center'
              }}>
          <Button type="primary"
                  onClick={e => searchDashboard()}>เรียกดู</Button>
        </Col>
      </Row>
      <Row style={{ margin: '30px 0' }}
           justify={'center'}>
        <Col md={10} xs={24}>
          {pieRevenue && <Pie {..._pieConfig('รายรับ')} data={pieRevenue} />}
        </Col>
        <Col md={10} xs={24} key={'12'}>
          {pieExpense && <Pie {..._pieConfig('รายจ่าย')} data={pieExpense} />}
        </Col>
      </Row>
      <DataManagerModal
        title={'จัดการข้อมูล'}
        item={modalData}
        mode={modelMode}
        onCallbackEdit={saveEditData}
        onCallbackAdd={createStatement}
        onCallbackDelete={deleteStatement}
        selectionList={{ 'group': statementGroupList, 'type': typeList }}
        field={['name', 'group', 'type', 'amount', 'datetime']}>
        <Card size="small"
              title="หมวดหมู่"
              style={{
                width: 300,
                alignSelf: 'center',
                marginLeft: 'auto',
                marginBottom: '40px'
              }}>
          <Row justify={'center'}>
            <Col span={18}>
              <FormInputText onCallback={ChangeTextGroupStatement} oldValue={groupStatementParam?.name || null} />
            </Col>
            <Col span={6}>
              <Button
                onClick={e => manageGroupStatement()}
                style={{
                  background: `${isAddGroupStatement ? 'green' : 'blue'}`,
                  color: 'white',
                  border: 'none'
                }}>
                {isAddGroupStatement ? 'เพิ่ม' : 'แก้ไข'}
              </Button>
              {!isAddGroupStatement && <small
                className={'clickable'}
                style={{
                  position: 'absolute',
                  right: '50%',
                  bottom: '0',
                  transform: 'translateX(30%)'
                }}
                onClick={e => resetGroupStatement()}><u>ยกเลิก</u></small>}
            </Col>
          </Row>
          <List
            size="small"
            dataSource={groupStatement}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<ContainerOutlined />}
                  onClick={e => changeGroupStatementMode(item.value, item.text)}
                  title={<div>{item.text}
                    <Button
                      color={'red'}
                      style={{ float: 'right', color: '#ef6e6c', border: 'none' }}
                      size={'small'}
                      onClick={e => deleteGroupStatement(item.value)}>
                      <DeleteOutlined />
                    </Button>
                  </div>}
                />
              </List.Item>
            )}
          />
        </Card>
      </DataManagerModal>
    </div>)
  }
)
