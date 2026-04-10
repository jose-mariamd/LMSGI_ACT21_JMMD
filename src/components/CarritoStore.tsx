import { useEffect, useState } from "react"
import Productos from './productos.json'

interface Producto{
    id: Number,
    producto: String,
    precio: Number,
    disponible: Boolean,
    caracteristicas: String[]
};

export function CarritoStore() {
    // Total
    const [total, setTotal] = useState<number>(0)
    
    const [carrito, setCarrito] = useState(() => {
        const data = localStorage.getItem("carrito");
        return data ? JSON.parse(data) : [];
    })
    //TODO: Actulizar el total del carrito
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }, [carrito])

    const handleAnadirProducto = (producto: Producto) => {
        // TODO: ...
        setCarrito([
            ...carrito,
            producto
        ]);
        setTotal(total + producto.precio)
    }

    const vaciarCarrito = () => {
        // TODO ...
        setCarrito([])
    }

    const productos = Productos
        
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Catálogo de productos */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800">Productos</h2>
                    <div className="grid gap-4">
                        {productos.map(p => (
                            <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{p.producto}</h3>
                                        <p className="text-gray-600 font-mono text-sm">{p.precio.toFixed(2)}€</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {p.disponible ? "Disponible" : "Agotado"}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                    {p.caracteristicas.join(" • ")}
                                </div>
                                <button
                                    onClick={() => handleAnadirProducto(p)}
                                    disabled={!p.disponible}
                                    className={`w-full py-2 text-sm font-medium rounded-lg transition-colors ${p.disponible ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                                >
                                    {p.disponible ? "Añadir a mi carrito" : "No disponible"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Estado del carrito */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            Carrito <span className="bg-blue-600 text-white text-sm px-2 py-0.5 rounded-full">{carrito.length}</span>
                        </h2>
                        {carrito.length > 0 && (
                            <button
                                onClick={vaciarCarrito}
                                className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
                            >
                                Vaciar carrito
                            </button>
                        )}
                    </div>

                    {carrito.length === 0 ? (
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500">
                            El carrito está vacío
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                            <ul className="divide-y divide-gray-200">
                                {carrito.map((item, index) => (
                                    <li key={index} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                        <div>
                                            <span className="font-medium text-gray-800">{item.producto}</span>
                                        </div>
                                        <span className="text-gray-600 font-mono">{item.precio.toFixed(2)} €</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center text-lg">
                                <span className="font-bold text-gray-900">Total:</span>
                                <span className="font-black text-gray-900">
                                    {total.toFixed(2)} €
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}