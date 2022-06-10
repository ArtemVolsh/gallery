import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  InputAdornment,
  Button,
  Switch,
  Stack,
  Typography,
  Checkbox,
  FormLabel,
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
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ExcSider = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const userId = useSelector((state) => state.user.currentUser.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const defaultSearchExcursion = {
    name: "",
    content: "",
    place: "",
    price: 0,
    status: false,
  };

  const [isSearch, setSearch] = useState(false);

  const [excursion, setExcursion] = useState(defaultExcursion);
  const [searchExcursion, setSearchExcursion] = useState(
    defaultSearchExcursion
  );

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

  const handleSearchInput = (e) => {
    const { name, value } = e.target;
    setSearchExcursion({ ...searchExcursion, [name]: value });
  };
  const handleSearchStatus = (e) => {
    setSearchExcursion({ ...searchExcursion, status: e.target.checked });
  };

  const formNavigationString = (post) => {
    let navString = "";

    for (let [key, value] of Object.entries(post)) {
      let firstOrConsequent = navString.includes("?") ? "&&" : "?";

      let customKeys = ["price", "status"];

      if (key === "price" && value !== defaultSearchExcursion[`${key}`])
        navString += `${firstOrConsequent}${key}[lte]=${value}`;

      if (key === "status")
        navString += `${firstOrConsequent}${key}[eq]=${value ? 1 : 0}`;

      if (value !== defaultSearchExcursion[key] && !customKeys.includes(key))
        navString += `${firstOrConsequent}${key}[regex]=${value}`;
    }

    console.log(navString);

    return navString;
  };

  const filter = (post) => {
    const string = formNavigationString(post);
    navigate("/excursions" + string);
    return string;
  };

  useEffect(() => {
    console.log(formNavigationString(searchExcursion));
  }, [searchExcursion]);

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
                  onClick={() => {
                    createExcursion(excursion);
                  }}
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
                  name="name"
                  value={searchExcursion.name}
                  onInput={handleSearchInput}
                  variant="filled"
                  label="Excursion name"
                  placeholder="Enter excursion name..."
                  className="sider-flex-full"
                  sx={{ background: "white" }}
                ></TextField>
                <TextField
                  name="content"
                  value={searchExcursion.content}
                  onInput={handleSearchInput}
                  variant="filled"
                  label="Excursion content"
                  placeholder="Enter excursion content..."
                  className="sider-flex-full"
                  sx={{ background: "white" }}
                ></TextField>
                <TextField
                  name="place"
                  value={searchExcursion.place}
                  onInput={handleSearchInput}
                  variant="filled"
                  label="Excursion place"
                  placeholder="Enter excursion place..."
                  className="sider-flex-full"
                  sx={{ background: "white" }}
                ></TextField>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    name="price"
                    value={searchExcursion.price}
                    onInput={handleSearchInput}
                    variant="filled"
                    type="number"
                    label="Price under"
                    className="sider-flex-full"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₴</InputAdornment>
                      ),
                    }}
                    sx={{ background: "white" }}
                  ></TextField>
                  <FormLabel sx={{ color: "white" }}>Active</FormLabel>
                  <Checkbox
                    checked={searchExcursion.status}
                    onChange={handleSearchStatus}
                  />
                </Stack>

                <Stack direction="row" spacing={1} className="sider-flex-full">
                  <Button
                    variant="contained"
                    onClick={() => {
                      filter(searchExcursion);
                    }}
                    className="sider-flex-full"
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      ":hover": { backgroundColor: "gold" },
                    }}
                  >
                    Search
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setSearchExcursion(defaultSearchExcursion);
                      navigate("/excursions");
                    }}
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      ":hover": { backgroundColor: "tomato" },
                    }}
                  >
                    <ClearIcon />
                  </Button>
                </Stack>
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
