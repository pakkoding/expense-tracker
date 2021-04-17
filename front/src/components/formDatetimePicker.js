import React, { useState, useEffect } from 'react'
import { DatePicker, Form } from 'antd'
import PropTypes from 'prop-types'
import { _translator } from '../mixins/translator'
import moment from 'moment'

export default function FormDatetimePicker ({ name, onCallback, oldValue }) {
  const DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss'
  const [value, setValue] = useState(null)

  useEffect(() => {
    setValue(moment(oldValue, DATE_FORMAT))
  }, [oldValue])

  useEffect(() => {
    onCallback(name, value)
  }, [value])

  return (
    <Form.Item
      validateStatus={!value && 'error'}
      help={!value && `กรุณากรอก ${_translator(name)}`}
      label={_translator(name)}>
      <DatePicker
        style={{ width: '100%' }}
        onChange={dt => setValue(dt)}
        showTime
        format={'YYYY-MM-DD hh:mm:ss'}
        value={value} />
    </Form.Item>)
}

FormDatetimePicker.propTypes = {
  name: PropTypes.string,
  oldValue: PropTypes.string,
  onCallback: PropTypes.func
}
