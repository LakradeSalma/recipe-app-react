import React from 'react'

export const SearchBar = (props) => {
    console.log("hello search   ")
    return (
        
                    <div className="basis-3/12 my-4 bg-transparent">
                        <div className="space-x-1">
                            <input
                                onChange={props.handleChange}
                                type="text"
                                className="block w-5/6 px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Search..."
                            />
                        </div>
                    </div>
                
    )
}