import { tva, isWeb } from "@gluestack-ui/utils/nativewind-utils";

const baseStyle = isWeb
    ? "font-sans tracking-sm my-0 bg-transparent border-0 box-border display-inline list-none margin-0 padding-0 position-relative text-start no-underline whitespace-pre-wrap word-wrap-break-word"
    : "";

export const textStyle = tva({
    base: `text-foreground font-body text-base ${baseStyle}`,

    variants: {
        isTruncated: {
            true: "web:truncate",
        },
        semibold: {
            true: "font-body-semibold",
        },
        bold: {
            true: "font-body-bold",
        },
        underline: {
            true: "underline",
        },
        strikeThrough: {
            true: "line-through",
        },
        size: {
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
            "4xl": "text-4xl",
            "5xl": "text-5xl",
            "6xl": "text-6xl",
        },
        italic: {
            true: "italic",
        },
        highlight: {
            true: "bg-lime",
        },
    },
});
