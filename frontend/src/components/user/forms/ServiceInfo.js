import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories, clearErrors, newCategory } from '../../../actions/categoryActions';

function ServiceInfo({ serviceData, setServiceData }) {

    const dispatch = useDispatch();

    // let navigate = useNavigate();
    const [imageName, setImageName] = useState('')
    const { loading, error, categories } = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(getCategories())



    }, [dispatch, error])


    const OnChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {

                setServiceData({ ...serviceData, images: reader.result })

                setImageName(e.target.files[0].name)
                // console.log(avatarName)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    }

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
            <br />
            <label htmlFor="email_field">Service Description</label>
            <input
                type="text"
                placeholder="I will ...... for you"
                name='description'
                className="form-control"
                value={serviceData.description}
                onChange={(e) => {
                    setServiceData({ ...serviceData, description: e.target.value });
                }}
            />

            <br />
            <label htmlFor="email_field">Service Image</label>
            <div className='d-flex align-items-center'>

                <div className='custom-file'>
                    <input
                        type='file'
                        name='avatar'
                        className='custom-file-input'
                        id='customFile'
                        accept='image/*'
                        onChange={OnChange}
                    />
                    {/* <label className='custom-file-label' htmlFor='customFile'>

                        resumé must be image

                    </label> */}

                    {imageName ? (
                        <label className='custom-file-label' htmlFor='customFile'>

                            {imageName}

                        </label>

                    ) : (
                        <label className='custom-file-label' htmlFor='customFile'>

                            Upload Image

                        </label>

                    )
                    }

                </div>
            </div>




        </div>

    );
}

export default ServiceInfo;