import { useDispatch, useSelector } from "react-redux";
import { useState, MouseEvent } from "react";
import { searchProduct, searchProductAC } from "../../redux/actions/index";
import { useHistory } from "react-router-dom";
import { StoreType } from '../../redux/reducers/index'
import './SearchBar.css'

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

interface propsObj {
  id: number,
  image: string,
  name: string,
  description: string,
  price: number,
}

interface ProductsType {
  products: propsObj[],
  pages: string,
}


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

  const dispatch = useDispatch();
  const history = useHistory();
  const productsState = useSelector<StoreType, ProductsType>((state) => state.products);
  const acListState = useSelector<StoreType, ProductsType>((state) => state.acList);

  console.log('products', productsState);
  console.log('ACLIST', acListState)
  // Creo 2 Estados locales. El primero, en product va a guardar el string ingresado en la SearchBar por el user
  // para luego despachar una action, y pegarle a la API
  // EL segundo Estado local, es para hacer que el formulario se controlado

  const [state, setState] = useState({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    product: '',
    acList: ''
  });
  const [errors, setErrors] = useState({
    product: ''
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
      activeSuggestion: 0,
      showSuggestions: true,
      product: e.target.value,
      acList: e.target.value
    }
    )
    dispatch(searchProductAC(e.target.value))
  }




  // funcion que realiza el dispatch de la action con el valor del input almacenado en el estado local
  // que luego reinicia el input como un campo vacio

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(state.product)
    dispatch(searchProduct(state.product));
    setState({
      ...state,
      showSuggestions: false,
      product: ''
    })
    history.push('/ProductsSearched');
  }



  // Funcion onKeyDown

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    const { activeSuggestion } = state;

    if (e.code === "Enter") {        // <-- Si apreto enter, le clavo en el input el elemento del array con el indice indicado por el activeSuggestion
      console.log('Entro al Enter')
      setState({
        ...state,
        activeSuggestion: 0,
        showSuggestions: false,
        product: acListState.products[activeSuggestion].name
      });
      history.push('/ProductsSearched');
    } else if (e.code === "ArrowUp") {   // <-- Si apreto flechita para arriba, bajo el indice del array porque voy para atras hacia arriba en el desplegable
      if (activeSuggestion === 0) {
        return;
      } else
        setState({
          ...state,
          activeSuggestion: activeSuggestion - 1
        });

    } else if (e.code === "ArrowDown") {     // <-- Si apreto flechita para abajo, subo el indice del array porque avanzo hacia abajo en el desplegable
      if (activeSuggestion - 1 === acListState.products.length) {
        return;
      }
      setState({
        ...state,
        activeSuggestion: activeSuggestion + 1
      });
    }
  };

  // Funcion onClick

  const onClick = (e: MouseEvent<HTMLLIElement, MouseEvent>): void => {
    setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      product: e.currentTarget.innerText,
      acList: e.currentTarget.innerText,        // reseteo todo y le clavo el valor del item del desplegable en la propiedad del estado local en el que va el input
    });
  };


  // Logica del desplegable

  var suggestionsListComponent;

  if (state.showSuggestions && state.acList) {                  // Si el boolean en el estado para mostrar el desplegable y si el user esta escribiendo en el input son true...
    if (acListState.products.length) {                         // Y si lo que me trae el selector tiene algo
      suggestionsListComponent = (                            // me guardo en la suggestionsListComponent una lista desordenada cuyos items provengan de un map que le hago a lo que me trajo el selector
        <ul className="suggestions">
          {acListState.products.map((suggestion, index) => {
            let className: string = '';
            if (index === state.activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={index} onClick={(e: any) => onClick(e)}>
                {suggestion.name}
              </li>
            );
          })}
        </ul>
      );
    } else {                                      // si el boolean en el estado para mostrar el desplegable esta en true y el user esta escribiendo algo
      suggestionsListComponent = (                // PERO el selector no me trajao nada, muestro que no hay sugerencias
        <div className="no-suggestions">
          <em>Product not found.</em>
        </div>
      );
    }
  }



  // Form con el input y el botón de submit

  return (
    <form className="d-flex" id="searchBarForm" >
      <input className="form-control me-2" type="search" aria-label="Search"
        placeholder="Search your product here"
        name="product" value={state.product} onChange={handleInputChange}
        onKeyDown={onKeyDown}
      />
      {suggestionsListComponent}
      {errors.product && <p>{errors.product}</p>}
      <button id='buttonSearch' className="btn" type="submit" value="Search" onClick={(e: any) => handleSubmit(e)}> Search </button>
    </form>
  );
}

