import { useEffect, useMemo, useState } from 'react';
import { selectVideos } from '../../redux/currentMovie/currentMovieSelectors';
import { useSelector } from 'react-redux';

import { VideoFrame, NoTrailer } from './Video.styled';
import { useTranslation } from 'react-i18next';
const Video = () => {
  const videos = useSelector(selectVideos);
  const videosMemo = useMemo(() => videos, [videos]);
  const [trailer, setTrailer] = useState({});
  const { t } = useTranslation();

  console.log(videosMemo);

  useEffect(() => {
    const findTrailer = () => {
      if (videosMemo)
        return videosMemo.filter(video => !video.name.includes('removed') && (video.name === 'Official Trailer' || video.name === 'Teaser Trailer' || video.name.includes('трейлер')));
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
        <NoTrailer>{t('no_trailer')}</NoTrailer>
      )}
    </>
  );
};

export default Video;

