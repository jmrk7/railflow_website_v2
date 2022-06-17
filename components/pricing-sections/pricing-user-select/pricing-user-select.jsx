import React, { useEffect } from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import * as styles from "./pricing-user-select.module.scss";
import TextField from "../../form/text-field";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import dialogScreenshot from "../../../public/images/testrail-users.png";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MuiDialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const cx = classnames.bind(styles);

const PricingUserSelect = ({ userIndex, userTiers, setUserIndex, small }) => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  useEffect(() => {
    setUserIndex(userIndex);
  });
  
  const handleUserSelectClick = (type) => {
    if (type === "plus") {
      if (userIndex === userTiers.length - 1) return;
      setUserIndex(userIndex + 1);
    }
    if (type === "minus") {
      if (userIndex === 0) return;
      setUserIndex(userIndex - 1);
    }
  };

  return (
    <div className={cx("pricingUserSelect")} style={{flexDirection: "row"}}>
      <h3 className={cx("pricingUserSelect_title")}>
        <span
          role="button"
          onClick={() => setDialogOpen(true)}
          onKeyDown={() => setDialogOpen(true)}
          tabIndex={0}
          className={cx("pricingUserSelect_helpText")}
        >
          Number of TestRail Users
        </span>
        <IconButton
          aria-label="help"
          size="small"
          onClick={() => setDialogOpen(true)}
          className={cx("pricingUserSelect_helpButton")}
        >
          <HelpOutlineOutlinedIcon
            className={cx("pricingUserSelect_helpIcon")}
          />
        </IconButton>
        <Dialog onClose={() => setDialogOpen(false)} open={isDialogOpen}>
          <MuiDialogTitle>
            <Typography variant="h6">
              How to calculate TestRail Users
            </Typography>
            <IconButton
              aria-label="close"
              className={cx("pricingUserSelect_dialogCloseIcon")}
              onClick={() => setDialogOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <DialogContent>
            <DialogContentText>
              The number of TestRail user can be found by navigating to TestRail
              Administration {">"} License {">"} Named Users
            </DialogContentText>
            <div className={cx("pricingUserSelect_dialogImage")}>
              <Image alt="dialog-screenshot" src={dialogScreenshot} />
            </div>
          </DialogContent>
        </Dialog>
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div className={cx("pricingUserSelect_inputWrapper")}>
          <TextField
            value={userTiers[userIndex] || 0}
            inputProps={{ disabled: true }}
            className={cx("pricingUserSelect_input", {
              pricingUserSelect_inputSmall: small === true,
            })}
          />
        </div>
        <div className={cx("pricingUserSelect_buttons")}>
          <IconButton
            aria-label="remove"
            className={cx("pricingUserSelect_button", {
              pricingUserSelect_buttonActive: userIndex !== 0,
            })}
            onClick={() => handleUserSelectClick("minus")}
            disabled={userIndex === 0}
          >
            <RemoveCircleOutlinedIcon />
          </IconButton>
          <IconButton
            aria-label="add"
            onClick={() => handleUserSelectClick("plus")}
            className={cx("pricingUserSelect_button", {
              pricingUserSelect_buttonActive:
                userIndex !== userTiers.length - 1,
            })}
            disabled={userIndex === userTiers.length - 1}
          >
            <AddCircleOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PricingUserSelect;