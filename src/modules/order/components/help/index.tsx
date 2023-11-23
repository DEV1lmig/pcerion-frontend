import Link from "next/link"
import React from "react"

const Help = () => {

  const handleWhatsAppRedirect = () => {
    // Replace '1234567890' with the actual WhatsApp number
    window.location.href = 'https://wa.me/573169069591';
  };
  

  return (
    <div>
      <h2 className="text-base-semi">¿Necesitas ayuda?</h2>
      <div className="p-4 text-white my-2 rounded-md bg-green-500">
        <button onClick={handleWhatsAppRedirect}>Escribenos al WhatsApp</button>
      </div>
    </div>
  )
}

export default Help
