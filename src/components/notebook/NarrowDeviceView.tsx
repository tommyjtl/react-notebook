'use client'

import RNLink from "@/components/notebook/typography/Link";

interface NarrowDeviceViewProps {
    title?: string;
}

export default function NarrowDeviceView({ title = "React Notebook" }: NarrowDeviceViewProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {title}
                </h1>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    This content is optimized for desktop viewing. Please visit us on a larger screen for the full interactive experience.
                </p>
                <div className="text-sm text-gray-400">
                    <RNLink name="React Notebook" url="/" in_new_tab={false} />, 2025.
                </div>
            </div>
        </div>
    );
}
