import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

export default function App() {

  function handleAddItems(item){
    setItems((items)=> [...items, item]);
  }

  function handleDeleteItems(id){
    setItems((items)=> items.filter((item)=> item.id !== id));
  }

  function handleToggleItem(id){
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  const [items, setItems] = useState([]);

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeletItem={handleDeleteItems} onToggleItem={handleToggleItem} />
      <Stats />
    </div>
  )
}

function Logo() {
  return <h1>🌴 Far away 👝</h1>
}

function Form({onAddItems}) {

  const [description,setDescription] = useState("");
  const [count,setCount] = useState(1);
  

  function handleSubmit (e){
    e.preventDefault();

    if(!description) return;

    const newItem = {description, count, packed:false, id: Date.now()};

    onAddItems(newItem);

    setDescription("");
    setCount(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip ?</h3>
      <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({items, onDeletItem, onToggleItem}) {
  return (
    <div className="list">
     <ul>
      {items.map((item) => (<Item item={item} onDeletItem={onDeletItem} key={item.id} onToggleItem={onToggleItem}/>))}
     </ul>
    </div>
  )
}

function Item ({item, onDeletItem, onToggleItem}){
  return (
      <li>
      <input type="checkbox" value={item.packed} onChange={()=>onToggleItem(item.id)} ></input>
       <span style={item.packed ? {textDecoration:"line-through"} : {}}>
        {item.quantity} {item.description}
       </span>
       <button onClick={()=> onDeletItem(item.id)}>❌</button>
      </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>
      👜 You have X items on your list, and you already have packed X (X%)
      </em>
    </footer>
  )
}



