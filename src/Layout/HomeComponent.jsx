import React, {useState} from "react";
import {Breadcrumb, Card} from "antd";

const TodoList = React.lazy(() => import("../components/TodoListComponent"));
const AddTodo = React.lazy(() => import("../components/AddTodoComponent"));

const LomHome = () => {
    const [loadList, setLoadList] = useState(false);

    const loadListTodo = () => {
        console.log('loadListTodo ', loadList);
        setLoadList(true);
    }

    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>

            <Card
                title="Todo List"
            >
                <TodoList loadList={loadList} setLoadList={setLoadList}/>

                <Card style={{padding: '15px 0',}}>
                    <AddTodo loadListTodo={loadListTodo}/>
                </Card>
            </Card>
        </div>
    );
}

export default LomHome;
