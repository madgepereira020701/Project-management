import { useRef } from "react";
import Input from "../components/Input";
import Modal from '../components/Modal';
export default function NewProject({onAdd, onCancel}) 
{
    const modal = useRef();
    const title = useRef();
    const description = useRef();
    const duedate = useRef();

    async function handleSave()
    {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = duedate.current.value;


        if(enteredTitle.trim() === '' || 
        enteredDescription.trim() === '' || 
        enteredDueDate.trim() === '' )
        {
            modal.current.open();
            return; 
    }

    try {
    const response  = await fetch("http://localhost:3000/addproject", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            title: enteredTitle,
            description: enteredDescription,
            duedate: enteredDueDate,
          }),
        })

    if(!response.ok) {
        throw new Error(response.statusText)
      }
      const data = response.json();
        onAdd(data);

    }

catch (err) {
    console.error(err);
}
    }

    return ( 
        <>    
        <Modal ref={modal} buttonCaption="Okay">
         <h2 className="text-xl font-bold tect-stone-700 my-4">Invalid Input</h2>
         <p className="text-stone-600 mb-4">Oops ... looks like you forgot to enter a value.</p>
         <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every
            input field.
         </p>
            </Modal>
        <div className="w-[35rem] mt-16 ">
        <menu className="flex items-centern justify-end gap-4 my-4">
          <li><button 
          className="text-stone-800 hover:text-stone-950"
          onClick={onCancel}>
            Cancel</button></li>
          <li><button 
          className="px-6 py-2 rounded-md bg-green-800 text-stone-50 hover:bg-stone-950"
          onClick={handleSave}>Save</button></li>
        </menu>
        <div>
        <Input type="text" ref={title} label="Title" />
            <Input ref={description} label="Description" textarea />
            <Input type="date" ref={duedate} label="Due Date" />

        </div>
    </div>
    </>

    );
}
    
    
    
    
    
    
    