import React, { Fragment, useState, useEffect } from 'react'

function VerificationProof({ freelancerData, setFreelancerData }) {

    const [resumeName, setResumeName] = useState('')
    // const [resume, setResume] = useState('')

    const [schoolIDName, setSchoolIDName] = useState('')
    const [course, setCourse] = useState('')
    // const [schoolID, setSchoolID] = useState('')

    //     onChange = {(e) => {
    //         setFormData({ ...formData, firstName: e.target.value });
    //     }
    // }

    const resumeOnChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {

                setFreelancerData({ ...freelancerData, resume: reader.result })

                setResumeName(e.target.files[0].name)
                // console.log(avatarName)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    }

    const schoolIDOnChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {

                setFreelancerData({ ...freelancerData, schoolID: reader.result })
                setSchoolIDName(e.target.files[0].name)

            }
        }
        console.log(freelancerData.schoolID)
        reader.readAsDataURL(e.target.files[0])

    }
    return (
        <div className="verification-proof-container">

            <div className='form-group'>
                <label htmlFor="course">Course:</label>

                <select
                    name="course"
                    id="course"
                    className='form-control'
                value={freelancerData.course}
                onChange={(e) =>   setFreelancerData({ ...freelancerData, course: e.target.value })}
                >
                    <option value="">Select Course</option>

                    

                    <option value="BET-Automotive">BET-Automotive</option>
                    <option value="BET-Chemical Tech">BET-Chemical Tech</option>
                    <option value="BET-Civil Tech">BET-Civil Tech</option>
                    <option value="BET-DMT">BET-DMT</option>
                    <option value="BET-ELEC">BET-ELEC</option>
                    <option value="BET-ELX">BET-ELX</option>
                    <option value="BET-EMT">BET-EMT</option>
                    <option value="BET-HVACRT">BET-HVACRT</option>
                    <option value="BET-ICT">BET-ICT</option>
                    <option value="BET-MT">BET-MT</option>
                    <option value="BET-Mechatronics">BET-Mechatronics</option>
                    <option value="BET-NDT">BET-NDT</option>
                    <option value="BGTAT">BGTAT</option>
                    <option value="BSCE-SEP">BSCE-SEP</option>
                    <option value="BSEE-SEP">BSEE-SEP</option>
                    <option value="BSME-SEP">BSME-SEP</option>
                    <option value="BSIT">BSIT</option>
                    <option value="BTVTE">BTVTE</option>
                    <option value="BSES-SDP">BSES-SDP</option>
                    <option value="LADDERIZED">LADDERIZED</option>

                </select>
                <br />
                <label htmlFor="email_field">Resumé</label>
                <div className='d-flex align-items-center'>

                    <div className='custom-file'>
                        <input
                            type='file'
                            name='avatar'
                            className='custom-file-input'
                            id='customFile'
                            accept='image/*'
                            onChange={resumeOnChange}
                        />

                        {resumeName ? (
                            <label className='custom-file-label' htmlFor='customFile'>

                                {resumeName}

                            </label>

                        ) : (
                            <label className='custom-file-label' htmlFor='customFile'>

                                resumé must be image

                            </label>

                        )
                        }

                    </div>
                </div>
            </div>
            <div className='form-group'>
                <br />
                <label htmlFor="email_field">School ID</label>
                <div className='d-flex align-items-center'>
                    {/* <div>
                        <figure className='avatar mr-3 item-rtl'>
                            <img
                                // src={avatarPreview}
                                className='rounded-circle'
                                alt='Avatar Preview'
                            />
                        </figure>
                    </div> */}
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='avatar'
                            className='custom-file-input'
                            id='customFile'
                            accept='image/*'
                            onChange={schoolIDOnChange}
                        />

                        {schoolIDName ? (
                            <label className='custom-file-label' htmlFor='customFile'>

                                {schoolIDName}

                            </label>

                        ) : (
                            <label className='custom-file-label' htmlFor='customFile'>

                                Attach School ID

                            </label>

                        )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerificationProof;