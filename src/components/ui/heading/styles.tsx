import { tva, isWeb } from "@gluestack-ui/utils/nativewind-utils";

const baseStyle = isWeb
    ? "font-sans tracking-[-0.03em] bg-transparent border-0 box-border display-inline list-none margin-0 padding-0 position-relative text-start no-underline whitespace-pre-wrap word-wrap-break-word"
    : "";

export const headingStyle = tva({
    base: `text-foreground font-display tracking-[-0.03em] my-0 ${baseStyle}`,
    variants: {
        isTruncated: {
            true: "truncate",
        },
        bold: {
            true: "font-display-heavy",
        },
        underline: {
            true: "underline",
        },
        strikeThrough: {
            true: "line-through",
        },
        italic: {
            true: "italic",
        },
        highlight: {
            true: "bg-lime",
        },
        size: {
            xl: "text-[40px]",
            lg: "text-[34px]",
            md: "text-[24px]",
            sm: "text-[22px]",
        },
    },
});
