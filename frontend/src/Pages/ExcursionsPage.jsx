import { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setExcursions as setExcursionsGlobal,
  setLoading as setLoadingGlobal,
} from "../Reducers/postReducer";

const ExcursionsPage = () => {
  const [filter, setFilter] = useState("");
  const [excursions, setExcursions] = useState([]);

  const params = window.location.search ? window.location.search : null;
  const [forceRender, setForceRender] = useState(false);

  const dispatch = useDispatch();
  const excursionsGlobal = useSelector((state) => state.posts.excursions);
  const loading = useSelector((state) => state.posts.loading);

  const timeLocalOptions = {
    weekday: "short",
    year: "2-digit",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: undefined,
  };

  // Not a bug, feature to force render from another component
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
          url: "http://localhost:5000/api/excursions",
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
          .then((response) => {
            setExcursions(response.data.data);
            dispatch(setExcursionsGlobal(response.data.data));
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
          <h1 style={{ marginBottom: "15px" }}>Excursions Page</h1>
          <Grid container spacing={2}>
            {excursionsGlobal?.map((excs) => (
              <Grid key={`grid-${excs._id}`} item xs={4}>
                <Paper className="post-card">
                  <div className="post-card__image-wrapper">
                    <img className="post-card__image" src={excs.image} alt="" />
                  </div>
                  <div style={{ padding: "10px" }}>
                    <h2 style={{ paddingBottom: "10px" }}>{excs.name}</h2>
                    <span className="post-card__subheading">Place</span>
                    <span style={{ marginLeft: "5px" }}>{excs.place}</span>
                    <br />
                    <span className="post-card__subheading">Price</span>
                    <span style={{ marginLeft: "5px" }}>{excs.price}₴</span>
                    <br />
                    <span className="post-card__subheading">Start Date</span>
                    <span style={{ marginLeft: "5px" }}>
                      {new Date(excs.date).toLocaleString(
                        "uk-UK",
                        timeLocalOptions
                      )}
                    </span>
                    <br />
                    <p style={{ paddingBottom: "5px" }}>
                      {" "}
                      <i>{excs.content}</i>
                    </p>
                    <span>Comments:</span>
                    <div className="comment-section">
                      {excs.feedback.map((feedbackItem) => (
                        <>
                          <div key={feedbackItem._id}>
                            {feedbackItem.content}
                          </div>
                        </>
                      ))}
                    </div>
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
