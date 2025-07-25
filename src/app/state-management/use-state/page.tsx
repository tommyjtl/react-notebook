'use client'

import React, { useState } from 'react';

export default function UseStatePage() {
    const [count, setCount] = useState<number | null>(0);

    const isNumber = (value: number | null) => {
        return typeof value === "number"
    }

    const handleChangeCount = (type: string) => {
        setCount((prev) => {
            if (!isNumber(prev)) return 0
            return type === "increment" ?
                prev + 1
                :
                type === "decrement" ?
                    prev - 1
                    :
                    prev // otherwise, do nothing
        })
    }

    return (
        <div>
            <div>
                <p>
                    {count}
                </p>
            </div>
            <div>
                <button onClick={() =>
                    handleChangeCount("increment")
                    // what's the difference of having 
                    // `handleAddCount` and `handleAddCount()` here?
                }>
                    Add
                </button>
            </div>
            <div>
                <button onClick={() =>
                    handleChangeCount("decrement")
                }>
                    Delete
                </button>
            </div>
        </div>
    );
}