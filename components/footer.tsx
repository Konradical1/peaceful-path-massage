import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Peaceful Path Massage</h3>
            <p className="text-teal-100 mb-4">
              Providing therapeutic massage services to help you relax, rejuvenate, and restore your body and mind.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-teal-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-teal-200">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-teal-100 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-teal-100 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-teal-100 hover:text-white">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-teal-100 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#swedish" className="text-teal-100 hover:text-white">
                  Swedish Massage
                </Link>
              </li>
              <li>
                <Link href="/services#deep-tissue" className="text-teal-100 hover:text-white">
                  Deep Tissue Massage
                </Link>
              </li>
              <li>
                <Link href="/services#hot-stone" className="text-teal-100 hover:text-white">
                  Hot Stone Massage
                </Link>
              </li>
              <li>
                <Link href="/services#prenatal" className="text-teal-100 hover:text-white">
                  Prenatal Massage
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-teal-100">
              <p className="mb-2">123 Serenity Lane</p>
              <p className="mb-2">Relaxville, CA 90210</p>
              <p className="mb-2">
                <a href="tel:+15551234567" className="hover:text-white">
                  (555) 123-4567
                </a>
              </p>
              <p className="mb-2">
                <a href="mailto:info@peacefulpath.com" className="hover:text-white">
                  info@peacefulpath.com
                </a>
              </p>
            </address>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Hours</h4>
              <p className="text-teal-100">Mon-Sat: 9:00 AM - 7:00 PM</p>
              <p className="text-teal-100">Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-teal-800 text-center text-teal-100">
          <p>&copy; {new Date().getFullYear()} Peaceful Path Massage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
