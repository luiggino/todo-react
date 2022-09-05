import React, {useEffect, useState} from "react";
import {Button, Form, Input, List, message, Modal, Popconfirm, Result, Switch, Table, Tooltip, Typography} from "antd";
import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    SendOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const {Paragraph, Text} = Typography;


const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = <Input/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const TodoList = (props) => {
    const {editTodo = true, deleteTodo = true, checkTodo = true} = props;

    const [form] = Form.useForm();

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [editingKey, setEditingKey] = useState('');

    const navigate = useNavigate();

    const isEditing = (record) => record.id === editingKey;

    const getData = () => {
        setLoading(true);
        fetch('http://localhost:8080/todo-service/api/todos')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTodos(data);
                setLoading(false);

                if (props.hasOwnProperty('setLoadList')) {
                    props.setLoadList(false);
                }

                if (data.length === 0) {
                    message.warning('List is empty');
                }
            })
            .catch((err) => {
                console.log(err.message);
                setError(true);

                props.setLoadList(false);
            });
    };

    const deleteFetch = (id) => {
        setLoading(true);
        fetch('http://localhost:8080/todo-service/api/todos/' + id, {method: 'DELETE'})
            .then((response) => {
                setLoading(false);
                if (response.status === 200) {
                    console.log('delete Ok', response);
                    getData();
                } else {
                    console.log('error');
                    setError(true);
                }
            })
            .catch((err) => {
                console.log(err.message);
                setError(true);
            });
    }

    const editFetch = (body) => {
        setLoading(true);
        fetch('http://localhost:8080/todo-service/api/todos', {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                setLoading(false);
                if (response.status === 200) {
                    console.log('delete Ok', response);
                    getData();

                    setEditingKey('');
                } else {
                    console.log('error');
                    setError(true);
                }
            })
            .catch((err) => {
                console.log(err.message);
                setError(true);
            });
    }

    useEffect(() => {
        console.log('props', props.loadList);

        getData();
    }, [props.loadList]);

    const ConfirmShowDelete = (item) => {
        Modal.confirm({
            title: 'Delete item',
            icon: <ExclamationCircleOutlined/>,
            content: 'Are you sure to delete this item?',
            onOk() {
                deleteItem(item);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const deleteItem = (item) => {
        deleteFetch(item.id);
    }

    const onCompleteItem = (item, checked) => {
        if (checked) {
            const filter = todos.filter(x => x.id !== item.id);
            setTodos(filter);

            if (filter.length === 0) {
                message.success('List is complete');
            }
        }
    }

    /*
    const editItem = (item) => {
        const description = editInput.current.input.value;
        console.log("description ", description);

        const body = {
            id: item.id,
            description: description,
            finished: item.finished
        }

        editFetch(body);
    }
    */

    const edit = (record) => {
        form.setFieldsValue({
            description: '',
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (id) => {
        try {
            const row = await form.validateFields();
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'description',
            dataIndex: 'description',
            width: '75%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return (
                    <span>
                    {editable ?
                        <span>
                            <Typography.Link
                                onClick={() => save(record.id)}
                                style={{
                                    marginRight: 8,
                                }}
                            >
                            Save
                            </Typography.Link>
                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                        :
                        <Tooltip title="Edit">
                            <Button
                            shape="circle"
                            key="list-edit"
                            icon={<EditOutlined/>}
                            size="small"
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}/>
                        </Tooltip>
                    }
                    {!editable &&
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteItem(record)}>
                            <Tooltip title="Delete">
                                <Button shape="circle" key="list-delete" icon={<DeleteOutlined/>}
                                        size="small" />
                            </Tooltip>
                        </Popconfirm>

                    }

                    </span>
                )
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    if (error) {
        return (<Result
            status="error"
            title="Can't get the list"
            extra={[
                <Button key="goHome" onClick={() => navigate("/")}>Go Home</Button>,
            ]}
        >
            <div className="desc">
                <Paragraph>
                    <Text
                        strong
                        style={{
                            fontSize: 16,
                        }}
                    >
                        The content you submitted has the following error:
                    </Text>
                </Paragraph>
            </div>
        </Result>);
    } else {
        return (
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={todos}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        )
    }
}

export default TodoList;

/**
 <List
 size="large"
 bordered
 dataSource={todos}
 loading={loading}
 renderItem={item => (
                    <List.Item
                        actions={[
                            <div>
                                {
                                    checkTodo && !edit &&
                                    <Switch
                                        size="small"
                                        checked={false}
                                        checkedChildren={<CheckOutlined/>}
                                        unCheckedChildren={<CloseOutlined/>}
                                        onChange={(checked) => onCompleteItem(item, checked)}
                                    />
                                }
                            </div>,
                            <div>
                                {
                                    editTodo && !edit &&
                                    <Tooltip title="Edit">
                                        <Button
                                            shape="circle"
                                            key="list-edit"
                                            icon={<EditOutlined/>}
                                            size="small"
                                            onClick={() => setEdit(true)}/>
                                    </Tooltip>
                                }
                            </div>,
                            <div>
                                {
                                    deleteTodo && !edit &&
                                    (
                                        <Tooltip title="Delete">
                                            <Button shape="circle" key="list-delete" icon={<DeleteOutlined/>}
                                                    size="small" onClick={() => ConfirmShowDelete(item)}/>
                                        </Tooltip>
                                    )}
                            </div>
                        ]}
                    >
                        {edit ?
                            <Input.Group compact>
                                <Input
                                    style={{
                                        width: 'calc(100% - 200px)',
                                    }}
                                    size="small"
                                    defaultValue={item.description}
                                    ref={editInput}
                                />
                                <Button
                                    type="primary"
                                    size="small"
                                    icon={<SendOutlined/>}
                                    onClick={() => editItem(item)}
                                />
                            </Input.Group> :
                            item.description

                        }

                    </List.Item>
                )}
 />

 */
