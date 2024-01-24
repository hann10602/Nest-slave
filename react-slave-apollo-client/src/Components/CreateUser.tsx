import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_USER_MUTATION } from "../GraphQL/Mutations";

type Props = {};

const CreateUser = (props: Props) => {
  const [username, setUsername] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUser({
      variables: {
        username,
        displayName,
      },
    });

    if (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-10">
      <form onSubmit={handleSubmitForm} className="space-y-5">
        <div className="space-x-3">
          <label htmlFor="username">Username</label>
          <input
            className="border border-solid border-gray-400 outline-none"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-x-3">
          <label htmlFor="username">Display Name</label>
          <input
            className="border border-solid border-gray-400 outline-none"
            type="text"
            name="display-name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="border border-solid border-gray-600 rounded-md px-2 bg-green-500 text-white"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
