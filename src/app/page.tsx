"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone, MapPin, MessageSquare, XCircle } from "lucide-react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";

type Comment = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
  rating: number | null;
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) {
      alert("Tolong ketik pesan terlebih dahulu!");
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Gagal mengirim pesan.");

      const data = await res.json();
      setReply(data.reply);
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setReply("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => setComments(data.comments || []));
  }, []);

  const skills = [
    { name: 'CSS', description: 'Modern layouts and responsive styling with clean design.' },
    { name: 'JavaScript', description: 'Interactive logic and dynamic behavior for the web.' },
    { name: 'React', description: 'Component-based library for building modern UIs.' },
    { name: 'Tailwind CSS', description: 'Utility-first framework for fast and consistent styling.' },
    { name: 'Next.js', description: 'Full-stack React framework with routing and performance optimization.' },
    { name: 'Figma', description: 'Collaborative UI/UX design tool for creating prototypes and interfaces.' },
  ];

  const projects = [
    {
      title: "Website biodata diri",
      desc: "Membuat design kemasan produk",
      image: "/p.jpg",
    },
    {
      title: "Project Design UI/UX",
      desc: "Desain aplikasi sebuah toko makanan",
      image: "/fig.png",
      demoUrl: "https://www.figma.com/design/3Z6rjG2S0rOmMVvIu4gBvQ/food-app?fuid=1438070496690981499"
    },
  ];

  const handleConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <main className={`bg-gray-50 text-gray-900 font-sans transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-gray-100' : ''}`}>   
      {/* Navigation */}
      <nav className="bg-gray-50/90 dark:bg-gray-800/80 backdrop-blur-md px-6 py-4 shadow-md sticky top-0 z-50 flex justify-between items-center">
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-md text-sm transition mr-4"
  >
    {darkMode ? "☀️ Light" : "🌙 Dark"}
  </button>
  <ul className="flex space-x-6 text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 ml-auto">
    {["home", "skills", "portfolio", "contact"].map((section) => (
      <li key={section}>
        <a
          href={`#${section}`}
          className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </a>
      </li>
    ))}
  </ul>
</nav>

<motion.section
  id="home"
  className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 py-20 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {/* Teks di kiri */}
  <div className="md:w-1/2">
    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
      Hallo, I&apos;m Taha Yaasin{" "}
      <motion.span
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="inline-block"
      >
        👋
      </motion.span>
    </h1>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-lg md:text-xl text-white/90 mb-4"
    >
      </motion.p>

    <p className="text-base md:text-lg text-white/80 mb-6">
      Passionate about crafting sleek, intuitive, and high-performing web experiences. I specialize in creating beautiful, responsive interfaces that focus on the user’s needs, using cutting-edge technologies to bring ideas to life.
    </p>

    <div className="flex flex-wrap gap-4 mb-6">
      <a
        href="/sin.docx"
        target="_blank"
        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl shadow transition"
      >
        My CV
      </a>
      <a
        href="#portfolio"
        className="bg-white text-gray-800 font-medium px-6 py-2 rounded-xl shadow hover:bg-gray-100 transition"
      >
        See Projects
      </a>
    </div>

    <div className="flex items-center gap-6 mt-6">
      <a href="#" className="hover:text-gray-500 transition">
        <Github />
      </a>
      <a href="#" className="hover:text-gray-500 transition">
        <Linkedin />
      </a>
    </div>
  </div>

  {/* Gambar di kanan */}
  <div className="md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0 md:mr-12">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-96 h-96 shadow-2xl border-4 border-white/10 rounded-2xl"
    >
      <Image
        src="/sin.jpg"
        alt="Taha Yaasin"
        fill
        className="rounded-2xl object-cover"
      />
    </motion.div>
  </div>
</motion.section>


      {/* Skills Section */}
      <motion.section 
        id="skills"
        className="min-h-screen px-6 py-20 bg-gray-800 text-gray-100 transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-10 text-center tracking-tight">
          🛠 My Skills & Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map(({ name, description }) => (
            <Tilt
              key={name}
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              glareEnable
              glareColor="lightgray"
              className="hover:shadow-lg transition"
            >
              <div className="bg-white/10 backdrop-blur-md text-white p-5 rounded-2xl shadow-inner hover:scale-105 transition-transform duration-300">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span role="img" aria-label="tool-icon">⚙️</span> {name}
                </h3>
                <p className="text-sm text-white/80">{description}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </motion.section>

      {/* Portfolio Section */}
      <motion.section
        id="portfolio"
        className="min-h-screen px-6 py-20 bg-gradient-to-r from-gray-700 to-gray-500 transition text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-10 text-center animate__animated animate__fadeIn">
          📁 Portofolio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <Tilt
              key={idx}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              glareEnable
              glareColor="lightgray"
              className="w-full"
            >
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-300">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {project.desc}
                </p>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="rounded-lg w-full h-48 object-cover transition-transform hover:scale-105"
                  />
                </a>
                <div className="mt-4 text-center">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition transform hover:scale-110"
                  >
                    🔗 Live Demo
                  </a>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </motion.section>

      {/* Contact & Comments */}
      <motion.section
        id="contact"
        className="min-h-screen px-6 py-20 bg-gradient-to-r from-gray-700 to-gray-500 transition text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
      <h2 className="text-3xl font-bold mb-10 text-center animate__animated animate__fadeIn">📬 Get in Touch</h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
          const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
          const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

          if (!name || !email || !message || rating === 0) {
            alert("Semua kolom dan rating wajib diisi!");
            return;
          }

          const data = { name, email, message, rating };

          try {
            const res = await fetch("/api/comments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Gagal menyimpan komentar");

            handleConfetti();
            form.reset();
            setRating(0);
            alert("Komentar berhasil dikirim!");

            const updated = await fetch("/api/comments");
            const { comments: newComments, averageRating } = await updated.json();
            setComments(newComments);
            setAvgRating(averageRating);
          } catch (err) {
            console.error("Error submitting comment:", err);
            alert("Gagal mengirim komentar. Silakan coba lagi.");
          }
        }}
        className="space-y-6"
      >
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          required
          className="w-full px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-300 shadow-md focus:ring-2 focus:ring-gray-500"
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="w-full px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-300 shadow-md focus:ring-2 focus:ring-gray-500"
        />
        <textarea
          name="message"
          rows={5}
          placeholder="Your Message"
          required
          className="w-full px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-300 shadow-md focus:ring-2 focus:ring-gray-500"
        />

        <div className="text-center">
          <p className="text-gray-800 dark:text-gray-200 mb-2">Beri Rating:</p>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`Beri rating ${star} bintang`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className={`text-4xl transition duration-200 ease-in-out ${
                  (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-600 hover:bg-gray-500 text-white font-semibold px-6 py-3 rounded-full shadow-xl transition-transform transform hover:scale-105"
        >
          ✉️ Kirim Pesan
        </button>
      </form>

      {comments.length > 0 && (
        <div className="mt-10 space-y-6">
          <h3 className="text-2xl font-semibold mb-4">💬 Comments</h3>
          <p className="text-center text-white-600 dark:text-gray-300">
            ⭐ Average Rating: {avgRating.toFixed(1)} / 5
          </p>
          {comments.map((comment, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {comment.name}{" "}
                <span className="text-sm text-gray-500">({new Date(comment.createdAt).toLocaleString()})</span>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{comment.message}</p>
              {comment.rating !== null && <p className="text-yellow-500 mt-2">⭐ {comment.rating} / 5</p>}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => setIsChatVisible(!isChatVisible)}
          className="bg-gray-600 hover:bg-gray-500 text-white px-8 py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-2 focus:outline-none focus:ring-4 focus:ring-gray-400"
        >
          {isChatVisible ? (
            <span className="flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Close Chatbot
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Open Chatbot
            </span>
          )}
        </button>
      </div>

      {isChatVisible && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-2xl font-semibold mb-4">🤖 Chatbot</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-300 shadow-md focus:ring-2 focus:ring-gray-500"
              placeholder="Tulis sesuatu..."
            />
            <button
              onClick={sendMessage}
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-full transition-all"
            >
              Kirim ke Bot
            </button>

            {reply && (
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow text-gray-800 dark:text-gray-100">
                <strong>Bot:</strong> {reply}
              </div>
            )}
          </div>
        </div>
      )}
      </motion.section>

      <motion.div
        className="text-center mt-10 text-sm text-gray-700 dark:text-gray-300 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="flex justify-center items-center gap-3">
          <Mail className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors duration-300" />
          <span className="text-lg font-medium">Email:</span>{" "}
          <a
            href="mailto:tahaayasiin@email.com"
            className="underline text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-all"
          >
            Tahaa@email.com
          </a>
        </p>
        <p className="flex justify-center items-center gap-3">
          <Phone className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors duration-300" />
          <span className="text-lg font-medium">Phone:</span>
          <span className="font-semibold text-gray-600">+62 811-5525-6521</span>
        </p>
        <p className="flex justify-center items-center gap-3">
          <MapPin className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors duration-300" />
          <span className="text-lg font-medium">Location:</span>
          <span className="font-semibold text-gray-600">Sumedang, Indonesia</span>
        </p>
      </motion.div>
    </main>
  );
}
