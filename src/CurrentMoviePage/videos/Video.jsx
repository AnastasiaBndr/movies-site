import { useEffect } from 'react';
import {
  getMovieVideos,
  // getSeriesVideos,
  // getMovieById,
} from '../../redux/currentMovie/currentMovieOperations';
// import {
//   selectcurrentMovie,
//   selectVideos,
// } from '../../redux/currentMovie/currentMovieSelectors';
import { useDispatch } from 'react-redux';

const Video = ({ currentMovie }) => {
  // const [video, setVideo] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(currentMovie);
    dispatch(getMovieVideos(currentMovie.id));
  });

  //console.log(movie);

  // useEffect(() => {
  //   if (currentMovie.media_type === 'movie') {
  //     console.log(currentMovie.id);
  //     const video = dispatch(getMovieVideos(currentMovie.id));
  //     const availableVideos = video.results.filter(
  //       video => video.name.includes('removed') !== true
  //     );
  //     setVideo(availableVideos);
  //   } else if (currentMovie.media_type === 'tv') {
  //     const video = dispatch(getSeriesVideos(currentMovie.id));
  //     const availableVideos = video.results.filter(
  //       video => video.name.includes('removed') !== true
  //     );
  //     setVideo(availableVideos);
  //   }
  // }, [setVideo, currentMovie.id, currentMovie.media_type, dispatch]);

  return (
    <>
      Videoooos
      {/* <ul className="videos-container">
        {video ? (
          video.map(video => {
            return (
              <li className="video-item" key={video.id}>
                <p className="author">{video.name}</p>
                <iframe
                  width="420"
                  height="315"
                  title={video.name}
                  src={`https://www.youtube.com/embed/${video.key}`}
                ></iframe>
              </li>
            );
          })
        ) : (
          <p>No videos yet..</p>
        )}
      </ul> */}
    </>
  );
};

export default Video;
