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
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ClearIcon from "@mui/icons-material/Clear";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DateTimePicker as DatePicker,
} from "@mui/x-date-pickers";

import { createExcursion } from "../apiRequests/apiRequests";

import { useSelector, useDispatch } from "react-redux";
import {
  setExcursions as setExcursionsGlobal,
  setLoading as setLoadingGlobal,
} from "../Reducers/postReducer";

const ExcSider = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const userId = useSelector((state) => state.user.currentUser.id);
  const excursionsGlobal = useSelector((state) => state.posts.excursions);

  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState("");
  const [isSearch, setSearch] = useState(false);

  const noImageLink = "https://www.jquery-az.com/html/images/banana.jpg";

  const defaultExcursion = {
    name: "",
    content: "",
    place: "",
    image: noImageLink,
    date: new Date(),
    price: 0,
    offeredBy: userId,
    feedback: [],
  };

  const [excursion, setExcursion] = useState(defaultExcursion);

  const handleChangeSearch = (e) => {
    setSearch(e.target.checked);
  };

  const handleChangePickers = (key) => (value) => {
    setExcursion({ ...excursion, [key]: value });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setExcursion({ ...excursion, [name]: value });
  };

  const handleSearchString = (e) => {
    setSearchString(e.target.value);
  };

  const filterExcursions = () => {
    dispatch(
      setExcursionsGlobal(
        excursionsGlobal.filter((excs) => excs.name === searchString)
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
                  className="sider-flex-full"
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
                  variant="contained"
                  onClick={() => createExcursion(excursion)}
                  className="sider-flex-full"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    ":hover": { backgroundColor: "gold" },
                  }}
                >
                  Add Excursion
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

export { ExcSider };
