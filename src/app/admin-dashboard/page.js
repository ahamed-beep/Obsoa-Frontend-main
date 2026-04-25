"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../Connection/axiosInstance";

export default function AdminDashboard() {
  const router = useRouter();

  const [contact, setContact] = useState({ phone: "", email: "", location: "", mapQuery: "" });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactMsg, setContactMsg] = useState("");

  const [services, setServices] = useState([]);
  const [serviceLoading, setServiceLoading] = useState({});
  const [serviceMsg, setServiceMsg] = useState({});
  const [imageLoading, setImageLoading] = useState({});
  const [imageMsg, setImageMsg] = useState({});

  const [activeTab, setActiveTab] = useState("contact");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get("/contact");
        setContact(res.data);
      } catch {}
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get("/services");
        setServices(res.data);
      } catch {}
    };
    fetch();
  }, []);

 const handleContactSave = async () => {
  setContactLoading(true);
  setContactMsg("");
  try {
    // Make sure mapQuery is properly formatted
    const contactToSave = {
      ...contact,
      mapQuery: contact.mapQuery ? contact.mapQuery.replace(/\s+/g, "+") : "Dublin,+Ireland"
    };
    
    console.log("Saving contact:", contactToSave); // Debug log
    
    await axiosInstance.put("/contact", contactToSave);
    setContactMsg("success");
    
    // Refetch to ensure we have the latest data
    const refreshed = await axiosInstance.get("/contact");
    setContact(refreshed.data);
  } catch (err) {
    console.error("Update error:", err);
    setContactMsg("error:" + (err.response?.data?.message || "Failed"));
  } finally {
    setContactLoading(false);
    setTimeout(() => setContactMsg(""), 3000);
  }
};
  const handleServiceSave = async (id, index) => {
    setServiceLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const s = services[index];
      await axiosInstance.put("/services/" + id, { title: s.title, desc: s.desc });
      setServiceMsg((prev) => ({ ...prev, [id]: "success" }));
    } catch {
      setServiceMsg((prev) => ({ ...prev, [id]: "error" }));
    } finally {
      setServiceLoading((prev) => ({ ...prev, [id]: false }));
      setTimeout(() => setServiceMsg((prev) => ({ ...prev, [id]: "" })), 3000);
    }
  };

  const handleImageUpload = async (id, file) => {
    if (!file) return;
    setImageLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axiosInstance.put("/services/" + id + "/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setServices((prev) => prev.map((s) => (s._id === id ? { ...s, img: res.data.service.img } : s)));
      setImageMsg((prev) => ({ ...prev, [id]: "success" }));
    } catch {
      setImageMsg((prev) => ({ ...prev, [id]: "error" }));
    } finally {
      setImageLoading((prev) => ({ ...prev, [id]: false }));
      setTimeout(() => setImageMsg((prev) => ({ ...prev, [id]: "" })), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("/uploads/")) {
      return (process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000") + img;
    }
    return img;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] font-manrope">
      <nav className="bg-[#1e293b] border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-jomhuria text-white">Obsoa</h1>
          <span className="text-xs text-[#60BBEE] bg-[#60BBEE]/10 px-2 py-1 rounded-full">Admin</span>
        </div>
        <button onClick={handleLogout} className="text-sm text-[#94a3b8] hover:text-white transition border border-white/10 px-4 py-2 rounded-lg">Logout</button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
          <p className="text-[#94a3b8] text-sm mt-1">Manage your website content</p>
        </div>

        <div className="flex gap-2 mb-8 bg-[#1e293b] p-1 rounded-xl w-fit border border-white/10">
          {["contact", "services"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={"px-6 py-2 rounded-lg text-sm font-medium capitalize transition " + (activeTab === tab ? "bg-gradient-to-r from-[#60BBEE] to-[#0A72AD] text-white" : "text-[#94a3b8] hover:text-white")}>
              {tab === "contact" ? "Contact Info" : "Services"}
            </button>
          ))}
        </div>

        {activeTab === "contact" && (
          <div className="bg-[#1e293b] rounded-2xl p-8 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-6">Contact Information</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-[#94a3b8] mb-2">Phone Number</label>
                <input type="text" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#60BBEE] transition" placeholder="0894578233" />
              </div>
              <div>
                <label className="block text-sm text-[#94a3b8] mb-2">Email Address</label>
                <input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#60BBEE] transition" placeholder="info@obsoa.com" />
              </div>
              <div>
                <label className="block text-sm text-[#94a3b8] mb-2">Location (Display Text)</label>
                <input type="text" value={contact.location} onChange={(e) => setContact({ ...contact, location: e.target.value })}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#60BBEE] transition" placeholder="Dublin, Ireland" />
              </div>
           <div>
  <label className="block text-sm text-[#94a3b8] mb-2">
    Google Maps Location
    <span className="ml-2 text-xs text-[#60BBEE]">(address shown on map)</span>
  </label>
  <input
    type="text"
    value={contact.mapQuery || ""}
    onChange={(e) => {
      // Don't replace spaces immediately in the input - let user type naturally
      const rawValue = e.target.value;
      setContact({ ...contact, mapQuery: rawValue });
    }}
    onBlur={() => {
      // Convert spaces to + when the input loses focus
      if (contact.mapQuery) {
        setContact({ ...contact, mapQuery: contact.mapQuery.replace(/\s+/g, "+") });
      }
    }}
    className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#60BBEE] transition"
    placeholder="3+William+Street,+Dublin,+Ireland"
  />
  <p className="text-xs text-[#94a3b8] mt-1">
    Enter address naturally (spaces will be converted to + for the map)
  </p>
</div>

              {contact.mapQuery && (
                <div>
                  <label className="block text-sm text-[#94a3b8] mb-2">Map Preview</label>
                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <iframe title="Map Preview"
                      src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyA9z5wtpA5-uV1Zep7VuM9IUohv9AdYfuY&q=" + contact.mapQuery + "&zoom=13"}
                      className="h-48 w-full border-0" allowFullScreen />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 pt-2">
                <button onClick={handleContactSave} disabled={contactLoading}
                  className="bg-gradient-to-r from-[#60BBEE] to-[#0A72AD] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition">
                  {contactLoading ? "Saving..." : "Save Changes"}
                </button>
                {contactMsg === "success" && <span className="text-sm text-green-400">✓ Contact updated!</span>}
                {contactMsg.startsWith("error") && <span className="text-sm text-red-400">✗ {contactMsg.replace("error:", "")}</span>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-6">
            {services.map((s, index) => (
              <div key={s._id} className="bg-[#1e293b] rounded-2xl p-8 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-6">Service {index + 1}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-[#94a3b8] mb-2">Title</label>
                      <input type="text" value={s.title}
                        onChange={(e) => setServices((prev) => prev.map((item, i) => i === index ? { ...item, title: e.target.value } : item))}
                        className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#60BBEE] transition" />
                    </div>
                    <div>
                      <label className="block text-sm text-[#94a3b8] mb-2">Description</label>
                      <textarea value={s.desc} rows={4}
                        onChange={(e) => setServices((prev) => prev.map((item, i) => i === index ? { ...item, desc: e.target.value } : item))}
                        className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#60BBEE] transition resize-none" />
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => handleServiceSave(s._id, index)} disabled={serviceLoading[s._id]}
                        className="bg-gradient-to-r from-[#60BBEE] to-[#0A72AD] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition">
                        {serviceLoading[s._id] ? "Saving..." : "Save Text"}
                      </button>
                      {serviceMsg[s._id] === "success" && <span className="text-sm text-green-400">✓ Updated!</span>}
                      {serviceMsg[s._id] === "error" && <span className="text-sm text-red-400">✗ Failed</span>}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm text-[#94a3b8]">Service Image</label>
                    <img src={getImageUrl(s.img)} alt={s.title} className="w-full h-48 object-cover rounded-lg border border-white/10" />
                    <div>
                      <input type="file" accept="image/*" id={"img-" + s._id} className="hidden"
                        onChange={(e) => handleImageUpload(s._id, e.target.files[0])} />
                      <label htmlFor={"img-" + s._id}
                        className="cursor-pointer inline-block border border-[#60BBEE] text-[#60BBEE] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#60BBEE]/10 transition">
                        {imageLoading[s._id] ? "Uploading..." : "Change Image"}
                      </label>
                      {imageMsg[s._id] === "success" && <span className="ml-3 text-sm text-green-400">✓ Image updated!</span>}
                      {imageMsg[s._id] === "error" && <span className="ml-3 text-sm text-red-400">✗ Failed</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}