import { useState } from "react";
import { TextField, Box, InputAdornment, Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DateTimePicker as DatePicker,
} from "@mui/x-date-pickers";

import { createExhibition } from "../apiRequests/apiRequests";

const Sider = () => {
  const noImageLink = "https://www.jquery-az.com/html/images/banana.jpg";

  const defaultExhibition = {
    name: "",
    content: "",
    theme: "",
    place: "",
    image: noImageLink,
    date: new Date(),
    endDate: new Date(),
    price: 0,
    status: 0,
    rating: 0,
  };

  const [exhibition, setExhibition] = useState(defaultExhibition);

  // const handleChangeInput = (prop) => (e) => {
  //   setExhibition({ ...exhibition, [prop]: e.target.value });
  // };

  const handleChangePickers = (key) => (value) => {
    setExhibition({ ...exhibition, [key]: value });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setExhibition({ ...exhibition, [name]: value });
  };

  console.log(exhibition);

  return (
    <>
      <div className="sider-wrapper">
        <Box component="form">
          <div className="sider-flex">
            <TextField
              name="name"
              value={exhibition.name}
              onChange={handleChangeInput}
              variant="filled"
              label="Name"
              placeholder="Provide name..."
              sx={{ background: "white" }}
            ></TextField>
            <TextField
              name="place"
              value={exhibition.place}
              onChange={handleChangeInput}
              variant="filled"
              label="Place"
              placeholder="Provide place..."
              sx={{ background: "white" }}
            ></TextField>
            <TextField
              name="theme"
              value={exhibition.theme}
              onChange={handleChangeInput}
              variant="filled"
              label="Theme"
              placeholder="Provide theme..."
              sx={{ background: "white" }}
            ></TextField>
            <TextField
              name="price"
              value={exhibition.price}
              onChange={handleChangeInput}
              variant="filled"
              type="number"
              label="Price"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₴</InputAdornment>
                ),
              }}
              sx={{ background: "white" }}
            ></TextField>
            <TextField
              name="image"
              value={exhibition.image}
              onChange={handleChangeInput}
              variant="filled"
              label="Thumbnail URL"
              sx={{ background: "white" }}
            ></TextField>
            <TextField
              name="content"
              value={exhibition.content}
              onChange={handleChangeInput}
              variant="filled"
              label="Content"
              multiline
              rows={4}
              placeholder="Describe the exhibition..."
              sx={{ background: "white" }}
            ></TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                name="date"
                label="Start Date"
                value={exhibition.date}
                onChange={(newValue) => {
                  handleChangePickers("date")(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ background: "white" }}
                    variant="filled"
                    {...params}
                  />
                )}
              />
              <DatePicker
                name="endDate"
                label="End Date"
                value={exhibition.endDate}
                onChange={(newValue) => {
                  handleChangePickers("endDate")(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ background: "white" }}
                    variant="filled"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
            <Button
              sx={{
                backgroundColor: "white",
                color: "black",
                ":hover": { backgroundColor: "gold" },
              }}
              variant="contained"
              onClick={() => createExhibition(exhibition)}
            >
              Add Exhibition
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};

export { Sider };
