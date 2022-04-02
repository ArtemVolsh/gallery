import { useEffect, useState } from "react";
import { Container, Grid, Card } from "@mui/material";
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

        const response = await axios({
          method: "GET",
          url: "http://localhost:5000/api/news",
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        console.log(`In function ${response}`);
        setNews(response.data.data);
        console.log(response.data.data);
      } catch (e) {
        console.log(e);
        console.log(e.response.data);
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
          <h1>NewsPage</h1>
          <Grid container spacing={2}>
            {news.map((newsItem) => (
              <Grid key={newsItem._id} item xs={8}>
                <span>{newsItem.name}</span>
                <p>{newsItem.content}</p>
                <p>{newsItem.feedback.map((feedbackItem) => (
									<span>{feedbackItem.content}</span>
								))}</p>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export { NewsPage };
