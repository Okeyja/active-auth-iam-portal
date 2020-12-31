import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';

import type { TableListItem } from '../data.d';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>

export type CreateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  createModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;
const RadioGroup = Radio.Group;

export type CreateFormState = {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    name: props.values.name,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleCreate,
    onCancel: handleCreateModalVisible,
    createModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleCreate({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem name="target" label="Principal Type">
            <Select style={{ width: '100%' }}>
              <Option value="0">Principal</Option>
              <Option value="2">Subprincipal</Option>
              <Option value="1">Principal Group</Option>
              <Option value="3">App Domain</Option>
            </Select>
          </FormItem>
          <FormItem name="template" label="规则模板">
            <Select style={{ width: '100%' }}>
              <Option value="0">规则模板一</Option>
              <Option value="1">规则模板二</Option>
            </Select>
          </FormItem>
          <FormItem name="type" label="Authenticate">
            <RadioGroup>
              <Radio value="1">Yes</Radio>
              <Radio value="0">No</Radio>
            </RadioGroup>
          </FormItem>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <FormItem
            name="time"
            label="开始时间"
            rules={[{ required: true, message: '请选择开始时间！' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择开始时间"
            />
          </FormItem>
          <FormItem name="frequency" label="调度周期">
            <Select style={{ width: '100%' }}>
              <Option value="month">月</Option>
              <Option value="week">周</Option>
            </Select>
          </FormItem>
        </>
      );
    }
    return (
      <>
        <FormItem
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Input a principal name.' }]}
        >
          <Input placeholder="Please input." />
        </FormItem>
        <FormItem
          name="password"
          label="Password"
          rules={[{ message: 'Input at least 8 characters!', min: 8 }]}
        >
          <Input.Password placeholder="Leave empty for not changing." />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            Previous
          </Button>
          <Button onClick={() => handleCreateModalVisible(false, values)}>Cancel</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Next
          </Button>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            Previous
          </Button>
          <Button onClick={() => handleCreateModalVisible(false, values)}>Cancel</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Finish
          </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={() => handleCreateModalVisible(false, values)}>Cancel</Button>
        <Button type="primary" onClick={() => handleNext()}>
          Next
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="Create Principal"
      visible={createModalVisible}
      footer={renderFooter()}
      onCancel={() => handleCreateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="Basic Info" />
        <Step title="Advanced Info" />
        <Step title="Key and Key Pairs" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          type: formVals.type,
          frequency: formVals.frequency,
          name: formVals.name,
          desc: formVals.name,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
