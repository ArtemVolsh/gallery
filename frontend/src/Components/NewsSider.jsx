import { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { createNews } from "../apiRequests/apiRequests";

const NewsSider = () => {
  const userId = useSelector((state) => state.user.currentUser.id);

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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  return (
    <div className="sider-wrapper">
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
    </div>
  );
};

export { NewsSider };
