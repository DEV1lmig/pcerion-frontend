
import React from 'react';

const HelpPage: React.FC = () => {
  const supportNumber = '1234567890'; // Replace with your WhatsApp number

  const handleSupportClick = () => {
    window.open(`https://wa.me/${supportNumber}`, '_blank');
  };

  return (
    <div>
      <h1>Ayuda</h1>
      <p>Si necesitas ayuda contacta con nosotros mediante whatsapp</p>
      <button onClick={handleSupportClick}>Contactanos</button>
    </div>
  );
};

export default HelpPage;
