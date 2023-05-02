import React, { useState, useHistory } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

// const Search = ({ history }) => {
const Search = () => {
    const { user, loading, isAuthenticated } = useSelector(state => state.auth)
    const [keyword, setKeyword] = useState('');
    let navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            if(!user || user.role === 'admin'){
                navigate('/all')  
            }
            // else{
            //   navigate('/')  
            // }
            
        }
    }
    return (
        <form onSubmit={searchHandler} >
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Service Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}
export default Search