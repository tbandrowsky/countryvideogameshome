import './App.css'
import './index.css'

import screencap1release1 from './images/screencap1release1.png'
import TitleBar from './TitleBar'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ColorParty() {
    return (
        <div class="contentbackground">
            <TitleBar title="COLOR PARTY" />
            <div className="contentwrapper" style={{marginTop:"16px"}}>
                <div className="content">
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
                        <SwiperSlide style={{ backgroundColor: "white", padding:"16px" }}>
                            <h2>PSYCHEDLIC LIGHT SHOWS FROM YOUR WEBCAM</h2>
                            <a style={{ marginLeft: "16px" }} href="ms-windows-store://pdp/?productid=9PP1DQXGWG0N">BUY NOW</a>
                            <p>
                                Color Party is an app for Windows you can get from the Microsoft Store.  Color Party reads
                                whatever web cams you have connected, and produces a live light show on screen (or an attacked projector),
                                of everything moving on the camera.
                            </p>
                            <p>
                                <img src={screencap1release1} alt="Color Party Screen" />
                            </p>
                        </SwiperSlide>
                        <SwiperSlide style={{ backgroundColor: "white", padding: "16px" }}>
                            <h2>REAL TIME AI</h2>
                            <p>
                                Color Party is integrated with OpenCV for the latest in AI vision, along with its own
                                movement detection and color shifting models.
                            </p>
                        </SwiperSlide>
                        <SwiperSlide style={{ backgroundColor: "white", padding: "16px" }}>
                            <h2>OUTDOOR PARTY FUN</h2>
                            <p>Get a cheap projector and a laptop and Color Party can turn any place where you can shine a project into an interactive art experience.</p>
                            <iframe style={{ marginLeft: "16px" }} width="560" height="315" src="https://www.youtube.com/embed/bd6F8wUNgQ4?si=uR6m5DDIzBgaEZiI&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            <p>
                                You can get this at the Microsoft Store on your Windows PC, to which, we are greatly appreciative,
                                and we say out here "Windows is the best", down here.
                            </p>
                        </SwiperSlide>
                        <SwiperSlide style={{ backgroundColor: "white", padding: "16px" }}>
                            <h2>SUPERB CAMERA INTEGRATION.</h2>
                            <p>
                                Color Party uses the latest Windows API to manage your webcams.  Designed to be
                                a base technology for future products, Color Party detects when you plug in or remove web cameras, and does what it can.
                                Color Party just give you a list of cameras, and then you pick which one you want to display.
                            </p>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default ColorParty;
