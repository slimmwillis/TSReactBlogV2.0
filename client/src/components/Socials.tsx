import React from 'react';
import { Box, Link, Tooltip } from '@mui/material';
import youtube from "./youtube.png";
import facebook from "./facebook.png";
import whatsapp from "./whatsapp.png";

const Socials: React.FC = () => {
  return (
    <Box
      sx={{
        typography: 'body1',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        p: 2, // Add padding
        gap: 1, // Add gap between items
      }}
    >
      <Tooltip title="WhatsApp">
        <Link target="_blank" style={{ color: 'black', display: 'flex', alignItems: 'center' }} href="https://wa.me/19048005911">
          <img src={whatsapp} alt="WhatsApp Icon" style={{ marginRight: '8px', width: '24px', height: '24px' }} />
          WhatsApp
        </Link>
      </Tooltip>
      <Tooltip title="Facebook">
        <Link target="_blank" style={{ color: 'black', display: 'flex', alignItems: 'center' }} href="https://www.facebook.com/Wbailey89">
          <img src={facebook} alt="Facebook Icon" style={{ marginRight: '8px', width: '24px', height: '24px' }} />
          Facebook
        </Link>
      </Tooltip>
      <Tooltip title="YouTube">
        <Link target="_blank" style={{ color: 'black', display: 'flex', alignItems: 'center' }} href="https://www.youtube.com/watch?v=zgv5PwZnxd0">
          <img src={youtube} alt="YouTube Icon" style={{ marginRight: '8px', width: '24px', height: '24px' }} />
          Youtube
        </Link>
      </Tooltip>
    </Box>
  );
};

export default Socials;
