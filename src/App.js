import logo from './logo.svg';
import './App.css';
import './CSS/page.css';
import React, { Component, useState, useRef, useEffect} from 'react';
import ExpandOption from './Components/ExpandOption';
import FormContent from './Components/FormContent';
import Data from './Data/TodoList';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = useState(Data);
  const [FormAction, setFormAction] = useState({});
  const [open, setOpen] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [confirmState, setConfirmState] = React.useState(null);
  const prevOpen = React.useRef(open);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var todayStr = yyyy + '/' + mm + '/' + dd;

  const AddNew = (event) => {

    setOpenEditForm(true);
  };

  const handleClick = (event) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClickOption = (action, item) => {
    console.log(action, item);
    if ( action != 'Edit')
    {
      setConfirmState({"action": action});
      setOpenForm(true);
    }
    else {
      setOpenEditForm(true);
      setFormAction({"action": "edit", "titleForm": "Sửa sản phẩm"})
    }

  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenSnack(false);
  };

  const setSaveEditForm = (item) => {
    setValue([...value, item ]);
    setOpenEditForm(false);
    setOpenSnack(true);
  };
  const setActionItem = (item, action) => {
    console.log(item, action);
    if (action == "Delete")
    {
      const index = value.indexOf(item);
      if (index > -1) {
        value.splice(index, 1);
      }
    }

    if (action == "Done")
    {
      const index = value.indexOf(item);
      value[index].status = 2;
    }

    setOpenSnack(true);
  };

  useEffect(() => {
    document.title = "Công việc | React App TD";


    console.log("Today", todayStr);
  }, []);

  return (
    <div class="container-panel w-80">
      <h2>Quản lý công việc</h2>
      <button class="large-button" autoFocus onClick={AddNew}>
       Thêm mới
     </button>
      {value.map((item) => (

         <div className="item-contain padding-5 row">
            <div class="col-5">
              {item.status == 2 ? <i class="fas fa-check"></i> : ""}
             </div>
           <div class="col-25">
             {item.name}
           </div>
           <div class="col-50">
             Nội dung: {item.desc}
           </div>
           <div class={"col-15 " + (item.dateEnd == todayStr ? "red": "")}>
             Deadline: {item.dateEnd}
           </div>
           <div class="col-5 f-right">
             <ExpandOption item={item} setOpenSnack={setOpenSnack} setActionItem={setActionItem}/>
           </div>
         </div>
       )
       )}
       <Snackbar
         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
         autoHideDuration={4000}
         open={openSnack}
         onClose={handleClose}
         message="Thực hiện thành công"
       />
       <Dialog fullWidth={true} maxWidth="md" onClose={() => setOpenEditForm(false)} aria-labelledby="simple-dialog-title" open={openEditForm} disableBackdropClick="true">
         <div className="edit_item_dialog">
           <FormContent action={"new"} item={{}} setOpenEditForm={setOpenEditForm} setSaveEditForm={setSaveEditForm}/>
         </div>
       </Dialog>

     </div>
  );
}

export default App;
