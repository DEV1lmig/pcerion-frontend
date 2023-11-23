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
      <div className="p-4 text-white m-0 rounded-md bg-green-500">
        <button className="m-0 w-6" onClick={handleWhatsAppRedirect}>Escribenos al WhatsApp</button>
      </div>
    </div>
  )
}

export default Help
