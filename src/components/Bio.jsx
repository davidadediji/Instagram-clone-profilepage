import {useState, useEffect} from 'react'
import getPhotoUrl from 'get-photo-url'
import profileIcon from '../assets/profileIcon.svg'
import {db} from '../dexie';

const Bio = () => {

    const [userDetails, setUserDetails] = useState({});

    const [editFormIsOpen, setEditFormIsOpen] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(profileIcon);

    useEffect(()=>{
        const setDataFromDb = async () => {
            const userDetailsFromDb = await db.bio.get('info');
            const profilePhotoFromDb = await db.bio.get('profilePhoto')
            userDetailsFromDb && setUserDetails(userDetailsFromDb);
            profilePhotoFromDb && setProfilePhoto(profilePhotoFromDb);
        }
        setDataFromDb();
    })
   
    const updateUserDetails = async (event)=>{
        event.preventDefault()
        const objData = {
            name: event.target.nameOfUser.value,
            about: event.target.aboutUser.value
        }
        setUserDetails(objData)
        await db.bio.put(objData, 'info')
        setEditFormIsOpen(false)
    }

    const editFormButton = <button onClick={()=>setEditFormIsOpen(true)}>Edit</button>;

    const updateProfilePhoto = async ()=>{
        const newProfilePhoto = await getPhotoUrl('#profilePhotoInput')

        setProfilePhoto(newProfilePhoto);
        await db.bio.put(newProfilePhoto, 'profilePhoto')
    }
    
    const editForm = (
        <form className='edit-bio-form' action="" onSubmit={(e)=>updateUserDetails(e)} >
            <input type="text" id='' placeholder='Your Name' name='nameOfUser' defaultValue={userDetails.name}/>
            <input type="text" id='' placeholder='About You' name='aboutUser' defaultValue={userDetails.about}/>
            <br/>
            <button type='button' className='cancel-button' onClick={()=>setEditFormIsOpen(false)}>Cancel</button>
            <button type='submit' className='save-button'>Save</button>
        </form>
    )

  return (
    <section className='bio'>
        <input type="file" accept='image/*' name='photo' id='profilePhotoInput' />
        <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
            <div className="profile-photo" role="button" title='Click to edit photo'>
                <img src={profilePhoto} alt="profile" />
            </div>
        </label>
        <div className='profile-info'>
            <p className='name'>{userDetails.name}</p>
            <p className='about'>{userDetails.about}</p>
            {editFormIsOpen? editForm:editFormButton}
        </div>

    </section>
  )
}

export default Bio
