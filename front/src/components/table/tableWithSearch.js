import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export default function TableWithSearch ({
  columns, dataSource, callBackData = null, onCallBack
  , pagination, rowClassName, canSearchColumn = false
}) {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [usedColumns, setUsedColumns] = useState([])

  useEffect(() => {
    if (canSearchColumn && columns) {
      const newColumns = _.map(columns, item => {
        return {
          ...item,
          ...getColumnSearchProps(item.dataIndex)
        }
      })
      setUsedColumns(newColumns)
    } else {
      setUsedColumns(columns)
    }
  }, [columns])

  function getColumnSearchProps (dataIndex) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearchColumn(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button onClick={() => handleResetSearchColumn(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="primary"
              onClick={() => handleSearchColumn(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : ''
    }
  }
  function handleSearchColumn (selectedKeys, confirm, dataIndex) {
    confirm()
    setSearchedColumn(dataIndex)
    setSearchText(selectedKeys[0])
  }

  function handleResetSearchColumn (clearFilters) {
    clearFilters()
    setSearchText('')
  }

  function handleClick (record, recordIdx) {
    onCallBack(record, recordIdx, callBackData)
  }

  return (
    <Table
        columns={usedColumns}
        dataSource={dataSource}
        pagination={pagination}
        rowClassName={(record, idx) => rowClassName}
        onRow={(record, recordIdx) => {
          return {
            onClick: () => { handleClick(record, recordIdx) }
          }
        }}
      />
  )
}

TableWithSearch.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  callBackData: PropTypes.string,
  onCallBack: PropTypes.func,
  pagination: PropTypes.bool,
  rowClassName: PropTypes.string,
  canSearchColumn: PropTypes.bool
}
