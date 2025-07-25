'use client'

import React, { useReducer, useState } from "react"

type TodoItem = {
    _id: string
    name: string
    created_at: string
}

type TodoActions =
    { type: "add", payload: TodoItem } |
    { type: "delete", payload: TodoItem }

function todo_reducer(state: TodoItem[], action: TodoActions): TodoItem[] {
    const { type, payload } = action
    switch (type) {
        case "add":
            return [...state, payload]
        case "delete":
            return state.filter((todo) => todo._id !== payload._id)
        default:
            return state
    }
}

export default function UseReducerPage() {
    const [todoItems, dispatch] = useReducer(todo_reducer, [])

    const [todoInput, setTodoInput] = useState<string | null>("")

    const handleAddTodo = () => {
        if (todoInput === null)
            throw new Error("todo input is not valid")

        dispatch({
            type: "add",
            payload: {
                _id: crypto.randomUUID(),
                name: todoInput,
                created_at: new Date().toLocaleString()
            }
        })

        // clear todoinput
        setTodoInput("")
    }

    const handleDeleteTodo = (payload: TodoItem) => {
        dispatch({
            type: "delete",
            payload: payload
        })
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleAddTodo()
            }}>
                <input
                    className="border-1"
                    type="text" placeholder="type your todo here"
                    value={!todoInput ? "" : todoInput}
                    onChange={e => setTodoInput(e.target.value)}
                >
                </input>
                <button type="submit">Add</button>
            </form>
            <div className="mt-2">
                <ul>
                    {todoItems.map((todo) =>
                        <li key={todo._id}>
                            - {todo.name} {todo.created_at}
                            <button
                                className="ms-2 border-1 rounded-xs bg-red-100"
                                onClick={() => handleDeleteTodo(todo)}
                            >delete</button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}