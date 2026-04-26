"use client";
import { useRef, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import axiosInstance from "../../Connection/axiosInstance";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const locationRef = useRef(null);
  const servicesRef = useRef(null);

  const MAPS_KEY = "AIzaSyA9z5wtpA5-uV1Zep7VuM9IUohv9AdYfuY";

  const [contact, setContact] = useState({
    phone: "0894578233",
    email: "info@obsoa.com",
    location: "Dublin, Ireland",
    mapQuery: "Dublin,+Ireland",
  });

  const [services, setServices] = useState([
    {
      title: "Deal Sourcing",
      desc: "We find off-market and high-yield property opportunities tailored to your investment goals.",
      img: "/Images/service2.webp",
    },
    {
      title: "Deal Analysis",
      desc: "In-depth financial modeling and due diligence so you invest with confidence and clarity.",
      img: "/Images/service1.webp",
    },
    {
      title: "Deal Closing",
      desc: "End-to-end support from negotiation to completion, ensuring smooth and timely transactions.",
      img: "/Images/service3.webp",
    },
  ]);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axiosInstance.get("/contact");
        if (res.data) setContact(res.data);
      } catch (error) {
        console.error("Failed to fetch contact:", error);
      }
    };
    fetchContact();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosInstance.get("/services");
        if (res.data && res.data.length > 0) setServices(res.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, []);

  const openLocation = () => {
    setMenuOpen(false);
    setTimeout(() => {
      locationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const scrollToServices = () => {
    setMenuOpen(false);
    servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

 const getImageUrl = (img) => {
  if (!img) return "";
  return img; 
};


  return (
    <div className="bg-white font-sans text-gray-900">
      {/* HERO */}
      <section
        className="relative min-h-[400px] md:min-h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/heroimageObsoa.webp')" }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="text-6xl font-josefin     font-light text-[#FFFFFF]">Obsoa</div>
          <ul className="hidden items-center gap-8 text-sm text-[#FFFFFF] font-manrope md:flex">
            <li onClick={scrollToServices} className="cursor-pointer hover:text-white">What We Offer</li>
            <li onClick={openLocation} className="cursor-pointer hover:text-white">Location</li>
            <li onClick={openLocation} className="cursor-pointer hover:text-white">Contact Us</li>
          </ul>
          <button onClick={openLocation} className="hidden md:block rounded-md font-poppins bg-gradient-to-r from-[#60BBEE] to-[#0A72AD] px-5 py-2 text-sm font-medium text-white shadow-lg transition">
            Contact Us
          </button>
          <button onClick={() => setMenuOpen(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </nav>

        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-24 text-center">
          <h1 className="text-4xl font-bold font-manrope leading-tight text-[#FFFFFF] md:text-6xl">
            Find High-Potential <br /> Property Deals in Dublin
          </h1>
          <p className="mt-12 max-w-2xl text-base text-[#FFFFFF] font-manrope md:text-lg">
            We source, analyse, and secure profitable property opportunities for real estate investors across Ireland.
          </p>
        </div>
      </section>

      {/* Mobile Sidebar */}
      <div onClick={() => setMenuOpen(false)} className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />
      <div className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#0f172a] flex flex-col px-6 py-8 transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between mb-10">
          <div className="text-5xl font-jomhuria font-light text-white">Obsoa</div>
          <button onClick={() => setMenuOpen(false)} className="text-white"><X size={26} /></button>
        </div>
        <ul className="flex flex-col gap-6 text-base font-manrope text-white">
          <li onClick={scrollToServices} className="cursor-pointer border-b border-white/10 pb-4 hover:text-[#60BBEE] transition">What We Offer</li>
          <li onClick={openLocation} className="cursor-pointer border-b border-white/10 pb-4 hover:text-[#60BBEE] transition">Location</li>
          <li onClick={openLocation} className="cursor-pointer border-b border-white/10 pb-4 hover:text-[#60BBEE] transition">Contact Us</li>
        </ul>
        <button onClick={openLocation} className="mt-10 rounded-md bg-gradient-to-r from-[#60BBEE] to-[#0A72AD] px-5 py-3 text-sm font-medium text-white shadow-lg font-poppins transition">
          Contact Us
        </button>
      </div>

      {/* WHAT WE OFFER */}
      <section ref={servicesRef} className="px-5 md:px-15 py-15 md:py-20">
        <div className="">
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <div>
              <h2 className="text-3xl font-manrope font-semibold text-[#1E1E1E] md:text-4xl">What We Offer</h2>
              <p className="mt-4 font-manrope max-w-md leading-8 text-[#1E1E1E]">
                We source, analyse, and secure high-potential property deals for real estate investors across Ireland.
              </p>
            </div>
            <p className="text-[#1E1E1E] font-manrope md:text-right">
              We help investors save time and avoid uncertainty by finding property opportunities that are already researched and ready to move forward.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="bg-gradient-to-r rounded-md from-[#60BBEE] to-[#0A72AD]">
                <div className="p-5 rounded-md transition">
                  <img src={getImageUrl(s.img)} alt={s.title} className="h-80 w-full rounded-lg object-cover" />
                  <div className="px-3 pt-4">
                    <h3 className="text-2xl font-bold text-[#FFFFFF] font-manrope">{s.title}</h3>
                    <p className="mt-2 text-sm text-[#FFFFFF] font-manrope">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR LOCATION */}
      <section ref={locationRef} className="bg-[#222222] px-10 md:px-22 py-15">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl text-[#FFFFFF] font-manrope font-bold md:text-4xl">Our Location</h2>
              <p className="mt-8 text-[#FFFFFF] font-manrope max-w-md">
                Based in the heart of Dublin, we serve clients across Ireland and internationally.
              </p>
              <div className="mt-8 space-y-8">
                <div className="flex items-center gap-4 rounded-xl">
                  <div className="flex h-13 w-13 bg-[#383838] items-center justify-center rounded-full text-white">
                    <img className="w-5 h-5" src="/Images/location1.webp" />
                  </div>
                  <div>
                    <div className="text-md text-[#FFFFFF] font-manrope">Phone Number</div>
                    <div className="text-sm mt-1 text-[#FFFFFF] font-manrope">{contact.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl">
                  <div className="flex h-13 w-13 bg-gradient-to-r from-[#60BBEE] to-[#0A72AD] items-center justify-center rounded-full text-white">
                    <img className="w-5 h-5" src="/Images/location2.webp" />
                  </div>
                  <div>
                    <div className="text-md text-[#FFFFFF] font-manrope">Email Address</div>
                    <div className="text-sm mt-1 text-[#FFFFFF] font-manrope">{contact.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl">
                  <div className="flex h-13 w-13 bg-[#383838] items-center justify-center rounded-full text-white">
                    <img className="w-5 h-5" src="/Images/location3.webp" />
                  </div>
                  <div>
                    <div className="text-md text-[#FFFFFF] font-manrope">Location</div>
                    <div className="text-sm mt-1 text-[#FFFFFF] font-manrope">{contact.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Dynamic Google Map */}
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <iframe
                title="Location Map"
                src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_KEY}&q=${contact.mapQuery || "Dublin,+Ireland"}&zoom=13`}
                className="h-80 w-full border-0 md:h-115"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col md:items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col">
            <div className="text-lg font-semibold text-[#222222] font-manrope">Ready to secure your next property deal in Dublin?</div>
            <h1 className="mt-5 text-[#1E1E1E] font-manrope">Get in touch today and let's make it happen.</h1>
          </div>
          <button onClick={openLocation} className="rounded-md bg-gradient-to-r from-[#60BBEE] to-[#0A72AD] px-6 py-3 text-sm font-semibold text-white shadow-lg transition font-manrope">
            Contact Us
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white px-6 py-6 text-center text-sm border-gray-200 border-t text-[#1E1E1E] font-manrope">
        © {new Date().getFullYear()} | All Right Reserved
      </footer>
    </div>
  );
};

export default Home;