import React, { Fragment } from 'react'
const Footer = () => {
    return (
        <Fragment>
            <footer className="footer">
                <div className="containerz" style={{ padding: "0px 100px" }}>
                    <div className="row">
                        <div className="footer-col">
                            {/* <h4>company</h4> */}
                            <div class="footer-section_one">
                                <img src="images/ServiFind.png" alt="" />
                                <div class="about">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ullam magnam facilis
                                    placeat fugiat aspernatur deleniti magni, veritatis id laboriosam, repellat facere molestias
                                    provident, ipsa hic sapiente distinctio accusamus! Eaque!
                                </div>
                            </div>
                            {/* <ul>
                                <li>

                                    <a href="/#our-team">about</a>
                                </li>
                                <li><a href="#">about us</a></li>
                                <li><a href="#">our services</a></li>
                                <li><a href="#">privacy policy</a></li>
                                <li><a href="#">affiliate program</a></li>
                            </ul> */}
                        </div>
                        <div className="footer-col">
                            <h4>get help</h4>
                            <ul>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">shipping</a></li>
                                <li><a href="#">returns</a></li>
                                <li><a href="#">order status</a></li>
                                <li><a href="#">payment options</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>online shop</h4>
                            <ul>
                                <li><a href="#">watch</a></li>
                                <li><a href="#">bag</a></li>
                                <li><a href="#">shoes</a></li>
                                <li><a href="#">dress</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>For Footer</h4>
                            <h4>online shop</h4>
                            <ul>
                                <li><a href="#">watch</a></li>
                                <li><a href="#">bag</a></li>
                                <li><a href="#">shoes</a></li>
                                <li><a href="#">dress</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>follow us</h4>
                            <div className="social-links">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-linkedin-in"></i></a>

                            </div>
                            <p className="text-center mt-1">
                                ServiFind - 2022-2023, All Rights Reserved
                            </p>
                        </div>

                    </div>
                </div>

            </footer>
        </Fragment>
    )
}
export default Footer