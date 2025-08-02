const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-8 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-blue-700 text-lg font-semibold mb-4">About PharmaChain</h3>
            <p className="text-gray-600">
              Secure and transparent pharmaceutical supply chain tracking using blockchain technology.
              Ensuring authenticity and safety in medicine distribution.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-800 text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/track" className="text-gray-600 hover:text-blue-700 transition-colors">
                  Track Medicine
                </a>
              </li>
              <li>
                <a href="/verify" className="text-gray-600 hover:text-blue-700 transition-colors">
                  Verify Batch
                </a>
              </li>
              <li>
                <a href="/register" className="text-gray-600 hover:text-blue-700 transition-colors">
                  Register Company
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gray-800 text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Email: support@pharmachain.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Blockchain Street</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} PharmaChain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
