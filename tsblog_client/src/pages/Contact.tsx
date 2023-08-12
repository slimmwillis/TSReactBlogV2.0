import React from "react";
// import styled from "styled-components";
import "./contact.css";
import { useForm, ValidationError } from "@formspree/react";
import { toast } from "react-hot-toast";
import {useState,useRef} from 'react'
import styled from "@emotion/styled";
// import Footer from "../components/footer/Footer";

export default function Contact() {
  const [state, handleSubmit] = useForm("xjvdqrqy");
  const ltoastID=useRef(" ")
  const Bgstyled = styled.div
  `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:ital@1&display=swap');
  background: rgb(25, 22, 43);
  width:100vw;
  height:100%;
  max-width:100%;
  text-align:center;
  align-items: center;
    display: flex;
    flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  
  h2{
    font-size:4rem;
  }
  p{
    letter-spacing: .1rem;
  }
  
  `
  const Cont = styled.div`
    padding: 4rem;
  `;

//react-hot-toast


  if (state.succeeded) {
    toast.success('Thanks for Contacting Me ');
  }


  return (
    <>
    <Bgstyled>
      <Cont>
        <p style={{color: 'white'}}>Get in touch</p>
        <h2 style={{color: 'white'}}>CONTACT</h2>
      </Cont>
      <div className="wrapp">
        {/* <div className="left">
          <div className="info">
            <div className="icon"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg></div>
            <div className="p"><p>+1(904)800-5911</p></div>
          </div>
          <div className="info">
          <div className="icon"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg></div>
          <div className="p email"><p>williambailey.dev@gmail.com

</p></div>
          </div>
          <div className="info">
            <div className="icon"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg></div>
            <div className="p"><p>Jacksonville, Florida</p></div>

        
        
          </div>
        </div> */}
        <div className="line"></div>
        <div className="right">
        <form onSubmit={handleSubmit} autoComplete='off'>
        <div className="form-group">
        <label htmlFor="Name">
        Your Name <br/>
        <input type="text" name='Name' required/>
        </label>
        </div>
        <div className="form-group"><label htmlFor="email">Your Email
        <input type="email" id="email" name="email"  required/></label>
        </div>
        <div className="form-group">
        <label htmlFor="message">Your message <br/>
        <textarea id="message" name="message" rows={10} required>
        </textarea>
        </label>
        </div>
        <button type="submit">Send</button>
        </form>
      </div>
      </div>

      {/* <div className="map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d440732.7020979921!2d-82.012761059379!3d30.34457653049257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b716f1ceafeb%3A0xc4cd7d3896fcc7e2!2sJacksonville%2C%20FL%2C%20USA!5e0!3m2!1sen!2sin!4v1686067401718!5m2!1sen!2sin" style={{border:"0"}} allowFullScreen={undefined} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div> */}
    </Bgstyled>
   
    
</>
  );
}
