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

import { createNews } from "../apiRequests/apiRequests";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const NewsSider = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const userId = useSelector((state) => state.user.currentUser.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noImageLink = "https://www.jquery-az.com/html/images/banana.jpg";

  const defaultNews = {
    name: "",
    content: "",
    place: "",
    image: noImageLink,
    date: new Date(),
    price: 0,
    feedback: [],
  };

  console.log("defaultNews");
  console.log(defaultNews);

  const defaultSearchNews = {
    name: "",
    content: "",
    place: "",
  };

  // TODO Add fix published by

  const [isSearch, setSearch] = useState(false);

  const [news, setNews] = useState(defaultNews);
  const [searchNews, setSearchNews] = useState(defaultSearchNews);

  console.log("news");
  console.log(news);

  const handleChangeSearch = (e) => {
    setSearch(e.target.checked);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  const handleSearchInput = (e) => {
    const { name, value } = e.target;
    setSearchNews({ ...searchNews, [name]: value });
  };
  const handleSearchStatus = (e) => {
    setSearchNews({ ...searchNews, status: e.target.checked });
  };

  const formNavigationString = (post) => {
    let navString = "";

    for (let [key, value] of Object.entries(post)) {
      let firstOrConsequent = navString.includes("?") ? "&&" : "?";

      let customKeys = ["price", "status"];

      if (key === "price" && value !== defaultSearchNews[`${key}`])
        navString += `${firstOrConsequent}${key}[lte]=${value}`;

      if (key === "status")
        navString += `${firstOrConsequent}${key}[eq]=${value ? 1 : 0}`;

      if (value !== defaultSearchNews[key] && !customKeys.includes(key))
        navString += `${firstOrConsequent}${key}[regex]=${value}`;
    }

    console.log(navString);

    return navString;
  };

  const filter = (post) => {
    const string = formNavigationString(post);
    navigate("/news" + string);
    return string;
  };

  useEffect(() => {
    console.log(formNavigationString(searchNews));
  }, [searchNews]);

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
                  value={news.name}
                  onChange={handleChangeInput}
                  variant="filled"
                  label="Name"
                  placeholder="Provide name..."
                  sx={{ background: "white" }}
                ></TextField>
                <TextField
                  name="theme"
                  value={news.theme}
                  onChange={handleChangeInput}
                  variant="filled"
                  label="Theme"
                  placeholder="Provide theme..."
                  sx={{ background: "white" }}
                ></TextField>
                <TextField
                  name="image"
                  value={news.image}
                  onChange={handleChangeInput}
                  variant="filled"
                  label="Thumbnail URL"
                  sx={{ background: "white" }}
                ></TextField>
                <TextField
                  name="content"
                  value={news.content}
                  onChange={handleChangeInput}
                  variant="filled"
                  label="Content"
                  multiline
                  rows={4}
                  placeholder="Describe the news..."
                  className="sider-flex-full"
                  sx={{ background: "white" }}
                ></TextField>

                <Button
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    ":hover": { backgroundColor: "gold" },
                  }}
                  variant="contained"
                  onClick={() => createNews(news)}
                >
                  Add news
                </Button>
              </div>
            </Box>
          ) : (
            <Box component="form">
              <div className="sider-flex">
                <TextField
                  name="name"
                  value={searchNews.name}
                  onInput={handleSearchInput}
                  variant="filled"
                  label="News name"
                  placeholder="Enter news name..."
                  className="sider-flex-full"
                  sx={{ background: "white" }}
                ></TextField>
                <TextField
                  name="content"
                  value={searchNews.content}
                  onInput={handleSearchInput}
                  variant="filled"
                  label="News content"
                  placeholder="Enter news content..."
                  className="sider-flex-full"
                  sx={{ background: "white" }}
                ></TextField>

                <Stack direction="row" spacing={1} className="sider-flex-full">
                  <Button
                    variant="contained"
                    onClick={() => {
                      filter(searchNews);
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
                      setSearchNews(defaultSearchNews);
                      navigate("/news");
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

export { NewsSider };
