import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($username: String!, $displayName: String!) {
    createUser(
      CreateUserData: { username: $username, displayName: $displayName }
    ) {
      id
    }
  }
`;
