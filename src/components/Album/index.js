import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import { LoadingData } from "@components";
import { initials } from "@utils";
import "./styles.scss";

const AlbumList = ({
  userData = {},
  data = [],
  getData,
  loading = false,
  error = false,
}) => {
  useEffect(() => {
    if (data?.length === 0) {
      getData();
    }
  }, []);
  return (
    <div className="album-list">
      {loading || error ? (
        <LoadingData fetchData={getData} loadingFailed={error} />
      ) : (
        <>
          {data?.map((e) => {
            return (
              <div>
                <div class="album">
                  <span class="album-icon">📷</span>
                  <div class="album-info">
                    <h2 class="album-title">Album {e?.id}</h2>
                    <p class="album-description">{e?.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AlbumList;
