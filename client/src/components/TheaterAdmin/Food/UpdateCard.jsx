
import { useEffect, useState } from "react";

export function UpdateCard({ update, onSave }) {
  const [name, setName] = useState(update.name);
  const [price, setPrice] = useState(update.price);

  const handleSave = () => {
    onSave({ ...update, name, price }); // Call the onSave function with the updated values
  };

  return (
    
  );
}
