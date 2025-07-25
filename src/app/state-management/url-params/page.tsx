'use client'

// React relevant imports
import { useEffect, useState } from "react"

// UI relevant imports
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import RNContentBody from "@/components/notebook/ContentBody"
import { SideBySideRow, FullWidthRow } from "@/components/notebook/layout/Rows"
import RNCodeBlock from '@/components/notebook/typography/CodeBlock'
import RNLink from "@/components/notebook/typography/Link";

// Fetching code examples
import { code_object } from "./code";
import { parseCodeObjAt } from "@/lib/codeUtils";

// Page specific imports
import {
    useSearchParams, // getting params
    useRouter // setting params
} from "next/navigation";
// Reading search parameters through useSearchParams() 
// without a Suspense boundary will opt the entire page
// into client-side rendering.
import { Suspense } from 'react'

import RNHeader from "@/components/notebook/typography/Header"
/* 
there are alternative solutions as well:
- vanilla url params: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
- react router: https://ui.dev/react-router-url-parameters
*/

export default function URLParamsPage() {
    return (
        // we could have a loading skeleton as the `fallback` too
        <Suspense>
            <URLParamsPageMain />
        </Suspense>
    )
}

type KeyValuePairType = {
    key: string,
    value: string
}

function URLParamsPageMain() {
    // states for user input
    const [kvInputSet, setKVInputSet] = useState<KeyValuePairType>({ key: "", value: "" })
    const [kvInputRead, setKVInputRead] = useState<KeyValuePairType>({ key: "", value: "" })
    const [paramList, setParamList] = useState<KeyValuePairType[]>([]);

    // getting parameter
    const searchParams = useSearchParams();
    const extractParam = (key: string): string | null => {
        const value = searchParams.get(key)
        return value
    }

    // extract all params
    useEffect(() => {
        const entries = Array.from(
            searchParams.entries() // extract a list of all params
        );
        setParamList(entries.map(([key, value]) => ({ key, value })));
    }, [searchParams]);

    // setting a parameter
    const router = useRouter();
    const setParam = (param: KeyValuePairType): void => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set(param.key, param.value);
        router.push(`?${params.toString()}`);
    }

    const handleOnUserKeyValueSetInput = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!kvInputSet)
            return
        if (kvInputSet.key === "" || kvInputSet.value === "") {
            return
        }
        setParam(kvInputSet) // set params
        setKVInputSet({ key: "", value: "" }) // clear input
    }

    const handleOnUserKeyValueReadInput = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!kvInputRead)
            return
        if (kvInputRead.key === "") {
            return
        }
        // setParam(kvInputSet) // set params
        const extracted_value = extractParam(kvInputRead.key)
        setKVInputRead((prev) => ({ ...prev, value: !extracted_value ? "not set yet" : extracted_value }))
    }


    const clearAllParams = () => {
        router.push("?");
    };

    return (
        <>
            <RNContentBody title="URL Params" structure={[
                { name: "Home", url: "../../" },
                { name: "State Management", url: "../" },
                { name: "URL Params" }
            ]} >
                <SideBySideRow
                    left={
                        <p>
                            In Next.js, there are two hooks we can use to extract the URL parameters natively. Alternatively, we can use <RNLink name="nuqs" url="https://nuqs.47ng.com" />.
                        </p>
                    }
                    right={<RNCodeBlock codeString={parseCodeObjAt(code_object, "imports")} />}
                />

                <FullWidthRow>
                    <Separator className="my-2" />
                </FullWidthRow>

                <FullWidthRow>
                    <RNHeader name="Setting a URL param:" />
                </FullWidthRow>

                <SideBySideRow
                    left={
                        <form onSubmit={(e) => handleOnUserKeyValueSetInput(e)} className="space-y-3">
                            <div className="flex gap-2 items-center">
                                <Input
                                    type="text"
                                    placeholder="key"
                                    value={kvInputSet?.key}
                                    onChange={(e) => setKVInputSet((prev) => ({ ...prev, key: e.target.value }))}
                                    className="flex-1"
                                />
                                <span className="text-gray-500 font-medium">=</span>
                                <Input
                                    type="text"
                                    placeholder="value"
                                    value={kvInputSet?.value}
                                    onChange={(e) => setKVInputSet((prev) => ({ ...prev, value: e.target.value }))}
                                    className="flex-1"
                                />
                            </div>
                            <Button variant={"outline"} type="submit" className="w-full">
                                Set Parameter
                            </Button>
                        </form>
                    }
                    right={
                        <RNCodeBlock codeString={parseCodeObjAt(code_object, "setting a url param")} />
                    }
                />

                <FullWidthRow>
                    <RNHeader name="Reading a URL param:" />
                </FullWidthRow>

                <SideBySideRow
                    left={
                        <form onSubmit={(e) => handleOnUserKeyValueReadInput(e)} className="space-y-3">
                            <div className="flex gap-2 items-center">
                                <Input
                                    type="text"
                                    placeholder="key"
                                    value={kvInputRead?.key}
                                    onChange={(e) => {
                                        setKVInputRead(() => ({
                                            key: e.target.value,
                                            value: ""
                                        }))
                                    }}
                                    className="flex-1"
                                />
                                <span className="text-gray-500 font-medium">=</span>
                                <Input
                                    type="text"
                                    // placeholder="value to be extracted"
                                    value={kvInputRead.value}
                                    className="flex-1"
                                    disabled
                                />
                            </div>
                            <Button variant={"outline"} type="submit" className="w-full">
                                Read Parameter
                            </Button>
                        </form>
                    }
                    right={
                        <RNCodeBlock codeString={parseCodeObjAt(code_object, "reading a url param")} />
                    }
                />

                <FullWidthRow>
                    <RNHeader name="Reading all URL params:" />
                </FullWidthRow>

                <SideBySideRow
                    left={<div className="bg-gray-50 rounded-md p-4 min-h-[100px]">
                        {paramList.length === 0 ? (
                            <p className="text-gray-500 italic text-sm">No parameters set</p>
                        ) : (
                            <ul className="space-y-1">
                                {paramList.map((kv, idx) => (
                                    <li key={idx} className="text-sm flex items-center">
                                        <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                            {kv.key}
                                        </code>
                                        <span className="mx-2 text-gray-400">=</span>
                                        <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                            {kv.value}
                                        </code>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>}
                    right={
                        <RNCodeBlock codeString={parseCodeObjAt(code_object, "reading all url params")} />
                    }
                />

                <FullWidthRow>
                    <RNHeader name="Clearing all URL params:" />
                </FullWidthRow>

                <SideBySideRow
                    left={<Button
                        variant="outline"
                        onClick={clearAllParams}
                        className="w-full"
                    >
                        Clear All Parameters
                    </Button>}
                    right={
                        <RNCodeBlock codeString={parseCodeObjAt(code_object, "clearing all url params")} />
                    }
                />

                <FullWidthRow>
                    <Separator className="my-4" />
                </FullWidthRow>

                <SideBySideRow
                    left={
                        <>
                            <h1 className="text-md font-semibold mb-2">Reference:</h1>
                            <ul className="text-sm my-3 ml-6 list-disc [&>li]:mt-1">
                                <li>
                                    <RNLink name="URLSearchParams" url="https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams" />
                                </li>
                            </ul>
                        </>
                    }
                    right={<></>}
                />

            </RNContentBody>
        </>
    )
}