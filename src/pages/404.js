import React from "react";
import SEO from "../components/seo";
import Error404 from "../images/404.svg";
import Layout from "../components/Layout";

function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Não Encontrado" />
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <img
          alt="Ghost getting abducted by aliens"
          className="block mx-auto w-1/2"
          src={Error404}
        />
        <h2 className="bg-yellow-400 text-2xl font-bold inline-block my-8 p-3">
          Looks like this page is a ghost that got abducted by aliens...
        </h2>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
