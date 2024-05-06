import React, { useEffect, useState } from "react";
import { api } from "@utils/api";
import { notification } from "@utils";
import { LoadingData, PhotoList, ModalLoading } from "@components";
import "./styles.scss";

const AlbumList = ({
  userData = {},
  data = [],
  getData,
  loading = false,
  error = false,
}) => {
  const [photoList, setPhotoList] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [errorPhotos, setErrorPhotos] = useState(false);

  useEffect(() => {
    if (data?.length === 0) {
      getData();
    }
  }, []);

  const selectAlbum = async (e = {}) => {
    const failed = () => {
      setPhotoList([]);
      setLoadingPhotos(false);
      notification({
        type: "error",
        text: "Something wrong, please try again",
      });
      setErrorPhotos(true);
    };
    try {
      const url = `/photos?albumId=${e?.id}`;

      setLoadingPhotos(true);
      setErrorPhotos(false);
      const response = await api.get(url, {});
      if (response.status === 200) {
        setLoadingPhotos(false);
        setPhotoList(response?.data);
      } else {
        failed();
      }
    } catch {
      failed();
    }
  };

  const goBack = () => {
    setPhotoList([]);
  };

  return (
    <div className="album-list">
      <ModalLoading loading={loadingPhotos} />
      {loading || error ? (
        <LoadingData fetchData={getData} loadingFailed={error} />
      ) : (
        <>
          {photoList?.length > 0 ? (
            <PhotoList data={photoList} goBack={goBack} />
          ) : (
            <>
              {data?.map((e) => {
                return (
                  <div>
                    <div
                      class="album"
                      onClick={() => {
                        selectAlbum(e);
                      }}
                    >
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
        </>
      )}
    </div>
  );
};

export default AlbumList;
