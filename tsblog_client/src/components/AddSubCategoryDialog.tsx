import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  handleClose: () => void;
  addSubCategory: (category: string) => void;
}

export default function AddSubCategoryDialog(props: Props) {
  const [subCategoryName, setSubCategoryName] = React.useState("");

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add a new sub category</DialogTitle>
        <DialogContent>
          <TextField
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Sub Category Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              props.addSubCategory(subCategoryName);
              props.handleClose();
            }}
          >
            Add Sub category
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
