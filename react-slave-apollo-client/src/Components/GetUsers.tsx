import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOAD_USERS } from "../GraphQL/Queries";
import { UserType } from "../types/user.type";

type Props = {};

const GetUsers = (props: Props) => {
  const [users, setUsers] = useState<UserType[]>([]);

  const { error, loading, data } = useQuery(LOAD_USERS);

  useEffect(() => {
    if (data) {
      setUsers(data.getUsers);
    }
  }, [data]);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {users &&
        !loading &&
        users.map((user) => (
          <div key={user.id} className="text-lg font-semibold">
            {user.username} : {user.displayName}
          </div>
        ))}
    </div>
  );
};

export default GetUsers;
