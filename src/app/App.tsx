import { useState, useEffect } from "react"
import {
  Menu, X, ShoppingBag, Heart, Star, ArrowRight,
  MapPin, Phone, Mail, Instagram, Twitter, Facebook, Youtube,
  Check, Plus, Minus, ChevronRight, Award, Truck,
  Palette, Globe, Eye, ChevronDown, Filter,
  Zap, Package, Layers, Users, Shield,
} from "lucide-react"
import { motion } from "motion/react"

// ─── Types ───────────────────────────────────────────────────────────────────

type Page = "home" | "shop" | "product" | "branding" | "gallery" | "about" | "contact"

interface Product {
  id: number
  name: string
  price: number
  category: string
  badge: string
  image: string
  colors: string[]
  sizes: string[]
}

// ─── Constants ───────────────────────────────────────────────────────────────

const GOLD = "#C5A46B"
const GOLD_BG = "rgba(197,164,107,0.10)"
const DISPLAY = "'Big Shoulders Display', sans-serif"
const BODY = "'DM Sans', sans-serif"

// ─── Data ────────────────────────────────────────────────────────────────────

const products: Product[] = [
  { id: 1, name: "Main Graphic Tee", price: 450,  category: "T-Shirts",   badge: "New",         image: "https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/540963636_1191784622976964_5155060965791763049_n.jpg?stp=dst-jpg_tt6&cstp=mx1000x1000&ctp=s1000x1000&_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGq-vORNMpvCD-Z4HygakU_4VkHnQRYTKPhWQedBFhMo-szHRsEKy9yHT7gHgrWjPsukr7TOoBkZ_Dkg5h_bcwi&_nc_ohc=J-vLR3KupdQQ7kNvwEdCJCt&_nc_oc=Adr5HCAEZ-1Hyitw2HR_vwFJaI0aNvCUEagNNtVZB5sF5_El7Uydk_SoBKPcsQy-4rk&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=KCmde7wOi57rI69ekT0p3A&_nc_ss=7a2a8&oh=00_AQBowRjGCQ6seHesroD-S1BRTXgj_kdZHElwGq-dSD3mKA&oe=6A5C0011", colors: ["#0D0D0D","#F5F5F0","#4A4A4A"], sizes: ["XS","S","M","L","XL"] },
  { id: 2, name: "Varsity Baller Shirt", price: 400,  category: "T-Shirts",   badge: "Premium", image: "https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/584752258_1262664 la4S15888974_366758544876950356_n.jpg?stp=dst-jpg_tt6&cstp=mx2046x2048&ctp=s2046x2048&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHyD73UOClyi-zwF5pJnu3iX3dH_XwBE-hfd0f9fAET6M39FfOSHbumKEcEbJLjFBIQCbwecPFCAE64qvkgiOzh&_nc_ohc=L7N4GaObLPAQ7kNvwG__2lj&_nc_oc=AdrAJ4bXP_e1VEZeIt3wMdrjp1-eVKASgsm3vVnKJBDxaK3NviIBvue1C4PilABBQP4&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=AgJOogtfydn0mYTzKQPjTQ&_nc_ss=7a2a8&oh=00_AQDj_3bqxaF9TLMA-wrpBHXoARxQs1jMuZZbb30oi7Rojg&oe=6A5BFB79", colors: ["#0D0D0D","#F5F5F0"], sizes: ["S","M","L","XL","XXL"] },
  { id: 3, name: "Concept Hoodie",          price: 129, category: "Hoodies",    badge: "",            image: "photo-1556821840-3a63f95609a7",    colors: ["#0D0D0D","#F5F5F0","#2D2D2D"], sizes: ["XS","S","M","L","XL","XXL"] },
  { id: 4, name: "Structured Coach Jacket", price: 199, category: "Outerwear",  badge: "Limited",     image: "photo-1591047139829-d91aecb6caea", colors: ["#0D0D0D","#1A3A2A"],           sizes: ["XS","S","M","L","XL"] },
  { id: 5, name: "Wide-Leg Trousers",       price: 119, category: "Bottoms",    badge: "",            image: "photo-1509631179647-0177331693ae", colors: ["#0D0D0D","#888877"],           sizes: ["XS","S","M","L","XL"] },
  { id: 6, name: "Longline Bomber",         price: 229, category: "Outerwear",  badge: "New",         image: "photo-1539109136881-3be0616acf4b", colors: ["#0D0D0D","#2A2A2A"],           sizes: ["S","M","L","XL"] },
  { id: 7, name: "Relaxed Linen Shirt",     price: 95,  category: "Shirts",     badge: "",            image: "photo-1515886657613-9f3515b0c78f", colors: ["#F5F5F0","#B8B0A0"],           sizes: ["XS","S","M","L","XL","XXL"] },
  { id: 8, name: "Concept Sweatpants",      price: 109, category: "Bottoms",    badge: "Best Seller", image: "photo-1469334031218-e382a71b716b", colors: ["#0D0D0D","#2A2A2A","#F5F5F0"], sizes: ["XS","S","M","L","XL","XXL"] },
]

const services = [
  { title: "DTF Printing",       desc: "Direct-to-film transfers for vivid, full-colour designs on any fabric.",        icon: Layers,  img: "photo-1620799140408-edc6dcb6d633" },
  { title: "Embroidery",         desc: "Premium thread embroidery for logos, crests and professional corporate wear.",   icon: Palette, img: "photo-1558618047-3c8c76ca7d13" },
  { title: "Corporate Clothing", desc: "Professional branded uniforms and workwear tailored to your entire team.",       icon: Users,   img: "photo-1600880292203-757bb62b4baf" },
  { title: "Sports Wear",        desc: "Custom performance kits for clubs, academies and elite athletes.",               icon: Zap,     img: "photo-1571902943202-507ec2618e8f" },
  { title: "School Uniforms",    desc: "Quality school wear with custom branding, embroidery and precise sizing.",       icon: Shield,  img: "photo-1503676260728-1c00da094a0b" },
  { title: "Promo Merchandise",  desc: "Branded merchandise and promotional items engineered for lasting impact.",       icon: Package, img: "photo-1607082349566-187342175e2f" },
]

const reasons = [
  { icon: Award,  title: "Premium Materials",  desc: "We source only the finest fabrics and materials for uncompromising quality." },
  { icon: Users,  title: "Experienced Team",   desc: "A decade of expertise spanning fashion, print, and custom branding." },
  { icon: Truck,  title: "Fast Delivery",      desc: "48-hour production turnaround with tracked nationwide shipping." },
  { icon: Palette,title: "Custom Designs",     desc: "Your vision, brought to life by our in-house creative team." },
  { icon: Globe,  title: "Nationwide Service", desc: "Serving businesses and individuals across every major city." },
  { icon: Check,  title: "Affordable Pricing", desc: "Premium quality at competitive prices — no hidden costs, ever." },
]

const testimonials = [
  { quote: "Concept Brand elevated our entire team kit to another level. The quality is unmatched and the service was flawless from start to finish.", name: "James Okafor",  role: "Head of Operations, FC Rivals",    rating: 5, img: "photo-1507003211169-0a1dd7228f2d" },
  { quote: "We outfitted our 200-person company and every single employee was blown away by the precision of the print and the quality of the garments.", name: "Sarah Mensah",   role: "Brand Manager, Axiom Group",       rating: 5, img: "photo-1494790108377-be9c29b29330" },
  { quote: "Their fashion range speaks for itself. Every piece I ordered exceeded my expectations. Clean aesthetics, premium construction. Will not shop elsewhere.", name: "Marcus Reid",    role: "Loyal Customer",                   rating: 5, img: "photo-1500648767791-00dcc994a43e" },
]

const galleryImages = [
  { img: "photo-1558618666-fcd25c85cd64", label: "SS25 Campaign",      tall: true  },
  { img: "photo-1539109136881-3be0616acf4b", label: "Editorial",        tall: false },
  { img: "photo-1529139574466-a303027c1d8b", label: "Lifestyle",        tall: false },
  { img: "photo-1515886657613-9f3515b0c78f", label: "Behind the Lens",  tall: true  },
  { img: "photo-1509631179647-0177331693ae", label: "Campaign",         tall: false },
  { img: "photo-1469334031218-e382a71b716b", label: "Corporate",        tall: false },
  { img: "photo-1556821840-3a63f95609a7",    label: "Hoodies",          tall: false },
  { img: "photo-1524678606370-a47ad25cb82a", label: "Sports Kit",       tall: false },
  { img: "photo-1600880292203-757bb62b4baf", label: "Corporate Wear",   tall: true  },
  { img: "photo-1503676260728-1c00da094a0b", label: "School Uniform",   tall: false },
  { img: "photo-1607082349566-187342175e2f", label: "Merchandise",      tall: false },
  { img: "photo-1571902943202-507ec2618e8f", label: "Sports Kits",      tall: false },
]

const processSteps = [
  { num: "01", title: "Consultation", desc: "We discuss your requirements, brand guidelines, and creative vision in full." },
  { num: "02", title: "Design",       desc: "Our team creates digital mock-ups and presentations for your approval." },
  { num: "03", title: "Production",   desc: "Once approved, we begin production with state-of-the-art equipment." },
  { num: "04", title: "Quality Check",desc: "Every single order passes through our rigorous quality inspection." },
  { num: "05", title: "Delivery",     desc: "Fast, tracked delivery nationwide — direct to your door." },
]

const teamMembers = [
  { name: "Jamal Concept",  role: "Founder & Creative Director", img: "photo-1507003211169-0a1dd7228f2d" },
  { name: "Nia Clarke",     role: "Head of Design",               img: "photo-1494790108377-be9c29b29330" },
  { name: "Dele Adeyemi",   role: "Production Manager",           img: "photo-1500648767791-00dcc994a43e" },
  { name: "Priya Shah",     role: "Brand Partnerships",           img: "photo-1438761681033-6461ffad8d80" },
]

const faqs = [
  { q: "What is your minimum order quantity for branding?", a: "For most custom branding orders, our MOQ is 10 units. For embroidery and some specialist techniques, we can accommodate single-unit orders." },
  { q: "How long does a custom order take?",                a: "Standard turnaround is 5–7 business days. We offer 48-hour express production for an additional fee on qualifying orders." },
  { q: "Do you offer in-house design services?",            a: "Yes. Our in-house design team will work with you to create the perfect artwork at no charge on orders over 50 units." },
  { q: "What printing methods do you use?",                  a: "We offer DTF (Direct-to-Film), screen printing, embroidery, sublimation, and heat transfer — chosen per project requirements." },
  { q: "Do you ship nationwide?",                            a: "Yes. We ship across the country with fully tracked delivery. International shipping is available on request." },
]

// ─── Shared Components ───────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-px" style={{ backgroundColor: GOLD }} />
      <span className="text-[11px] tracking-[0.3em] uppercase font-medium" style={{ color: GOLD, fontFamily: BODY }}>
        {children}
      </span>
    </div>
  )
}

function ProductCard({
  p, onView, onWishlist, wishlisted,
}: {
  p: Product
  onView: () => void
  onWishlist: () => void
  wishlisted: boolean
}) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-[#1A1A1A] aspect-[3/4]" onClick={onView}>
        <img
          src={`https://images.unsplash.com/${p.image}?w=600&h=800&fit=crop&auto=format`}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {p.badge && (
          <span
            className="absolute top-3 left-3 text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1"
            style={{ backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }}
          >
            {p.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onView() }}
            className="flex-1 py-2.5 bg-white text-[#0D0D0D] text-[10px] tracking-widest uppercase font-semibold flex items-center justify-center gap-1.5 hover:bg-white/90 transition-colors"
            style={{ fontFamily: BODY }}
          >
            <Eye size={13} /> Quick View
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onWishlist() }}
            className={`w-10 flex items-center justify-center transition-colors ${wishlisted ? "" : "bg-white/10 hover:bg-white/20"}`}
            style={wishlisted ? { backgroundColor: GOLD } : {}}
          >
            <Heart size={13} className={wishlisted ? "fill-[#0D0D0D] text-[#0D0D0D]" : "text-white"} />
          </button>
        </div>
      </div>
      <div className="pt-3 pb-2">
        <span className="text-[10px] tracking-widest uppercase" style={{ color: GOLD, fontFamily: BODY }}>{p.category}</span>
        <p className="text-sm font-semibold mt-0.5 text-white/90" style={{ fontFamily: DISPLAY, letterSpacing: "0.06em" }}>{p.name}</p>
        <p className="text-sm mt-1 text-white/50" style={{ fontFamily: BODY }}>�R{p.price}</p>
      </div>
    </div>
  )
}

// ─── Home Page ───────────────────────────────────────────────────────────────

function HomePage({
  nav, wishlist, setWishlist, viewProduct,
}: {
  nav: (p: Page) => void
  wishlist: number[]
  setWishlist: React.Dispatch<React.SetStateAction<number[]>>
  viewProduct: (p: Product) => void
}) {
  const toggleWishlist = (id: number) =>
    setWishlist((w) => (w.includes(id) ? w.filter((i) => i !== id) : [...w, id]))

  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen min-h-[640px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&auto=format"
            alt="Concept Brand hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <SectionLabel>Est. 2018 — Premium Brand</SectionLabel>
            <h1
              className="text-[clamp(3.5rem,11vw,8rem)] font-black uppercase text-white tracking-tight leading-[0.92]"
              style={{ fontFamily: DISPLAY }}
            >
              PREMIUM<br />
              <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)", color: "transparent" }}>APPAREL.</span>
              <br />
              <span style={{ color: GOLD }}>PROFESSIONAL</span>
              <br />
              BRANDING.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="mt-8 max-w-md"
          >
            <p className="text-white/55 text-base leading-relaxed" style={{ fontFamily: BODY }}>
              Where fashion meets creativity. Premium clothing collections and custom branding solutions for businesses, teams, and events.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => nav("shop")}
                className="px-8 py-3.5 text-[11px] tracking-widest uppercase font-semibold flex items-center gap-2 hover:opacity-85 transition-opacity"
                style={{ backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }}
              >
                Shop Collection <ArrowRight size={13} />
              </button>
              <button
                onClick={() => nav("contact")}
                className="px-8 py-3.5 text-[11px] tracking-widest uppercase font-semibold text-white border border-white/22 hover:border-white/55 transition-colors"
                style={{ fontFamily: BODY }}
              >
                Request Quote
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/8">
              {[
                { v: "500+", l: "Projects Completed" },
                { v: "100+", l: "Happy Clients" },
                { v: "48hr", l: "Fast Turnaround" },
                { v: "A+",   l: "Premium Quality" },
              ].map((s, i) => (
                <div key={i} className="py-5 px-6 bg-black/55 backdrop-blur-sm border-r border-white/8 last:border-r-0">
                  <div className="text-2xl font-black tracking-wide" style={{ fontFamily: DISPLAY, color: GOLD }}>{s.v}</div>
                  <div className="text-[10px] tracking-widest uppercase text-white/38 mt-0.5" style={{ fontFamily: BODY }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dual Business Split */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {[
          { label: "Division 01", title: "CLOTHING", sub: "Premium fashion apparel. Designed for those who refuse to settle.", img: "photo-1445205170230-053b83016050", page: "shop" as Page, cta: "Explore Collection" },
          { label: "Division 02", title: "BRANDING", sub: "Custom apparel and printing solutions for businesses, teams and events.", img: "photo-1558618047-3c8c76ca7d13", page: "branding" as Page, cta: "Explore Branding" },
        ].map((card) => (
          <div
            key={card.title}
            className="relative group cursor-pointer overflow-hidden min-h-[440px] lg:min-h-[580px]"
            onClick={() => nav(card.page)}
          >
            <img
              src={`https://images.unsplash.com/${card.img}?w=960&h=720&fit=crop&auto=format`}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/28 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-10 lg:p-14">
              <span className="text-[10px] tracking-[0.32em] uppercase mb-3 font-medium" style={{ color: GOLD, fontFamily: BODY }}>{card.label}</span>
              <h2 className="text-5xl lg:text-[3.5rem] font-black uppercase text-white tracking-tight leading-none" style={{ fontFamily: DISPLAY }}>{card.title}</h2>
              <p className="text-white/48 mt-2.5 text-sm max-w-xs leading-relaxed" style={{ fontFamily: BODY }}>{card.sub}</p>
              <button className="mt-7 inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold border-b pb-1 w-fit group-hover:gap-3 transition-all" style={{ color: GOLD, borderColor: GOLD, fontFamily: BODY }}>
                {card.cta} <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <SectionLabel>The Collection</SectionLabel>
            <h2 className="text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none" style={{ fontFamily: DISPLAY }}>
              FEATURED<br />PRODUCTS
            </h2>
          </div>
          <button
            onClick={() => nav("shop")}
            className="hidden lg:flex items-center gap-2 text-[11px] tracking-widest uppercase text-white/35 hover:text-white transition-colors border-b border-white/10 hover:border-white/35 pb-1"
            style={{ fontFamily: BODY }}
          >
            View All <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.slice(0, 4).map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              onView={() => viewProduct(p)}
              onWishlist={() => toggleWishlist(p.id)}
              wishlisted={wishlist.includes(p.id)}
            />
          ))}
        </div>
      </section>

      {/* Branding Services */}
      <section className="bg-[#111111] py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionLabel>Custom Solutions</SectionLabel>
            <h2 className="text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none" style={{ fontFamily: DISPLAY }}>
              BRANDING<br />SERVICES
            </h2>
            <p className="text-white/38 mt-5 max-w-md mx-auto text-sm leading-relaxed" style={{ fontFamily: BODY }}>
              From embroidered logos to full corporate uniform programs — we handle it all under one roof.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div
                key={s.title}
                className="group relative overflow-hidden bg-[#1A1A1A] cursor-pointer hover:bg-[#202020] transition-colors"
                onClick={() => nav("branding")}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${s.img}?w=600&h=338&fit=crop&auto=format`}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-55 group-hover:opacity-80"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: GOLD_BG }}>
                      <s.icon size={14} style={{ color: GOLD }} />
                    </div>
                    <h3 className="text-[1.1rem] font-black uppercase text-white tracking-wide" style={{ fontFamily: DISPLAY }}>{s.title}</h3>
                  </div>
                  <p className="text-white/38 text-sm leading-relaxed" style={{ fontFamily: BODY }}>{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase group-hover:gap-2.5 transition-all" style={{ color: GOLD, fontFamily: BODY }}>
                    Learn More <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <SectionLabel>Why Us</SectionLabel>
            <h2 className="text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none" style={{ fontFamily: DISPLAY }}>
              WHY CHOOSE<br /><span style={{ color: GOLD }}>CONCEPT</span><br />BRAND
            </h2>
            <p className="text-white/38 mt-6 text-sm leading-relaxed max-w-sm" style={{ fontFamily: BODY }}>
              We don't just print on clothing — we build brands. Every project is treated with the precision and care it deserves.
            </p>
            <button
              onClick={() => nav("about")}
              className="mt-8 inline-flex items-center gap-2 text-[10px] tracking-widest uppercase border-b pb-1 font-semibold"
              style={{ color: GOLD, borderColor: GOLD, fontFamily: BODY }}
            >
              Our Story <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="p-5 border hover:border-[rgba(197,164,107,0.28)] transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "#1A1A1A" }}
              >
                <div className="w-9 h-9 flex items-center justify-center mb-4" style={{ backgroundColor: GOLD_BG }}>
                  <r.icon size={15} style={{ color: GOLD }} />
                </div>
                <h4 className="text-base font-black uppercase text-white tracking-wide" style={{ fontFamily: DISPLAY }}>{r.title}</h4>
                <p className="text-white/38 text-xs leading-relaxed mt-1.5" style={{ fontFamily: BODY }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="bg-[#111111] py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel>Gallery</SectionLabel>
              <h2 className="text-5xl lg:text-6xl font-black uppercase text-white tracking-tight" style={{ fontFamily: DISPLAY }}>OUR WORK</h2>
            </div>
            <button
              onClick={() => nav("gallery")}
              className="hidden lg:flex items-center gap-2 text-[11px] tracking-widest uppercase text-white/35 hover:text-white transition-colors border-b border-white/10 hover:border-white/35 pb-1"
              style={{ fontFamily: BODY }}
            >
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="columns-2 lg:columns-3 xl:columns-4 gap-3 [column-gap:0.75rem]">
            {galleryImages.slice(0, 8).map((g) => (
              <div
                key={g.img}
                className="break-inside-avoid group relative overflow-hidden cursor-pointer mb-3"
              >
                <img
                  src={`https://images.unsplash.com/${g.img}?w=500&h=${g.tall ? 700 : 420}&fit=crop&auto=format`}
                  alt={g.label}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                  <span className="text-[10px] tracking-widest uppercase text-white" style={{ fontFamily: BODY }}>{g.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-28">
        <div className="text-center mb-16">
          <SectionLabel>What Clients Say</SectionLabel>
          <h2 className="text-5xl lg:text-6xl font-black uppercase text-white tracking-tight" style={{ fontFamily: DISPLAY }}>TESTIMONIALS</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-8 border relative"
              style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "#1A1A1A" }}
            >
              <div className="text-6xl leading-none opacity-20 absolute top-6 right-7 select-none" style={{ color: GOLD, fontFamily: "Georgia, serif" }}>&ldquo;</div>
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={12} style={{ color: GOLD, fill: GOLD }} />
                ))}
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-6 italic" style={{ fontFamily: BODY }}>{t.quote}</p>
              <div className="flex items-center gap-3 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <img
                  src={`https://images.unsplash.com/${t.img}?w=80&h=80&fit=crop&auto=format`}
                  alt={t.name}
                  className="w-10 h-10 object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-black uppercase text-white tracking-wide" style={{ fontFamily: DISPLAY }}>{t.name}</p>
                  <p className="text-[10px] tracking-wide text-white/38 mt-0.5" style={{ fontFamily: BODY }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-28 lg:py-36 bg-[#111111]">
        <div className="absolute inset-0 opacity-8">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#111111]/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel>Get Started</SectionLabel>
          <h2
            className="text-[clamp(3rem,8vw,7rem)] font-black uppercase text-white tracking-tight leading-none"
            style={{ fontFamily: DISPLAY }}
          >
            READY TO<br /><span style={{ color: GOLD }}>BUILD YOUR</span><br />BRAND?
          </h2>
          <p className="text-white/38 mt-6 text-sm max-w-xs mx-auto leading-relaxed" style={{ fontFamily: BODY }}>
            Let's create something amazing together. Speak to our team today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <button
              onClick={() => nav("contact")}
              className="px-10 py-4 text-[11px] tracking-widest uppercase font-semibold hover:opacity-85 transition-opacity"
              style={{ backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }}
            >
              Get Quote
            </button>
            <button
              onClick={() => nav("contact")}
              className="px-10 py-4 text-[11px] tracking-widest uppercase font-semibold text-white border border-white/18 hover:border-white/45 transition-colors"
              style={{ fontFamily: BODY }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

// ─── Shop Page ────────────────────────────────────────────────────────────────

function ShopPage({
  nav, wishlist, setWishlist, shopFilter, setShopFilter, viewProduct,
}: {
  nav: (p: Page) => void
  wishlist: number[]
  setWishlist: React.Dispatch<React.SetStateAction<number[]>>
  shopFilter: string
  setShopFilter: (f: string) => void
  viewProduct: (p: Product) => void
}) {
  const categories = ["All", "T-Shirts", "Hoodies", "Bottoms", "Outerwear", "Shirts"]
  const filtered = shopFilter === "All" ? products : products.filter((p) => p.category === shopFilter)
  const toggleWishlist = (id: number) =>
    setWishlist((w) => (w.includes(id) ? w.filter((i) => i !== id) : [...w, id]))

  return (
    <main className="pt-20">
      {/* Banner */}
      <div className="relative h-56 lg:h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=400&fit=crop&auto=format"
          alt="Shop"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <SectionLabel>The Collection</SectionLabel>
          <h1 className="text-6xl lg:text-7xl font-black uppercase text-white tracking-tight" style={{ fontFamily: DISPLAY }}>SHOP</h1>
        </div>
      </div>

      {/* Filter bar */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8 py-7 flex flex-wrap items-center gap-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <Filter size={13} className="text-white/28" />
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setShopFilter(c)}
            className="text-[10px] tracking-widest uppercase px-3 py-1.5 transition-all font-medium"
            style={
              shopFilter === c
                ? { backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }
                : { color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: BODY }
            }
          >
            {c}
          </button>
        ))}
        <div className="ml-auto text-[10px] text-white/28 tracking-wide" style={{ fontFamily: BODY }}>
          {filtered.length} products
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 pb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              onView={() => viewProduct(p)}
              onWishlist={() => toggleWishlist(p.id)}
              wishlisted={wishlist.includes(p.id)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/28 text-sm tracking-widest uppercase" style={{ fontFamily: BODY }}>No products found</p>
          </div>
        )}
      </div>
    </main>
  )
}

// ─── Product Page ─────────────────────────────────────────────────────────────

function ProductPage({
  product, nav, selectedSize, setSelectedSize, qty, setQty,
}: {
  product: Product
  nav: (p: Page) => void
  selectedSize: string
  setSelectedSize: (s: string) => void
  qty: number
  setQty: (n: number) => void
}) {
  const [activeImg, setActiveImg] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [added, setAdded] = useState(false)

  const thumbs = [product.image, products[1].image, products[2].image]

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/28"
        style={{ fontFamily: BODY }}
      >
        <button onClick={() => nav("home")} className="hover:text-white transition-colors">Home</button>
        <ChevronRight size={9} />
        <button onClick={() => nav("shop")} className="hover:text-white transition-colors">Shop</button>
        <ChevronRight size={9} />
        <span className="text-white/55">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-[3/4] overflow-hidden bg-[#1A1A1A]">
              <img
                src={`https://images.unsplash.com/${thumbs[activeImg]}?w=800&h=1067&fit=crop&auto=format`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {thumbs.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="aspect-square overflow-hidden cursor-pointer border-2 transition-all"
                  style={{ borderColor: activeImg === i ? GOLD : "transparent", opacity: activeImg === i ? 1 : 0.45 }}
                >
                  <img
                    src={`https://images.unsplash.com/${img}?w=200&h=200&fit=crop&auto=format`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:pt-2">
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: GOLD, fontFamily: BODY }}>{product.category}</span>
            <h1 className="text-4xl lg:text-5xl font-black uppercase text-white tracking-tight mt-2 leading-none" style={{ fontFamily: DISPLAY }}>
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-2xl text-white font-light" style={{ fontFamily: BODY }}>�R{product.price}</span>
              <span className="text-sm text-white/28 line-through" style={{ fontFamily: BODY }}>�R{Math.round(product.price * 1.28)}</span>
              <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 font-semibold" style={{ backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }}>SALE</span>
            </div>

            <div className="w-full h-px my-6" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />

            {/* Colours */}
            <div className="mb-6">
              <p className="text-[10px] tracking-widest uppercase text-white/38 mb-3" style={{ fontFamily: BODY }}>Colour</p>
              <div className="flex gap-2.5">
                {product.colors.map((c, i) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(i)}
                    className="w-6 h-6 transition-all"
                    style={{
                      backgroundColor: c,
                      outline: selectedColor === i ? `2px solid ${GOLD}` : "2px solid transparent",
                      outlineOffset: "2px",
                      transform: selectedColor === i ? "scale(1.15)" : "scale(1)",
                      border: c === "#F5F5F0" ? "1px solid rgba(255,255,255,0.2)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] tracking-widest uppercase text-white/38" style={{ fontFamily: BODY }}>Size</p>
                <button className="text-[10px] tracking-widest uppercase underline" style={{ color: GOLD, fontFamily: BODY }}>Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className="px-4 py-2 text-[11px] tracking-widest uppercase border transition-all font-medium"
                    style={
                      selectedSize === s
                        ? { backgroundColor: GOLD, borderColor: GOLD, color: "#0D0D0D", fontFamily: BODY }
                        : { borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.48)", fontFamily: BODY }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Cart */}
            <div className="flex items-stretch gap-3 mb-6">
              <div className="flex items-center border" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3.5 text-white/50 hover:text-white transition-colors">
                  <Minus size={13} />
                </button>
                <span className="px-5 py-3.5 text-sm text-white border-x w-14 text-center" style={{ borderColor: "rgba(255,255,255,0.12)", fontFamily: BODY }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3.5 text-white/50 hover:text-white transition-colors">
                  <Plus size={13} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 text-[11px] tracking-widest uppercase font-semibold transition-all flex items-center justify-center gap-2"
                style={
                  added
                    ? { backgroundColor: "rgba(255,255,255,0.1)", color: "#F5F5F0", fontFamily: BODY }
                    : { backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }
                }
              >
                {added ? <><Check size={13} /> Added to Bag</> : <><ShoppingBag size={13} /> Add to Bag</>}
              </button>
            </div>

            <p className="text-white/28 text-xs leading-relaxed" style={{ fontFamily: BODY }}>
              Ethically made. Free returns within 30 days. Free shipping on orders over �R100.
            </p>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-20 pt-20 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <SectionLabel>You May Also Like</SectionLabel>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {products.slice(4).map((p) => (
              <ProductCard key={p.id} p={p} onView={() => {}} onWishlist={() => {}} wishlisted={false} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

// ─── Branding Page ────────────────────────────────────────────────────────────

function BrandingPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[480px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1621607512214-68297480165e?w=1920&h=900&fit=crop&auto=format"
          alt="Branding"
          className="absolute inset-0 w-full h-full object-cover opacity-38"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/96 to-[#0D0D0D]/45" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10">
          <SectionLabel>Professional Solutions</SectionLabel>
          <h1 className="text-[clamp(3.5rem,9vw,7rem)] font-black uppercase text-white tracking-tight leading-[0.92]" style={{ fontFamily: DISPLAY }}>
            BRANDING<br /><span style={{ color: GOLD }}>SOLUTIONS</span>
          </h1>
          <p className="text-white/48 mt-6 max-w-sm text-sm leading-relaxed" style={{ fontFamily: BODY }}>
            Custom apparel and printing for businesses, sports clubs, schools, and events. Premium quality. Fast delivery.
          </p>
          <button
            onClick={() => nav("contact")}
            className="mt-8 px-8 py-4 text-[11px] tracking-widest uppercase font-semibold flex items-center gap-2 hover:opacity-85 transition-opacity"
            style={{ backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }}
          >
            Request a Quote <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <SectionLabel>What We Offer</SectionLabel>
        <h2 className="text-5xl font-black uppercase text-white tracking-tight mb-12" style={{ fontFamily: DISPLAY }}>OUR SERVICES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.title} className="group overflow-hidden bg-[#1A1A1A] hover:bg-[#202020] transition-colors cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${s.img}?w=600&h=338&fit=crop&auto=format`}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-55 group-hover:opacity-78"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <s.icon size={17} style={{ color: GOLD }} />
                  <h3 className="text-xl font-black uppercase text-white tracking-wide" style={{ fontFamily: DISPLAY }}>{s.title}</h3>
                </div>
                <p className="text-white/38 text-sm leading-relaxed" style={{ fontFamily: BODY }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#111111] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-5xl font-black uppercase text-white tracking-tight" style={{ fontFamily: DISPLAY }}>OUR PROCESS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5">
            {processSteps.map((s) => (
              <div key={s.num} className="bg-[#111111] p-8 hover:bg-[#1A1A1A] transition-colors">
                <div className="text-5xl font-black opacity-25 mb-3" style={{ fontFamily: DISPLAY, color: GOLD }}>{s.num}</div>
                <h4 className="text-xl font-black uppercase text-white mb-2" style={{ fontFamily: DISPLAY }}>{s.title}</h4>
                <p className="text-white/38 text-sm leading-relaxed" style={{ fontFamily: BODY }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <p className="text-center text-[10px] tracking-[0.42em] uppercase text-white/18 mb-10" style={{ fontFamily: BODY }}>Trusted By</p>
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {["AXIOM GROUP", "FC RIVALS", "SUMMIT CO.", "PRESTIGE CORP", "NOVA ACADEMY", "ELEVATE FC"].map((c) => (
            <span key={c} className="text-xl lg:text-2xl font-black uppercase text-white/18 tracking-widest" style={{ fontFamily: DISPLAY }}>
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Quote CTA */}
      <section className="bg-[#1A1A1A] py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-none" style={{ fontFamily: DISPLAY }}>
            GET A FREE<br /><span style={{ color: GOLD }}>QUOTE TODAY</span>
          </h2>
          <p className="text-white/38 mt-5 text-sm leading-relaxed" style={{ fontFamily: BODY }}>
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => nav("contact")}
            className="mt-8 px-10 py-4 text-[11px] tracking-widest uppercase font-semibold hover:opacity-85 transition-opacity"
            style={{ backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }}
          >
            Start a Project
          </button>
        </div>
      </section>
    </main>
  )
}

// ─── Gallery Page ─────────────────────────────────────────────────────────────

function GalleryPage({
  activeFilter, setActiveFilter,
}: {
  activeFilter: string
  setActiveFilter: (f: string) => void
}) {
  const filters = ["All", "Fashion", "Corporate", "Sports", "Process"]
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <main className="pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-18">
        <SectionLabel>Our Portfolio</SectionLabel>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-0">
          <h1 className="text-6xl lg:text-[7rem] font-black uppercase text-white tracking-tight leading-none" style={{ fontFamily: DISPLAY }}>GALLERY</h1>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-4 py-2 text-[10px] tracking-widest uppercase transition-all font-medium"
                style={
                  activeFilter === f
                    ? { backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }
                    : { border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.38)", fontFamily: BODY }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="columns-2 lg:columns-3 xl:columns-4 [column-gap:0.75rem]">
          {galleryImages.map((g) => (
            <div
              key={g.img}
              className="break-inside-avoid group relative overflow-hidden cursor-pointer mb-3"
              onClick={() => setLightbox(g.img)}
            >
              <img
                src={`https://images.unsplash.com/${g.img}?w=520&h=${g.tall ? 720 : 420}&fit=crop&auto=format`}
                alt={g.label}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/58 transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                <span className="text-[10px] tracking-widest uppercase text-white" style={{ fontFamily: BODY }}>{g.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-black/96 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-white/45 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <img
            src={`https://images.unsplash.com/${lightbox}?w=1200&h=900&fit=crop&auto=format`}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  )
}

// ─── About Page ───────────────────────────────────────────────────────────────

function AboutPage({ nav }: { nav: (p: Page) => void }) {
  const timeline = [
    { year: "2018", title: "Founded",            desc: "Concept Brand was born from a passion for premium streetwear and a gap in the custom branding market." },
    { year: "2019", title: "First Studio",        desc: "Opened our first production studio with state-of-the-art DTF and embroidery equipment." },
    { year: "2021", title: "100 Clients",         desc: "Reached the milestone of 100 satisfied clients across fashion, sports, and corporate sectors." },
    { year: "2023", title: "National Expansion",  desc: "Expanded nationwide, serving clients from every major city across the country." },
    { year: "2025", title: "SS25 Collection",     desc: "Launched our SS25 premium fashion collection, cementing our dual identity in the market." },
  ]

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden flex items-center">
        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=800&fit=crop&auto=format" alt="About" className="absolute inset-0 w-full h-full object-cover opacity-28" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/95 to-[#0D0D0D]/55" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10">
          <SectionLabel>Our Story</SectionLabel>
          <h1 className="text-[clamp(3.5rem,9vw,7rem)] font-black uppercase text-white tracking-tight leading-none" style={{ fontFamily: DISPLAY }}>
            ABOUT<br /><span style={{ color: GOLD }}>CONCEPT</span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <SectionLabel>Mission</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black uppercase text-white mb-7 leading-tight" style={{ fontFamily: DISPLAY }}>WE BUILD BRANDS THAT LAST</h2>
            <p className="text-white/48 text-sm leading-relaxed mb-4" style={{ fontFamily: BODY }}>
              Concept Brand was founded on one belief: that premium quality and custom creativity shouldn't be mutually exclusive. We set out to bridge the gap between high-end fashion and practical branding solutions.
            </p>
            <p className="text-white/48 text-sm leading-relaxed mb-4" style={{ fontFamily: BODY }}>
              Today, we serve hundreds of clients — from individual fashion enthusiasts to multinational corporations — with the same dedication to quality that defined us from day one.
            </p>
            <p className="text-white/48 text-sm leading-relaxed" style={{ fontFamily: BODY }}>
              Our dual identity as both a fashion house and a branding studio is not a compromise — it is our greatest strength.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=700&fit=crop&auto=format"
              alt="Studio"
              className="w-full object-cover"
            />
            <div className="absolute -bottom-4 -left-4 p-6 border" style={{ backgroundColor: "#1A1A1A", borderColor: GOLD }}>
              <p className="text-4xl font-black" style={{ fontFamily: DISPLAY, color: GOLD }}>7+</p>
              <p className="text-[10px] tracking-widest uppercase text-white/38 mt-1" style={{ fontFamily: BODY }}>Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5">
            {[
              { label: "Mission", text: "To make premium fashion and custom branding accessible to every individual and enterprise, without compromise." },
              { label: "Vision",  text: "To be the most trusted name in fashion-forward branding across every major market in the country." },
              { label: "Values",  text: "Quality without compromise. Creativity without limits. Service without exception — every single time." },
            ].map((v) => (
              <div key={v.label} className="bg-[#111111] p-10 hover:bg-[#1A1A1A] transition-colors">
                <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: GOLD, fontFamily: BODY }}>{v.label}</p>
                <p className="text-white/55 text-sm leading-relaxed" style={{ fontFamily: BODY }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <SectionLabel>Our Journey</SectionLabel>
        <h2 className="text-5xl font-black uppercase text-white mb-16" style={{ fontFamily: DISPLAY }}>TIMELINE</h2>
        <div>
          {timeline.map((t, i) => (
            <div key={t.year} className="flex gap-8">
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 flex items-center justify-center border-2 flex-shrink-0"
                  style={{ borderColor: GOLD }}
                >
                  <span className="text-sm font-black" style={{ fontFamily: DISPLAY, color: GOLD }}>{t.year.slice(2)}</span>
                </div>
                {i < timeline.length - 1 && (
                  <div className="w-px flex-1 my-2" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
                )}
              </div>
              <div className="pb-12">
                <p className="text-[10px] tracking-[0.3em] uppercase mb-1 font-medium" style={{ color: GOLD, fontFamily: BODY }}>{t.year}</p>
                <h3 className="text-2xl font-black uppercase text-white mb-2" style={{ fontFamily: DISPLAY }}>{t.title}</h3>
                <p className="text-white/38 text-sm leading-relaxed max-w-md" style={{ fontFamily: BODY }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#111111] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionLabel>The People</SectionLabel>
            <h2 className="text-5xl font-black uppercase text-white tracking-tight" style={{ fontFamily: DISPLAY }}>MEET THE TEAM</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((m) => (
              <div key={m.name} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-[#1A1A1A] mb-4">
                  <img
                    src={`https://images.unsplash.com/${m.img}?w=400&h=533&fit=crop&auto=format`}
                    alt={m.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <p className="text-lg font-black uppercase text-white tracking-wide" style={{ fontFamily: DISPLAY }}>{m.name}</p>
                <p className="text-[10px] tracking-widest uppercase mt-0.5 font-medium" style={{ color: GOLD, fontFamily: BODY }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-black uppercase text-white" style={{ fontFamily: DISPLAY }}>
          WORK WITH US
        </h2>
        <p className="text-white/38 mt-4 text-sm" style={{ fontFamily: BODY }}>Have a project in mind? We'd love to hear about it.</p>
        <div className="flex gap-4 justify-center mt-8">
          <button onClick={() => nav("contact")} className="px-8 py-3.5 text-[11px] tracking-widest uppercase font-semibold hover:opacity-85 transition-opacity" style={{ backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }}>
            Get In Touch
          </button>
          <button onClick={() => nav("branding")} className="px-8 py-3.5 text-[11px] tracking-widest uppercase font-semibold text-white border border-white/18 hover:border-white/45 transition-colors" style={{ fontFamily: BODY }}>
            Our Services
          </button>
        </div>
      </section>
    </main>
  )
}

// ─── Contact Page ─────────────────────────────────────────────────────────────

function ContactPage({
  activeAccordion, setActiveAccordion,
}: {
  activeAccordion: number | null
  setActiveAccordion: (n: number | null) => void
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputStyle = {
    backgroundColor: "#1A1A1A",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#F5F5F0",
    fontFamily: BODY,
    outline: "none",
  }

  return (
    <main className="pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <SectionLabel>Get In Touch</SectionLabel>
        <h1 className="text-6xl lg:text-[7rem] font-black uppercase text-white tracking-tight leading-none" style={{ fontFamily: DISPLAY }}>
          CONTACT<br /><span style={{ color: GOLD }}>US</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Form */}
          <div>
            <p className="text-white/38 text-sm leading-relaxed mb-8" style={{ fontFamily: BODY }}>
              Fill in the form below and a member of our team will get back to you within 24 hours.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: "name",  label: "Full Name",        type: "text",  ph: "Your full name" },
                { key: "email", label: "Email Address",    type: "email", ph: "your@email.com" },
                { key: "phone", label: "Phone Number",     type: "tel",   ph: "+27 60 828 2746" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-white/35 block mb-2" style={{ fontFamily: BODY }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.ph}
                    value={form[f.key as keyof typeof form]}
                    onChange={update(f.key as keyof typeof form)}
                    className="w-full px-4 py-3.5 text-sm placeholder-white/18 focus:outline-none"
                    style={inputStyle}
                  />
                </div>
              ))}

              <div>
                <label className="text-[10px] tracking-[0.25em] uppercase text-white/35 block mb-2" style={{ fontFamily: BODY }}>Service Required</label>
                <select
                  value={form.service}
                  onChange={update("service")}
                  className="w-full px-4 py-3.5 text-sm focus:outline-none"
                  style={{ ...inputStyle, color: form.service ? "#F5F5F0" : "rgba(245,245,240,0.25)" }}
                >
                  <option value="" style={{ backgroundColor: "#1A1A1A" }}>Select a service</option>
                  {services.map((s) => <option key={s.title} value={s.title} style={{ backgroundColor: "#1A1A1A" }}>{s.title}</option>)}
                  <option value="Fashion Enquiry" style={{ backgroundColor: "#1A1A1A" }}>Fashion Enquiry</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-[0.25em] uppercase text-white/35 block mb-2" style={{ fontFamily: BODY }}>Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={update("message")}
                  className="w-full px-4 py-3.5 text-sm placeholder-white/18 focus:outline-none resize-none"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 text-[11px] tracking-widest uppercase font-semibold transition-all flex items-center justify-center gap-2"
                style={
                  submitted
                    ? { backgroundColor: "rgba(255,255,255,0.08)", color: "#F5F5F0", fontFamily: BODY }
                    : { backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }
                }
              >
                {submitted ? <><Check size={13} /> Message Sent!</> : "Send Message"}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-8">
            {/* Map placeholder */}
            <div className="aspect-video relative overflow-hidden bg-[#1A1A1A]">
              <img
                src="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&h=450&fit=crop&auto=format"
                alt="Location"
                className="w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                <MapPin size={28} style={{ color: GOLD }} />
                <p className="text-white/55 text-sm tracking-wide" style={{ fontFamily: BODY }}>Sehlakong, Limpopo, South Africa</p>
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: "Address", value: "14 Commerce Street\nBirmingham, B1 1BB" },
                { icon: Phone,  label: "Phone",   value: "+27 60 828 2746" },
                { icon: Mail,   label: "Email",   value: "cassiusrapau@gmail.com" },
                { icon: Globe,  label: "Hours",   value: "Mon–Fri: 9am–6pm\nSat: 10am–4pm" },
              ].map((c) => (
                <div key={c.label} className="p-5 bg-[#1A1A1A] flex gap-3.5">
                  <c.icon size={14} style={{ color: GOLD, marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p className="text-[9px] tracking-widest uppercase text-white/28 mb-1" style={{ fontFamily: BODY }}>{c.label}</p>
                    <p className="text-sm text-white/65 whitespace-pre-line leading-relaxed" style={{ fontFamily: BODY }}>{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social + WhatsApp */}
            <div className="flex flex-wrap gap-4 items-center">
              {([["Instagram", Instagram], ["Facebook", Facebook], ["YouTube", Youtube]] as [string, React.ComponentType<{ size: number }>][]).map(([name, Icon]) => (
                <a
                  key={name}
                  href="#"
                  className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-white/35 hover:text-white transition-colors"
                  style={{ fontFamily: BODY }}
                >
                  <Icon size={15} /> {name}
                </a>
              ))}
              <button
                className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest uppercase font-semibold text-white"
                style={{ backgroundColor: "#25D366", fontFamily: BODY }}
              >
                WhatsApp Us
              </button>
            </div>

            {/* FAQ */}
            <div>
              <p className="text-xl font-black uppercase text-white mb-4" style={{ fontFamily: DISPLAY }}>FAQ</p>
              <div className="space-y-px">
                {faqs.map((f, i) => (
                  <div key={i} className="bg-[#1A1A1A]">
                    <button
                      className="w-full flex items-center justify-between p-5 text-left"
                      onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                    >
                      <span className="text-sm text-white/75 font-medium pr-4 leading-snug" style={{ fontFamily: BODY }}>{f.q}</span>
                      <ChevronDown
                        size={13}
                        className={`flex-shrink-0 transition-transform ${activeAccordion === i ? "rotate-180" : ""}`}
                        style={{ color: activeAccordion === i ? GOLD : "rgba(255,255,255,0.28)" }}
                      />
                    </button>
                    {activeAccordion === i && (
                      <div className="px-5 pb-5">
                        <p className="text-white/38 text-sm leading-relaxed border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.06)", fontFamily: BODY }}>
                          {f.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ nav }: { nav: (p: Page) => void }) {
  const [email, setEmail] = useState("")

  return (
    <footer className="bg-[#080808] border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div
          className="grid grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          {/* Brand */}
          <div className="col-span-2">
            <button onClick={() => nav("home")} className="flex flex-col items-start leading-none mb-5">
              <span className="text-2xl font-black tracking-widest uppercase" style={{ fontFamily: DISPLAY, color: "#F5F5F0" }}>CONCEPT</span>
              <span className="text-[10px] tracking-[0.35em] uppercase font-medium" style={{ color: GOLD, fontFamily: BODY }}>BRAND</span>
            </button>
            <p className="text-white/28 text-xs leading-relaxed max-w-xs" style={{ fontFamily: BODY }}>
              Premium fashion apparel and custom branding solutions. Building brands that last since 2018.
            </p>
            <div className="flex gap-4 mt-6">
              {([Instagram, Twitter, Facebook, Youtube] as React.ComponentType<{ size: number, className: string }>[]).map((Icon, i) => (
                <a key={i} href="#" className="text-white/18 hover:text-white transition-colors">
                  <Icon size={16} className="" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5 font-medium" style={{ fontFamily: BODY }}>Navigation</p>
            <div className="space-y-3">
              {(["home", "shop", "branding", "gallery", "about"] as Page[]).map((p) => (
                <button
                  key={p}
                  onClick={() => nav(p)}
                  className="block text-xs capitalize text-white/38 hover:text-white transition-colors tracking-wide"
                  style={{ fontFamily: BODY }}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5 font-medium" style={{ fontFamily: BODY }}>Services</p>
            <div className="space-y-3">
              {["DTF Printing", "Embroidery", "Corporate Wear", "Sports Kits", "School Uniforms", "Merchandise"].map((s) => (
                <button
                  key={s}
                  onClick={() => nav("branding")}
                  className="block text-xs text-white/38 hover:text-white transition-colors tracking-wide"
                  style={{ fontFamily: BODY }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5 font-medium" style={{ fontFamily: BODY }}>Newsletter</p>
            <p className="text-white/28 text-xs mb-4 leading-relaxed" style={{ fontFamily: BODY }}>New collections and offers, direct to your inbox.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2.5 text-xs text-white placeholder-white/18 focus:outline-none min-w-0 bg-[#1A1A1A] border border-r-0"
                style={{ borderColor: "rgba(255,255,255,0.08)", fontFamily: BODY }}
              />
              <button
                className="px-4 py-2.5 flex items-center justify-center"
                style={{ backgroundColor: GOLD }}
              >
                <ArrowRight size={13} color="#0D0D0D" />
              </button>
            </div>

            <div className="mt-7 space-y-2.5">
              {[
                { icon: MapPin, text: "Sehlakong, Limpopo, South Africa" },
                { icon: Mail,   text: "cassiusrapau@gmail.com" },
                { icon: Phone,  text: "+27 60 828 2746" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon size={11} style={{ color: "rgba(255,255,255,0.18)", flexShrink: 0 }} />
                  <span className="text-[11px] text-white/28 tracking-wide" style={{ fontFamily: BODY }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
          <p className="text-white/18 text-[11px] tracking-wide" style={{ fontFamily: BODY }}>© 2025 Concept Brand. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-white/18 hover:text-white/42 text-[11px] tracking-wide transition-colors" style={{ fontFamily: BODY }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App (Root) ───────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0])
  const [selectedSize, setSelectedSize] = useState("")
  const [qty, setQty] = useState(1)
  const [galleryFilter, setGalleryFilter] = useState("All")
  const [shopFilter, setShopFilter] = useState("All")
  const [accordion, setAccordion] = useState<number | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => { window.scrollTo({ top: 0 }) }, [page])

  const nav = (p: Page) => { setPage(p); setMenuOpen(false) }

  const viewProduct = (p: Product) => { setSelectedProduct(p); setSelectedSize(""); nav("product") }

  const navLinks: { label: string; page: Page }[] = [
    { label: "Home",     page: "home" },
    { label: "Shop",     page: "shop" },
    { label: "Branding", page: "branding" },
    { label: "Gallery",  page: "gallery" },
    { label: "About",    page: "about" },
    { label: "Contact",  page: "contact" },
  ]

  const navDark = scrolled || page !== "home"

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F0]" style={{ fontFamily: BODY }}>

      {/* ── Navigation ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navDark ? "border-b" : ""}`}
        style={{
          backgroundColor: navDark ? "rgba(13,13,13,0.97)" : "transparent",
          borderColor: "rgba(255,255,255,0.05)",
          backdropFilter: navDark ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button onClick={() => nav("home")} className="flex flex-col items-start leading-none gap-0">
              <span className="text-xl lg:text-2xl font-black tracking-widest uppercase" style={{ fontFamily: DISPLAY, color: "#F5F5F0" }}>CONCEPT</span>
              <span className="text-[9px] tracking-[0.38em] uppercase font-medium -mt-0.5" style={{ color: GOLD, fontFamily: BODY }}>BRAND</span>
            </button>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((l) => (
                <button
                  key={l.page}
                  onClick={() => nav(l.page)}
                  className="text-[11px] tracking-widest uppercase transition-colors duration-200 font-medium"
                  style={{ color: page === l.page ? "#F5F5F0" : "rgba(245,245,240,0.42)", fontFamily: BODY }}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => nav("contact")}
                className="hidden lg:inline-flex items-center px-5 py-2.5 text-[11px] tracking-widest uppercase font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }}
              >
                Get Quote
              </button>
              <button onClick={() => nav("shop")} className="transition-colors" style={{ color: "rgba(245,245,240,0.55)" }}>
                <ShoppingBag size={19} />
              </button>
              <button
                className="lg:hidden transition-colors"
                style={{ color: "rgba(245,245,240,0.8)" }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 border-t py-7 px-6 space-y-5" style={{ backgroundColor: "#0D0D0D", borderColor: "rgba(255,255,255,0.06)" }}>
            {navLinks.map((l) => (
              <button
                key={l.page}
                onClick={() => nav(l.page)}
                className="block text-[11px] tracking-widest uppercase transition-colors font-medium"
                style={{ color: "rgba(245,245,240,0.55)", fontFamily: BODY }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => nav("contact")}
              className="block w-full py-3.5 text-[11px] tracking-widest uppercase font-semibold mt-2"
              style={{ backgroundColor: GOLD, color: "#0D0D0D", fontFamily: BODY }}
            >
              Get Quote
            </button>
          </div>
        )}
      </nav>

      {/* ── Page content ── */}
      {page === "home"     && <HomePage    nav={nav} wishlist={wishlist} setWishlist={setWishlist} viewProduct={viewProduct} />}
      {page === "shop"     && <ShopPage    nav={nav} wishlist={wishlist} setWishlist={setWishlist} shopFilter={shopFilter} setShopFilter={setShopFilter} viewProduct={viewProduct} />}
      {page === "product"  && <ProductPage product={selectedProduct} nav={nav} selectedSize={selectedSize} setSelectedSize={setSelectedSize} qty={qty} setQty={setQty} />}
      {page === "branding" && <BrandingPage nav={nav} />}
      {page === "gallery"  && <GalleryPage activeFilter={galleryFilter} setActiveFilter={setGalleryFilter} />}
      {page === "about"    && <AboutPage nav={nav} />}
      {page === "contact"  && <ContactPage activeAccordion={accordion} setActiveAccordion={setAccordion} />}

      <Footer nav={nav} />
    </div>
  )
}







