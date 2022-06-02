import { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import axios from "axios";

const NewsPage = () => {
  const [filter, setFilter] = useState("");
  const [news, setNews] = useState([]);
  const params = window.location.search ? window.location.search : null;

  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      try {
        let query;

        if (params && !filter) query = params;
        else query = filter;

        axios({
          method: "GET",
          url: "http://localhost:5000/api/news",
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
          .then((response) => setNews(response.data.data))
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
        console.log(e?.response?.data);
      }
    };

    fetchData();

    return () => cancel();
  }, [filter, params]);

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
            {news.map((newsItem) => (
              <Grid key={newsItem._id} item xs={4}>
                <Paper sx={{ padding: "10px" }}>
                  <span>{newsItem.name}</span>
                  <p>{newsItem.content}</p>
                  <p>
                    {newsItem.feedback.map((feedbackItem) => (
                      <>
                        <div>{feedbackItem.content}</div>
                      </>
                    ))}
                  </p>
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
