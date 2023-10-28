import React from 'react';
import { useGetAllCollaboratorsQuery } from '../utils/userApi';

const TableHeader = ({ projectName, _id: projectId }) => {

  const { data } = useGetAllCollaboratorsQuery({ projectId });


  return (
    <>
      <h1>{projectName}</h1>
      <ol>
        {
          data && data.map(({ status, userId: { username } }, index) => {
            console.log(username, status);
            return <li key={index}>{username}</li>
          })
        }
      </ol>
    </>
  )
};

export default TableHeader; 