import React from 'react';
import { Link } from 'react-router-dom';
import "./navMenu.css"

const NavMenu: React.FC = () => {
  return (

  

        <ul style={{listStyle:'none', display:'flex', flexDirection:'column', alignItems:'left', margin:'0' }}>
            <li style={{margin: '0 10px'}}>
                <Link to="/">Home</Link>
            </li>
            <li style={{margin: '0 10px'}}>
                <Link to="/BlogPage" >Blog Page</Link>
            </li>
            <li style={{margin: '0 10px'}}>
                <Link to="/AddBlog">Add Blog</Link>
            </li>
            <li style={{margin: '0 10px'}}>
                <Link to="/BlogList">Blog List</Link>
            </li>

        </ul>



  );
};

export default NavMenu;