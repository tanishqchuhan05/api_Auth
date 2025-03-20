import React, { useState } from "react"; 
import UserNavbar from "../../components/UserNavbar";
import MovieList from "../../components/MovieList"; 


const UserDashboard = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Define state for search query

  return (
    <div>
      <UserNavbar onSearch={setSearchQuery} />
      <MovieList searchQuery={searchQuery}/>
    </div>
  )
}

export default UserDashboard
