import React from 'react'
import UserNavbar from "../../components/UserNavbar";
import MovieList from "../../components/MovieList"; 


const UserDashboard = () => {
  return (
    <div>
      <UserNavbar />
      <MovieList/>
    </div>
  )
}

export default UserDashboard
