import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Spin} from "antd";

const LomBaseLayout = React.lazy(() => import("./Layout/BaseLayoutComponent"));
const LomHome = React.lazy(() => import("./Layout/HomeComponent"));
const ListTodo = React.lazy(() => import("./components/ListTodo"));
const AddTodo = React.lazy(() => import("./components/AddTodo"));
const EditTodo = React.lazy(() => import("./components/EditTodo"));
const DeleteTodo = React.lazy(() => import("./components/DeleteTodo"));

const App = () => {
    return (
        <div className="App">
            <Suspense fallback={<Spin />}>
                <Routes>
                    <Route path="/" element={<LomBaseLayout/>}>
                        <Route index element={<LomHome/>}/>
                        <Route path="list" element={<ListTodo />}/>
                        <Route path="add" element={<AddTodo/>}/>
                        <Route path="edit" element={<EditTodo/>}/>
                        <Route path="delete" element={<DeleteTodo/>}/>
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
