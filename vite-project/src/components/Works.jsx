import "./assets/css/Works.css"
import run from "./assets/images/random.jpg"
function Works() {
  return (
   <>
   <div className="works_container">
    <div className="how">
        <h1>How Its Work</h1>
        <p> This app simplifies the dining experience with effortless order processing, real-time communication, and convenient meal notifications. Customers can make secure payments through Razorpay, while meal alerts are sent via Twilio, adapting to their chosen mealtime. Real-time order status keeps users informed about the progress of their orders. An automated scheduling system ensures that meal notifications are delivered punctually, enhancing the overall dining experience. It streamlines the entire process, allowing customers to enjoy their meals without the hassle of monitoring their orders or worrying about payment security. This app provides efficiency, convenience, and clear communication, making dining a seamless and enjoyable experience.
        
        </p>

    </div>
      
    <div className="stream">
        <div className="how_img">
          <img src={run} alt="" />
        </div>
        </div>
        </div>  


   
   </>
  )
}

export default Works