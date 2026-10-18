import React, { forwardRef, memo } from "react";
import { headingStyle } from "./styles";
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
type IHeadingProps = VariantProps<typeof headingStyle> &
    React.ComponentPropsWithoutRef<"h1"> & {
        as?: React.ElementType;
    };

const MappedHeading = memo(
    forwardRef<HTMLHeadingElement, IHeadingProps>(function MappedHeading(
        {
            size,
            className,
            isTruncated,
            bold,
            underline,
            strikeThrough,
            italic,
            highlight,
            ...props
        },
        ref,
    ) {
        switch (size) {
            case "xl":
                return (
                    <h1
                        className={headingStyle({
                            size,
                            isTruncated: isTruncated as boolean,
                            bold: bold as boolean,
                            underline: underline as boolean,
                            strikeThrough: strikeThrough as boolean,
                            italic: italic as boolean,
                            highlight: highlight as boolean,
                            class: className,
                        })}
                        {...props}
                        ref={ref}
                    />
                );
            case "lg":
                return (
                    <h2
                        className={headingStyle({
                            size,
                            isTruncated: isTruncated as boolean,
                            bold: bold as boolean,
                            underline: underline as boolean,
                            strikeThrough: strikeThrough as boolean,
                            italic: italic as boolean,
                            highlight: highlight as boolean,
                            class: className,
                        })}
                        {...props}
                        ref={ref}
                    />
                );
            case "md":
                return (
                    <h3
                        className={headingStyle({
                            size,
                            isTruncated: isTruncated as boolean,
                            bold: bold as boolean,
                            underline: underline as boolean,
                            strikeThrough: strikeThrough as boolean,
                            italic: italic as boolean,
                            highlight: highlight as boolean,
                            class: className,
                        })}
                        {...props}
                        ref={ref}
                    />
                );
            case "sm":
                return (
                    <h4
                        className={headingStyle({
                            size,
                            isTruncated: isTruncated as boolean,
                            bold: bold as boolean,
                            underline: underline as boolean,
                            strikeThrough: strikeThrough as boolean,
                            italic: italic as boolean,
                            highlight: highlight as boolean,
                            class: className,
                        })}
                        {...props}
                        ref={ref}
                    />
                );
            default:
                return (
                    <h3
                        className={headingStyle({
                            size,
                            isTruncated: isTruncated as boolean,
                            bold: bold as boolean,
                            underline: underline as boolean,
                            strikeThrough: strikeThrough as boolean,
                            italic: italic as boolean,
                            highlight: highlight as boolean,
                            class: className,
                        })}
                        {...props}
                        ref={ref}
                    />
                );
        }
    }),
);

const Heading = memo(
    forwardRef<HTMLHeadingElement, IHeadingProps>(function Heading(
        { className, size = "md", as: AsComp, ...props },
        ref,
    ) {
        const {
            isTruncated,
            bold,
            underline,
            strikeThrough,
            italic,
            highlight,
        } = props;

        if (AsComp) {
            return (
                <AsComp
                    className={headingStyle({
                        size,
                        isTruncated: isTruncated as boolean,
                        bold: bold as boolean,
                        underline: underline as boolean,
                        strikeThrough: strikeThrough as boolean,
                        italic: italic as boolean,
                        highlight: highlight as boolean,
                        class: className,
                    })}
                    {...props}
                    ref={ref}
                />
            );
        }

        return (
            <MappedHeading
                className={className}
                size={size}
                ref={ref}
                {...props}
            />
        );
    }),
);

Heading.displayName = "Heading";

export { Heading };
