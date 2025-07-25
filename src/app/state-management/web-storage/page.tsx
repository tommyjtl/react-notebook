'use client'

import { useEffect, useState } from "react";

type KeyValuePairType = {
    key: string,
    value: string
}

export default function WebStoragePage() {

    function isWindowValid(): boolean {
        if (typeof window === "undefined")
            return false
        return true
    }

    // function getValueFromKey(key: string): string | null {
    //     if (!isWindowValid) return null

    //     const item = window.localStorage.getItem(key)
    //     if (!item)
    //         return null
    //     try {
    //         return JSON.parse(item)
    //     } catch (err: unknown) {
    //         return null
    //     }
    // }

    const [kvPairdLoaded, setKvPairdLoaded] = useState<KeyValuePairType[]>([])
    const getAllLocalStorageKeyPairs = () => {
        if (!isWindowValid()) return;
        const data: KeyValuePairType[] = [];
        for (let i = 0; i < window.localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                const value = localStorage.getItem(key);
                try {
                    data.push({
                        key: key,
                        value: value ? JSON.parse(value) : value
                    });
                } catch {
                    data.push({
                        key: key,
                        value: value!
                    });
                }
            }
        }
        setKvPairdLoaded(data);
    };


    function setKeyValue(kv_pair: KeyValuePairType): void {
        window.localStorage.setItem(
            kv_pair.key,
            JSON.stringify(kv_pair.value)
        );
    }

    const [kvInput, setKVInput] = useState<KeyValuePairType>({ key: "", value: "" })

    const handleSetLocalStorage = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (!kvInput)
            return
        if (kvInput.key === "" || kvInput.value === "")
            throw new Error(`either key or value is missing value`)

        setKeyValue(kvInput)
        setKVInput({ key: "", value: "" }) // clear input
        getAllLocalStorageKeyPairs() // update the list for current existing key pairs
    }

    useEffect(() => {
        // on first load/rendering
        getAllLocalStorageKeyPairs() // update the list for current existing key pairs
    })

    const handleClearLocalStorage = () => {
        if (!isWindowValid) return null
        window.localStorage.clear()
        getAllLocalStorageKeyPairs() // update the list for current existing key pairs
    }

    return (<>
        <div>
            <div>
                <h1 className="font-bold text-xl mb-2">Storing key-value pair:</h1>
                <form onSubmit={(e) => handleSetLocalStorage(e)}>
                    <input
                        className="w-[300px] border-1 border-gray-300 px-2"
                        type="text" placeholder="key"
                        value={kvInput?.key}
                        onChange={(e) => setKVInput((prev) => ({ ...prev, key: e.target.value }))}
                    >
                    </input>
                    <br />
                    <textarea
                        className="w-[300px] border-1 border-gray-300 px-2"
                        rows={6}
                        placeholder="value: JSON or plain string"
                        value={kvInput?.value}
                        onChange={(e) => setKVInput((prev) => ({ ...prev, value: e.target.value }))}
                    >
                    </textarea>
                    <br />
                    <button
                        type="submit"
                        className="border-1 border-gray-300 px-2"
                    >
                        Setting to local storage
                    </button>
                </form>
                <button
                    type="submit"
                    className="border-1 border-gray-300 px-2 mt-2"
                    onClick={handleClearLocalStorage}
                >
                    Clearing local storage
                </button>
            </div>
            <div className="mt-4">
                <h1 className="font-bold text-xl mb-2">Showing all key-value pairs:</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className="w-[200px] bg-gray-200">key</th>
                                <th className="w-[400px] bg-gray-300">value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kvPairdLoaded.map((kv) => {
                                console.log(kv)
                                return <tr key={crypto.randomUUID()}>
                                    <td>{kv.key}</td>
                                    <td>{kv.value}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>)
}