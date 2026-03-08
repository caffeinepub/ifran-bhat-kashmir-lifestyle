import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  BookOpen,
  Camera,
  CheckCircle,
  ChevronDown,
  ExternalLink,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  Play,
  Send,
  Twitter,
  Video,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { BlogPost } from "./backend.d";
import { useActor } from "./hooks/useActor";
import {
  useGetAllBlogPosts,
  useSubmitContactMessage,
} from "./hooks/useQueries";

// ==========================================
// STATIC DATA
// ==========================================

const STATIC_BLOG_POSTS: BlogPost[] = [
  {
    id: BigInt(1),
    title: "The Lost Art of Kashmiri Walnut Carving",
    content:
      "Deep in the lanes of Anantnag, master artisans preserve a centuries-old tradition...",
    excerpt:
      "Deep in the lanes of Anantnag, master artisans preserve a centuries-old tradition of hand-carving intricate patterns into walnut wood — a craft that tells the story of Kashmir's soul.",
    date: "March 2, 2026",
    tags: ["Culture", "Craft", "Heritage"],
    isVlog: false,
    imageUrl: "/assets/generated/kashmir-blog-1.dim_800x500.jpg",
    category: "Culture",
  },
  {
    id: BigInt(2),
    title: "Morning Rituals: The Samovar & the Soul of Noon Chai",
    content:
      "There is no morning in Kashmir without the warmth of sheer chai...",
    excerpt:
      "There is no morning in Kashmir without the warmth of sheer chai — the pale pink brew that carries the weight of generations, poured from a copper samovar as the mountains wake.",
    date: "February 18, 2026",
    tags: ["Lifestyle", "Food", "Daily Life"],
    isVlog: false,
    imageUrl: "/assets/generated/kashmir-blog-2.dim_800x500.jpg",
    category: "Lifestyle",
  },
];

const GALLERY_ITEMS = [
  {
    id: 1,
    src: "/assets/generated/kashmir-gallery-1.dim_800x600.jpg",
    title: "Dal Lake at Golden Hour",
    type: "photo",
    desc: "The shimmering waters of Dal Lake as dusk paints the sky over Srinagar.",
  },
  {
    id: 2,
    src: "/assets/generated/kashmir-gallery-2.dim_800x600.jpg",
    title: "The Grand Wazwan",
    type: "photo",
    desc: "A traditional 36-course feast — the pinnacle of Kashmiri culinary tradition.",
  },
  {
    id: 3,
    src: "/assets/generated/kashmir-gallery-3.dim_800x600.jpg",
    title: "Saffron Season, Pampore",
    type: "photo",
    desc: "The fleeting purple bloom of crocus fields that yield the world's finest saffron.",
  },
  {
    id: 4,
    src: "/assets/generated/kashmir-gallery-4.dim_800x600.jpg",
    title: "Anantnag from Above",
    type: "photo",
    desc: "An aerial perspective of South Kashmir's cultural heart, surrounded by orchards.",
  },
  {
    id: 5,
    src: "/assets/generated/kashmir-gallery-1.dim_800x600.jpg",
    title: "A Day on Dal Lake",
    type: "video",
    desc: "Follow a day of life on the houseboats of Dal Lake — from dawn fishing to evening.",
  },
  {
    id: 6,
    src: "/assets/generated/kashmir-gallery-3.dim_800x600.jpg",
    title: "Harvesting Saffron at Sunrise",
    type: "video",
    desc: "The annual saffron harvest — one of the most delicate agricultural rituals on earth.",
  },
];

// ==========================================
// NAVIGATION
// ==========================================

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-kashmir-deep/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("#home")}
          className="font-display text-xl font-semibold text-white tracking-wide hover:text-kashmir-gold transition-colors"
          data-ocid="nav.link"
        >
          Ifran Bhat
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="font-body text-sm font-medium text-white/80 hover:text-white tracking-widest uppercase transition-colors relative group"
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-kashmir-terracotta group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-kashmir-deep/95 backdrop-blur-lg border-t border-white/10"
          >
            <ul className="flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="block px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 font-body tracking-widest uppercase text-sm transition-colors"
                    data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ==========================================
// HERO SECTION
// ==========================================

function HeroSection() {
  const scrollToGallery = () => {
    const el = document.querySelector("#gallery");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/kashmir-hero.dim_1600x900.jpg"
          alt="Kashmir Himalayas"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-kashmir-gold mb-6 flex items-center justify-center gap-2">
            <MapPin size={12} />
            Lifestyle Creator · Anantnag, J&K
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Living the
          <span className="block text-kashmir-gold italic">Kashmiri Dream</span>
          <span className="block text-3xl sm:text-4xl md:text-5xl font-normal opacity-90 mt-2">
            The Journey of Ifran Bhat
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="font-body text-lg text-white/75 mb-10 max-w-xl mx-auto"
        >
          Exploring life through the lens of South Kashmir
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          <Button
            onClick={scrollToGallery}
            data-ocid="hero.primary_button"
            className="bg-kashmir-terracotta hover:bg-kashmir-terracotta/90 text-white font-body tracking-widest uppercase text-sm px-10 py-6 rounded-none transition-all hover:scale-105 shadow-lg"
          >
            Explore My World
          </Button>
        </motion.div>
      </div>

      {/* Scroll Arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}

// ==========================================
// ABOUT SECTION
// ==========================================

function AboutSection() {
  return (
    <section
      id="about"
      data-ocid="about.section"
      className="py-24 lg:py-32 bg-kashmir-cream overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative offset border */}
              <div className="absolute -bottom-5 -right-5 w-full h-full border-2 border-kashmir-terracotta/40 rounded-lg" />
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-kashmir-slate/10 rounded-lg" />
              <img
                src="/assets/generated/kashmir-about.dim_600x700.jpg"
                alt="Ifran Bhat in Kashmir"
                className="relative z-10 w-full h-auto rounded-lg object-cover shadow-2xl"
              />
            </div>

            {/* Stats callouts */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-6 -left-6 z-20 bg-white shadow-xl p-5 rounded-lg border border-border"
            >
              <p className="font-display text-3xl font-bold text-kashmir-terracotta">
                10+
              </p>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mt-1">
                Years Exploring
                <br />
                Kashmir
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="absolute -bottom-6 -left-6 z-20 bg-kashmir-deep text-white shadow-xl p-5 rounded-lg"
            >
              <p className="font-display text-3xl font-bold text-kashmir-gold">
                500+
              </p>
              <p className="font-body text-xs text-white/70 uppercase tracking-widest mt-1">
                Stories
                <br />
                Captured
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-kashmir-terracotta mb-4 font-medium">
              About Me
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-8 leading-tight">
              Rooted in the Valleys of South Kashmir
            </h2>

            <div className="space-y-5 font-body text-muted-foreground leading-relaxed">
              <p>
                I grew up in Anantnag — a city the ancients called
                Islamabad-e-Kashmir — nestled between the Jhelum River and the
                foothills of the great Himalayas. South Kashmir is not a
                postcard; it is a living, breathing tapestry of orchards,
                shrines, craftsmen, and stories that stretch back centuries.
              </p>
              <p>
                From boyhood, I was drawn to the way life happens here: the
                early morning fog rolling over walnut groves, the rhythmic
                tapping of weavers in their workshops, the communal warmth of a
                Wazwan feast shared under starlit skies. I began capturing these
                moments with a borrowed camera — and never stopped.
              </p>
              <p>
                Today I create content that celebrates the extraordinary
                ordinary of Kashmiri life. Not the headline Kashmir, but the
                everyday Kashmir — the spice vendors, the shepherd trails, the
                grandmother who still knows every herb on the hillside by name.
              </p>
              <p>
                This space is my journal, my gallery, and my tribute to the
                valley that shaped me. Welcome to my world.
              </p>
            </div>

            {/* Pull Quote */}
            <blockquote className="mt-10 border-l-4 border-kashmir-terracotta pl-6 py-2">
              <p className="font-display text-xl italic text-foreground/80 leading-relaxed">
                "Kashmir is not a place you visit. It is a feeling you carry —
                in the scent of pine after rain, in the silence of a valley at
                dusk."
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// GALLERY SECTION
// ==========================================

function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<"all" | "photo" | "video">(
    "all",
  );
  const [lightboxItem, setLightboxItem] = useState<
    (typeof GALLERY_ITEMS)[0] | null
  >(null);

  const filtered =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.type === activeFilter);

  return (
    <section
      id="gallery"
      data-ocid="gallery.section"
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-kashmir-terracotta mb-3 font-medium">
            Visual Stories
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground">
            Moments &amp; Memories
          </h2>
          <div className="w-16 h-1 bg-kashmir-terracotta mx-auto mt-6" />
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {(["all", "photo", "video"] as const).map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              data-ocid={`gallery.${filter}.tab`}
              className={`font-body text-xs tracking-widest uppercase px-6 py-3 rounded-none border transition-all ${
                activeFilter === filter
                  ? "bg-kashmir-slate text-white border-kashmir-slate"
                  : "bg-transparent text-muted-foreground border-border hover:border-kashmir-slate hover:text-kashmir-slate"
              }`}
            >
              {filter === "all" && "All"}
              {filter === "photo" && (
                <span className="flex items-center gap-2">
                  <Camera size={12} /> Photos
                </span>
              )}
              {filter === "video" && (
                <span className="flex items-center gap-2">
                  <Video size={12} /> Videos
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                data-ocid={`gallery.item.${index + 1}`}
                className={`relative group cursor-pointer overflow-hidden rounded-lg ${
                  index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
                onClick={() => setLightboxItem(item)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />

                  {/* Video Play Button */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                        <Play
                          size={24}
                          className="text-white ml-1"
                          fill="white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={`text-xs font-body tracking-wide ${
                        item.type === "video"
                          ? "bg-kashmir-terracotta text-white border-0"
                          : "bg-kashmir-deep/80 text-white border-0"
                      }`}
                    >
                      {item.type === "video" ? (
                        <span className="flex items-center gap-1">
                          <Video size={10} /> Video
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Camera size={10} /> Photo
                        </span>
                      )}
                    </Badge>
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-display text-white font-semibold text-lg">
                      {item.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!lightboxItem}
        onOpenChange={(open) => !open && setLightboxItem(null)}
      >
        <DialogContent
          className="max-w-3xl p-0 overflow-hidden bg-black border-0"
          data-ocid="gallery.dialog"
        >
          <DialogHeader className="absolute top-3 right-3 z-10">
            <DialogTitle className="sr-only">{lightboxItem?.title}</DialogTitle>
          </DialogHeader>
          {lightboxItem && (
            <div>
              <img
                src={lightboxItem.src}
                alt={lightboxItem.title}
                className="w-full object-contain max-h-[75vh]"
              />
              <div className="p-6 bg-kashmir-deep text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-kashmir-terracotta text-white border-0 text-xs font-body">
                    {lightboxItem.type === "video" ? "Video" : "Photo"}
                  </Badge>
                  <h3 className="font-display text-xl font-semibold">
                    {lightboxItem.title}
                  </h3>
                </div>
                <p className="font-body text-white/70 text-sm">
                  {lightboxItem.desc}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

// ==========================================
// BLOG SECTION
// ==========================================

function BlogCard({
  post,
  featured = false,
  index,
}: {
  post: BlogPost;
  featured?: boolean;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-ocid={`blog.item.${index + 1}`}
      className={`group cursor-pointer bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 ${
        featured ? "grid md:grid-cols-2 gap-0" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${featured ? "h-64 md:h-auto" : "h-52"}`}
      >
        <img
          src={
            post.imageUrl || "/assets/generated/kashmir-blog-1.dim_800x500.jpg"
          }
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            className={`font-body text-xs tracking-wide border-0 ${
              post.isVlog
                ? "bg-kashmir-terracotta text-white"
                : "bg-kashmir-slate text-white"
            }`}
          >
            {post.isVlog ? (
              <span className="flex items-center gap-1">
                <Video size={10} /> Vlog
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <BookOpen size={10} /> {post.category || "Blog"}
              </span>
            )}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 flex flex-col ${featured ? "justify-center" : ""}`}>
        <p className="font-body text-xs text-muted-foreground tracking-widest uppercase mb-3">
          {post.date}
        </p>
        <h3
          className={`font-display font-semibold text-foreground group-hover:text-kashmir-terracotta transition-colors leading-tight mb-3 ${
            featured ? "text-2xl" : "text-xl"
          }`}
        >
          {post.title}
        </h3>
        <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-body text-xs text-kashmir-slate bg-kashmir-slate/10 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="font-body text-xs tracking-widest uppercase text-kashmir-terracotta hover:text-kashmir-slate transition-colors flex items-center gap-2 mt-auto font-medium"
          data-ocid={`blog.read_more.button.${index + 1}`}
        >
          Read More <ExternalLink size={12} />
        </button>
      </div>
    </motion.article>
  );
}

function BlogSection() {
  const { data: backendPosts, isLoading } = useGetAllBlogPosts();

  const allPosts: BlogPost[] = (() => {
    if (backendPosts && backendPosts.length > 0) {
      return backendPosts;
    }
    return STATIC_BLOG_POSTS;
  })();

  const [featuredPost, ...restPosts] = allPosts;

  return (
    <section
      id="blog"
      data-ocid="blog.section"
      className="py-24 lg:py-32 bg-kashmir-cream"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-kashmir-terracotta mb-3 font-medium">
            Journal
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground">
            Stories from the Valley
          </h2>
          <div className="w-16 h-1 bg-kashmir-terracotta mx-auto mt-6" />
        </motion.div>

        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="space-y-8" data-ocid="blog.loading_state">
            <Skeleton className="w-full h-72 rounded-lg" />
            <div className="grid md:grid-cols-2 gap-8">
              <Skeleton className="w-full h-52 rounded-lg" />
              <Skeleton className="w-full h-52 rounded-lg" />
            </div>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-10">
                <BlogCard post={featuredPost} featured index={0} />
              </div>
            )}

            {/* Rest of Posts Grid */}
            {restPosts.length > 0 && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {restPosts.map((post, i) => (
                  <BlogCard
                    key={post.id.toString()}
                    post={post}
                    index={i + 1}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// ==========================================
// CONTACT SECTION
// ==========================================

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formState, setFormState] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const submitMutation = useSubmitContactMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("idle");
    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  const socialLinks = [
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com",
      ocid: "contact.instagram.link",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "https://youtube.com",
      ocid: "contact.youtube.link",
    },
    {
      icon: Twitter,
      label: "Twitter / X",
      href: "https://twitter.com",
      ocid: "contact.twitter.link",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://facebook.com",
      ocid: "contact.facebook.link",
    },
  ];

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-24 lg:py-32 bg-kashmir-deep text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-kashmir-gold mb-3 font-medium">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold">
            Let's Create Together
          </h2>
          <div className="w-16 h-1 bg-kashmir-terracotta mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display text-2xl font-semibold mb-6">
              Collaborations & Inquiries
            </h3>
            <p className="font-body text-white/70 leading-relaxed mb-4">
              Whether you're a brand looking to connect with the story of
              Kashmir, a fellow creator seeking collaboration, or simply someone
              who wants to share their own Kashmiri tale — I'd love to hear from
              you.
            </p>
            <p className="font-body text-white/70 leading-relaxed mb-10 flex items-center gap-2">
              <MapPin size={16} className="text-kashmir-gold flex-shrink-0" />
              Based in Anantnag, Jammu &amp; Kashmir, India
            </p>

            {/* Social Links */}
            <div>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-white/50 mb-5">
                Follow the Journey
              </p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map(({ icon: Icon, label, href, ocid }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid={ocid}
                    className="group flex items-center gap-3 px-5 py-3 border border-white/20 hover:border-kashmir-terracotta hover:bg-kashmir-terracotta/10 transition-all rounded-lg"
                  >
                    <Icon
                      size={18}
                      className="text-white/70 group-hover:text-kashmir-gold transition-colors"
                    />
                    <span className="font-body text-sm text-white/70 group-hover:text-white transition-colors">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Panel — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  data-ocid="contact.success_state"
                  className="flex flex-col items-center text-center py-16 px-8 border border-kashmir-gold/30 rounded-lg bg-kashmir-gold/5"
                >
                  <CheckCircle size={56} className="text-kashmir-gold mb-5" />
                  <h3 className="font-display text-2xl font-semibold mb-3">
                    Message Sent!
                  </h3>
                  <p className="font-body text-white/70 mb-6">
                    Thank you for reaching out. I'll get back to you from the
                    valleys of Anantnag soon.
                  </p>
                  <Button
                    onClick={() => setFormState("idle")}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                    data-ocid="contact.close_button"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-body text-xs tracking-widest uppercase text-white/60 mb-2 block"
                    >
                      Your Name
                    </label>
                    <Input
                      id="contact-name"
                      required
                      type="text"
                      placeholder="Ifran Bhat"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      data-ocid="contact.input"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-kashmir-gold rounded-none font-body"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-body text-xs tracking-widest uppercase text-white/60 mb-2 block"
                    >
                      Email Address
                    </label>
                    <Input
                      id="contact-email"
                      required
                      type="email"
                      placeholder="hello@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      data-ocid="contact.email.input"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-kashmir-gold rounded-none font-body"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="font-body text-xs tracking-widest uppercase text-white/60 mb-2 block"
                    >
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      required
                      placeholder="Tell me about your collaboration idea or project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={5}
                      data-ocid="contact.textarea"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-kashmir-gold rounded-none font-body resize-none"
                    />
                  </div>

                  {/* Error State */}
                  {formState === "error" && (
                    <div
                      data-ocid="contact.error_state"
                      className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/40 rounded text-red-300 font-body text-sm"
                    >
                      <AlertCircle size={18} className="flex-shrink-0" />
                      Something went wrong. Please try again later.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    data-ocid="contact.submit_button"
                    className="w-full bg-kashmir-terracotta hover:bg-kashmir-terracotta/90 text-white font-body tracking-widest uppercase rounded-none py-6 transition-all"
                  >
                    {submitMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send size={16} /> Send Message
                      </span>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// FOOTER
// ==========================================

function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white/70 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="font-display text-2xl font-semibold text-white mb-1">
              Ifran Bhat
            </p>
            <p className="font-body text-sm text-white/50">
              Lifestyle Creator · Anantnag, J&K
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap gap-6 justify-center">
            {["#home", "#about", "#gallery", "#blog", "#contact"].map(
              (href) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(href);
                  }}
                  className="font-body text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors"
                  data-ocid={`footer.${href.replace("#", "")}.link`}
                >
                  {href.replace("#", "")}
                </a>
              ),
            )}
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            © {year} Ifran Bhat. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/40">
            Built with <span className="text-kashmir-terracotta">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// MAIN APP
// ==========================================

function AppInitializer() {
  const { actor, isFetching } = useActor();

  useEffect(() => {
    if (actor && !isFetching) {
      actor.initializePosts().catch(() => {
        // Silently ignore if already initialized
      });
    }
  }, [actor, isFetching]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen">
      <AppInitializer />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
