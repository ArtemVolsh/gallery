import { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import axios from "axios";

const ExcursionsPage = () => {
  const [filter, setFilter] = useState("");
  const [excursions, setExcursions] = useState([]);
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
          url: "http://localhost:5000/api/excursions",
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
				
        setExcursions(response.data.data);
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
          <h1 style={{ marginBottom: "15px" }}>Excursions Page</h1>
          <Grid container spacing={2}>
            {excursions.map((excs) => (
              <Grid key={`grid-${excs._id}`} item xs={4}>
                <Paper sx={{ padding: "10px" }}>
                  <h2 style={{ paddingBottom: "10px" }}>{excs.name}</h2>
                  <p style={{ paddingBottom: "5px" }}>
                    {" "}
                    <i>{excs.content}</i>
                  </p>
                  <span>Comments:</span>
                  <div className="comment-section">
                    {excs.feedback.map((feedbackItem) => (
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

export { ExcursionsPage };
