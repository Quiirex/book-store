import jwt_decode from 'jwt-decode';

export function review(title, content, book_id) {
  const jwt = localStorage.getItem('jwt');
  const author_id = jwt_decode(jwt).user_id;

  const reviewData = {
    title,
    content,
    author_id,
    book_id,
  };

  fetch('http://localhost:8080/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to post review');
      }
      return response.json();
    })
    .then((data) => {
      alert('Review posted successfully');
      console.log('Review posted successfully:', data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error posting review:', error);
    });
}

export function deleteReview(review_id) {
  fetch(`http://localhost:8080/review/${review_id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      return response.json();
    })
    .then((data) => {
      alert('Review deleted successfully');
      console.log('Review deleted successfully:', data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error deleting review:', error);
    });
}
