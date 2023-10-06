
import {useState,useEffect,createContext} from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import {useRouter} from 'next/router'
/*Importanto componente de next router para las rutas */

const QuioscoContext=createContext();

const QuioscoProvider=({children}) =>{
    const [categorias,setCategorias]=useState([])
    const [categoriaActual,setCategoriaActual]=useState({})
    const [producto,setProducto]=useState({})
    const [modal,setModal]=useState(false)
    const [pedido, setPedido]=useState([])

    const router = useRouter()

    const obtenerCategorias= async()=>{
        const {data} = await axios ("/api/categorias")
        setCategorias(data)
    }
    useEffect(()=>{
        obtenerCategorias()
    },[])

    useEffect(()=>{
        setCategoriaActual(categorias[0])
    },[categorias])

    const handleClickCategoria=id=>{
        const categoria=categorias.filter(cat=>cat.id===id)
        setCategoriaActual(categoria[0])
        router.push("/")
    }

    const handleSetProducto=producto=>{
        setProducto(producto)
    }

    const handleChangeModal=()=>{
        setModal(!modal)
    }

    const handleAgregarPedido=({categoriaId,...producto})=>{
        if(pedido.some(productostate=>productostate.id===producto.id)){
            //actualizar la cantidad
            const pedidoActualizado=pedido.map(productostate=>productostate.id=== producto.id ? producto : productostate)
            setPedido(pedidoActualizado);
            toast.success("Actualizando pedido")
        }else{
            setPedido([...pedido,producto])
            toast.success("Agregando pedido")
        }
        setModal(false)
    }
    const handleEditarCantidades=id=>{
        const productoActualizar=pedido.filter(producto=>producto.id===id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }
    const handleEliminarProducto=id=>{
        const pedidoActualizar=pedido.filter(producto=>producto.id!==id)
        setPedido(pedidoActualizar)
 
    }
  return (
    <QuioscoContext.Provider
        value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto

        }}
    >
    {children}
    </QuioscoContext.Provider>
  )
}
export {
    QuioscoProvider
}

export default QuioscoContext
