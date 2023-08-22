import React from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <Grid container alignItems="center" borderBottom={1} sx={{ borderColor: '#173cbe', paddingTop: 2, paddingBottom: 2 }}>
        <Grid item xs={4} textAlign="center">
          <Button onClick={() => navigate('/Subscribe')} variant="contained" color="success">
            Subscribe
          </Button>
        </Grid>
        <Grid item xs={4} textAlign="center" style={{ fontSize: "150%", fontWeight: "bold" }}>
          <a className="blog-link" href="/">
            William's Blog
          </a>
        </Grid>
        <Grid item xs={4} textAlign="center">
          {/* Empty grid item */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
