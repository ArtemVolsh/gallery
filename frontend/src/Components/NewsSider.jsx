import { useState } from "react";
import {
  TextField,
  Box,
  Button,
  InputAdornment,
  Switch,
  Stack,
  Typography,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ClearIcon from "@mui/icons-material/Clear";

import { createNews } from "../apiRequests/apiRequests";

import {
  setNews as setNewsGlobal,
  setLoading as setLoadingGlobal,
} from "../Reducers/postReducer";

const NewsSider = () => {
  const userId = useSelector((state) => state.user.currentUser.id);
  const isAuth = useSelector((state) => state.user.isAuth);
  const newsGlobal = useSelector((state) => state.posts.news);

  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState("");
  const [isSearch, setSearch] = useState(false);

  const noImageLink = "https://www.jquery-az.com/html/images/banana.jpg";

  const defaultNews = {
    name: "",
    content: "",
    theme: "",
    image: noImageLink,
    publishedBy: userId,
    feedback: [],
  };

  const [news, setNews] = useState(defaultNews);

  const handleChangeSearch = (e) => {
    setSearch(e.target.checked);
  };

  const handleSearchString = (e) => {
    setSearchString(e.target.value);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  const filterExcursions = () => {
    dispatch(
      setNewsGlobal(
        newsGlobal.filter((newsItem) => newsItem.name === searchString)
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

export { NewsSider };
