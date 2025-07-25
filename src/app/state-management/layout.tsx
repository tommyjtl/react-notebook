import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "State Management",
    description: "",
};

export default function StateManagementLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
