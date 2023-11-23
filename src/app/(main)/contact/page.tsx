
import React from 'react';

const ContactPage: React.FC = () => {
  const handleWhatsAppRedirect = () => {
    // Replace '1234567890' with the actual WhatsApp number
    window.location.href = 'https://wa.me/1234567890';
  };

  return (
    <div>
      {/* Your contact page content here */}
      <h1>Contact Page</h1>
      <p>Feel free to reach out to us!</p>

      {/* WhatsApp button */}
      <button onClick={handleWhatsAppRedirect}>WhatsApp</button>
    </div>
  );
};

export default ContactPage;
