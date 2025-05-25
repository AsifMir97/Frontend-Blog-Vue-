const getAll = (articleId) => {
    return fetch(`http://localhost:3333/articles/${articleId}/comments`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw "something went wrong";
        }
      })
      .then((resJson) => {
        return resJson;
      })
      .catch((error) => {
        console.log("Err", error);
        return Promise.reject(error);
      });
  };
  
const add = (comment, articleId) => {
    return fetch(`http://localhost:3333/articles/${articleId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ comment_text: comment })
    })
    .then(response => {
      if(response.status === 201) {
        return response;
      } else {
        throw "Error adding comment";
      }
    })
    .catch(error => {
      console.log("Error adding comment: ", error);
      return Promise.reject(error);
    });
  }
  const editComment = (comment, articleId, commentId) => {
    return fetch(`http://localhost:3333/articles/${articleId}/comments/${commentId}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
    },
    body: JSON.stringify({ comment_text: comment })
    })
    .then(response => {
    if(response.status === 200) {
    return response;
    } else {
    throw "Error editing comment";
    }
    })
    .catch(error => {
    console.log("Error editing comment: ", error);
    return Promise.reject(error);
    });
    }
  

export const commentsService ={
    getAll,
    add,
    editComment
    
}