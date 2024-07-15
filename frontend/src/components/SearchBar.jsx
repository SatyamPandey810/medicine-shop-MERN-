import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const clearInput = () => {
        setSearchValue('');
    };
    return (
        <>
            <div className="bg-light py-3 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-0"><Link to="/">Home</Link> <span className="mx-2 mb-0">/</span> <strong className="text-black">Store</strong></div>
                        <div className="col-md-5 mx-auto">
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    id="example-search-input"
                                    placeholder='Search brand'
                                    value={searchValue}
                                    onChange={handleInputChange}
                                />
                                {searchValue && (
                                    <button className="btn btn-outline-secondary" onClick={clearInput}>
                                        &times;
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
