import React, {useState} from "react";
import {Button, Form, Input, Result, Typography} from 'antd';
import {useNavigate} from "react-router-dom";

const {Paragraph, Text} = Typography;

const AddTodo = (props) => {
    const {message = false} = props;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const addTodo = async (description) => {
        console.log('description:', description);
        setSuccess(false);

        await fetch('http://localhost:8080/todo-service/api/todos', {
            method: 'POST',
            body: JSON.stringify({
                description: description
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                setLoading(false);
                if (response.status === 201) {
                    console.log('created Ok', response);
                    setSuccess(true);

                    if (props.hasOwnProperty('loadListTodo')) {
                        props.loadListTodo();
                    }
                } else {
                    console.log('error');
                    setError(true);
                }

            })
            .catch((err) => {
                console.log(err.message);
                setError(true);
            });
    };

    const handleAddTodo = (values) => {
        console.log('Success:', values);

        addTodo(values.todoItem);
        form.resetFields();
    }

    const tryAgain = () => {
        setLoading(false);
        setError(false);
        setSuccess(false);
    }

    if (error && message) {
        return (<Result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
            extra={[
                <Button type="primary" key="tryAgain" onClick={() => tryAgain()}>
                    Try Again
                </Button>,
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
    } else if (loading && message) {
        return <div>Loading...</div>;
    } else if (success && message) {
        return (<Result
            status="success"
            title="Successfully creation!"
            extra={[
                <Button type="primary" key="goHome" onClick={() => navigate("/")}>
                    Go Home
                </Button>,
            ]}
        />);
    } else {
        return (
            <Form
                name="basic"
                form={form}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: false,
                }}
                onFinish={handleAddTodo}
                layout="inline"
            >
                <Form.Item
                    label="Add todo"
                    name="todoItem"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your todo!',
                        },
                    ]}
                >
                    <Input allowClear/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default AddTodo;
