import React, { useState, useEffect } from 'react'
import { Form, Select } from 'antd'
import PropTypes from 'prop-types'
import { _translator } from './function/translator'
import { useSelector } from 'react-redux'

export default function DropDownStatementGroup ({ name, onCallback, oldValue }) {
  const { statementGroupList } = useSelector(state => state.store)
  const { Option } = Select
  const [value, setValue] = useState(null)

  useEffect(() => {
    setValue(oldValue)
  }, [oldValue])

  useEffect(() => {
    onCallback(name, value)
  }, [value])

  return (
    <Form.Item
      validateStatus={value === '' && 'error'}
      help={value === '' && `กรุณากรอก ${_translator('group')}`}
      label={_translator('group')}>
      <Select
        onChange={selected => setValue(selected)}
        value={value}
        placeholder="กรุณาเลือก">
        {
          _.map(statementGroupList, (item, idx) => {
            return <Option key={idx} value={item.value}>{item.text}</Option>
          })
        }
      </Select>
    </Form.Item>)
}

DropDownStatementGroup.propTypes = {
  name: PropTypes.string,
  oldValue: PropTypes.string,
  onCallback: PropTypes.func
}
