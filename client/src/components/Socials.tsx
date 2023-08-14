import { Box } from '@mui/material';
import React from 'react';
import Link from '@mui/material/Link';
import youtube from "./youtube.png" 
import facebook from "./facebook.png"
import whatsapp from "./whatsapp.png" 


const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();


const Socials: React.FC = () => {
  return (
    <Box
      sx={{
        typography: 'body1',
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
      }}
    //   onClick={preventDefault}
    >

   
    <div style={{display: 'flex',flexDirection:'column', background: 'white' }}>
      <Link target="_blank" style={{color:'black'}} href="https://wa.me/19048005911"><img src={whatsapp} />WhatsApp</Link>
      <Link target="_blank" style={{color:'black'}} href="https://www.facebook.com/"><img src={facebook} />Facebook</Link>
      <Link target="_blank" style={{color:'black'}} href="https:youtube.com"><img src={youtube} />Youtube</Link>
       </div>
       </Box>
  );
};

export default Socials;