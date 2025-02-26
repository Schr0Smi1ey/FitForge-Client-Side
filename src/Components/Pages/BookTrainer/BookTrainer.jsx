import { useState } from "react";
import { Helmet } from "react-helmet";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom"; // Import useNavigate

const BookTrainer = () => {
  const [selectedPackage, setSelectedPackage] = useState("");
  const trainer = useLoaderData();
  const slot = trainer.slots[0];
  const navigate = useNavigate();

  const packages = [
    {
      name: "Basic",
      price: 10,
      features: ["Gym access", "Locker room", "Showers"],
    },
    {
      name: "Standard",
      price: 50,
      features: ["All Basic benefits", "Group classes"],
    },
    {
      name: "Premium",
      price: 100,
      features: ["All Standard benefits", "Personal training"],
    },
  ];

  const handleProceedToPayment = () => {
    if (!selectedPackage) return;

    navigate("/payment", {
      state: { trainer, slot, packageName: selectedPackage },
    });
  };

  return (
    <div className="pt-32 bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>FitForge | Book-Trainer</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Book Session with {trainer.fullName}
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm inline-block">
            <div className="flex gap-8 items-center text-sm text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-semibold">Class:</span>{" "}
                {slot.selectedClass}
              </p>
              <p>
                <span className="font-semibold">Day:</span> {slot.selectedDay}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {slot.slotTime}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              onClick={() => setSelectedPackage(pkg.name)}
              className={`relative cursor-pointer rounded-2xl p-8 transition-all duration-300 ${
                selectedPackage === pkg.name
                  ? "border-2 border-primary-500 bg-primary-50/30 dark:bg-primary-900/20"
                  : "border border-gray-200 dark:border-gray-700 hover:border-primary-300"
              }`}
            >
              {pkg.name === "Premium" && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-tr-2xl rounded-bl-xl text-sm">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {pkg.name} Membership
              </h3>
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                ${pkg.price}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  /session
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <FaCheckCircle className="w-5 h-5 text-green-500 mr-3" />{" "}
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="sticky bottom-6 z-10">
          <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Selected Package: {selectedPackage || "None"}
                </h4>
                {selectedPackage && (
                  <p className="text-primary-600 dark:text-primary-400">
                    Total: $
                    {packages.find((p) => p.name === selectedPackage)?.price}
                  </p>
                )}
              </div>
              <button
                onClick={handleProceedToPayment}
                className={`w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold transition-all 
                  ${
                    selectedPackage
                      ? "bg-primary-500 hover:bg-primary-600"
                      : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed text-gray-400"
                  } rounded-xl`}
                disabled={!selectedPackage}
              >
                <FaLock className="w-6 h-6" />
                {selectedPackage ? "Proceed to Payment" : "Select a Package"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTrainer;
