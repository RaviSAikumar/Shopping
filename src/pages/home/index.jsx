import HeroBanner from "../../component/homeComponent/HeroBanner/HeroBanner";
import Highlights from "../../component/homeComponent/highlights/index";
function HomePage() {
  return (
    <div>
      {<HeroBanner />}
      {<Highlights />}
    </div>
  );
}

export default HomePage;
