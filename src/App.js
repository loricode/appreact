import React,{useState, useEffect} from 'react';
import {FaCheckCircle, FaTrash, FaPen } from 'react-icons/fa'; // npm i react-icons
import axios from 'axios'; // npm i axios

function App() {
  
    const [lista, setLista] =  useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [id, setId] = useState(''); 
    const [bandera, setBandera] = useState(true);

useEffect(() => {
  getProductos();
},[])

async function getProductos(){
    const res = await axios.get('http://localhost/apirest/');
    setLista(res.data) 
    console.log(res.data)
} 

async function addProducto() {
    const obj = {nombre, precio};
    const res = await axios.post('http://localhost/apirest/', obj);
    console.log(res.data)
    getProductos();
}

async function UpdateProducto(e) {
    const obj = {id, nombre, precio};
    const res = await axios.put('http://localhost/apirest/', obj);
    console.log(res.data)
    getProductos();

}

function addUpdate(e) {
    e.preventDefault(); 
    bandera? addProducto():UpdateProducto();
    limpiarEstado();
}

async function deleteProducto(id){ 
 
   if(window.confirm('Quieres eliminar?')){
      const res = await axios.delete('http://localhost/apirest/?id='+id);
      getProductos();
      console.log(res.data)
  }
} 

async function getProducto(id){
    const res = await axios.get('http://localhost/apirest/?id='+id);
    setId(res.data.id);
    setNombre(res.data.nombre);
    setPrecio(res.data.precio);
    setBandera(false)
} 

function limpiarEstado(){
  setId('');
  setNombre('');
  setPrecio('');
  setBandera(true);
}


return (
 
  <div className="container ">

       <div className="col-md-6 p-2 ">
         <form className="card p-2 mt-3 border-secondary">
           <h5>React Producto</h5>
           <div className="form-group">
              <input type="text" placeholder="Nombre" className="form-control"
                  onChange={(e) => setNombre(e.target.value)}
                  value={nombre}/></div>

           <div className="form-group"> 
              <input type="number" placeholder="Precio" className="form-control"
                  onChange={(e) => setPrecio(e.target.value)} 
                  value={precio}/></div> 
            
              <button  className="btn btn-outline-success btn-sm" 
                onClick={(e) => addUpdate(e)} >
                  {bandera?"add":"Edit"}
                 <FaCheckCircle /></button> 
         </form>
       </div>

        <div className="col-md-6 p-2">
            { lista.map( producto  => (
            <div className="card p-2 mt-2 border-primary" key={producto.id}>
              <div className="card-body">
                <h5 className="text-primary"> {producto.nombre} {producto.precio}</h5>  
                    <div className="d-flex flex-row-reverse" >
                       <button  className="btn btn-outline-danger btn-sm " 
                           onClick={() => deleteProducto(producto.id)} ><FaTrash />
                           </button> 
                       <button className="btn btn-outline-secondary btn-sm mr-2" 
                           onClick={() => getProducto(producto.id)} ><FaPen />
                           </button> 
                     </div>  
                      
                  </div> 
              </div>         
           ))}  
     </div>
</div>

  );
}

export default App;
