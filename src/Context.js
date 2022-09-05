import React, {useState} from "react";

export const Context = React.createContext(null);

export const ContextProvider = ({children}) => {
    const [todos, setTodos] = useState([
        /*{id: 1, text: "Wash dishes", done: false},
        {id: 2, text: "Do laundry", done: false},
        {id: 3, text: "Take shower", done: false}*/
    ]);
    return (
        <Context.Provider value={{todos, setTodos}}>
            {children}
        </Context.Provider>
    )
}
