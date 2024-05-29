import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectReviews } from "../../redux/currentMovie/currentMovieSelectors";
import { getReviews } from "../../redux/currentMovie/currentMovieOperations";

import { ReviewItem, ReviewsContainer, Review, ReviewCreatedAt, ReviewAuthorUsername, ReviewAuthor } from "./Reviews.styled";
import { selectLanguage } from "../../redux/global/globalSlice";

const Reviews = () => {
    const reviews = useSelector(selectReviews) || [];
    const params = useParams();
    const dispatch = useDispatch();
    const language = useSelector(selectLanguage) || 'en-US';

    useEffect(() => {
        dispatch(getReviews({ id: params.id, type: params.type }));
    }, [dispatch, params.id, params.type, language])
    console.log(reviews);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1)
            return `${diffDays} day ago`;
        else if (diffDays <= 28) {
            return `${diffDays} days ago`;
        } else {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            if (language === 'en-US')
                return date.toLocaleDateString('en-US', options);
            else return date.toLocaleDateString('uk-UA', options);
        }
    }

    return (<ReviewsContainer>
        {reviews.length > 0 ? reviews.map(review => {
            return (
                <ReviewItem key={review.id}>
                    <ReviewAuthor >{review.author}</ReviewAuthor>
                    <ReviewAuthorUsername >@{review.author_details.username}</ReviewAuthorUsername>
                    <Review >{review.content}</Review>
                    <ReviewCreatedAt >{formatDate(review.created_at)}</ReviewCreatedAt>
                </ReviewItem>)
        }) : <p>No reviews yet</p>}
    </ReviewsContainer>)
}

export default Reviews;