interface RNHeaderProps {
    name: string
}

export default function RNHeader({ name }: RNHeaderProps) {
    return (
        <h1 className="text-base font-semibold mb-2">
            {name}
        </h1>
    )
}