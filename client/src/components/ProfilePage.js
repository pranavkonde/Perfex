import './profileStyle.css'; 
import Navbar1 from './Navbar1'; 

const ProfilePage = () => {
 
 return(
  <div>
   <Navbar1 currentPage="profile" />

  <div className="row" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

  <div className="column" 
 style={{backgroundColor: 'white', boxShadow: '0px 0px 10px 0px rgba(37, 49, 109, 0.5), 0px 0px 5px 0px rgba(37, 49, 109, 0.5)', border: '1px solid #25316D'}}>
 <form className='profileForm'>
   <div>
   <div>
   
 <label htmlFor="name">Name:</label>
 <input type="text" id="name" name="name" />
   
    <label htmlFor="employeeid">Employee ID:</label>
    <input type="text" id="employeeid" name="employeeid" required />


    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" required/>

    <label htmlFor="gender">Gender:</label>
    <select id="gender" name="gender">
      <option value="">Select...</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>

    <label htmlFor="contact">Contact:</label>
    <input type="tel" id="contact" name="contact" required />

    <label htmlFor="dateOfJoining">Date of Joining:</label>
    <input type="date" id="dateOfJoining" name="dateOfJoining" required/>
    </div>
    <div>
    <label htmlFor="address">Address:</label>
    <textarea id="address" name="address" rows="4" cols="50" required ></textarea>
    
    <label htmlFor="designation">Department:</label>
    <input type="text" id="designation" name="designation" required />

    <label htmlFor="role">Role:</label>
    <input type="text" id="role" name="role" required />

    <label htmlFor="managerName">Manager Name:</label>
    <input type="text" id="managerName" name="managerName" required />

    <label htmlFor="hrName">HR Name:</label>
    <input type="text" id="hrName" name="hrName" required />
    </div>
    </div>
    <button className='profileSaveButton'> Save </button>
    
 </form>
</div>
</div>
   </div>
   

);
 
}
export default ProfilePage;

