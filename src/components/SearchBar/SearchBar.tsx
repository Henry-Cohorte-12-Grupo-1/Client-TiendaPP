import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchProduct } from "../../redux/actions/index";

// Interfaces

interface localState {
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
    product:''
  });
  const [errors, setErrors] = useState({
    product:''
  });


  //Funcion que maneja los Estados locales, en el 1er caso para el mensaje de error a través de la funcion Validate, 
  // y en el segundo para guardar el valor de lo ingresado en el input por el usuario

  const handleInputChange = (e: any): void => {

    setErrors(validate({                   
      ...state,
      [e.target.name]: e.target.value
    }));

    setState({
      ...state,
      [e.target.name]: e.target.value
      }
    )
  }

  // funcion que realiza el dispatch de la action con el valor del input almacenado en el estado local
  // que luego reinicia el input como un campo vacio

  const handleSubmit =  (e: any): void => {         
    e.preventDefault();
    dispatch(searchProduct(state.product));
    setState({
      product:''
    })
  }

  // Form con el input y el botón de submit

  return (
    <form>
        <input
          type="text"
          placeholder="Search your product here!"
          name="product" value={state.product} onChange={handleInputChange}
        />
          {errors.product && <p>{errors.product}</p>}
          <button type="submit"  value="Search" onClick={handleSubmit}> Search </button>
    </form>
  );
}

