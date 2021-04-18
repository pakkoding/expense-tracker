import React, { useState, useEffect } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import { _translator } from './function/translator'

export default function FormInputText ({ name, onCallback, oldValue, type = 'text' }) {
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
      help={value === '' && `กรุณากรอก ${_translator(name)}`}
      label={_translator(name)}>
      <Input value={value} onChange={e => setValue(e.target.value)} type={type} />
    </Form.Item>)
}

FormInputText.propTypes = {
  name: PropTypes.string,
  oldValue: PropTypes.string,
  onCallback: PropTypes.func,
  type: PropTypes.string
}
