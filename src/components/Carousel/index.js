import React from 'react'
import {Link} from 'gatsby'

const Carousel = () => (
        <div className="shop-content carousel relative container mx-auto">

            <div className="carousel-inner relative overflow-hidden w-full">
                {/*Slide 1*/}
                <input className="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden defaultChecked="checked"/>
                <div className="carousel-item absolute opacity-0 item-50vh">
                    <div className="shop-slide-bg1 block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right">

                        <div className="container mx-auto">
                            <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                                <p className="text-black text-2xl my-4">Álcool gel antisséptico hidratante</p>
                                <Link className="text-xl inline-block no-underline border-b leading-relaxed text-white border-white lg:text-black lg:border-gray-600 hover:text-gray hover:border-black" to="/c/alcool-gel-hidratante-antisseptico">Ver produtos</Link>
                            </div>
                        </div>

                    </div>
                </div>
                {/*<label htmlFor="carousel-3" className="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
                <label htmlFor="carousel-2" className="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>*/}

                {/*Slide 2*/}
                {/*<input className="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden/>
                <div className="carousel-item absolute opacity-0 bg-cover bg-right item-50vh">
                    <div className="shop-slide-bg2 block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right">

                        <div className="container mx-auto">
                            <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                                <p className="text-black text-2xl my-4">Real Bamboo Wall Clock</p>
                                <a className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black" href="#">view product</a>
                            </div>
                        </div>

                    </div>
                </div>
                <label htmlFor="carousel-1" className="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
                <label htmlFor="carousel-3" className="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>

                {/*Slide
                <input className="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden/>
                <div className="carousel-item absolute opacity-0 item-50vh">
                    <div className="shop-slide-bg3 block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-bottom">

                        <div className="container mx-auto">
                            <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                                <p className="text-black text-2xl my-4">Brown and blue hardbound book</p>
                                <a className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black" href="#">view product</a>
                            </div>
                        </div>

                    </div>
                </div>
                <label htmlFor="carousel-2" className="prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
                <label htmlFor="carousel-1" className="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>*/}

                {/* Add additional indicators for each slide*/}
                <ol className="carousel-indicators">
                    <li className="inline-block mr-3">
                        <label htmlFor="carousel-1" className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">•</label>
                    </li>
                    {/*<li className="inline-block mr-3">
                        <label htmlFor="carousel-2" className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">•</label>
                    </li>
                    <li className="inline-block mr-3">
                        <label htmlFor="carousel-3" className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">•</label>
                    </li>*/}
                </ol>

            </div>

        </div>
)

export default Carousel
