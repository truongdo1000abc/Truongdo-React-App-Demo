import React, { Component, useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

function FormContent({action, item, setOpenEditForm, setSaveEditForm }) {

  const [name, setName] = useState(item ? item.name : "");
  const [desc, setDesc] = useState(item ? item.desc : "");

  const [dateCreated, setdateCreated] = useState(item ? item.dateCreated : "");
  const [dateEnd, setdateEnd] = useState(item ? item.dateEnd : "");
  const [openMess, setopenMess] = useState(false);

  const UpdateItem = () => {
    if (!name || !desc ||! dateCreated || !dateEnd || name == "" || desc == "" || dateCreated == "" || dateEnd == "")
    {
      setopenMess(true);
      return;
    }

    item.name = name;
    item.desc = desc;
    item.dateCreated = dateCreated;
    item.dateEnd = dateEnd;

    setSaveEditForm(item);
  };

  return (
      <div className="edit_item_dialog padding-10">
         <h3>{action == "edit" ? ("Sửa công việc: " + item.name) : "Thêm mới công việc"}</h3>
         <div class="row">
           <div class="col-10 ">
             <label>Tên công việc</label>
           </div>
           <div class="col-10">
             <input
               type='text'
               value={name}
               onChange={e => setName(e.target.value)}
             />
           </div>
           <div class="col-10 marginLeft-10">
             <label>Miêu tả</label>
           </div>
           <div class="col-50">
             <input
               type='text'
               value={desc}
               onChange={e => setDesc(e.target.value)}
             />
           </div>
         </div>
         <div class="row">
           <div class="col-10 ">
             <label>Ngày lập</label>
           </div>
           <div class="col-10">
             <input
               type='text'
               value={dateCreated}
               onChange={e => setdateCreated(e.target.value)}
             />
           </div>
           <div class="col-10 marginLeft-10">
             <label>Deadline</label>
           </div>
           <div class="col-10">
             <input
               type='text'
               value={dateEnd}
               onChange={e => setdateEnd(e.target.value)}
             />
           </div>
         </div>
         {openMess ? <div style={{"color": "red"}}>Vui lòng nhập đủ thông tin</div> : null}
         <button class="large-button" autoFocus onClick={() => UpdateItem()}>
           Save
         </button>
         <button class="large-button marginTop-10" autoFocus onClick={() => setOpenEditForm(false)}>
           Cancel
         </button>
       </div>
     )
   };

   FormContent.propTypes = {
     action: PropTypes.string,
     item: PropTypes.object,
     setOpenEditForm: PropTypes.func,
     setSaveEditForm: PropTypes.func
   }
export default FormContent;
