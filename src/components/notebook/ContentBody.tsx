'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import RNLink from "./typography/Link"
import useNarrowDevice from "@/hooks/useNarrowDevice"
import NarrowDeviceView from "./NarrowDeviceView"

type PageStructureItemType = {
    name: string
    url?: string
}

interface RNContentBodyProps {
    title: string
    structure?: PageStructureItemType[]
    children: React.ReactNode

}

function concatenate_breadcrumbs(items: PageStructureItemType[]): React.ReactNode {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    {items.map(
                        (item, idx) => {
                            return (
                                <div
                                    key={`breadcrumb-${item.name}-${idx}`}
                                    className="contents" // make it inline display
                                >
                                    {idx > 0 ? <BreadcrumbSeparator key={`separator-${idx}`} /> : null}
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={item.url}>{item.name}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </div>
                            )
                        })}
                </BreadcrumbList>
            </Breadcrumb>
        </>
    )
}

export default function RNContentBody({
    title, structure, children
}: RNContentBodyProps) {
    const isNarrowDevice = useNarrowDevice();

    if (isNarrowDevice) {
        return <NarrowDeviceView title={title} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4 font-sans">
            <Card className="max-w-5xl mx-auto overflow-hidden">
                <CardHeader className="border-b-1 pb-5">
                    <CardTitle>
                        {title}
                    </CardTitle>
                    {
                        structure &&
                        <CardDescription>
                            {concatenate_breadcrumbs(structure)}
                        </CardDescription>
                    }
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        {children}
                    </div>
                </CardContent>
                <CardFooter className="border-t-1 pt-5">
                    <p className="text-sm text-gray-400">
                        <RNLink
                            name="React Notebook"
                            url="/"
                            in_new_tab={false}
                        /> from <RNLink
                            name="Source"
                            url="https://github.com/tommyjtl/react-notebook"
                            in_new_tab={true}
                        />
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}