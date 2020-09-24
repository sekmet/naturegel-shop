import React from "react";
import SEO from "../components/seo";
import Layout from "../components/Layout"

function AboutPage() {
  return (
    <Layout>
      <SEO
        keywords={[`naturegel`, `alcool`, `hidratante`, `antisseptico`, `alcool em gel`, `alcool gel`, `comprar alcool em gel`, `comprar alcool gel`, `aloe vera`, `calendula`, `mentolado`, `algas marinhas`, `pitaya`]}
        title="A Naturegel"
        description={`O melhor Álcool em gel antisséptico hidratante de rápida absorção para as mãos.`}
      />
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
      <section className="flex flex-col items-center md:flex-row">
        <div className="md:w-2/3 md:mr-8">
          <blockquote className="pl-4 font-serif leading-loose text-justify border-l-4 border-gray-900">
            The point is... to live one&apos;s life in the full complexity of
            what one is, which is something much darker, more contradictory,
            more of a maelstrom of impulses and passions, of cruelty, ecstacy,
            and madness, than is apparent to the civilized being who glides on
            the surface and fits smoothly into the world.
          </blockquote>

          <cite className="block mt-4 text-xs font-bold text-right uppercase">
            – Thomas Nagel
          </cite>
        </div>

      </section>
      </div>
    </Layout>
  );
}

export default AboutPage;
