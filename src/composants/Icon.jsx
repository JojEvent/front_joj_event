import React from "react";
import * as LucideIcons from "lucide";

const Icon = ({ name, size = 20, className = "", strokeWidth = 2, ...props }) => {
  const iconNode = LucideIcons[name];

  if (!iconNode) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {iconNode.map(([tag, attrs], index) =>
        React.createElement(tag, { ...attrs, key: `${name}-${index}` }),
      )}
    </svg>
  );
};

export default Icon;
