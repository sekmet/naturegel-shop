import React from "react";
import SEO from "../components/seo";
import Layout from "../components/Layout";

function ContactPage() {
  return (
    <Layout>
      <SEO
        keywords={[`naturegel`, `alcool`, `hidratante`, `antisseptico`, `alcool em gel`, `alcool gel`, `comprar alcool em gel`, `comprar alcool gel`, `aloe vera`, `calendula`, `mentolado`, `algas marinhas`, `pitaya`]}
        title="Entre em Contato"
        description={`O melhor Álcool em gel antisséptico hidratante de rápida absorção para as mãos.`}
      />
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <section className="p-6">
            <form className="mx-auto w-full">
                <h1 className="mb-8 text-2xl">Atendimento ao Cliente</h1>
                <p>Temos um centro de suporte dedicado aos nossos clientes.<br/> Normalmente, respondemos em no máximo 24 horas.</p>

              <div className="mt-6">
                <div className="form-group">
                  <input className="bg-white w-full focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-2 mb-3 block appearance-none" type="text" placeholder="Nome *"/>
                </div>
                <div className="form-group">
                  <input className="bg-white w-full focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-2 mb-3 block appearance-none" type="email" placeholder="Email *"/>
                </div>
                <div className="form-group">
                <textarea className="bg-white w-full focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-2 mb-3 block appearance-none" style={{height: "150px"}}
                          placeholder="Mensagem *"></textarea>
                </div>
                <div className="mt-6">
                  <input className="px-4 py-2 text-sm font-bold text-white bg-gray-700 border-b-4 border-gray-800 rounded hover:border-gray-700 hover:bg-gray-600" type="submit" value="Enviar"/>
                </div>
              </div>
            </form>
          </section>
        </div>
    </Layout>
  );
}

export default ContactPage;
