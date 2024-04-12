import { useState } from "react";


function CategoryEdit(props) {
    const [edit, setedit] = useState(false);

  return (
    <>
      <span
        className="material-symbols-outlined pointer mx-3"
        style={{ cursor: "pointer" }}
        
      >
        edit_note
      </span>
      
    </>
  );
}

 export function ItemEdit(props) {
  const [edit, setedit] = useState(false);

  return (
    <>
      <span
        className="material-symbols-outlined pointer mx-3"
        style={{ cursor: "pointer" }}
      >
        edit_note
      </span>
    </>
  );
}

export default CategoryEdit;
