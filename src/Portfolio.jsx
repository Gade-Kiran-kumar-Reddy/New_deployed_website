import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope, FaLinkedin, FaGithub, FaJava, FaPython, FaDatabase, FaBug, FaCogs, FaAws, FaComments, FaMoon, FaSun
} from 'react-icons/fa';
import {
  SiSelenium, SiPostman, SiJenkins, SiApacheairflow, SiMysql, SiSqlite, SiJavascript
} from 'react-icons/si';
import { Typewriter } from 'react-simple-typewriter';
import emailjs from 'emailjs-com';

const allProjects = [
  {
    title: 'Selenium Framework',
    description: 'Built a robust automation framework using Selenium WebDriver, TestNG, and Maven.',
    category: 'QA',
    color: 'text-indigo-400',
  },
  {
    title: 'API Test Suite',
    description: 'Automated REST API tests using Postman and Karate for banking and healthcare apps.',
    category: 'QA',
    color: 'text-pink-400',
  },
  {
    title: 'Data Pipeline with Airflow',
    description: 'Created an ETL pipeline using Apache Airflow and Python for data transformation and loading.',
    category: 'Data',
    color: 'text-green-400',
  },
];

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, type: 'spring', stiffness: 120 },
  }),
};

const skills = [
  { icon: <FaJava />, name: 'Java' },
  { icon: <FaPython />, name: 'Python' },
  { icon: <FaBug />, name: 'Selenium' },
  { icon: <SiPostman />, name: 'Postman' },
  { icon: <SiJenkins />, name: 'Jenkins' },
  { icon: <FaAws />, name: 'AWS' },
  { icon: <SiApacheairflow />, name: 'Airflow' },
  { icon: <FaDatabase />, name: 'SQL' },
  { icon: <SiMysql />, name: 'MySQL' },
  { icon: <SiSqlite />, name: 'SQLite' },
  { icon: <SiJavascript />, name: 'JavaScript' },
  { icon: <FaCogs />, name: 'Automation' },
];

const categories = ['All', ...new Set(allProjects.map((p) => p.category))];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const theme = isDarkMode
    ? {
        bg: 'bg-[#0f0f10]',
        section: 'bg-[#1a1a1d]',
        text: 'text-white',
        subtext: 'text-gray-300',
        border: 'border-gray-800',
        navText: 'text-gray-400',
        projectCard: 'bg-[#262626]',
        buttonBg: 'bg-green-400 text-black hover:bg-green-500',
        linkHover: 'hover:text-green-400',
      }
    : {
        bg: 'bg-white',
        section: 'bg-gray-100',
        text: 'text-black',
        subtext: 'text-gray-700',
        border: 'border-gray-300',
        navText: 'text-gray-600',
        projectCard: 'bg-white border border-gray-200',
        buttonBg: 'bg-green-500 text-white hover:bg-green-600',
        linkHover: 'hover:text-green-600',
      };

  const filteredProjects = filter === 'All' ? allProjects : allProjects.filter((p) => p.category === filter);

  const sendEmail = async (e) => {
    e.preventDefault();
    const form = e.target;
    const timestamp = new Date().toISOString();
    const pageURL = window.location.href;

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      timestamp,
      pageURL,
    };

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_USER_ID');

    try {
      await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('Google Sheet submission failed:', err);
    }

    form.reset();
    setThankYou(true);
    setTimeout(() => setThankYou(false), 4000);
  };

  return (
    <motion.div className={`min-h-screen ${theme.bg} ${theme.text} font-mono scroll-smooth relative transition-all duration-500`}>
      <nav className={`fixed top-0 left-0 w-full ${theme.bg} ${theme.border} border-b z-50 py-3`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4 text-sm">
          <div className="flex gap-6">
            <a href="#about" className={`transition-colors ${theme.navText} ${theme.linkHover}`}>About</a>
            <a href="#skills" className={`transition-colors ${theme.navText} ${theme.linkHover}`}>Skills</a>
            <a href="#projects" className={`transition-colors ${theme.navText} ${theme.linkHover}`}>Projects</a>
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-xl p-1">
            {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-800" />}
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto relative p-6 pt-24">
        <motion.div className="text-center pt-10 mb-16" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="text-4xl font-bold text-green-400">
            Hello, I'm <span className={theme.text}><Typewriter words={["Kiran Kumar Reddy Gade", "QA Engineer", "Data Enthusiast"]} loop={true} /></span>
          </h1>
          <p className={`${theme.subtext} mt-2 text-lg`}>
            QA Automation Engineer | 7+ Years Experience | Master's in Data Science (UK)
          </p>
          <motion.a href="/resume/Kiran_Updated_Resume.pdf" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} className="inline-block mt-4 px-6 py-2 border border-green-400 text-green-400 rounded-full hover:bg-green-400 hover:text-black transition">
            Download Resume
          </motion.a>
        </motion.div>

        <section id="about" className={`${theme.section} p-6 mb-10 rounded-lg shadow-md`}>
          <h2 className="text-2xl font-semibold mb-4 text-green-400">About Me</h2>
          <p className={`${theme.subtext} text-sm leading-6`}>
            I am a passionate QA Automation Engineer with over 7 years of experience in software testing and automation.
            Currently pursuing a Master's in Data Science in the UK, I enjoy blending testing expertise with data analytics and automation skills to create scalable and intelligent systems.
            I thrive in fast-paced environments and am always looking to solve problems creatively with clean code and meaningful insights.
          </p>
        </section>

        <section id="skills" className={`${theme.section} p-6 mb-10 rounded-lg shadow-md`}>
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Skills</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 text-center text-2xl">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={skillVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center gap-1"
              >
                {skill.icon}
                <span className="text-xs mt-1">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className={`${theme.section} p-6 mb-10 rounded-lg shadow-md`}>
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Projects</h2>
          <div className="flex gap-3 mb-4 flex-wrap">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1 border rounded-full text-sm font-medium transition duration-200 ease-in-out transform ${
                  filter === cat ? 'bg-green-400 text-black scale-105' : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div key={idx} className={`${theme.projectCard} p-4 rounded-lg hover:shadow-lg transition-transform transform hover:scale-105`} whileHover={{ y: -4 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                  <h3 className={`text-xl font-semibold ${project.color}`}>{project.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">{project.description}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <footer className={`text-center mt-16 ${theme.subtext}`}>
          <div className="space-y-3 text-sm">
            <p className="flex justify-center items-center gap-2"><FaEnvelope className="text-red-400" /> gkirankumar595@gmail.com</p>
            <p className="flex justify-center items-center gap-2"><FaLinkedin className="text-blue-500" />
              <a href="https://www.linkedin.com/in/kiran-kumar-reddy-gade-6b7267329/" target="_blank" rel="noopener noreferrer" className="hover:underline text-green-400">linkedin.com/in/kiran-kumar-reddy-gade</a>
            </p>
            <p className="flex justify-center items-center gap-2"><FaGithub className="text-black" />
              <a href="https://github.com/kirankumargade" target="_blank" rel="noopener noreferrer" className="hover:underline text-green-400">github.com/kirankumargade</a>
            </p>
          </div>
          <div className="mt-6">© {new Date().getFullYear()} Kiran Kumar Reddy Gade</div>
        </footer>

        <div className="fixed bottom-6 right-6 z-50">
          <button onClick={() => setChatOpen(!chatOpen)} className="bg-green-400 p-3 rounded-full shadow-lg hover:bg-green-500 transition">
            <FaComments className="text-black text-xl" />
          </button>
        </div>

        <AnimatePresence>
          {chatOpen && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.3 }} className={`fixed bottom-20 right-6 ${theme.section} ${theme.border} rounded-lg p-4 w-72 z-50 shadow-lg`}>
              {thankYou ? (
                <div className="text-green-400 text-sm text-center">Thank you! Your message was sent.</div>
              ) : (
                <form onSubmit={sendEmail} className="space-y-3">
                  <input type="text" name="name" placeholder="Your Name" required className={`w-full p-2 rounded ${theme.bg} ${theme.border} ${theme.text} text-sm`} />
                  <input type="email" name="email" placeholder="Your Email" required className={`w-full p-2 rounded ${theme.bg} ${theme.border} ${theme.text} text-sm`} />
                  <textarea name="message" placeholder="Your Message" rows="3" required className={`w-full p-2 rounded ${theme.bg} ${theme.border} ${theme.text} text-sm`} />
                  <button type="submit" className={`${theme.buttonBg} px-4 py-1.5 rounded transition text-sm`}>
                    Send
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
