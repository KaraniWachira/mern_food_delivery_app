import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// type for the user request
type CreateUserRequest = {
    auth0Id: string,
    email: string
}

export const useCreateMyUser = () => { 
    const CreateMyUserRequest =async (user: CreateUserRequest) => {
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify (user),
        });

        if(!response.ok) {
            throw new Error("Failed to create new user");
        }
    };

    const {mutateAsync: createUser, 
        isLoading, 
        isError, 
        isSuccess,
     } = useMutation(CreateMyUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    };
};




















