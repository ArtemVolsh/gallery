import { useState } from "react";
import {
  TextField,
  Box,
  InputAdornment,
  Button,
  Switch,
  Stack,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DateTimePicker as DatePicker,
} from "@mui/x-date-pickers";

import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ClearIcon from "@mui/icons-material/Clear";

import { createExhibition } from "../apiRequests/apiRequests";
import {
  setExhibitions as setExhibitionsGlobal,
  setLoading as setLoadingGlobal,
} from "../Reducers/postReducer";

const ExhSider = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const exhibitionsGlobal = useSelector((state) => state.posts.exhibitions);

  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState("");
  const [isSearch, setSearch] = useState(false);

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

  const handleChangeSearch = (e) => {
    setSearch(e.target.checked);
  };

  const handleChangePickers = (key) => (value) => {
    setExhibition({ ...exhibition, [key]: value });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setExhibition({ ...exhibition, [name]: value });
  };

  const handleSearchString = (e) => {
    setSearchString(e.target.value);
  };

  const filterExcursions = () => {
    dispatch(
      setExhibitionsGlobal(
        exhibitionsGlobal.filter((exhb) => exhb.name === searchString)
      )
    );
  };

  function renderSider() {
    if (isAuth) {
      return (
        <div className="sider-wrapper">
          <div className="sider-search-wrapper">
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h6" color="white">
                Search
              </Typography>
              <SearchIcon sx={{ color: "white" }} />
              <Switch
                color="default"
                checked={isSearch}
                onChange={handleChangeSearch}
                inputProps={{ "aria-label": "controlled" }}
              />
              <AddBoxIcon sx={{ color: "white" }} />
              <Typography variant="h6" color="white">
                Add
              </Typography>
            </Stack>
          </div>
          {isSearch ? (
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
                  className="sider-flex-full"
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
          ) : (
            <Box component="form">
              <div className="sider-flex">
                <TextField
                  value={searchString}
                  variant="filled"
                  label="Excursion name"
                  placeholder="Enter name..."
                  className="sider-flex-full"
                  onChange={handleSearchString}
                  sx={{ background: "white" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <Button
                        variant="contained"
                        onClick={() => {
                          setSearchString("");
                          dispatch(setLoadingGlobal(true));
                        }}
                      >
                        <ClearIcon />
                      </Button>
                    ),
                  }}
                ></TextField>
                <Button
                  variant="contained"
                  onClick={filterExcursions}
                  className="sider-flex-full"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    ":hover": { backgroundColor: "gold" },
                  }}
                >
                  Search
                </Button>
              </div>
            </Box>
          )}
        </div>
      );
    }
  }

  return renderSider();
};

export { ExhSider };
