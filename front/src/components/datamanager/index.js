import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import FormInputText from '../formInputText'
import FormDatetimePicker from '../formDatetimePicker'
import FormSelection from '../formSelection'
import { _isSelectionList } from '../../mixins/selectionList'

export default function DataManagerModal ({ title, item, mode, onCallbackEdit, onCallbackAdd, onCallbackDelete, selectionList }) {
  const [visible, setVisible] = useState(false)
  const [allInputs, setAllInputs] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    if (item) {
      const skipFields = new Set(['id', 'key'])
      const results = []
      _.each(item, (val, key) => {
        let type = null
        if (!skipFields.has(key.toLowerCase())) {
          if (_.includes(key, 'date')) {
            type = (<FormDatetimePicker name={key} oldValue={val} onCallback={setItem} />)
          } else if (_isSelectionList(key)) {
            type = (<FormSelection name={key} oldValue={val} onCallback={setItem} optionList={selectionList[key]} />)
          } else {
            type = (<FormInputText name={key} oldValue={val} onCallback={setItem} />)
          }
          results.push({
            type, value: val
          })
        }
      })
      setAllInputs(results)
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [item])

  function setItem (key, value) {
    item[key] = value
  }

  function sendData () {
    if (ifEditMode(mode)) {
      onCallbackEdit(item)
    } else {
      onCallbackAdd(item)
    }
  }

  function ifEditMode (mode) {
    if (mode === 'edit') {
      return true
    }
  }

  return (
    <Modal
          visible={visible}
          title={title}
          onOk={e => setVisible(true)}
          onCancel={e => setVisible(false)}
          footer={[
            <Button
              key="delete"
              type="danger"
              onClick={e => onCallbackDelete(item)}>
              ลบ
            </Button>,
            <Button
              key="back"
              onClick={e => setVisible(false)}>
              ยกเลิก
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={e => sendData()}>
              บันทึก{ifEditMode(mode) ? 'การแก้ไข' : ''}
            </Button>
          ]}
        >
      <Form
        form={form}
        layout="vertical">
        {_.map(allInputs, item => {
              return item.type
            })
          }
      </Form>
    </Modal>
  )
}

DataManagerModal.propTypes = {
  title: PropTypes.string,
  item: PropTypes.object,
  mode: PropTypes.string,
  onCallbackEdit: PropTypes.func,
  onCallbackAdd: PropTypes.func,
  onCallbackDelete: PropTypes.func,
  selectionList: PropTypes.object
}
