const getAll = ()=>{
    return fetch ("http://localhost:3333/articles")
    .then((response)=>{
        if(response.status ===200){
            return response.json();
        }
        else{
            throw "something went wrong"
        }
    })
    .then ((resJson)=>{
        return resJson
    })
    .catch((error)=>{
        console.log("Err",error)
        return Promise.reject(error)
    })
}

const getOne = (id) => {
    return fetch(`http://localhost:3333/articles/${id}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw "Something went wrong."
            }
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((error) => {
            console.log("Error: ", error);
            return Promise.reject(error);
        });
}

const createArticle = (article) => {
    
    return fetch(`http://localhost:3333/articles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('session_token')
        },
        body: JSON.stringify(article)
    })
    .then((response) => {
        if (response.status === 201) {
            return response.json();
        } else {
            throw "Failed to create article. Please check your authentication."
        }
    })
    .then((resJson) => {
        return resJson;
    })
    .catch((error) => {
        console.log("Error: ", error);
        return Promise.reject(error);
    });
}
const editarticle = (id,Title,Author,Text) => {
    
    return fetch(`http://localhost:3333/articles/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('session_token')
        },
        body: JSON.stringify({
            title: Title,
            author: Author,
            article_text: Text

        })
    })
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        } 
        if (response.status === 400) {
            throw "bad details"
        } 
        if (response.status === 404) {
            throw "not found"
        } 
        if (response.status === 401) {
            throw "not authorized"
        } 
        if (response.status === 500) {
            throw "server error"
        } 
        else{
            "something went wrong"
        }
    })
    .then((resJson) => {
        return resJson;
    })
    
}

const deleteArticle = (id) => {
    return fetch(`http://localhost:3333/articles/${id}`, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json',
    'X-Authorization': localStorage.getItem('session_token')
    }
    })
    .then((response) => {
    if (response.status === 200) {
    return response.json();
    } else if (response.status === 400) {
    throw "bad details";
    } else if (response.status === 404) {
    throw "not found";
    } else if (response.status === 401) {
    throw "not authorized";
    } else if (response.status === 500) {
    throw "server error";
    } else {
    throw "something went wrong";
    }
    })
    .then((resJson) => {
    return resJson;
    })
    



}


export const articleService ={
    getAll,
    getOne,
    createArticle,
    editarticle,
    deleteArticle
}