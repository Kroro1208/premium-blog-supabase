import { cn } from "@/lib/utils";
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/atom-one-dark.min.css"

const MarkDown = ({ content, className }: { content: string; className?: string; }) => {
    return (
        <Markdown
            rehypePlugins={[rehypeHighlight]}
            className={cn("space-y-6", className)}
            components={{
                h1: ({ node, ...props }) => {
                    return <h1 {...props} className="text-3xl font-bold" />;
                },
                h2: ({ node, ...props }) => {
                    return <h1 {...props} className="text-2xl font-bold" />;
                },
                h3: ({ node, ...props }) => {
                    return <h1 {...props} className="text-xl font-bold" />;
                },
                code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    if (match?.length) {

                    } else {
                        return <code className="bg-red-400">{children}</code>
                    }
                }
            }}>
            {content}
        </Markdown>
    )
}

export default MarkDown
