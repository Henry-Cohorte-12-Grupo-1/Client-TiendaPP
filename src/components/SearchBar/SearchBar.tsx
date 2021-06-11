import { useDispatch } from "react-redux";
import { useState, MouseEvent, useEffect } from "react";
import { searchProduct } from "../../redux/actions/index";
import { Link } from "react-router-dom";

// Interfaces

interface localState {
    activeSuggestion: number,                  
    filteredSuggestions?: string[],              
    showSuggestions: boolean,
    product: string;
};

interface errorState {
    product: string;
};


// Función para validar el input del form controlado


function validate(state: localState) {   

  let errors: errorState = {
      product: ''
  };

  if (!/^[a-zA-Z0-9 ]*$/.test(state.product)) {
    errors.product = 'Use only alphanumeric characters';
  }

  return errors;
};


export default function SearchBar() {

    const dispatch = useDispatch();  // hook de dispatch


  // Creo 2 Estados locales. El primero, en product va a guardar el string ingresado en la SearchBar por el user
  // para luego despachar una action, y pegarle a la API
  // EL segundo Estado local, es para hacer que el formulario se controlado

  const [state, setState] = useState({
    activeSuggestion: 0,                  
    filteredSuggestions: [],              
    showSuggestions: false,
    product:''
  });
  const [errors, setErrors] = useState({
    product:''
  });


  //Funcion que maneja los Estados locales, en el 1er caso para el mensaje de error a través de la funcion Validate, 
  // y en el segundo para guardar el valor de lo ingresado en el input por el usuario

  const handleInputChange = (e: any): void => {
     
    e.preventDefault();
    setErrors(validate({                   
      ...state,
      [e.target.name]: e.target.value
    }));

    setState({
      ...state,
      [e.target.name]: e.target.value
      }
    )

   // if (state.product !== ''){
     console.log(e.target.value)
     //console.log(e.target)
     //console.log(state.product)
     dispatch(searchProduct(state.product))
    //}
  }


  // funcion que realiza el dispatch de la action con el valor del input almacenado en el estado local
  // que luego reinicia el input como un campo vacio

  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>): void => {         
    e.preventDefault();
    dispatch(searchProduct(state.product));
    setState({
      ...state,
      product:''
    })
  }

  // Funcion onKeyDown

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    const { activeSuggestion, filteredSuggestions } = state;    

    if (e.key === "13") {        // <-- Si apreto enter, le clavo en el input el elemento del array con el indice indicado por el activeSuggestion
    setState({
         ...state,
        activeSuggestion: 0,
        showSuggestions: false,
        product: filteredSuggestions[activeSuggestion]
    });
    } else if (e.key === "38") {   // <-- Si apreto flechita para arriba, bajo el indice del array porque voy para atras hacia arriba en el desplegable
    if (activeSuggestion === 0) {
        return;
    }
    setState({ 
      ...state,
      activeSuggestion: activeSuggestion - 1 });
    }

    else if (e.key === "40") {     // <-- Si apreto flechita para abajo, subo el indice del array porque avanzo hacia abajo en el desplegable
    if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
    }
    setState({ 
      ...state,
      activeSuggestion: activeSuggestion + 1 });
    }
};

// Funcion onClick

const onClick = (e: MouseEvent<HTMLLIElement, MouseEvent>): void => {
  setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      product: e.currentTarget.innerText        // reseteo todo y le clavo el valor del item del desplegable en la propiedad del estado local en el que va el input
      });
};

// Logica del desplegable

let suggestionsListComponent;

if (state.showSuggestions && state.product) {                  // Si el boolean en el estado para mostrar el desplegable y si el user esta escribiendo en el input son true...
  if (state.filteredSuggestions.length) {                // Y si lo que me trae el selector tiene algo
    suggestionsListComponent = (                   // me guardo en la suggestionsListComponent una lista desordenada cuyos items provengan de un map que le hago a lo que me trajo el selector
      <ul>
        {state.filteredSuggestions.map((suggestion, index) => {
          if (index === state.activeSuggestion) {
          }
          return (
            <li key={suggestion} onClick={ (e:any) => onClick(e)}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  } else {                                      // si el boolean en el estado para mostrar el desplegable esta en true y el user esta escribiendo algo
    suggestionsListComponent = (                // PERO el selector no me trajao nada, muestro que no hay sugerencias
      <div>
        <em>No suggestions available.</em>
      </div>
    );
  }
}

  // Form con el input y el botón de submit

  return (
    <form>
        <input
          type="text"
          placeholder="Search your product here!"
          name="product" value={state.product} onChange={handleInputChange}
          onKeyDown={onKeyDown}
        />
        {suggestionsListComponent}
          {errors.product && <p>{errors.product}</p>}
          <Link to="/ProductsSearched"><button type="submit"  value="Search" onClick={ (e:any) => handleSubmit}> Search </button></Link>
    </form>
  );
}

