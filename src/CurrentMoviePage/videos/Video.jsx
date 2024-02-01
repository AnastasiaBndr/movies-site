import { useEffect } from 'react';
import { getVideos } from '../../redux/currentMovie/currentMovieOperations';
import { selectVideos } from '../../redux/currentMovie/currentMovieSelectors';
import { useDispatch, useSelector } from 'react-redux';

import { VideoList, VideoFrame } from './Video.styled';

const Video = ({ currentMovie }) => {
  const dispatch = useDispatch();
  const video = useSelector(selectVideos);

  useEffect(() => {
    if (currentMovie.media_type === 'movie') {
      dispatch(getVideos({ id: currentMovie.id, type: 'movie' }));
    } else if (currentMovie.media_type === 'tv') {
      dispatch(getVideos({ id: currentMovie.id, type: 'tv' }));
    }
  }, [currentMovie.id, dispatch, currentMovie.media_type]);

  return (
    <>
      <VideoList className="videos-container">
        {video ? (
          video
            .filter(video => video.name.includes('removed') !== true)
            .map(video => {
              return (
                <li className="video-item" key={video.id}>
                  <VideoFrame
                    title={video.name}
                    src={`https://www.youtube.com/embed/${video.key}`}
                  ></VideoFrame>
                </li>
              );
            })
        ) : (
          <p>No videos yet..</p>
        )}
      </VideoList>
    </>
  );
};

export default Video;
