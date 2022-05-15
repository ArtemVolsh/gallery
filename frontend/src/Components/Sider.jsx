import { useEffect, useState } from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
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
    status: 0,
    date: new Date(),
    endDate: new Date(),
    price: 0,
    rating: 0,
  };
  const [exhibition, setExhibition] = useState(defaultExhibition);

  const handleChangeInput = (prop) => (e) => {
    console.log(e);
    
    setExhibition({ ...exhibition, [prop]: prop });
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
            ></TextField>
            <TextField
              name="place"
              value={exhibition.place}
              onChange={handleChangeInput("place")}
              variant="filled"
              label="Place"
              placeholder="Provide place..."
            ></TextField>
            <TextField
              name="theme"
              value={exhibition.theme}
              onChange={handleChangeInput("theme")}
              variant="filled"
              label="Theme"
              placeholder="Provide theme..."
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
            ></TextField>
            <TextField
              name="image"
              value={exhibition.image}
              onChange={handleChangeInput("image")}
              variant="filled"
              label="Thumbnail URL"
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
            ></TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                name="date"
                label="Start Date"
                value={exhibition.date}
                onChange={handleChangeInput("date")}
                renderInput={(params) => (
                  <TextField variant="filled" {...params} />
                )}
              />
              <DatePicker
                name="endDate"
                label="End Date"
                value={exhibition.endDate}
                onChange={handleChangeInput("endDate")}
                renderInput={(params) => (
                  <TextField variant="filled" {...params} />
                )}
              />
            </LocalizationProvider>
          </div>
        </Box>
      </div>
    </>
  );
};

export { Sider };
