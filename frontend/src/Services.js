import React from "react";

function Services() {
  const cards = [
    {
      title: "User Profiles",
      desc: "Farmers and buyers create profiles to showcase produce, business needs, and connect with the community.",
      icon: (
        <svg className="h-10 w-10 text-green-700 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Produce Listing",
      desc: "List, browse, and search for fresh produce. Farmers update availability, buyers find what they need.",
      icon: (
        <svg className="h-10 w-10 text-green-700 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      )
    },
    {
      title: "Order Management",
      desc: "Seamlessly manage orders, track status, and communicate between farmers and buyers.",
      icon: (
        <svg className="h-10 w-10 text-green-700 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      )
    }
  ];
  return (
    <section className="py-20 bg-white services-section" id="services" aria-label="Services">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <div key={i} className="card" tabIndex="0" aria-label={card.title}>
              {card.icon}
              <h3 className="text-xl font-semibold text-green-900 mb-2">{card.title}</h3>
              <p className="text-green-800">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services; 