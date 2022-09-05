import React from "react";
import {Breadcrumb, Card} from "antd";

const AddTodoComponent = React.lazy(() => import("../components/AddTodoComponent"));

const AddTodo = () => {
    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Add</Breadcrumb.Item>
            </Breadcrumb>
            <Card
                title="Add Item"
            >
                <AddTodoComponent  message={true}/>
            </Card>
        </div>
    )
}

export default AddTodo;
