import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {  orderByCategories } from '../../redux/categories/categoriesActions';
import "./CategorySearch.scss";
import { url } from '../../api';
import { useRef } from 'react';

const CategorySearch = () => {
    
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string|null>(null)
    const [searching, setSearching] = useState<string>('')
    const [initialCategories, setInitialCategories] = useState<any>([])
    const [searched, setSearched] = useState<any>([]);

    const dispatch = useDispatch();
    const ref = useRef(null);
    
    useEffect(() => {
        (async () => {
            const resp = await axios.get(`${url}/categories`);
            const categories: string[] = resp.data.map((cat: any) => ({name: cat.name}));
            setInitialCategories(categories);
            setSearched(categories)
        })()
    }, [])
    
    useEffect(() => {
        setSearched(
            initialCategories.filter((cat: any) => cat.name.toLowerCase().includes(searching))
        )
    }, [searching])
    
    // console.log('initial categories',initialCategories);
    // console.log('searched', searched)
    
    const handleClick = (category:string) => {
        console.log(category)
        setSelected(category)
        // setSelected(category)
        setOpen(false);
        // dispatch(orderByCategories(category));
    };

    const handleOpen = () => {
        setOpen(!open)
        console.log(open)
        console.log(initialCategories)
        console.log(searched)
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setSearching(event.target.value);
    }
     
    
    return (
        <div className="searchDropdown">
            <div className="searchControl" onClick={() => handleOpen()}>
                <div className="searchSelected-value" >
                    <input type="text" 
                        defaultValue={selected?selected:''}
                        // placeholder={selected ? selected : 'Select a category'}
                        placeholder={selected !== null ? selected : 'Select a categlrh'}
                        onChange={handleChange}
                        // onBlur={() => setOpen(!open)}
                        // onClick={() => setOpen(!open)}
                    />
                </div>
                <div className={`searchArrow ${open ? "open" : null}`}/>
            </div>
            <div className={`searchOptions ${open ? "open" : null}`}>
                <ul>     
                {searched && searched.map((element: any, i: number) => (
                    <li
                    key={i} 
                    onClick={() => handleClick(element.name)}
                    className={`searchOption ${selected === element.name ? 'selected' : null}`} 
                    >
                            {element.name}</li>)
                    )}
                    </ul>
            </div>
        </div>
            )
    }

export default CategorySearch;