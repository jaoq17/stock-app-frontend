import { useState } from 'react';
import './App.css';

const initialState = { name: '', price: 0}

const App = () => {
  const [isLoading , setIsLoading] = useState(false)
  const [product , setProduct] = useState(initialState)



  const handleChange = (e) => {
    const fieldValue = e.target.value
    const fieldName = e.target.name

    // console.log({ fieldValue, fieldName })

    setProduct({...product, [fieldName]: fieldValue })
    // setProduct(name)
  }

  

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!product.name){
      console.log('Tienes que llenar el campo NOMBRE')
      return
    }


    setIsLoading(true)

    fetch('http://localhost:5000/api/v1/products', {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify (product),
    })
      .then((res)=> res.json())
      .then((data) => {
        if (data.ok) {
          console.log("Producto creado con éxito!")
          setProduct(initialState)     // con esta linea de codigo cuadno se crea el producto se reinicializan los campos del input
          
        }else{
          console.log(data.message)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }

  console.log({ isLoading })

  return (
    <div className="App">
      <h1>Nuevo producto</h1>
      <form onSubmit={handleSubmit}>
        <input 
          onChange={handleChange}
          value={product.name}
          type='text' 
          name='name' 
          placeholder='Nombre del producto...'
        />
        <input
          onChange={handleChange}
          value={product.price}   // las llaves se usan porque estamos usando codigo de javascript
          type='number' 
          name='price' 
          placeholder='Precio del producto...' 
        />
        <button>
          {
            isLoading ? 'Creando producto...' : 'Crear producto'
          }
        </button>
      </form>
    </div>
  );
}

export default App;
