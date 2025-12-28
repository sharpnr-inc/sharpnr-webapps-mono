function Footer(): React.JSX.Element {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Sharpnr
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              The all-in-one platform to grow your business.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Product
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-cyan-400">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-cyan-400">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-600 dark:text-gray-400 hover:text-cyan-400">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-400">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-400">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Sharpnr. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Add social media icons here */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;