import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

export default function App() {

  const [items, setItems] = useState([]);

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

  function handleClearList(){

    const confirmed = window.confirm('Are you sure you want to empty the list ?')

    if(confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeletItem={handleDeleteItems} onToggleItem={handleToggleItem} onClearList={handleClearList} />
      <Stats items={items}  />
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

function PackingList({items, onDeletItem, onToggleItem, onClearList}) {

  const [sortBy, setSortby] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") sortedItems = items.slice().sort((a,b)=> a.description.localeCompare(b.description) );

  if (sortBy === "packed") sortedItems = items.slice().sort((a,b)=> Number(a.packed) - (b.packed));



  return (
    <div className="list">
     <ul>
      {sortedItems.map((item) => (<Item item={item} onDeletItem={onDeletItem} key={item.id} onToggleItem={onToggleItem}/>))}
     </ul>

    <div className="actions">
      <select value={sortBy} onChange={(e)=> setSortby(e.target.value)} >
        <option value="input">Sort by Input Order</option>
        <option value="description">Sort by Description</option>
        <option value="packed">Sort by Packed Status</option>
      </select>
      <button  onClick={onClearList} >Clear List</button>
    </div>

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

function Stats({items}) {
  if(!items.length){
    return(
      <footer className="stats">
      <em>
      Start adding some items to your packing list 📃 !!!
      </em>
    </footer>
    )
  }

  const numItems = items.length;
  const numPacked = items.filter((item)=> item.packed).length;
  const percentage = Math.round(numPacked/numItems * 100);

  return (
    <footer className="stats">
      <em>
      {percentage === 100 ? 'You got everything ready to go ✈' : 
      `👜 You have ${numItems} items on your list, and you already have packed ${numPacked} (${percentage}%)`
      }
      </em>
    </footer>
  )
}



