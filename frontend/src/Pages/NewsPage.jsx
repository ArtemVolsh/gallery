import { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  setNews as setNewsGlobal,
  setLoading as setLoadingGlobal,
} from "../Reducers/postReducer";

import { getUserById } from "../apiRequests/utilities";

const NewsPage = () => {
  const [filter, setFilter] = useState("");
  const [news, setNews] = useState([]);

  const params = window.location.search ? window.location.search : null;
  const [forceRender, setForceRender] = useState(false);

  const dispatch = useDispatch();
  const newsGlobal = useSelector((state) => state.posts.news);
  const loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    if (loading) setForceRender(!forceRender);
  }, [loading]);

  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      dispatch(setLoadingGlobal(true));
      try {
        let query;

        if (params && !filter) query = params;
        else query = filter;

        axios({
          method: "GET",
          url: "http://localhost:5000/api/news",
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
          .then((response) => {
            setNews(response.data.data);
            dispatch(setNewsGlobal(response.data.data));
          })
          .then(() => dispatch(setLoadingGlobal(false)))
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
        console.log(e?.response?.data);
      }
    };

    fetchData();

    return () => cancel();
  }, [filter, params, forceRender]);

  return (
    <>
      <div className="page-wrapper">
        <Container
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "24px 0",
          }}
        >
          <h1 style={{ marginBottom: "15px" }}>News Page</h1>
          <Grid container spacing={2}>
            {newsGlobal.map((newsItem) => (
              <Grid key={`grid-${newsItem._id}`} item lg={3} md={4} xs={2}>
                <Paper className="post-card">
                  <div className="post-card__image-wrapper">
                    <img
                      className="post-card__image"
                      src={newsItem.image}
                      alt=""
                    />
                  </div>
                  <div style={{ padding: "10px" }}>
                    <h2 style={{ paddingBottom: "10px" }}>{newsItem.name}</h2>
                    <span className="post-card__subheading">Theme</span>
                    <span style={{ marginLeft: "5px" }}>{newsItem.theme}</span>
                    <br />
                    <span className="post-card__subheading">Published by</span>
                    <span style={{ marginLeft: "5px" }}>{}</span>
                    <br />
                    <p>{newsItem.content}</p>
                    <p>
                      {newsItem.feedback.map((feedbackItem) => (
                        <>
                          <div>{feedbackItem.content}</div>
                        </>
                      ))}
                    </p>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export { NewsPage };
