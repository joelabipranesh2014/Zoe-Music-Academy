import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import FreeResources from './pages/FreeResources';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Cancellation from './pages/Cancellation';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/courses" element={<Layout><Courses /></Layout>} />
        <Route path="/courses/:id" element={<Layout><CourseDetail /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/free-resources" element={<Layout><FreeResources /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/refund" element={<Layout><Refund /></Layout>} />
        <Route path="/cancellation" element={<Layout><Cancellation /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
