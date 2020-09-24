import React from 'react'
//import {Link} from 'gatsby'

const ShopHeader = () => (
    <>
        <div className="bg-cover bg-center h-auto text-white py-24 px-10 xl:px-36 object-fill"
             style={{backgroundImage: "url(/banners/1350x550bg_corote_naturegel.jpg)"}}>
            <div className="xl:w-full md:w-1/2">
                <p className="font-bold text-sm uppercase">Naturegel</p>
                <p className="text-3xl font-bold">Álcool Gel Hidratante Antisséptico</p>
                <p className="text-1xl mb-10 leading-none">Elimina rapidamente 99% dos germes e bactérias deixando a pele limpa, hidratada e levemente perfumada.</p>
                {/*<a href="#"
                   className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Atendimento via WhatsApp</a>*/}
            </div>
        </div>
    </>
)

export default ShopHeader
