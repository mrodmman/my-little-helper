import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export function Prose({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-none text-[15px] leading-relaxed text-foreground/85",
        "[&>p]:my-4 [&>p]:leading-relaxed",
        "[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mt-10 [&>h1]:mb-4 [&>h1]:tracking-tight",
        "[&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-9 [&>h2]:mb-3 [&>h2]:tracking-tight",
        "[&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-7 [&>h3]:mb-2 [&>h3]:text-foreground",
        "[&>h4]:text-base [&>h4]:font-semibold [&>h4]:mt-6 [&>h4]:mb-2 [&>h4]:text-foreground",
        "[&_strong]:text-foreground [&_strong]:font-semibold",
        "[&>ul]:my-4 [&>ul]:space-y-1.5 [&>ul]:pl-5 [&>ul]:list-disc marker:text-primary/60",
        "[&>ol]:my-4 [&>ol]:space-y-1.5 [&>ol]:pl-5 [&>ol]:list-decimal marker:text-primary/60",
        "[&_li>p]:my-1",
        "[&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline",
        "[&>blockquote]:border-l-2 [&>blockquote]:border-primary/50 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-foreground/70 [&>blockquote]:my-4",
        "[&>hr]:my-8 [&>hr]:border-border",
        "[&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px] [&_code]:text-primary",
        "[&>pre]:bg-surface [&>pre]:border [&>pre]:border-border [&>pre]:rounded-xl [&>pre]:p-4 [&>pre]:overflow-x-auto",
        "[&_table]:w-full [&_table]:my-4 [&_th]:text-left [&_th]:p-2 [&_th]:border-b [&_th]:border-border [&_td]:p-2 [&_td]:border-b [&_td]:border-border/50",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
