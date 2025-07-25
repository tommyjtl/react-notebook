interface RNCodeProps {
    children: React.ReactNode
}

export default function RNCode({ children }: RNCodeProps) {
    return (
        <code className={`text-xs bg-neutral-100 
        py-0.5 px-1 border-1 border-gray-300 
        rounded-sm mx-0.5`}>
            {children}
        </code>
    )
}