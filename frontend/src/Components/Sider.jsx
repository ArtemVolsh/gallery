import { useEffect, useState } from "react";
import { TextField, Box, InputAdornment, Button } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DateTimePicker as DatePicker,
} from "@mui/x-date-pickers";

const Sider = () => {
  const noImageLink =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.accofusion.com%2Fpublic%2Fupload_image%2Faccident_media%2F&psig=AOvVaw2LT-8lK07SyiM0tPCluLpN&ust=1652695539689000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKicreig4fcCFQAAAAAdAAAAABAD";

  const defaultExhibition = {
    name: "",
    content: "",
    theme: "",
    image: noImageLink,
    date: new Date(),
    endDate: new Date(),
    price: 0,
    status: 0,
    rating: 0,
  };

  const [exhibition, setExhibition] = useState(defaultExhibition);

  const handleChangeInput = (prop) => (e) => {
    setExhibition({ ...exhibition, [prop]: e.target.value });
  };
  const handleChangePickers = (prop) => (e) => {
    setExhibition({ ...exhibition, [prop]: null });
  };

  useEffect(() => {
    return () => {
      console.log(exhibition);
    };
  });

  return (
    <>
      <div className="sider-wrapper">
        <Box component="form">
          <div className="sider-flex">
            <TextField
              name="name"
              value={exhibition.name}
              onChange={handleChangeInput("name")}
              variant="filled"
              label="Name"
              placeholder="Provide name..."
              sx={{ background: "white" }}
            ></TextField>
            <TextField
              name="place"
              value={exhibition.place}
              onChange={handleChangeInput("place")}
              variant="filled"
              label="Place"
              placeholder="Provide place..."
              sx={{ background: "white" }}
            ></TextField>
            <TextField
              name="theme"
              value={exhibition.theme}
              onChange={handleChangeInput("theme")}
              variant="filled"
              label="Theme"
              placeholder="Provide theme..."
              sx={{ background: "white" }}
            ></TextField>
            <TextField
              name="price"
              value={exhibition.price}
              onChange={handleChangeInput("price")}
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
              onChange={handleChangeInput("image")}
              variant="filled"
              label="Thumbnail URL"
              sx={{ background: "white" }}
            ></TextField>
            <TextField
              name="content"
              value={exhibition.content}
              onChange={handleChangeInput("content")}
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
                onChange={handleChangePickers("date")}
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
                onChange={handleChangePickers("endDate")}
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
