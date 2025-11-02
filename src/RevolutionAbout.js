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
        <div className="contentbackground" style={{ background: "radial-gradient(circle, #fe917b, #160d0fff)" }}>
            <TitleBar title="REVOLUTION" style={{ backgroundColor: "black", color: "#B0B0b0" }} />
            <div style={{ display: "grid", gridColumnTemplate: "30% 30% 30%", backgroundColor: "black" }} >
                <Link style={{ paddingLeft: "16px", gridColumn: "1", textAlign: "left" }} to="/Corona/Login">LOGIN OR ENLIST</Link>
                <a style={{ paddingLeft: "16px", gridColumn: "2", textAlign: "left" }} href="downloads/">Downloads</a>
            </div>
                <div className="content" style={{margin:"auto", marginTop:"30px", height:"85%", width:"70%", minWidth:"300px", paddingBottom:"32px"}}>
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
                        style={{ width:"80%", height:"80%"}}
                    >
                        <SwiperSlide>
                            <Card image={colonize1} title="CREATE YOUR REVOLUTION" style={{width:"100%", height:"100%"}}>
                                <div>
                                    <h3 style={{paddingLeft:"16px"}}>Low Code for Activists.</h3>
                                    <ul>
                                        <li>Create widespread teams with a shared goal.</li>
                                        <li>Baked in query and analytics.</li>
                                        <li>Geospatial resources.</li>
                                        <li>Create any organization easily.</li>
                                        <li>Modify instantly.</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={govern1} title="FAMILY AND LAND" style={{width:"100%", height:"100%"}}>
                                <div>
                                    <h3 style={{ paddingLeft: "16px" }}>Responsibilities.</h3>
                                    <ul>
                                        <li>Track your people from family to acquaintances</li> 
                                        <li>Track you property, multiple buildings</li>
                                        <li>Insure everything you have and you know</li>
                                        <li>Integrated process from quote to claims.</li>
                                        <li>Modify instantly.</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={colony1} title="CREATIVE POSSIBILITES" style={{width:"100%", height:"100%"}}>
                                <div>
                                    <h3 style={{ paddingLeft: "16px" }}>Articles about anything.</h3>
                                    <ul>
                                        <li>A number of predefined topics</li>
                                        <li>define your own.</li>
                                        <li>uses markdown.</li>
                                        <li>comments on articles.</li>
                                        <li>full text searchable.</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={colony1} title="ACTION IF YOU WANT IT" style={{width:"100%", height:"100%"}}>
                                <div>
                                    <h3 style={{ paddingLeft: "16px" }}>Ticket system.</h3>
                                    <ul>
                                        <li>Tickets for each team, to and from</li>
                                        <li>Old school timetable plans.</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={govern1} title="GO LOCAL" style={{width:"100%", height:"100%"}}>
                                <div>
                                    <h3 style={{ paddingLeft: "16px" }}>Local networking.</h3>
                                    <ul>
                                        <li>Coordinate resource and transportation routes</li>
                                        <li>Scout resources and obstacles</li>
                                        <li>Local power players, news, and weather.</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={govern1} title="JUSTICE SYSTEM" style={{width:"100%", height:"100%"}}>
                                <div>
                                    <h3 style={{ paddingLeft: "16px" }}>Court System.</h3>
                                    <ul>
                                        <li>Tickets to the court</li>
                                        <li>Rulings from the court</li>
                                        <li>Includes arrests, searches, seizures.</li>
                                        <li>Multi-role court case Management.</li>
                                        <li>Reparations cases.</li>
                                    </ul>
                                </div>
                            </Card>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card image={govern1} title="PLANS" style={{width:"100%", height:"100%"}}>
                                <div>
                                    <h3 style={{ paddingLeft: "16px" }}>Create Timetables.</h3>
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
                            <Card image={survive1} title="SURVIVE THE OCCUPATION" style={{width:"100%", height:"100%"}}>
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
    );
}

export default Corona;
