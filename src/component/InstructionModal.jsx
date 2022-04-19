import { Modal, Button, Box, Typography } from "@mui/material";
import React, { useState } from "react";

function InstructionModal({ childern, openStatus, height, width }) {
  const [open, setOpen] = useState(openStatus);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    minHeight: height,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{childern}</Box>
      </Modal>
    </div>
  );
}

export default InstructionModal;
