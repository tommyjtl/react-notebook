'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
//  https://github.com/react-syntax-highlighter/react-syntax-highlighter

interface RNCodeBlockProps {
    language?: string
    codeString?: string
}

export default function RNCodeBlock({
    language = "typescript",
    codeString = "No code supplied"
}: RNCodeBlockProps) {
    return (
        <div className='text-xs'>
            <SyntaxHighlighter
                language={language}
                style={theme}
                customStyle={{
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,.1)',
                    padding: "10px 10px",
                    margin: 0,
                }}
                showLineNumbers
                wrapLines={true}
                wrapLongLines={true}
            >
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
};