import { CodeObjectType } from "@/types/code"

export const code_object: CodeObjectType = {
    "imports": `
import {
    useSearchParams,    // getting params
    useRouter           // setting params
} from "next/navigation";
 
// Reading search parameters through useSearchParams() 
// without a Suspense boundary will opt the entire page
// into client-side rendering.
import { Suspense } from 'react'
`,
    "setting a url param": `
const router = useRouter();
const setParam = (param: KeyValuePairType): void => {
    const params = new URLSearchParams(
        Array.from(searchParams.entries())
    );
    params.set(param.key, param.value);
    router.push(\`?\${params.toString()}\`);
}
`,
    "reading a url param": `
const searchParams = useSearchParams();
const extractParam = (key: string): string | null => {
    const value = searchParams.get(key)
    return value
}
`,
    "reading all url params": `
const searchParams = useSearchParams();
const entries = Array.from(
    // extract a list of all params
    // : URLSearchParamsIterator<[string, string]>
    searchParams.entries() 
);
setParamList(
    entries.map(
        ([key, value]) => ({ key, value })
));
`,
    "clearing all url params": `
const router = useRouter();
const clearAllParams = () => {
    router.push("?");
};
`,
}