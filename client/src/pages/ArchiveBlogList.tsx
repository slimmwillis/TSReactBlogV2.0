import React from 'react';
import '../App.css'

const BlogList: React.FC = () => {
  return (
    <div style={{ background: '#424242', color:'#fff', margin: 'auto', maxWidth: '85%', marginTop: '15px', padding: '15px'}}>
      <div className="blogCategory" style={{marginBottom:'20px'}}>
      Category
      </div>
      <div id='blogList'>
    Blog Item
    Blog Item(2)

      </div>
    
    
    <div className='blogBody'>
      
    </div>
    
    </div>
  );
};

export default BlogList;