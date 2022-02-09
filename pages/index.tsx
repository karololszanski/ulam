import ChartsGridModule from "components/modules/chartsGridModule/chartsGridModule";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ulam recruitment task</title>
        <meta
          name="description"
          content="Ulam recruitment task - Karol Olszański"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <ChartsGridModule />
      </>
    </>
  );
};

export default Home;
