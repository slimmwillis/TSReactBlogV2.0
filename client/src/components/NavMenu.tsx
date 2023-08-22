import { useContext, useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import "./navMenu.css";
import { useLocation, useNavigate } from "react-router-dom";
import AddCategoryDialog from "./AddCategoryDialog";
import Button from "@mui/material/Button";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import SubCategoryModel from "../../../server/src/models/subcategory";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


// Styled component for the delete button
const StyledDeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white", // Red background
  color: "black", // White text color
  "&:hover": {
    color: "white",
    backgroundColor: theme.palette.error.dark, // Darker red background on hover
  },
}));
//updated to use "100%"" instead of 240px
const drawerWidth = "100%";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  name: string;
}

interface Error {
  response: {
    data: string;
  };
}

export default function NavMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subCategoryIdToDelete, setSubCategoryIdToDelete] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { admin } = useContext(AuthContext) as AuthContextType;

  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);

  const handleClickOpenAddCategoryDialog = () => {
    setOpenAddCategoryDialog(true);
  };

  const handleClose = () => {
    setOpenAddCategoryDialog(false);
  };

  //   const handleDrawerOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleDrawerClose = () => {
  //     setOpen(false);
  //   };

  const handleDrawerToggle = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    // setOpen((prevOpen) => !prevOpen);
  };

  async function addCategory(name: string) {
    try {
      const res = await axios.post("/api/categories", {
        name,
      });
      setCategories([...categories, res.data]);
    } catch (error) {
      toast.error((error as Error)?.response?.data);
    }
  }

  const handleRemoveItem = async (id: string) => {
    try {
      // Delete associated subcategories using a dedicated API endpoint
      // await axios.delete(`/api/categories/${id}/subcategories/${id}`);

      console.log("Deleting category with ID:", id);
      await axios.delete(`/api/categories/${id}`);

      const updatedCategories = categories.filter(
        (category) => category._id !== id
      );
      setCategories(updatedCategories);

      const categoryToDelete = categories.find(
        (category) => category._id === id
      );
      if (categoryToDelete) {
        const encodedCategoryName = encodeURIComponent(categoryToDelete.name);
        navigate(`/subcategories/${encodedCategoryName}`);
      }
    } catch (error) {
      console.error("Error removing category:", error);
    }

    //   let updatedCategories = [...categories];
    //  updatedCategories = updatedCategories.filter((category)=>category._id!=id)
    //   setCategories(updatedCategories);
    //   const res = await axios.delete(`/api/categories/${id}`)
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // This Might Be Pointless
  // useEffect(() => {
  //   fetchSubCategories();
  // }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  // This might be pointless
  // const fetchSubCategories = async () => {
  //   try {
  //     const response = await axios.get("/api/categories/{get.params.id}");
  //     setSubCategories(response.data);
  //   } catch (error) {
  //     console.error("Error fetching subcategories:", error);
  //   }
  // };

  const handleOpenDeleteDialog = (subCategoryId: string) => {
    
    setSubCategoryIdToDelete(subCategoryId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSubCategoryIdToDelete("");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {open === true ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {categories.map((category, index) => (
            <ListItem
              key={index}
              onClick={() => navigate(`/subcategories/${category.name}`)}
              disablePadding
              sx={{
                display: "block",
                bgcolor:
                  location.pathname ===
                  `/subcategories/${encodeURIComponent(category.name)}`
                    ? "rgb(245, 245, 245)"
                    : "white",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 12,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {/* {index % 2 === 0 ? <div></div> : <div></div>} */}
                </ListItemIcon>
                <ListItemText
                  primary={category.name}
                  style={{
                    opacity: open ? 1 : 0.95,
                    fontSize: open ? "1rem" : "0.5rem",
                    color: open ? "black" : "black",
                  }}
                />
              </ListItemButton>

              {/* remove list item */}

              {admin && (<div id="deleteCategory">
                  <button
                  onClick={() => handleOpenDeleteDialog(category._id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor =
                      "rgba(255, 82, 82, 0.8)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  {open ? <div id="remove"> Remove</div> : <div id="x">x</div>}
                </button>
             
            
          
    
          {/* Delete Confirmation Dialog  */}
          <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            PaperProps={{ sx: { borderRadius: "8px" } }} // Style the paper (dialog container)
          >
            <DialogContent>
              <DialogTitle>Delete Subcategory</DialogTitle>
    
              <DialogContentText>
                Are you sure you want to delete this subcategory?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
              <StyledDeleteButton onClick={() => handleRemoveItem(category._id)} autoFocus>
                Delete
              </StyledDeleteButton>
            </DialogActions>
          </Dialog>
          

                 {/* <Button onClick={() => handleRemoveItem(category._id)}>
                   {open ? <div id="remove"> Remove</div> : <div id="x">x</div>}
                </Button>  */}
                </div>
                )}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            onClick={handleClickOpenAddCategoryDialog}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                +
              </ListItemIcon>
              <ListItemText
                primary={"Add category"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        
      </Drawer>

      <AddCategoryDialog
        addCategory={addCategory}
        open={openAddCategoryDialog}
        handleClose={handleClose}
      />
    </Box>
  );
}
