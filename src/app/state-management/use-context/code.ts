import { CodeObjectType } from "@/types/code"

export const code_object: CodeObjectType = {
    "imports": `
import {
    useState, // for state creation
    createContext, useContext, // for context
    Dispatch, SetStateAction, // for setter function
} from "react"
`,
    "declaring type": `
// define the type for the context
type MyContextType = {
    state: string
    dispatch: Dispatch<SetStateAction<string>>
}
`,
    "declaring context": `
// define the context type
const MyContext = createContext<
    MyContextType | null
>(null) // null when initialized
`,
    "declaring hook": `
// define a custom hook for getting the data
const useMyContext = () => {
    const context = useContext(MyContext)
    // edge case where the parent component 
    // doesn't pass the state to the children
    if (!context) {
        return null
    }
    return context;
};
`,
    "context provider": `
<MyContext.Provider
    value={{
        state: data,
        dispatch: setData
    }}
>
    <UseContextChildComponent />
</MyContext.Provider>
`,
    "declaring state": `
const initString: string = "I'm an initial state"
const [data, setData] = useState<string>(initString);
`,
    "extracting context in child": `
const context = useMyContext()
if (!context)
    return (
        <p>Context is not provided</p>
    )
`,
    "dispatch in children components": `
function UseContextChildComponent() {
    const context = useMyContext()
    if (!context)
        return (
        <p>Context is not provided</p>
    )

    const { dispatch } = context
    return (
        <div>
            <span>Child Component</span>
            <Button
                onClick={() => 
                    dispatch(
                        "hello from children component!"
            )}>
                Set State from Child
            </Button>
        </div>
    );
}
`
}