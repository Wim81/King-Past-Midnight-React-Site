import { usersActions } from "./users-slice";

export const fetchUsersData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/users.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };

        try {
            const userData = await fetchData();
            dispatch(usersActions.updateUsers(userData));
        }
        catch(error) {
            console.log(error);
        }        
    };
};

export const addUser = (user) => {
    return async (dispatch) => {
        const sendUserData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/users.json',
                {
                    method: 'POST',
                    body: JSON.stringify(user)
                }
            )
        }
        const fetchData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/users.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };

        try {
            await sendUserData(user);
            const userData = await fetchData();
            dispatch(usersActions.updateUsers(userData));
        }
        catch(error) {
            console.log(error);
        }   
    }
}

export const modifyUser = user => {
    return async (dispatch) => {
        const sendModificationData = async () => {
            await fetch(
               'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/users/' + user.db_ref + '.json',
               {
                method: 'PUT',
                body: JSON.stringify(user)
               } 
            )
        }
        const fetchData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/users.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };

        try {
            await sendModificationData(user.db_ref);
            const userData = await fetchData();
            dispatch(usersActions.updateUsers(userData));
        }
        catch(error) {
            console.log(error);
        }
    }
}

export const deleteUser = id => {
    return async (dispatch) => {
        const sendDeletionData = async () => {
            await fetch(
               'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/users/' + id + '.json',
               {
                method: 'DELETE'
               } 
            )
        }
        const fetchData = async () => {
            const response = await fetch(
                'https://king-past-midnight-52b00-default-rtdb.europe-west1.firebasedatabase.app/users.json'
            ).then(response => response.json());
            const data = response;
            return(data);            
        };

        try {
            await sendDeletionData(id);
            const userData = await fetchData();
            dispatch(usersActions.updateUsers(userData));
        }
        catch(error) {
            console.log(error);
        }
    }
}