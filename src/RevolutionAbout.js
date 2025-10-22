import './App.css'
import TitleBar from './TitleBar'
import { Link } from "react-router-dom";
// import Swiper bundle with all modules installed
import React from 'react';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import colonize1 from './images/revolutionart/colonize1.png';
import intelligence1 from './images/revolutionart/intelligence1.png';
import policy1 from './images/revolutionart/policy1.png';
import colony1 from './images/revolutionart/colony1.png';
import govern1 from './images/revolutionart/govern1.png';
import survive1 from './images/revolutionart/survive1.png';

// import styles bundle
import 'swiper/css/bundle';
import Card from './Card';

function Corona() {

    return (
        <div className="contentbackground">
            <TitleBar title="REVOLUTION" />
            <div style={{ display: "grid", gridColumnTemplate: "30% 30% 30%", backgroundColor: "darkgreen" }} >
                <Link style={{ paddingLeft: "16px", gridColumn: "1", textAlign: "left" }} to="/Revolution/Login">LOGIN OR ENLIST</Link>
                <a style={{ paddingLeft: "16px", gridColumn: "2", textAlign: "left" }} href="downloads/">Downloads</a>
            </div>
            <div className="contentwrapper">
                <div className="content" style={{marginTop:"16px"}}>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={16}
                        slidesPerView={1}
                        centeredSlides={true}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                    >
                        <SwiperSlide>
                            <Card image={colonize1} title="CREATE YOUR REVOLUTION">
                                <div>
                                    <h3 style={{paddingLeft:"16px"}}>Low Code for Activists.</h3>
                                    <ul>
                                        <li>Create widespread teams with a shared goal.</li>
                                        <li>Baked in query and analytics.</li>
                                        <li>Geospatial resources.</li>
                                        <li>Create any organization easily.</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={colonize1} title="COLONY EXAMPLE">
                                <div>
                                    <h3 style={{paddingLeft:"16px"}}>Example.</h3>
                                    <ul>
                                        <li>Create a process for flipping districts.</li>
                                        <li>Research political candidates and donors.</li>
                                        <li>Share articles.</li>
                                        <li>Track colony efforts.</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={colonize1} title="A NEW AMERICA">
                                <div>
                                    <h3 style={{paddingLeft:"16px"}}>Resettle America.</h3>
                                    <ul>
                                        <li>Find and Settle low population counties.</li>
                                        <li>Intelligence gathering for resources and obstacles.</li>
                                        <li>Create colonies in counties and take over.</li>
                                        <li>Demonstrate modern government.</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={intelligence1} title="COORDINATE INTELLIGENCE">
                                <div>
                                    <h3 style={{ paddingLeft: "16px" }}>Find your colonies, and establish thought leadership.</h3>
                                    <ul>
                                        <li>Follow the money with candidate donor analytics</li>
                                        <li>Analytics to support colony identification</li>
                                        <li>Offer articles, education, and training</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={policy1} title="FORMULATE POLICY">
                                <div>
                                    <h3 style={{ paddingLeft: "16px" }}>Create resources and guidelines for the Revolution.</h3>
                                    <ul>
                                        <li>Turn intelligence into plans anyone can follow</li>
                                        <li>Provide how-to guidance to allow for a new economy</li>
                                        <li>Offer articles, education, and training</li>
                                        <li>Put together colonization teams and resources for them</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={colony1} title="GROW YOUR COLONY">
                                <div>
                                    <h3 style={{ paddingLeft: "16px" }}>Scout and run colonies.</h3>
                                    <ul>
                                        <li>Move voters in</li>
                                        <li>Identify local chiefs as blockers or helpers.</li>
                                        <li>Gather information about transportation access, physical barriers.</li>
                                        <li>Work with policy and intelligence team for local activism.</li>
                                        <li>Schedule local team events.</li>
                                        <li>Replace local systems software .</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={govern1} title="GOVERN BETTER">
                                <div>
                                    <h3 style={{ paddingLeft: "16px" }}>Make American Counties Profitable.</h3>
                                    <ul>
                                        <li>Coordinated property management</li>
                                        <li>Voters insurances</li>
                                        <li>Consistent justice platform.</li>
                                        <li>Reparations.</li>
                                        <li>Better people making better government for everyone.</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={survive1} title="SURVIVE THE OCCUPATION">
                                <div>
                                    <ul>
                                        <li>DONATE!  Every cent helps.</li>
                                        <li>COMMUNICATE!  You are never alone.</li>
                                        <li>RESIST!  The Nazis before they come for you.</li>
                                        <li>SAY!  My existence is non-negotiable.</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default Corona;
