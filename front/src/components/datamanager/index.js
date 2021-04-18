import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import FormInputText from '../formInputText'
import FormDatetimePicker from '../formDatetimePicker'
import FormSelection from '../formSelection'
import { _isSelectionList } from '../function/isSelectionList'
import { _findNullObject } from '../function/findNullObject'
import { _alertMessage } from '../function/messenger'

export default function DataManagerModal ({ title, item, mode, onCallbackEdit, onCallbackAdd, onCallbackDelete, selectionList, children }) {
  const [visible, setVisible] = useState(false)
  const [allInputs, setAllInputs] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    if (item) {
      // item = _(item).toPairs().sortBy(0).fromPairs().value()
      // array keys => loop key
      // add field group_id from api
      const skipFields = new Set(['id', 'key'])
      const results = []
      _.each(item, (val, key) => {
        let type = null
        if (!skipFields.has(key.toLowerCase())) {
          if (_.includes(key, 'date')) {
            type = (<FormDatetimePicker name={key} oldValue={val} onCallback={setItem} />)
          } else if (_.includes(key, 'amount')) {
            type = (<FormInputText name={key} oldValue={val} onCallback={setItem} type={'number'} />)
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
    const findNull = _findNullObject(item)
    if (findNull === 0) {
      if (ifEditMode(mode)) {
        onCallbackEdit(item)
      } else {
        onCallbackAdd(item)
      }
    } else {
      _alertMessage('warning', 'กรุณากรอกข้อมูลให้ครบถ้วน')
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
          width={800}
          onOk={e => setVisible(true)}
          onCancel={e => setVisible(false)}
          footer={[
            mode === 'edit'
              ? <Button
                  key="delete"
                  type="danger"
                  onClick={e => onCallbackDelete(item)}>
                ลบ
              </Button>
              : null,
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
      <Row>
        <Col xs={{ span: 24, order: 2 }}
             md={{ span: 12, order: 1 }}>
          <Form
            form={form}
            layout="vertical">
            {_.map(allInputs, item => {
                return item.type
                })
            }
          </Form>
        </Col>
        <Col xs={{ span: 24, order: 1 }}
             md={{ span: 12, order: 2 }}>
          <div>{children}</div>
        </Col>
      </Row>
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
  selectionList: PropTypes.object,
  children: PropTypes.element
}
