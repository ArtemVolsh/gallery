import { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import axios from "axios";

const ExhibitionsPage = () => {
  const [filter, setFilter] = useState("");
  const [exhibitions, setExhibitions] = useState([]);
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
          url: "http://localhost:5000/api/exhibitions",
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        console.log(`In function ${response}`);
        setExhibitions(response.data.data);
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
          <h1 style={{ marginBottom: "15px" }}>Exhibitions Page</h1>
          <Grid container spacing={2}>
            {exhibitions.map((exhs) => (
              <Grid key={`grid-${exhs._id}`} item xs={4}>
                <Paper sx={{ padding: "10px" }}>
                  <h2 style={{ paddingBottom: "10px" }}>{exhs.name}</h2>
                  <p style={{ paddingBottom: "5px" }}>
                    {" "}
                    <i>{exhs.content}</i>
                  </p>
                  <span>Comments:</span>
                  <div className="comment-section">
                    {exhs.feedback.map((feedbackItem) => (
                      <>
                        <div key={feedbackItem._id}>{feedbackItem.content}</div>
                      </>
                    ))}
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

export { ExhibitionsPage };
