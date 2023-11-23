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
      <div className="text-base-regular my-2 bottom-6 bg-green-500">
        <button onClick={handleWhatsAppRedirect}>WhatsApp</button>
      </div>
    </div>
  )
}

export default Help
