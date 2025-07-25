'use client'

import {
    useState, // for state creation
    createContext, useContext, // for context
    Dispatch, SetStateAction, // for setter function
} from "react"

// react notebook stylings
import RNContentBody from "@/components/notebook/ContentBody"
import { FullWidthRow, RowSeparator, SideBySideRow } from "@/components/notebook/layout/Rows"
import RNParagraph from "@/components/notebook/typography/Paragraph"
import RNCodeBlock from "@/components/notebook/typography/CodeBlock"
import RNHeader from "@/components/notebook/typography/Header"
import RNCode from "@/components/notebook/typography/Code"

// ui components from shadcn
import { Button } from "@/components/ui/button"

// example code relevant imports
import { code_object } from "./code"
import { parseCodeObjAt } from "@/lib/codeUtils"

// define the type for the context
type MyContextType = {
    state: string
    dispatch: Dispatch<SetStateAction<string>>
}

// define the context type
const MyContext = createContext<MyContextType | null>(null)

// define a custom hook for getting the data
const useMyContext = () => {
    const context = useContext(MyContext)
    // edge case where the parent component doesn't pass the state to the children
    if (!context) {
        // throw new Error("context provider is not defined in the parent component")
        return null
    }
    return context;
};

export default function UseContextPage() {
    // this state is shared among all children components
    const initString: string = "I'm an initial state"
    const [data, setData] = useState<string>(initString);

    function MainContent() {
        return (
            <>
                <FullWidthRow>
                    <RNHeader name="Declaring Type, Context, and Hook" />
                </FullWidthRow>

                <SideBySideRow
                    left={
                        <>
                            <RNParagraph>
                                Declare a type for the state, which consists of a setter and a getter
                            </RNParagraph>
                        </>
                    }
                    right={<RNCodeBlock codeString={parseCodeObjAt(code_object, "declaring type")} />}
                />

                <SideBySideRow
                    left={
                        <>
                            <RNParagraph>
                                Create a custome context with that type using <RNCode>createContext</RNCode>
                            </RNParagraph>
                        </>
                    }
                    right={<RNCodeBlock codeString={parseCodeObjAt(code_object, "declaring context")} />}
                />

                <SideBySideRow
                    left={
                        <>
                            <RNParagraph>
                                Create a custome hook for handling errors and return the context
                            </RNParagraph>
                        </>
                    }
                    right={<RNCodeBlock codeString={parseCodeObjAt(code_object, "declaring hook")} />}
                />

                <FullWidthRow>
                    <RNHeader name="In the Parent Component" />
                </FullWidthRow>

                <SideBySideRow
                    left={
                        <>
                            <RNParagraph>
                                In the parent component (that), we need to first create a initial state using <RNCode>useState</RNCode> with an initialized value.
                            </RNParagraph>
                        </>
                    }
                    right={<RNCodeBlock codeString={parseCodeObjAt(code_object, "declaring state")} />}
                />

                <SideBySideRow
                    left={
                        <>
                            <RNParagraph>
                                We then need to wrap the children components with a context provider, which we need to extract them from the <RNCode>MyContext</RNCode> we declared before. We need pass the getter and setter value as a <RNCode>value</RNCode> arg with the context provider.
                            </RNParagraph>
                        </>
                    }
                    right={<RNCodeBlock language="jsx" codeString={parseCodeObjAt(code_object, "context provider")} />}
                />


                <SideBySideRow
                    left={
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                            <div className="flex items-center rounded-lg mb-4 gap-x-2">
                                <span className="text-sm text-slate-700">Parent Component</span>
                                <span className="px-3 py-1 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md font-mono text-xs">
                                    {data}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setData(initString)}
                                >
                                    Reset to Initial State
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setEnableContext((prev) => {
                                            if (prev)
                                                return false
                                            else
                                                return true
                                        })
                                    }}
                                >
                                    {enableContext ? "Disable the Context Provider" : "Enable the Context Provider"}
                                </Button>
                            </div>
                        </div>
                    }
                    right={<></>}
                />

                <FullWidthRow extra_css_styles="mt-5">
                    <RNHeader name="In the Children Components" />
                </FullWidthRow>

                <SideBySideRow
                    left={
                        <>
                            <RNParagraph>
                                In the children components, we need to extract the context from <RNCode>useMyContext</RNCode>– and must check if the context is provided by parent or not.
                            </RNParagraph>
                        </>
                    }
                    right={<RNCodeBlock language="jsx" codeString={parseCodeObjAt(code_object, "extracting context in child")} />}
                />


                <SideBySideRow
                    left={
                        <>
                            <RNParagraph>
                                If the context exists, then we can safely call the context and extract the value as well as a dispatch function to set the state from that child component.
                            </RNParagraph>
                            <div className="mt-2">
                                <UseContextChildComponent />
                            </div>
                        </>
                    }
                    right={<RNCodeBlock language="jsx" codeString={parseCodeObjAt(code_object, "dispatch in children components")} />}
                />
            </>
        )
    }

    // helpers
    const [enableContext, setEnableContext] = useState<boolean>(true)

    return (
        <RNContentBody title="useContext" structure={[
            { name: "Home", url: "../../" },
            { name: "State Management", url: "../" },
            { name: "useContext" }
        ]} >

            <SideBySideRow
                left={
                    <p className="text-sm">
                        We couple <RNCode>useState</RNCode> and <RNCode>useContext</RNCode> to estalish the native way of managing the global state, that is available everywhere for any components to use.
                    </p>
                }
                right={<RNCodeBlock codeString={parseCodeObjAt(code_object, "imports")} />}
            />

            <RowSeparator />

            {enableContext ?
                <MyContext.Provider
                    value={{
                        state: data,
                        dispatch: setData
                    }}
                >
                    <MainContent />
                </MyContext.Provider>
                :
                <MainContent />
            }
        </RNContentBody>
    );
}

function UseContextChildComponent() {
    const context = useMyContext()
    if (!context)
        return (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">Context is not provided, unable to load state</p>
            </div>
        )

    const { dispatch } = context
    return (
        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
            <span className="text-sm text-slate-600">I am a Child Component</span>
            <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch("hello from children component!")}
            >
                Set State from Child
            </Button>
        </div>
    );
}