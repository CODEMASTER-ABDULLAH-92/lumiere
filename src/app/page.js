import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Testimonials from "./components/Reviews";
import Trending from "./components/Trending";

export default function Home() {
  return (
    <div>
    <Nav/>
    <Hero/>
    <Trending variant="carousel"/>
    <div className="flex justify-center items-center">
    <a href='https://s.click.aliexpress.com/e/_c4MeadQB?bz=725*90' target='_parent'><img width='725' height='90' src='https://ae-pic-a1.aliexpress-media.com/kf/S3da9c6ce045b41f98ae01cacd948f349S.png' /></a>
    </div>
<Testimonials variant="grid" />
    <Footer/>
    <div className="flex justify-center items-center">
    <a href='https://s.click.aliexpress.com/e/_c3d6i9fv?bz=725*90' target='_parent'><img width='725' height='90' src='https://ae-pic-a1.aliexpress-media.com/kf/S920b0a367808482ba3079918372c02091.png' /></a>
    </div>
    </div>
  );
}
