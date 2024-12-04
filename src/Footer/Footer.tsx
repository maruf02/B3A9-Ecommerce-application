import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
const Footer = () => {
  const todayYear = new Date().getFullYear();
  return (
    <div>
      <footer className="footer bg-[#1A4870] text-white flex flex-row justify-center items-center p-4 space-y-2 ">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            <img
              src="https://i.postimg.cc/sDKNspNc/creative-computer-logo-template-23-2149213537.jpg"
              alt=""
              className="w-14 h-14 rounded-2xl mx-auto"
            />

            <h2 className="text-3xl font-semibold  pb-2 text-center text-[#F9DBBA] ">
              SpeedeRex
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center text-center gap-3 h-fit  pl-5 ">
              <div className="flex items-center text-center space-x-2">
                <FaPhoneAlt className="text-blue-500" />
                <span>+123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-red-500" />
                <span>info@campershop.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-green-500" />
                <span>123 Camper St, City, Country</span>
              </div>
              <div className="p-0 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                <p className="mx-auto mb-6 leading-normal text-sm">
                  <button
                    onClick={() => {
                      const modal = document.getElementById(
                        "term&condition"
                      ) as HTMLDialogElement;
                      if (modal) {
                        modal.showModal();
                      }
                    }}
                    className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text pr-5"
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => {
                      const modal = document.getElementById(
                        "term&condition"
                      ) as HTMLDialogElement;
                      if (modal) {
                        modal.showModal();
                      }
                    }}
                    className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text"
                  >
                    Terms of Service
                  </button>
                </p>
              </div>
            </div>
            <h2 className="text-base  text-white pb-2 text-center">
              SpeedeRex © {todayYear} All Rights Reserved. Designed by SpeedeRex
              Ltd.
            </h2>
            <div className="flex flex-row gap-5 justify-center">
              <a
                href="https://www.facebook.com/programmingHero"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/programmingHero"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/programmingHero"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </footer>
      <dialog id="term&condition" className="modal">
        <div className="modal-box bg-white">
          <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Car Rental Policies</h1>

            {/* Terms and Conditions */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-2">
                Terms and Conditions
              </h2>
              <p className="mb-4">
                <strong>1. Rental Agreement:</strong> By renting a vehicle from
                [Your Company Name], you agree to the terms and conditions set
                forth in this agreement. The renter must hold a valid driver's
                license and meet the age requirements specified by [Your Company
                Name]. The rental period, payment terms, and vehicle return
                conditions are agreed upon at the time of rental.
              </p>
              <p className="mb-4">
                <strong>2. Vehicle Use:</strong> The rented vehicle must be used
                in a safe and lawful manner. The renter is responsible for any
                damage, loss, or theft of the vehicle during the rental period.
                The vehicle must not be used for illegal activities, racing, or
                towing. Only authorized drivers listed in the rental agreement
                are allowed to operate the vehicle.
              </p>
              <p className="mb-4">
                <strong>3. Insurance and Liability:</strong> The renter is
                responsible for any damage to the vehicle, as well as
                third-party injuries or property damage, unless covered by
                insurance. Additional insurance options may be available at the
                time of rental. The renter must report any accidents or damage
                to [Your Company Name].
              </p>
            </section>

            {/* Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Privacy Policy</h2>
              <p className="mb-4">
                [Your Company Name] is committed to protecting your privacy. We
                collect personal information necessary for providing our
                services, such as your name, contact details, and payment
                information. This information is used solely for the purposes of
                processing your rental and improving our services. We do not
                share your personal information with third parties without your
                consent, except as required by law.
              </p>
              <p className="mb-4">
                We use secure systems to protect your data and ensure that your
                personal information is handled with care. You have the right to
                access, update, or delete your personal information by
                contacting us directly.
              </p>
              <p className="mb-4">
                By using our services, you agree to the collection and use of
                your personal information in accordance with this Privacy
                Policy.
              </p>
            </section>

            {/* Terms of Service */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Terms of Service</h2>
              <p className="mb-4">
                By accessing and using our website, you agree to comply with
                these Terms of Service. You are responsible for maintaining the
                confidentiality of your account information and for all
                activities that occur under your account. You agree to notify
                [Your Company Name] immediately of any unauthorized use of your
                account or any other breach of security.
              </p>
              <p className="mb-4">
                [Your Company Name] reserves the right to modify or terminate
                the service at any time without prior notice. We may also update
                these terms from time to time, and it is your responsibility to
                review them regularly.
              </p>
              <p className="mb-4">
                Your continued use of the service after any changes to the Terms
                of Service will constitute your acceptance of such changes.
              </p>
            </section>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Footer;
