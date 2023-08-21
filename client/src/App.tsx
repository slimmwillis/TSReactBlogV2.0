import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import {Cloudinary} from "@cloudinary/url-gen";
import Footer from "./components/Footer";
import NavMenu from "./components/NavMenu";
import Home from "./pages/Home";
// import AddBlog from "./pages/ArchiveAddBlog";
import Contact from "./pages/Contact";
import Paper from "@mui/material/Paper";
import { ThemeProvider, List, ListItem, ListItemText, styled, useMediaQuery } from "@mui/material";
import Socials from "./components/Socials";
import Subscribe from "./pages/Subscribe";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
import AdminLogin from "./pages/AdminLogin";
import { SubCategories } from "./components/SubCategories";
import { PostListTemplate } from "./components/PostListTemplate";
import ManagePost from "./pages/ManagePost";
import SubcategoryComponent from "./components/SubcategoryPage";
import SubcategoryPage from "./components/SubcategoryPage";
import PostPage from "./pages/PostPage";

import theme from './components/SubcategoryPage'


// Styled component for Paper element
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const cld = new Cloudinary({
  cloud: {
    cloudName: 'demo'
  }
});

function App() {
  // Create a Media Query
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <AuthContextProvider>
      <Router>
      {/* <CloudinaryContext cloudName="your-cloud-name"> */}
      {/* <ThemeProvider theme={theme}> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {/* Header */}
          <Header />



          {/* Make a landing on contact with no nav or socials */}

          <Routes>
            <Route path="/Contact" element={<Contact />} />
          </Routes>

          <div
            style={{
              display:
                window.location.href === "http://localhost:3000/Contact"
                  ? "none"
                  : "flex",
              flex: 1,
            }}
          >
            {/* Left Sidebar */}
            <NavMenu />

            {/* Middle Content */}
            <div style={{ flex: 5, padding: "20px" }}>
              <Toaster />
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/AddBlog" element={<AddBlog />} /> */}
                <Route path="/Subscribe" element={<Subscribe />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/categories/:categoryName" element={<SubCategories />} />                
                <Route path="/categories/:categoryName/:subCategoryName" element={<SubcategoryPage />} />
                <Route path="/manage" element={<ManagePost />} />
                <Route path="/manage/:postId" element={<ManagePost />} />
                <Route path="/post/:postId" element={<PostPage />} />
              </Routes>
            </div>

            {/* Right Sidebar not displayed on mobile*/}
            {!isMobile && (
            <div
              id="rightBar"
              style={{ flex: "0 0 auto", padding: "20px", background: "white" }}
            >
           
              <Socials />
            </div>
            )}
          </div>

             {/* Display Socials below middle content on mobile */}
            {isMobile && (
              <div
                style={{
                  flex: "0 0 auto",
                  padding: "20px",
                  background: "white",
                  width: "100%",
                }}>
                <Socials />
              </div>
            )} 



          {/* Footer */}
          <Footer />

        </div>
        {/* </ThemeProvider> */}
        {/* </CloudinaryContext> */}
      </Router>
    </AuthContextProvider>
  );
}

export default App;
