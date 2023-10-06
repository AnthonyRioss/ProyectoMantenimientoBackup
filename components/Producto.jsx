import Image from "next/image"
import { formaterDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

function Producto({producto}) {
    /*cambios realizadosgit*/
  const {nombre,imagen,precio}=producto
  const {handleSetProducto,handleChangeModal}=useQuiosco()

  return (
    <div className="border p-3">
      
      <Image
      src={`/assets/img/${imagen}.jpg`} 
      alt={`imagen plato ${nombre}`}
      width={300}
      height={100}
      />
      <div className="p-2">
        <h3 className=" font-bold text-2xl">{nombre}</h3>
        <p className="mt-3 font-black text-3xl text-amber-500">{formaterDinero(precio)}</p>
        <button
        type="button"
        className="bg-indigo-400  hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
        onClick={()=>
          {
          handleChangeModal();
          handleSetProducto(producto);
          }
        }
        >
        Agregar</button>

      
      </div>

        
    </div>
  )
}

export default Producto
