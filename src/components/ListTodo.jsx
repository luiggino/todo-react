import React from "react";
import {Breadcrumb, Card} from "antd";

const TodoList = React.lazy(() => import("../components/TodoListComponent"));

const ListTodo = () => {
    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <Card
                title="Todo List"
            >
                <TodoList />
            </Card>
        </div>
    )
}

export default ListTodo;
