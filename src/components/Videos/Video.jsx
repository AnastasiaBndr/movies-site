import { useEffect, useMemo, useState } from 'react';
import { selectVideos } from '../../redux/currentMovie/currentMovieSelectors';
import { useSelector } from 'react-redux';

import { VideoFrame, NoTrailer } from './Video.styled';
const Video = () => {
  const videos = useSelector(selectVideos);
  const videosMemo = useMemo(() => videos, [videos]);
  const [trailer, setTrailer] = useState({});

  useEffect(() => {
    const findTrailer = () => {
      if (videosMemo)
        return videosMemo.filter(video => !video.name.includes('removed') && (video.name === 'Official Trailer' || video.name === 'Teaser Trailer'));
      else return [];
    }

    const trailer = findTrailer();
    setTrailer(trailer[0] || {});
  }, [videosMemo]);

  return (
    <>
      {trailer && trailer.id ? (
        <VideoFrame
          title={trailer.name}
          key={trailer.id}
          src={`https://www.youtube.com/embed/${trailer.key}`}
        ></VideoFrame>
      ) : (
        <NoTrailer>No trailer :(</NoTrailer>
      )}
    </>
  );
};

export default Video;

