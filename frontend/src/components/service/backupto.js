<div className="whole-card">
            <div className="card rounded">
                <img
                    className="card-img-top mx-auto"
                    // src={service.images.url}
                    src={service.image}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">



                        {users && users.map((user, index) => (

                            service.user_id === users[index]._id && (

                                <div className='freelancer-info'>
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={users && users.name}
                                        key={service._id}
                                        className="rounded-img"
                                    />
                                    {/* <a>adw</a> */}
                                    <a className='black-name'>{user.name}</a>
                                    
                                </div>
                            )

                        ))}


                        <center className="justified" href="">{service.description}</center>

                        <center className="justified" href="">Category: {service.category.name}</center>
                        <div className='row' style={{display: 'flex', flexDirection:'row'}}>
                            <div style={{width: 25,
        height: 25,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: 'gainsboro',}}>
                        <img src={service.user.avatar.url} style={{ height: 25,
        width: 'auto'}}></img>
                        </div>
                        <center className="justified" href="">{service.user.name}</center>
                        </div>
                        {/* <center className="gitna" href="">User_id: {service.user_id}</center> */}

                        {/* {users.map((value, index) => <li key={index}>{value}</li>)} */}


                        <div className="ratings mt-auto">
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(2 / 5) * 100}%` }}></div>
                                {/* <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div> */}
                            </div>
                            {/* <span id="no_of_reviews">({product.numOfReviews} reviews)</span> */}
                            <span id="no_of_reviews">(6 reviews)</span>
                        </div>


                    </h5>


                    {/* <div className="ratings mt-auto">
                 <div className="rating-outer">
                   <div className="rating-inner" style={ {width: `${(animal.ratings / 5) * 100}%`}}></div>
                 </div>
                 <span id="no_of_reviews">({animal.numOfReviews} reviews)</span>
               </div> */}
                    {/* <p className="card-text">${animal.price}</p> */}
                    {/* <Link to={`//${animal._id}`} id="view_btn" className="btn btn-block">Adopt</Link> */}


                    {/* //
                    <Link to={`/animal/details/${service._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                    // */}


                    {/* <a href="#" id="view_btn" className="btn btn-block">View Details</a> */}
                </div>
            </div>
            <Link to={`/service/details/${service._id}`} id="view_btn" className="btn btn-block">View Details</Link>
            {/* <p><button >View Details</button></p> */}
        </div>