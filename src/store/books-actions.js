import { booksActions } from "./books-slice";
import { commentsActions } from "./comments-slice";

export const fetchBooksData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/books.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };

        try {
            const bookData = await fetchData();
            dispatch(booksActions.updateBooks(bookData));
        }
        catch(error) {
            console.log(error);
        }        
    };
};

export const addBook = (book) => {
    return async (dispatch) => {
        const sendBookData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/books.json',
                {
                    method: 'POST',
                    body: JSON.stringify(book)
                }
            )
        }
        const fetchData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/books.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };

        try {
            await sendBookData(book);
            const bookData = await fetchData();
            dispatch(booksActions.updateBooks(bookData));
        }
        catch(error) {
            console.log(error);
        }   
    }
}

export const modifyBook = book => {
    return async (dispatch) => {
        const sendModificationData = async () => {
            await fetch(
               'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/books/' + book.db_ref + '.json',
               {
                method: 'PUT',
                body: JSON.stringify(book)
               } 
            )
        }
        const fetchData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/books.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };

        try {
            await sendModificationData(book.db_ref);
            const bookData = await fetchData();
            dispatch(booksActions.updateBooks(bookData));
        }
        catch(error) {
            console.log(error);
        }
    }
}

export const deleteBook = id => {
    return async (dispatch) => {
        const sendDeletionData = async () => {
            await fetch(
               'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/books/' + id + '.json',
               {
                method: 'DELETE'
               } 
            )
        }
        const fetchData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/books.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };

        try {
            await sendDeletionData(id);
            const bookData = await fetchData();
            dispatch(booksActions.updateBooks(bookData));
        }
        catch(error) {
            console.log(error);
        }
    }
}

export const fetchCommentsData = book => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/comments/' + book.id + '.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };

        try {
            const commentData = await fetchData();
            dispatch(commentsActions.updateComments(commentData));
        }
        catch(error) {
            console.log(error);
        }        
    };
};

export const addComment = (comment, bookId) => {
    return async (dispatch) => {
        const sendCommentData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/comments/' + bookId + '.json',
                {
                    method: 'POST',
                    body: JSON.stringify(comment)
                }
            )
        }
        const fetchData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/comments/' + bookId + '.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };

        try {
            await sendCommentData(comment, bookId);
            const commentData = await fetchData(bookId);
            dispatch(commentsActions.updateComments(commentData));
        }
        catch(error) {
            console.log(error);
        }   
    }
}

export const updateLikesBook = (book) => {
    return async (dispatch) => {
        const sendModificationData = async () => {
            await fetch(
               'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/books/' + book.db_ref + '.json',
               {
                method: 'PUT',
                body: JSON.stringify(book)
               } 
            )
        }
        const fetchData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/books.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };            

        try {
            await sendModificationData(book.db_ref);
            const bookData = await fetchData();
            dispatch(booksActions.updateBooks(bookData));
        }
        catch(error) {
            console.log(error);
        }
    }
}

export const updateInCollectionsBook = (book) => {
    return async (dispatch) => {
        const sendModificationData = async () => {
            await fetch(
               'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/books/' + book.db_ref + '.json',
               {
                method: 'PUT',
                body: JSON.stringify(book)
               } 
            )
        }
        const fetchData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/books.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };

        try {
            await sendModificationData(book.db_ref);
            const bookData = await fetchData();
            dispatch(booksActions.updateBooks(bookData));
        }
        catch(error) {
            console.log(error);
        }
    }
}

export const fetchBookOfTheMonth = () => {
    return async (dispatch) => {
        const fetchBotmData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/book_of_the_month.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };

        try {
            const botm = await fetchBotmData();
            dispatch(booksActions.updateBookOfTheMonth(botm));
        }
        catch(error) {
            console.log(error);
        }        
    };
};

export const updateBookOfTheMonth = (id, botm_value) => {
    const bookId = id;
    const botmValue = botm_value;
    let newDbValue = null;
    if (botmValue === true) {
        newDbValue = bookId;
    }
    return async () => {
        const sendBookOfTheMonthUpdate = async () => {
            await fetch(
               'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/book_of_the_month.json',
               {
                method: 'PUT',
                body: JSON.stringify(newDbValue)
               } 
            )
        }

        try {
            await sendBookOfTheMonthUpdate(newDbValue);
        }
        catch(error) {
            console.log(error);
        }
    }
}