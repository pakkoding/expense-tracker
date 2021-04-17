import React, { useState, useEffect } from 'react'
import { Form, Select } from 'antd'
import PropTypes from 'prop-types'
import { _translator } from '../mixins/translator'

export default function FormSelection ({ name, onCallback, oldValue, optionList }) {
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
      validateStatus={!value && 'error'}
      help={!value && `กรุณากรอก ${_translator(name)}`}
      label={_translator(name)}>
      <Select
        onChange={selected => setValue(selected)}
        value={value}
        placeholder="กรุณาเลือก">
        {
          _.map(optionList, item => {
            return <Option value={item.value}>{item.text}</Option>
          })
        }
      </Select>
    </Form.Item>)
}

FormSelection.propTypes = {
  name: PropTypes.string,
  oldValue: PropTypes.string,
  onCallback: PropTypes.func,
  optionList: PropTypes.array
}
