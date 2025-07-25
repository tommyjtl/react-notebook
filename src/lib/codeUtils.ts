import { CodeObjectType } from "@/types/code"

// export function getCodeAt(code: string[], atIdx: number, remove_blanks: boolean = true): string {
//     if (atIdx >= code.length)
//         return `// atIdx error extracting from the code.`

//     const code_at = code[atIdx]
//     const code_array = code_at.split("\n")
//     return remove_blanks ?
//         code_array.slice(1, code_array.length - 1).join("\n")
//         :
//         code_at
// }

export function parseCodeObjAt(code_obj: CodeObjectType, key: string, remove_blanks: boolean = true): string {
    if (!(key in code_obj)) {
        return "key doesn't exists in this code object"
    }
    const code = code_obj[key]
    const code_array = code.split("\n")
    return remove_blanks ?
        code_array.slice(1, code_array.length - 1).join("\n")
        :
        code
}

export function parseCode(code_string: string, remove_blanks: boolean = true): string {
    const code_array = code_string.split("\n")
    return remove_blanks ?
        code_array.slice(1, code_array.length - 1).join("\n")
        :
        code_string
}