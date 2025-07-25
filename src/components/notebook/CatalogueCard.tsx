import {
    Card,
    // CardAction,
    // CardContent,
    CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Link from "next/link"

interface CatalogueCardProps {
    name: string
    description: string
    url?: string
    disabled?: boolean
}

export default function CatalogueCard(
    {
        name,
        description,
        url = "",
        disabled = false
    }: CatalogueCardProps
) {

    if (disabled) {
        return (
            <Card
                className={`w-full h-24 border-2 border-gray-200 
                    bg-gray-50 opacity-60 cursor-not-allowed 
                    select-none transition-all
                    `}
            >
                <CardHeader className="h-full flex flex-col">
                    <CardTitle className="mb-1 font-semibold text-gray-400">
                        {name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-400 line-clamp-1 flex-1">
                        {description}
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <Link
            draggable={false}
            href={url}
            className="block"
        >
            <Card
                className={`w-full h-24 hover:shadow-lg 
                    hover:border-2 hover:border-blue-500 transition-all 
                    cursor-pointer select-none border-2 border-neutral-200
                    `}
            >
                <CardHeader className="h-full flex flex-col">
                    <CardTitle className="mb-1 font-semibold">
                        {name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-1 flex-1">
                        {description}
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    )
}