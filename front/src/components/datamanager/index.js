import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import FormInputText from '../formInputText'
import FormDatetimePicker from '../formDatetimePicker'
import FormSelection from '../formSelection'
import DropDownStatementGroup from '../ddlStatementGroup'
import { _isSelectionList } from '../function/isSelectionList'
import { _findNullObject } from '../function/findNullObject'
import { _alertMessage } from '../function/messenger'

export default function DataManagerModal ({
  title,
  item,
  mode,
  onCallbackEdit,
  onCallbackAdd,
  onCallbackDelete,
  selectionList,
  children,
  field
}) {
  const [visible, setVisible] = useState(false)
  const [allInputs, setAllInputs] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    if (item) {
      const skipFields = new Set(['id', 'key'])
      const results = []
      _.each(field, (fieldName) => {
        let type = null
        if (!skipFields.has(fieldName.toLowerCase())) {
          if (_.includes(fieldName, 'date')) {
            type = (<FormDatetimePicker name={fieldName} oldValue={item[fieldName]} onCallback={setItem} />)
          } else if (_.includes(fieldName, 'amount')) {
            type = (<FormInputText name={fieldName} oldValue={item[fieldName]} onCallback={setItem} type={'number'} />)
          } else if (_isSelectionList(fieldName)) {
            type = (<FormSelection name={fieldName} oldValue={item[fieldName]} onCallback={setItem} optionList={selectionList[fieldName]} />)
          } else if (fieldName === 'group') {
            type = (<DropDownStatementGroup name={fieldName} oldValue={item[fieldName]} onCallback={setItem} />)
          } else {
            type = (<FormInputText name={fieldName} oldValue={item[fieldName]} onCallback={setItem} />)
          }
          results.push({
            type, value: item[fieldName]
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
  children: PropTypes.element,
  field: PropTypes.array
}
