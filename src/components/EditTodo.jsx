import React from "react";
import {Breadcrumb, Card} from "antd";

const TodoList = React.lazy(() => import("../components/TodoListComponent"));

const EditTodo = () => {
    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Edit</Breadcrumb.Item>
            </Breadcrumb>
            <Card
                title="Edit Item"
            >
                <TodoList editTodo={true} deleteTodo={false} checkTodo={false} />
            </Card>
        </div>
    )
}

export default EditTodo;
