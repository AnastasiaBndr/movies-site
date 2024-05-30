import { useDispatch, useSelector } from "react-redux";
import { selectFilteredUserMovies } from "../../redux/userMovies/userMoviesSelectors";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react"; // Додавання useMemo
import { deleteMovieFromList, getUserMovieList } from "../../redux/userMovies/userMoviesOperations";
import { UserFilteresListScheme } from "components/Scheme/schemes";

const UserList = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const filteredList = useSelector(selectFilteredUserMovies);
    useMemo(() => {
        dispatch(getUserMovieList({ type: params.type }));
    }, [dispatch, params.type]);

    const onDelete = (movie) => {
        dispatch(deleteMovieFromList({ id: movie._id }));
        dispatch(getUserMovieList({ type: params.type }));
    }

    useEffect(() => {
        dispatch(getUserMovieList({ type: params.type }));
    }, [dispatch, params.type, filteredList]);

    return (filteredList && <UserFilteresListScheme movies={filteredList} onDelete={onDelete}></UserFilteresListScheme>);
}

export default UserList;
