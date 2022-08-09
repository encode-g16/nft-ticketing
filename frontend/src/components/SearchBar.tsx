import * as React from 'react';
import {useState, useRef} from 'react';

export interface SearchBarProps {

}

export default function SearchBar() {
    const [input, setInput] = useState('');
    const spanRef = useRef<HTMLSpanElement>(null);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput(e.target.value);
        if(spanRef.current) {
            spanRef.current.style.cssText += "display:none;";
        };
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // await fetch(`https://api.github.com/users/${input}`)
        // .then(response => {
        //     if (!response.ok) {
        //         if(spanRef.current) {
        //             spanRef.current.style.cssText += "display:inline;";
        //         };
        //     }
        //     return response.json();
        // })
        // .then(data => setUserdata && setUserdata(data))
    }

    return (
    <div>
      <img className="icon-search" src="icon-search.svg" alt="" />
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder="Search Github username..." value={input} onChange={(e) => handleChange(e)}/>
        <span className="fade" ref={spanRef}>No results</span>
        <button type="submit" className="btn-search">Search</button>
    </form>
    </div>
  );
}
