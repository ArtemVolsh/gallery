import { useState } from "react";
import { TextField, Box, InputAdornment, Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DateTimePicker as DatePicker,
} from "@mui/x-date-pickers";
import { createExcursion } from "../apiRequests/apiRequests";

const ExcSider = () => {
  const noImageLink = "https://www.jquery-az.com/html/images/banana.jpg";

  const defaultExcursion = {
    name: "",
    content: "",
    place: "",
    image: noImageLink,
    date: new Date(),
    price: 0,
    status: 0,
  };

  const [excursion, setExcursion] = useState(defaultExcursion);

  const handleChangePickers = (key) => (value) => {
    setExcursion({ ...excursion, [key]: value });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setExcursion({ ...excursion, [name]: value });
  };

  console.log(excursion);

  return (
    <div className="sider-wrapper">
      <Box component="form">
        <div className="sider-flex">
          <TextField
            name="name"
            value={excursion.name}
            onChange={handleChangeInput}
            variant="filled"
            label="Name"
            placeholder="Provide name..."
            sx={{ background: "white" }}
          ></TextField>
          <TextField
            name="place"
            value={excursion.place}
            onChange={handleChangeInput}
            variant="filled"
            label="Place"
            placeholder="Provide place..."
            sx={{ background: "white" }}
          ></TextField>
          <TextField
            name="theme"
            value={excursion.theme}
            onChange={handleChangeInput}
            variant="filled"
            label="Theme"
            placeholder="Provide theme..."
            sx={{ background: "white" }}
          ></TextField>
          <TextField
            name="price"
            value={excursion.price}
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
            value={excursion.image}
            onChange={handleChangeInput}
            variant="filled"
            label="Thumbnail URL"
            sx={{ background: "white" }}
          ></TextField>
          <TextField
            name="content"
            value={excursion.content}
            onChange={handleChangeInput}
            variant="filled"
            label="Content"
            multiline
            rows={4}
            placeholder="Describe the excursion..."
            sx={{ background: "white" }}
          ></TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              name="date"
              label="Start Date"
              value={excursion.date}
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
          </LocalizationProvider>
          <Button
            sx={{
              backgroundColor: "white",
              color: "black",
              ":hover": { backgroundColor: "gold" },
            }}
            variant="contained"
            onClick={() => createExcursion(excursion)}
          >
            Add Excursion
          </Button>
        </div>
      </Box>
    </div>
  );
};

export { ExcSider };
