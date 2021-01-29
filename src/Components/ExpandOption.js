import React, { Component, useState, useRef, useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Dialog from '@material-ui/core/Dialog';
import FormContent from './FormContent';

function ExpandOption({item, setOpenSnack, setDeleteItem}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {

    setOpen((prevOpen) => !prevOpen);
  };
  const [FormAction, setFormAction] = useState({});
  const [open, setOpen] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [confirmState, setConfirmState] = React.useState(null);
  const prevOpen = React.useRef(open);

  const confirmAction = (item) => {
    setOpenForm(false);
    setOpenSnack(true);
    setDeleteItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenSnack(false);
  };
  const handleClickOption = (action, name, item) => {
    console.log(action, item);
    if ( action != 'Edit')
    {
      setConfirmState({"action": name});
      setOpenForm(true);
    }
    else {
      setOpenEditForm(true);
      setFormAction({"action": "edit", "titleForm": "Sửa sản phẩm"})
    }

  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();

      setOpen(false);
    }
  }
  const handleClickAway = () => {
    setOpen(false);
  };
  const setSaveEditForm = (item) => {
    
    setOpenEditForm(false);
    setOpenSnack(true);
  };

  return (
    <div>

      <span style={{"font-size": "xx-large", "width": "50px", "padding": "10px"}} onClick={handleClick}><i class="fal fa-ellipsis-v"></i></span>
      {open ?
        <ClickAwayListener onClickAway={handleClickAway}>
          <div class="more-option cur-point">
            <p class="op-select padding-10" onClick={() => handleClickOption('Edit', "Sửa", item)}>Sửa</p>
            <p class="op-select padding-10" onClick={() => handleClickOption('Delete', "Xóa", item)}>Xóa</p>
            <p class="op-select padding-10" onClick={() => handleClickOption('Hide', "Ẩn", item)}>Ẩn</p>
          </div>
        </ClickAwayListener>
        :
        null
      }

      <Dialog fullWidth={false} maxWidth="sm" onClose={() => setOpenForm(false)} aria-labelledby="simple-dialog-title" open={openForm}>
        <div className="padding-10">
          <h4>Thông báo</h4>
          <div>Bạn có chắc chắn {confirmState ? confirmState.action : ""} {item.name} ?</div>
          <button class="large-button marginTop-10" autoFocus onClick={() => confirmAction(item)}>
            OK
          </button>
          <button class="large-button" autoFocus onClick={() => setOpenForm(false)}>
            Cancel
          </button>
        </div>
      </Dialog>
      <Dialog fullWidth={true} maxWidth="md" onClose={() => setOpenEditForm(false)} aria-labelledby="simple-dialog-title" open={openEditForm} disableBackdropClick="true">
        <div className="edit_item_dialog">
          <FormContent action={"edit"} item={item} setOpenEditForm={setOpenEditForm} setSaveEditForm={setSaveEditForm}/>
        </div>
      </Dialog>
    </div>
  )
}

export default ExpandOption
