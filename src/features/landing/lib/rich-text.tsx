import type { ReactNode } from "react";

/** Rich-text tags shared by landing messages, e.g. `One<br></br>Two`. */
export const lineBreaks = {
  br: () => <br />,
};

/** Renders a rich-text chunk as a link that opens in a new tab. */
export function externalLink(href: string) {
  function ExternalLink(chunks: ReactNode) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    );
  }

  return ExternalLink;
}
