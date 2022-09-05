import React from "react";
import {Breadcrumb, Card} from "antd";

const TodoList = React.lazy(() => import("../components/TodoListComponent"));

const DeleteTodo = () => {
    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Delete</Breadcrumb.Item>
            </Breadcrumb>
            <Card
                title="Delete Item"
            >
                <TodoList deleteTodo={true} editTodo={false} checkTodo={false} />
            </Card>
        </div>
    )
}

export default DeleteTodo;
