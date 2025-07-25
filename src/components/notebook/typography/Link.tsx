import Link from "next/link";

interface RNLinkProps {
    name: string
    url?: string
    in_new_tab?: boolean
}

export default function RNLink({ name, url = "", in_new_tab = true }: RNLinkProps) {
    return (
        <Link
            target={in_new_tab ? "_blank" : "_self"}
            href={url}
            className={`underline underline-offset-3 transition-all duration-300 ease-in-out 
            hover:text-blue-600 hover:underline-offset-4 hover:scale-105`
            }>
            {name}
        </Link>
    )
}