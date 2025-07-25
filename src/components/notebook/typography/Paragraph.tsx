interface RNParagraphProps {
    children: React.ReactNode
}

export default function RNParagraph({ children }: RNParagraphProps) {
    return (
        <p className="leading-5.5 pb-3.5">
            {children}
        </p>
    )
}