import { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setExhibitions as setExhibitionsGlobal,
  setLoading as setLoadingGlobal,
} from "../Reducers/postReducer";

const ExhibitionsPage = () => {
  const [filter, setFilter] = useState("");
  const [exhibitions, setExhibitions] = useState([]);

  const params = window.location.search ? window.location.search : null;
  const [forceRender, setForceRender] = useState(false);

  const dispatch = useDispatch();
  const exhibitionsGlobal = useSelector((state) => state.posts.exhibitions);
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

  useEffect(() => {
    if (loading) setForceRender(!forceRender);
  }, [loading]);

  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      try {
        let query;

        if (params && !filter) query = params;
        else query = filter;

        axios({
          method: "GET",
          url: "http://localhost:5000/api/exhibitions",
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
          .then((response) => {
            setExhibitions(response.data.data);
            dispatch(setExhibitionsGlobal(response.data.data));
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
          <h1 style={{ marginBottom: "15px" }}>Exhibitions Page</h1>
          <Grid container spacing={2}>
            {exhibitionsGlobal.map((exhs) => (
              <Grid key={`grid-${exhs._id}`} item xs={5}>
                <Paper className="post-card">
                  <div className="post-card__image-wrapper">
                    <img className="post-card__image" src={exhs.image} alt="" />
                  </div>
                  <div style={{ padding: "10px" }}>
                    <h2 style={{ paddingBottom: "10px" }}>{exhs.name}</h2>
                    <span className="post-card__subheading">Theme</span>
                    <span style={{ marginLeft: "5px" }}>{exhs.theme}</span>
                    <br />
                    <span className="post-card__subheading">Price</span>
                    <span style={{ marginLeft: "5px" }}>{exhs.price}₴</span>
                    <br />
                    <span className="post-card__subheading">Place</span>
                    <span style={{ marginLeft: "5px" }}>{exhs.place}</span>
                    <br />
                    <span className="post-card__subheading">Start Date</span>
                    <span style={{ marginLeft: "5px" }}>
                      {new Date(exhs.date).toLocaleString(
                        "uk-UK",
                        timeLocalOptions
                      )}
                    </span>
                    <br />
                    <span className="post-card__subheading">End Date</span>
                    <span style={{ marginLeft: "5px" }}>
                      {new Date(exhs.endDate).toLocaleString(
                        "uk-UK",
                        timeLocalOptions
                      )}
                    </span>

                    <p style={{ paddingBottom: "5px" }}>
                      <i>{exhs.content}</i>
                    </p>
                    <span>Comments:</span>
                    <div className="comment-section">
                      {exhs.feedback.map((feedbackItem) => (
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

export { ExhibitionsPage };
