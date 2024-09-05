import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, Moon, Home as HomeIcon, Menu, ChevronRight } from 'lucide-react';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [content, setContent] = useState('');
  const [content2, setContent2] = useState('');
  const [content3, setContent3] = useState('');
  const [content4, setContent4] = useState('');
  const [result, setResult] = useState('');
  const [result3, setResult3] = useState('');
  const [images, setImages] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleTheme = () => setDarkMode(!darkMode);

  const selectService = (service) => {
    setSelectedService(service);
    setSidebarOpen(false);
  };

  const goHome = () => {
    setSelectedService(null);
  };

  const imagegeneration = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/image', { content4 });
      const { data } = res.data.generatedImage;
      const imageUrls = data.output.map(item => item.tmp_url);
      setImages(imageUrls);
    } catch (error) {
      console.error('Error generating image:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSentimentAnalysis = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/sentiment', { content2 });
      setAnalysisResults({
        sentiment: res.data.sentimentText.sentiment,
        score: res.data.sentimentText.score,
        confidence: res.data.sentimentText.confidence
      });
    } catch (error) {
      console.error('Error performing sentiment analysis:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleGenerateContent = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/generate', { content });
      setResult(res.data.generatedText);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleGenerateContent3 = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/summarize', { content3 });
      setResult3(res.data.summarizedText);
    } catch (error) {
      console.error('Error summarizing content:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-black transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
    <div>       
      <nav className="bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 shadow-md backdrop-filter backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-300">AETHER AI</h1>
                <button
                  onClick={toggleTheme}
                  className="ml-4 p-2 rounded-md text-purple-600 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200"
                >
                  {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              </div>
              <div className="flex items-center">
                <button
                  onClick={goHome}
                  className="p-2 rounded-md text-purple-600 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200"
                >
                 <HomeIcon size={24} />
                </button>
                <button
                  onClick={toggleSidebar}
                  className="ml-4 p-2 rounded-md text-purple-600 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="relative">
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {!selectedService ? (
              <div className="text-center">
                <h2 className="mt-8 text-6xl font-extrabold text-purple-900 dark:text-purple-100">
                  Welcome to AETHER AI
                </h2>
                <p className="mt-6 text-2xl text-purple-600 dark:text-purple-300">
                Unlock the Future with Our Cutting-Edge AI Tools and Services
                </p>
                <div className="mt-8">
                  <button
                    onClick={toggleSidebar}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    AI TOOLS
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-purple-900 dark:text-purple-100">{selectedService}</h2>
                <ServiceCard
                  service={selectedService}
                  content={content}
                  content2={content2}
                  content3={content3}
                  content4={content4}
                  setContent={setContent}
                  setContent2={setContent2}
                  setContent3={setContent3}
                  setContent4={setContent4}
                  handleGenerateContent={handleGenerateContent}
                  handleSentimentAnalysis={handleSentimentAnalysis}
                  handleGenerateContent3={handleGenerateContent3}
                  imagegeneration={imagegeneration}
                  darkMode={darkMode}
                  loading={loading}  // Pass loading here
                />
                <ResultsSection
                  service={selectedService}
                  images={images}
                  analysisResults={analysisResults}
                  result={result}
                  result3={result3}
                  darkMode={darkMode}
                />
              </div>
            )}
          </main>

          <div
            className={`fixed inset-0 bg-purple-900 bg-opacity-75 transition-opacity ${
              sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleSidebar}
          ></div>

          <div
            className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-2xl transform transition-transform ${
              sidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="h-full flex flex-col py-6 bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-black shadow-xl">
              <div className="px-4 sm:px-6">
                <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100">AI Services</h2>
              </div>
              <div className="mt-6 flex-1 px-4 sm:px-6">
                <div className="space-y-4">
                  {['Image', 'Sentiment Analysis', 'Content', 'Summarization'].map((service) => (
                    <button
                      key={service}
                      onClick={() => selectService(service)}
                      className="w-full text-left px-6 py-3 border border-purple-300 dark:border-purple-600 rounded-full shadow-sm text-base font-medium text-purple-700 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md flex justify-between items-center"
                    >
                      <span>{service}</span>
                      <ChevronRight size={20} className="text-purple-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, content, content2, content3, content4, setContent, setContent2, setContent3, setContent4, handleGenerateContent, handleSentimentAnalysis, handleGenerateContent3, imagegeneration, darkMode, loading }) {
  const getContent = () => {
    switch (service) {
      case 'Image':
        return { value: content4, onChange: setContent4, placeholder: "Describe the image you want to generate...", action: imagegeneration };
      case 'Sentiment Analysis':
        return { value: content2, onChange: setContent2, placeholder: "Enter text for sentiment analysis...", action: handleSentimentAnalysis };
      case 'Content':
        return { value: content, onChange: setContent, placeholder: "Enter a prompt for content generation...", action: handleGenerateContent };
      case 'Summarization':
        return { value: content3, onChange: setContent3, placeholder: "Enter text to summarize...", action: handleGenerateContent3 };
      default:
        return {};
    }
  };

  const { value, onChange, placeholder, action } = getContent();

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden ${darkMode ? 'dark' : ''}`}>
      <div className="px-6 py-8">
        <textarea
          className="w-full p-4 rounded-lg border-2 border-purple-300 dark:border-purple-600 focus:border-purple-500 focus:ring focus:ring-purple-200 transition bg-white dark:bg-gray-700 text-purple-900 dark:text-purple-100 placeholder-purple-400 dark:placeholder-purple-300"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows="3"
        />
        <button
          onClick={action}
          className="mt-6 w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          {`Generate ${service}`}
        </button>
        {loading && (
  <div className="mt-4 flex justify-center">
    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)}

      </div>
    </div>
  );  
}

function ResultsSection({ service, images, analysisResults, result, result3, darkMode }) {
  if (!service) return null;

  return (
    <div className={`mt-12 ${darkMode ? 'dark' : ''}`}>
      {service === 'Image' && images.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-8">
            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-6">Generated Images</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {images.map((url, index) => (
                <img key={index} src={url} alt={`Generated Image ${index + 1}`} className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" />
              ))}
            </div>
          </div>
        </div>
      )}

      {service === 'Sentiment Analysis' && analysisResults && (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-8">
            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-6">Sentiment Analysis Results</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-purple-500 dark:text-purple-300">Sentiment</dt>
                <dd className="mt-1 text-lg font-semibold text-purple-900 dark:text-purple-100">{analysisResults.sentiment}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-purple-500 dark:text-purple-300">Score</dt>
                <dd className="mt-1 text-lg font-semibold text-purple-900 dark:text-purple-100">{analysisResults.score}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-purple-500 dark:text-purple-300">Confidence</dt>
                <dd className="mt-1 text-lg font-semibold text-purple-900 dark:text-purple-100">{analysisResults.confidence}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {service === 'Content' && result && (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-8">
            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-6">Generated Content</h3>
            <div className="prose prose-purple dark:prose-invert max-w-none">
              {result.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-purple-800 dark:text-purple-200">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {service === 'Summarization' && result3 && (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-8">
          <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-6">Summary :</h3>
            <div className="prose prose-purple dark:prose-invert max-w-none">
              {result3.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-purple-800 dark:text-purple-200">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
}