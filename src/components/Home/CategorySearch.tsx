import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {  orderByCategories, resetCategoriesFilter} from '../../redux/categories/categoriesActions';

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
        if(category==='reset'){
            dispatch(resetCategoriesFilter())
            setSelected(null)
            
        } else {
            console.log(category)
            setSelected(category)
            // setSelected(category)
            dispatch(orderByCategories(category));
        }
        setOpen(false);
    };

    const handleOpen = () => {
        
        setOpen(!open)
        console.log(open)
        console.log(initialCategories)
        console.log(searched)
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setOpen(true)
        setSearching(event.target.value);
        console.log(event.target.value);
    }


    
    return (
        <div id='categoriesComponent' className="searchDropdown mt-3 ml-3">
            <div className="searchControl" onClick={() => handleOpen()}>
                <div className="searchSelected-value" >
                    <input type="text" 
                        value={selected?selected:undefined}
                        // placeholder={selected ? selected : 'Select a category'}
                        placeholder={selected !== null ? selected : 'Select category'}
                        onChange={handleChange}
                        onClick={()=> setSelected(null)}
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
                    <li className='searchOption' onClick={() => handleClick('reset')}>Reset Filter</li>
                    </ul>
            </div>
        </div>
            )
    }

export default CategorySearch;