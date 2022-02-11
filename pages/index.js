import SearchBox from "../comps/SearchBox/SearchBox";

export default function Home() {
  return <SearchBox> </SearchBox>;
}

/*   export const getStaticProps = async () => {
    const res = await fetch(
      "https://raw.githubusercontent.com/MattDobsonWeb/next-weather-app/main/lib/city.list.json"
    );
    const cites = await res.json();
  
    return {
      props: {
        cites,
      },
    };
  };
   */
