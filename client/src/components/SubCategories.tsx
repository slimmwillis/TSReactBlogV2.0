import { useContext, useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import "./navMenu.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddCategoryDialog from "./AddCategoryDialog";
import Button from "@mui/material/Button";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import AddPostDialog from "./ArchiveAddPostDialog";
import { PostListTemplate } from "./PostListTemplate";
import AddSubCategoryDialog from "./AddSubCategoryDialog";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Post, AppBarProps } from "../types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const theme = createTheme();

// Styled component for the delete button
const StyledDeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white", // Red background
  color: "black", // White text color
  "&:hover": {
    color: "white",
    backgroundColor: theme.palette.error.dark, // Darker red background on hover
  },
}));

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
    "& .MuiDrawer-paper": { ...openedMixin(theme) },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function SubCategories() {
  const initialList: any = [];
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [subCategories, setSubCategories] = useState(initialList);
  const [posts, setPosts] = useState(initialList);



  //imported states
  const { categoryName, subCategoryName } = useParams<{
    categoryName: string;
    subCategoryName: string;
  }>();
  const [postsToDelete, setPostsToDelete] = useState<Post[]>([]);
  const [subCategory, setSubCategory] = useState<any>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [subCategoryIdToDelete, setSubCategoryIdToDelete] = useState("");




  const { admin } = useContext(AuthContext) as AuthContextType;

  const [openAddSubCategoryDialog, setOpenAddSubCategoryDialog] =
    useState(false);

  const [category, setCategory] = useState<any>(null);

  const [openAddPostDialog, setOpenAddPostDialog] = useState(false);
  const params = useParams();

  console.log(params.categoryName);

  const getCategory = async () => {
    try {

      // weird bug to discusss. axios.get(`/api/categories/${params.categoryName}`) throws a network 404 error
      const res = await axios.get(`/api/categories/${categoryName}`);
      console.log(res.data);
      setCategory(res.data);
      setSubCategories(res.data.subCategories);
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    getCategory();
  }, [params]);

  const handleClickOpen = () => {
    setOpenAddSubCategoryDialog(true);
  };

  const handleClickOpenPost = () => {
    setOpenAddPostDialog(true);
  };

  const handleClose = () => {
    setOpenAddSubCategoryDialog(false);
  };

  const handleClosePost = () => {
    setOpenAddPostDialog(false);
  };


  const handleDrawerToggle = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    // setOpen((prevOpen) => !prevOpen);
  };

  async function addSubCategory(name: string) {
    try {
      const res = await axios.post(
        `/api/categories/${category._id}/subcategories`,
        { name }
      );
      console.log(res.data);
      setSubCategories([...subCategories, res.data]);
      toast.success('Category Successfully Added')

    } catch (error) {
      toast.error((error as any)?.response?.data);
    }
  }

  function addPost(post: string) {
    setPosts([...posts, posts]);
  }
  const handleRemoveItem = (index: number) => {
    const updatedCategories = [...subCategories];
    updatedCategories.splice(index, 1);
    setSubCategories(updatedCategories);
  };

  const removepost = async (e: any, index: number, id: string) => {
    e.stopPropagation()
    const res = await axios.delete(`/api/subcategories/${id}`)

    handleRemoveItem(index);
  };


  const handleOpenDeleteDialog = (subCategoryId: string) => {

    setSubCategoryIdToDelete(subCategoryId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSubCategoryIdToDelete("");
  };

  const handleDeleteSubCategory = async () => {
    try {

      await axios.delete(`/api/subcategories/${subCategoryIdToDelete}`);
      // Remove the deleted subcategory from the subcategory array
      setSubCategories(subCategories.filter((subCategory: any) => subCategory._id !== subCategoryIdToDelete));
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer variant="permanent" open={open} sx={{ flex: 1 }}>
          <Divider />
          <List>
            {subCategories.map((subCategory: any, index: any) => (
              <ListItem
                key={index}
                // onClick={() =>
                //   navigate(`/categories/${category.name}/${subCategory.name}`)
                // }
                disablePadding
                sx={{
                  // display: "block",
                  bgcolor:
                    location.pathname ===
                      `/subcategories/${encodeURIComponent(subCategory.name)}`
                      ? "rgb(245, 245, 245)"
                      : "white",
                }}
              >

                <ListItemButton
                  onClick={() =>
                    navigate(`/subcategories/${category.name}/${subCategory.name}`)
                  }
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
                    primary={subCategory.name}
                    style={{
                      opacity: open ? 1 : 0.95,
                      fontSize: open ? "1rem" : "0.5rem",
                      color: open ? "black" : "black",
                    }}
                  />

                </ListItemButton>

                {/* remove list item */}

                {admin && (
                  <button
                    onClick={() => handleOpenDeleteDialog(subCategory._id)}
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
                    Delete
                  </button>)}

                {/* Delete Confirmation Dialog */}
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
                    <StyledDeleteButton onClick={handleDeleteSubCategory} autoFocus>
                      Delete
                    </StyledDeleteButton>
                  </DialogActions>
                </Dialog>

              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem
              onClick={handleClickOpen}
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
                  primary={"Add Subcategory"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <AddSubCategoryDialog
        addSubCategory={addSubCategory}
        open={openAddSubCategoryDialog}
        handleClose={handleClose}
      />
      {/* <PostListTemplate /> */}
    </>
  );
}

//title - parent category

// subCategory section(
// title: snippet
// add , delete, edit)

//post section(
// title: snippet
// add, delete, edit)

// category/post
//category/sub/sub/post
