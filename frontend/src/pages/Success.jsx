
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Success.css'

const Success = () => {

    const navigate = useNavigate()

    const numeroWhatsApp = '543816991773'

    const mensaje = encodeURIComponent(
        'Hola, realicé una compra y envío el comprobante de pago.'
    )

    const abrirWhatsApp = () => {
        window.open(
            `https://wa.me/${numeroWhatsApp}?text=${mensaje}`,
            '_blank'
        )
    }

    const volverAlInicio = () => {
        navigate('/')
    }

    return (
        <>
            <Navbar />

            <main className="success-page">
                <div className="success-card">

                    <div className="success-icon">
                        ✓
                    </div>

                    <h1>
                        ¡Pago realizado correctamente!
                    </h1>

                    <p className="success-gracias">
                        Gracias por tu compra.
                    </p>

                    <p className="success-comprobante">
                        Para finalizar tu pedido, enviá el comprobante
                        de pago por WhatsApp.
                    </p>

                    <button
                        className="success-whatsapp"
                        onClick={abrirWhatsApp}
                    >
                        Enviar comprobante por WhatsApp
                    </button>

                    <p className="success-numero">
                        WhatsApp: 381 699-1773
                    </p>

                    <button
                        className="success-inicio"
                        onClick={volverAlInicio}
                    >
                        Volver al inicio
                    </button>

                </div>
            </main>
        </>
    )
}

export default Success

