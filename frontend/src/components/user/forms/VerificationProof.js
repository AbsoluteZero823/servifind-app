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

                    

                    <option value="BET Major in Automotive Technology (BETAT-T)">BET Major in Automotive Technology (BETAT-T)</option>
                    <option value="BET Major in Chemical Technology (BETChT-T)">BET Major in Chemical Technology (BETChT-T)</option>
                    <option value="BET Major in Construction Technology (BETCT-T)">BET Major in Construction Technology (BETCT-T)</option>
                    <option value="BET Major in Electrical Technology (BETET-T)">BET Major in Electrical Technology (BETET-T)</option>
                    <option value="BET Major in Electromechanical Technology (BETEMT-T)">BET Major in Electromechanical Technology (BETEMT-T)</option>
                    <option value="BET Major in Electronics Technology (BETElxT-T)">BET Major in Electronics Technology (BETElxT-T)</option>
                    <option value="BET Major in Instrumentation and Control Technology (BETInCT-T)">BET Major in Instrumentation and Control Technology (BETInCT-T)</option>
                    <option value="BET Major in Mechanical Technology (BETMT-T)">BET Major in Mechanical Technology (BETMT-T)</option>
                    <option value="BET Major in Mechatronics Technology (BETMecT-T)">BET Major in Mechatronics Technology (BETMecT-T)</option>
                    <option value="BET Major in Non-Destructive Testing Technology (BETNDTT-T)">BET Major in Non-Destructive Testing Technology (BETNDTT-T)</option>
                    <option value="BET Major in Dies & Moulds Technology (BETDMT-T)">BET Major in Dies & Moulds Technology (BETDMT-T)</option>
                    <option value="BET Major in Heating, Ventilation and Airconditioning/Refrigeration Technology (BETHVAC/RT-T)">BET Major in Heating, Ventilation and Airconditioning/Refrigeration Technology (BETHVAC/RT-T)</option>
                    <option value="Bachelor of Science in Civil Engineering (BSCESEP-T)">Bachelor of Science in Civil Engineering (BSCESEP-T)</option>
                    <option value="Bachelor of Science in Electrical Engineering (BSEESEP-T)">Bachelor of Science in Electrical Engineering (BSEESEP-T)</option>
                    <option value="Bachelor of Science in Electronics Engineering (BSECESEP-T)">Bachelor of Science in Electronics Engineering (BSECESEP-T)</option>
                    <option value="Bachelor  of Science in Mechanical Engineering (BSMESEP-T)">Bachelor  of Science in Mechanical Engineering (BSMESEP-T)</option>
                    <option value="Bachelor of Science in Information Technology (BSIT-T)">Bachelor of Science in Information Technology (BSIT-T)</option>
                    <option value="Bachelor of Science in Information System (BSIS-T)">Bachelor of Science in Information System (BSIS-T)</option>
                    <option value="Bachelor of Science in Environmental Science (BSESSDP-T)">Bachelor of Science in Environmental Science (BSESSDP-T)</option>
                    <option value="Bachelor in Graphics Technology Major in Architecture Technology (BGTAT-T)">Bachelor in Graphics Technology Major in Architecture Technology (BGTAT-T)</option>
                    <option value="BTVTE Major in Electrical Technology (BTVTEdeT-T)">BTVTE Major in Electrical Technology (BTVTEdeT-T)</option>
                    <option value="BTVTE Major in Electronics Technology (BTVTEdElxT-T)">BTVTE Major in Electronics Technology (BTVTEdElxT-T)</option>
                    <option value="BTVTE Major in Information and Communication Technology (BTVTEdICT-T)">BTVTE Major in Information and Communication Technology (BTVTEdICT-T)</option>
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