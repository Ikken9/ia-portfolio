import React from "react";

export default function MDXImage({ src, alt, ...props }) {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
    return React.createElement('img', {
        src: `${base}${src}`,
        alt: alt,
        ...props
    });
}