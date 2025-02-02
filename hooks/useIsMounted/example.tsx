import React, { useState, useEffect } from "react";
import { useIsMounted } from "./useIsMounted";

interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function UseIsMountedExample() {
  const [items, setItems] = useState<TodoItem[]>([]);

  const isMounted = useIsMounted();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((items) => {
        if (!isMounted.current) {
          return;
        }
        // если не удален компонент и до сих пор актуален
        setItems(items);
      });
  }, []);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
