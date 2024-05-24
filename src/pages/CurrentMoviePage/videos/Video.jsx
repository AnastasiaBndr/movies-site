import { useState } from 'react';
import { selectVideos } from '../../../redux/currentMovie/currentMovieSelectors';
import { useSelector } from 'react-redux';

import { VideoFrame, WatchTrailerButton } from './Video.styled';

const Video = () => {
  const video = useSelector(selectVideos);
  const [watchButton, setWatchButton] = useState(false);

  const watchButtonOnClick = () => {
    setWatchButton(!watchButton);
  };

  return (
    <>
      <WatchTrailerButton
        onClick={watchButtonOnClick}
        buttonactive={watchButton}
      >
        Watch trailer
      </WatchTrailerButton>
      {video && watchButton ? (
        video
          .filter(
            video =>
              !video.name.includes('removed') &&
              video.name === 'Official Trailer'
          )
          .map(video => {
            return (
              <VideoFrame
                title={video.name}
                key={video.id}
                src={`https://www.youtube.com/embed/${video.key}`}
              ></VideoFrame>
            );
          })
      ) : (
        <></>
      )}
    </>
  );
};

export default Video;
