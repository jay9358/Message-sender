
import LoginButton from "./Login"
import "./assets/css/Intro.css"
import intro from "./assets/images/image.webp"
function Intro() {


  return (
    <>
        <div className="intro_container">
            <div className="intro_text">
                <div className="intro_head">Welcome to Campus Cuisine </div>
                <p>Are you tired of rushing to the college mess only to be surprised by the day menu? Do you want to plan your meals ahead of time and make the most of your busy college life? Look no further! CampusCuisine is here to revolutionize your dining experience on campus.</p>
                
            </div>
            <div className="intro_img">

                <img src={intro} alt="intro"  />
            </div>
          
            </div>
            
      
    </>

  )
}

export default Intro