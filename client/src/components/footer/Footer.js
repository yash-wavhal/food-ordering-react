import "../footer/FooterStyles.css";

const Footer = () => {
    return(
        <div className="footer">
            <div className="top">
                <div>
                    <h1>DishDelight</h1>
                    <p>Your Taste Our Service</p>
                </div>
                
                {/* <div>
                    <a href="https://github.com/mahaveer82">
                        <i className="fa-brands fa-github-square"></i>
                    </a>
                    <a href="https://instagram.com/mahaveer.jn">
                        <i className="fa-brands fa-instagram-square"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/developer-mahaveer-jain/">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                </div> */}
            </div>

            <div className="bottom">
                <div>
                    <h4>Community</h4>
                    <div className="community">
                        <a href="/">Github</a>
                        <a href="/">Issues</a>
                        <a href="/">Project</a>
                        <a href="/">Twitter</a>
                    </div>
                </div>
                <div>
                    <h4>Address</h4>
                    <p>Dr.D.Y.Patil Institute of Technology, <br></br>Sant Tukaram Nagar, Pune(Pimpri), India</p>
                   
                    <h4>Contact Us</h4>
                    <p>Tel No. 09123843256</p>
                </div>
                
                <div>
                    <h4>Others</h4>
                    <a href="/">Terms of Service</a>
                    <a href="/">Privacy Policy</a>
                    <a href="/">License</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;