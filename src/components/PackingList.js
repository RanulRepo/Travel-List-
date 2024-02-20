import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onDeletItem, onToggleItem, onClearList }) {

  const [sortBy, setSortby] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - (b.packed));



  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (<Item item={item} onDeletItem={onDeletItem} key={item.id} onToggleItem={onToggleItem} />))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed Status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>

    </div>
  );
}
