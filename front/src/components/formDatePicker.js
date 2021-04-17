import React, { useState, useEffect } from 'react'
import { DatePicker, Form } from 'antd'
import PropTypes from 'prop-types'
import { _translator } from './function/translator'
import moment from 'moment'

export default function FormDatePicker ({ name, onCallback, oldValue }) {
  const DATE_FORMAT = 'YYYY-MM-DD'
  const [value, setValue] = useState(null)

  useEffect(() => {
    setValue(moment(oldValue, DATE_FORMAT))
  }, [oldValue])

  useEffect(() => {
    onCallback(name, value)
  }, [value])

  return (
    <Form.Item
      validateStatus={value === '' && 'error'}
      help={value === '' && `กรุณากรอก ${_translator(name)}`}
      label={_translator(name)}>
      <DatePicker
        style={{ width: '100%' }}
        onChange={dt => setValue(dt)}
        format={DATE_FORMAT}
        value={value} />
    </Form.Item>)
}

FormDatePicker.propTypes = {
  name: PropTypes.string,
  oldValue: PropTypes.string,
  onCallback: PropTypes.func
}
