import { useDispatch, useSelector } from "react-redux";
import { selectFilteredUserMovies } from "../../redux/userMovies/userMoviesSelectors";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserMovieList } from "../../redux/userMovies/userMoviesOperations";
import { MoviesListScheme } from "components/Scheme/schemes";

const UserList = () => {
    const dispatch = useDispatch();
    const filteredList = useSelector(selectFilteredUserMovies);
    const params = useParams();

    console.log(filteredList);

    useEffect(() => {
        dispatch(getUserMovieList({ type: params.type }));
    }, [dispatch, params.type]);


    return (filteredList && <MoviesListScheme movies={filteredList}></MoviesListScheme>);
}

export default UserList;