import React from "react";

export interface PageProps {
  items: string[];
}

// We can use functions here
function formatItem(item: string) {
  return item.toLocaleLowerCase();
}

export default function Page({ items }: PageProps) {
  return (
    <div>
      Items Here:
      <ul>
        {items.map((item) => (
          <li key={item}>{formatItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}
