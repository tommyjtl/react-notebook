import { Separator } from "@/components/ui/separator"

interface SideBySideRowProps {
    left?: React.ReactNode
    right?: React.ReactNode
}

export function SideBySideRow({ left, right }: SideBySideRowProps) {
    return (
        <div className="col-span-2 flex gap-6 mb-2">
            <div className={`w-1/2 min-w-0 `
                // overflow-hidden`
            }>
                {left}
            </div>
            <div className={`w-1/2 min-w-0 `
                // overflow-hidden`
            }>
                {right}
            </div>
        </div>
    )
}

interface FullWidthRowProps {
    children: React.ReactNode
    extra_css_styles?: string
}

export function FullWidthRow({ children, extra_css_styles = "" }: FullWidthRowProps) {
    return (
        <div className={`col-span-2 w-full ${extra_css_styles}`}>
            {children}
        </div>
    )
}

export function RowSeparator() {
    return (
        <FullWidthRow>
            <Separator className="my-2" />
        </FullWidthRow>
    )
}