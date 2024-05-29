import React from 'react';

const Cloud = () => {
  return (
    <div style={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, zIndex: -1 }}>
      <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src="/images/cloud.mp4" type="video/mp4"/>
      </video>
    </div>
  );
};

export default Cloud;
