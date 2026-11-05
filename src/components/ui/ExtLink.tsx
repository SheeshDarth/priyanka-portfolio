import type { ReactNode } from "react";
import { isLive, type ApprovedLink } from "@/content/links";

type Props = {
  link: ApprovedLink;
  className?: string;
  children?: ReactNode;
  showArrow?: boolean;
};

/** Renders nothing unless the link has an approved href. */
export function ExtLink({ link, className, children, showArrow = true }: Props) {
  if (!isLive(link)) return null;
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children ?? link.label}
      {showArrow && (
        <span aria-hidden="true" className="ml-2">
          ↗
        </span>
      )}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
