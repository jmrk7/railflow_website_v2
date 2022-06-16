import React, { useEffect } from "react";
import classnames from "classnames/bind";
import Image from "next/image";

import * as styles from "./pricing-user-select.module.scss";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";

import Button from "/components/button/button.jsx";
import dialogScreenshot from "../../../public/images/testrail-users.png";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MuiDialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const cx = classnames.bind(styles);

const PrettoSlider = styled(Slider)({
  color: "#303fe1",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#303fe1",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
  "& .MuiSlider-markLabel": {
    color: "white",
    fontSize: "1rem",
  },
});

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 50,
    label: "500",
  },
  {
    value: 100,
    label: "1000",
  },
];

function valueLabelFormat(value) {
  return `${value * 10}`;
}

const PricingUserSelect = ({ userIndex, userTiers, setUserIndex, small }) => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  useEffect(() => {
    setUserIndex(userIndex);
  });

  const handleChange = (event) => {
    setUserIndex(Number(event.target.value) / 2);
  };

  return (
    <div className={cx("pricingUserSelect")}>
      <div className={cx("pricingUserSelect_title")}>
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
        {/* to={`/purchase?price-index=${userIndex}&license-type=${plan.id}&type=quote`} */}
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
              <div
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  marginBottom: "12px",
                }}
              >
                The number of TestRail user can be found by navigating to
                TestRail Administration {">"} License {">"} Named Users
              </div>
            </DialogContentText>
            <div className={cx("pricingUserSelect_dialogImage")}>
              <Image alt="dialog-screenshot" src={dialogScreenshot} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <PrettoSlider
        aria-label="Custom marks"
        defaultValue={0}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        step={2}
        valueLabelDisplay="auto"
        onChange={handleChange}
        marks={marks}
      />
    </div>
  );
};

export default PricingUserSelect;
