import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message, Input, Drawer, Tag} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type {TableListItem} from './data.d';
import {
  queryPrincipal,
  updateRule,
  addRule,
  removeRule,
  querySubprincipal,
  queryPrincipalGroup,
  queryAppDomain
} from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('Adding...');
  try {
    await addRule({...fields});
    hide();
    message.success('Added!');
    return true;
  } catch (error) {
    hide();
    message.error('Add failed, please retry.');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Updating...');
  try {
    await updateRule({
      name: fields.name,
    });
    hide();

    message.success('Updated!');
    return true;
  } catch (error) {
    hide();
    message.error('Update failed, please retry.');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('Deleting...');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted. Refreshing...');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please retry.');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      tip: 'Principal name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Cannot be empty.',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: 'Locator',
      dataIndex: 'resourceLocator',
      valueType: 'textarea',
      hideInForm: true,
    },
    {
      title: 'Owner (Locator)',
      dataIndex: 'owner',
    },
    {
      title: 'Signature',
      dataIndex: 'signature',
      align: "center",
      render: (_, record) => (
        <>
          {
            record.isSignatureCreatable
              ? <Tag color="#87d068">Creatable</Tag>
              : <Tag color="#f50">None Creatable</Tag>
          }
          {record.isSignatureUsable
            ? <Tag color="#87d068">Usable</Tag>
            : <Tag color="#f50">None Usable</Tag>
          }
        </>
      ),
    },
    {
      title: 'Session',
      dataIndex: 'session',
      align: "center",
      render: (_, record) => (
        <>
          {
            record.isSessionCreatable
              ? <Tag color="#87d068">Creatable</Tag>
              : <Tag color="#f50">None Creatable</Tag>
          }
          {record.isSessionUsable
            ? <Tag color="#87d068">Usable</Tag>
            : <Tag color="#f50">None Usable</Tag>
          }
        </>
      ),
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      search: false,
      hideInForm: true,
      renderFormItem: (item, {defaultRender, ...rest}, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！"/>;
        }
        return defaultRender(item);
      },
    },
    {
      title: 'Options',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Setting
          </a>
          <Divider type="vertical"/>
          <a href="">Grant</a>
        </>
      ),
    },
  ];

  const subprincipalColumns: ProColumns<TableListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      tip: 'Principal name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Cannot be empty.',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: 'Locator',
      dataIndex: 'resourceLocator',
      valueType: 'textarea',
      hideInForm: true,
      render: (dom, entity) => {
        return <a href={`?id=${entity.id}`}>{dom}</a>;
      },
    },
    {
      title: 'Signature',
      dataIndex: 'signature',
      align: "center",
      render: (_, record) => (
        <>
          {
            record.isSignatureCreatable
              ? <Tag color="#87d068">Creatable</Tag>
              : <Tag color="#f50">None Creatable</Tag>
          }
          {record.isSignatureUsable
            ? <Tag color="#87d068">Usable</Tag>
            : <Tag color="#f50">None Usable</Tag>
          }
        </>
      ),
    },
    {
      title: 'Session',
      dataIndex: 'session',
      align: "center",
      render: (_, record) => (
        <>
          {
            record.isSessionCreatable
              ? <Tag color="#87d068">Creatable</Tag>
              : <Tag color="#f50">None Creatable</Tag>
          }
          {record.isSessionUsable
            ? <Tag color="#87d068">Usable</Tag>
            : <Tag color="#f50">None Usable</Tag>
          }
        </>
      ),
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      search: false,
      hideInForm: true,
      renderFormItem: (item, {defaultRender, ...rest}, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！"/>;
        }
        return defaultRender(item);
      },
    },
    {
      title: 'Options',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Setting
          </a>
          <Divider type="vertical"/>
          <a href="">Grant</a>
        </>
      ),
    },
  ];

  const principalGroupColumns: ProColumns<TableListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      tip: 'Principal name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Cannot be empty.',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: 'Locator',
      dataIndex: 'resourceLocator',
      valueType: 'textarea',
      hideInForm: true,
      render: (dom, entity) => {
        return <a href={`?id=${entity.id}`}>{dom}</a>;
      },
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      search: false,
      hideInForm: true,
      renderFormItem: (item, {defaultRender, ...rest}, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！"/>;
        }
        return defaultRender(item);
      },
    },
    {
      title: 'Options',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Setting
          </a>
          <Divider type="vertical"/>
          <a href="">Grant</a>
        </>
      ),
    },
  ];

  const appDomainColumns: ProColumns<TableListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      tip: 'Principal name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Cannot be empty.',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: 'Locator',
      dataIndex: 'resourceLocator',
      valueType: 'textarea',
      hideInForm: true,
      render: (dom, entity) => {
        return <a href={`?id=${entity.id}`}>{dom}</a>;
      },
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      search: false,
      hideInForm: true,
      renderFormItem: (item, {defaultRender, ...rest}, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！"/>;
        }
        return defaultRender(item);
      },
    },
    {
      title: 'Options',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Setting
          </a>
          <Divider type="vertical"/>
          <a href="">Grant</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="Principals"
        actionRef={actionRef}
        rowKey="id"
        expandable={{
          expandedRowRender: record => <>
            <ProTable<TableListItem>
              rowKey="id"
              headerTitle="Subprincipals"
              columns={subprincipalColumns}
              search={false}
              request={(params, sorter, filter) => querySubprincipal({...params, sorter, filter})}
            />
            <ProTable<TableListItem>
              rowKey="id"
              headerTitle="Principal Groups"
              columns={principalGroupColumns}
              search={false}
              request={(params, sorter, filter) => queryPrincipalGroup({...params, sorter, filter})}
            />
            <ProTable<TableListItem>
              rowKey="id"
              headerTitle="App Domains"
              columns={appDomainColumns}
              search={false}
              request={(params, sorter, filter) => queryAppDomain({...params, sorter, filter})}
            />
          </>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> Add New
          </Button>,
        ]}
        request={(params, sorter, filter) => queryPrincipal({...params, sorter, filter})}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Selecting <a style={{fontWeight: 600}}>{selectedRowsState.length}</a> item(s).&nbsp;&nbsp;
              {/*
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
              */}
            </div>
          }
        >
          <Button>Disable Token</Button>
          <Button>Disable Signature</Button>
          <Button
            danger
            type="primary"
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          ><DeleteOutlined/>
            Delete
          </Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)}
                  createModalVisible={createModalVisible}
                  onSubmit={async (value) => {
                    const success = await handleUpdate(value);
                    if (success) {
                      handleUpdateModalVisible(false);
                      setStepFormValues({});
                      if (actionRef.current) {
                        actionRef.current.reload();
                      }
                    }
                  }}
                  values={stepFormValues}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
