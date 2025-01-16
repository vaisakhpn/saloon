import Slider from "@/components/ui/slider/Slider";
import { sliderData } from "@/components/ui/slider/SliderData";

const Home = () => {
  return (
    <section className="home">
      <div className="">
        <div>
          <Slider data={sliderData} />
        </div>
      </div>
    </section>
  );
};

export default Home;
