import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <span title={content} style={{ cursor: 'help', borderBottom: '1px dotted #888' }}>
      {children}
    </span>
  );
}; 