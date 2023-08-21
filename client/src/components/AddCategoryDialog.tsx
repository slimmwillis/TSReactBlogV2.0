import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  handleClose: () => void;
  addCategory: (category: string) => void;
}

export default function AddCategoryDialog(props: Props) {
  const [categoryName, setCategoryName] = React.useState("");

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add a new category</DialogTitle>
        <DialogContent>
          <TextField
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              props.addCategory(categoryName);
              props.handleClose();
            }}
          >
            Add category
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
