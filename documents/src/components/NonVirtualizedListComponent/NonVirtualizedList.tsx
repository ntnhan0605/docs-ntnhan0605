import type { FC } from 'react';

export const NonVirtualizedList: FC<{ items: any[] }> = ({ items }) => {
  return (
    <ul className="max-h-[50vh] overflow-auto border-2 border-solid border-gray-500">
      {items.map((data, index) => {
        return <ListItem key={`${index}`} index={index} data={data} />;
      })}
    </ul>
  );
};

const ListItem: FC<{ index: number; data: any }> = ({ index }) => {
  return <li key={`${index}`}>Non virtualized list index - {index}</li>;
};
