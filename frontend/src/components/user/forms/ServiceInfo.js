import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories, clearErrors, newCategory } from '../../../actions/categoryActions';

function ServiceInfo({ serviceData, setServiceData }) {

    const dispatch = useDispatch();

    // let navigate = useNavigate();

    const { loading, error, categories } = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(getCategories())



    }, [dispatch, error])

    return (
        <div className="service-info-container">
            {/* <input
                type="text"
                placeholder="Category"
                className="form-control"
                value={formData.firstName}
                onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                }}



            /> */}
            <label htmlFor="email_field">Select Category</label>

            <select
                name="category"
                id="category"
                className='form-control'
                value={serviceData.category}
                onChange={(e) => setServiceData({ ...serviceData, category: e.target.value })}
            >
                <option value="">Select Category</option>


                {categories.map((category) => (
                    <option value={category._id} key={category._id}>{category.name}</option>
                    //   <li key={season.id}>{season}</li>
                ))}
                {/* categories.forEach(category => {
                    
                                        <option value={category._id}>{category.name}</option>
                                      

  
}) */}


            </select>
            <br />
            <label htmlFor="email_field">Service Name</label>
            <input
                type="text"
                placeholder="I will ...... for you"
                name='name'
                className="form-control"
                value={serviceData.name}
                onChange={(e) => {
                    setServiceData({ ...serviceData, name: e.target.value });
                }}
            />

            <br />
            <label>Price Starts in (₱)</label>
            <input
                className="form-control"
                placeholder="Price Starts At"
                type="number"
                id="priceStarts_At"
                name="priceStarts_At"
                min="5"
                onChange={(e) => {
                    setServiceData({ ...serviceData, priceStarts_At: e.target.value });
                }}
                value={serviceData.priceStarts_At}
            />






        </div>

    );
}

export default ServiceInfo;