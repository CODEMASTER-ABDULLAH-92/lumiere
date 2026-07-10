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
<Testimonials variant="grid" />
    <Footer/>
    </div>
  );
}
