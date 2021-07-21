import React from 'react'

function Search(props) {
  return (
    <div className="col col-sm-4">
      <input className="form-control" placeholder="Search for Movies" value={props.value}
      onChange={(e)=> props.setSearchValue(e.target.value)}
      ></input>
    </div>
  )
}

export default Search
