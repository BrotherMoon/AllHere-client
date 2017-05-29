import React from 'react';
import {Button, Icon, Layout, message, Input, Form, Modal} from 'antd';
const FormItem = Form.Item;

class MessageForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
        toggleVisible: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired
    }

    render() {
        const {onSubmit, form, visible, toggleVisible} = this.props;
        const {getFieldDecorator} = form;
        return <Modal title="给我留言" visible={visible} okText="留言" onCancel={toggleVisible}
                      onOk={() => {
                          form.validateFields((err, values) => {
                              if (!err) {
                                  !values.name && form.setFieldsValue({'name': '匿名'});
                                  onSubmit(form.getFieldsValue());
                                  form.resetFields();
                              }
                          });
                      }}>
            <Form>
                <FormItem>
                    {getFieldDecorator('name', {
                        rules: [{message: '昵称不能超过20个字符', max: 20}],
                    })(<Input prefix={<Icon type="smile-o" style={{fontSize: 13}}/>}
                              placeholder="方便的话请留下你的昵称"/>)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: '留言内容不能为空且不能超过140个字符', max: 140}],
                    })(<Input style={{resize: 'none'}}
                              type="textarea"
                              placeholder="please leave your message"/>)}
                </FormItem>
            </Form>
        </Modal>
    }
}

export default Form.create()(MessageForm);