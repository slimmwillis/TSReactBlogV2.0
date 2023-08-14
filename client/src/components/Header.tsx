import { Button } from '@mui/material';
import React from 'react';
import "./header.css"
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
<>
<div style={{ display:"flex", borderBottom: "1px solid #173cbe" }}>
  <div id='subscribe-container' style={{backgroundColor:'#f0f0f0', flex:'1', justifyContent:'center'}}>
    <Button onClick={()=> navigate('/Subscribe') } variant="contained" color="success" id="button">
        Subscribe
      </Button>
  </div>

    <div style={{ background: '#f0f0f0', minHeight:'5vh', flex:'1', textAlign:"center"}}>

      
    
     <a style={{marginTop:'10px', color:'black'}} href="/">William's Blog</a>

    </div>

    <div style={{ background: '#f0f0f0', minHeight:'5vh', flex:'1', textAlign:"center"}}>
     <div style={{marginTop:'10px'}}></div>
    </div>


</div>
</>
  );
};

export default Header;