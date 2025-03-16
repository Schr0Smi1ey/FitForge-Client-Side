import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";

const BookTrainer = () => {
  const [selectedPackage, setSelectedPackage] = useState("");
  const trainer = useLoaderData();
  const slot = trainer.slots[0];
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const packages = [
    {
      name: "Basic",
      price: 10,
      features: [
        "Access for 1 Month",
        "Gym access during regular hours",
        "Cardio & strength equipment",
        "Locker rooms & showers",
        "Water refill station access",
        "Basic fitness assessment",
      ],
    },
    {
      name: "Premium",
      price: 100,
      features: [
        "Access for 6 Months",
        "All Standard benefits",
        "Personal training sessions (4 per month)",
        "Advanced body composition analysis",
        "Exclusive access to premium equipment",
        "Discounts on massage & nutrition counseling",
      ],
    },
    {
      name: "Standard",
      price: 50,
      features: [
        "Access for 3 Months",
        "All Basic benefits",
        "Group fitness classes (Yoga, Zumba, Spinning)",
        "Sauna & steam room access",
        "Extended gym hours",
        "Nutrition consultation (1 session)",
      ],
    },
  ];

  const handleProceedToPayment = () => {
    if (!selectedPackage) return;

    navigate("/payment", {
      state: { trainer, slot, packageName: selectedPackage },
    });
  };

  return (
    <div className="pt-32 dark:bg-black dark:text-white">
      <Helmet>
        <title>FitForge | Book-Trainer</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Book Session with{" "}
            <span className="text-primary">{trainer.fullName}</span>
          </h1>
          <div className="bg-white mt-2 border-2 border-black dark:bg-black dark:text-white dark:border-white/40 rounded-xl p-6 shadow-sm inline-block">
            <div className="flex gap-8 items-center text-black dark:text-gray-300">
              <p className="text-primary">
                <span className="font-semibold text-black dark:text-gray-300 text-lg">
                  Class:
                </span>{" "}
                {slot.selectedClass}
              </p>
              <p className="text-primary">
                <span className="font-semibold text-black dark:text-gray-300 text-lg">
                  Day:
                </span>{" "}
                {slot.selectedDay}
              </p>
              <p className="text-primary">
                <span className="font-semibold text-black dark:text-gray-300 text-lg">
                  Time:
                </span>{" "}
                {slot.slotTime} hours
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              onClick={() => setSelectedPackage(pkg.name)}
              className={`relative space-y-2 cursor-pointer rounded-2xl p-8 transition-all duration-300 ${
                pkg.name === "Premium"
                  ? "bg-primary/50 hover:bg-primary/70 shadow-lg h-[450px] md:h-[500px] lg:h-[550px] scale-105 hover:scale-110"
                  : "shadow-md hover:bg-primary/20 hover:scale-105 h-[350px] md:h-[380px] lg:h-[400px]"
              } ${
                selectedPackage === pkg.name
                  ? "border-2 border-blue-500 bg-primary-50/30 dark:bg-primary-900/20"
                  : "border border-gray-200 dark:border-gray-700 hover:border-primary-300"
              }`}
            >
              {pkg.name === "Premium" && (
                <div className="absolute top-1 right-1 bg-primary-500 bg-green-300 text-black font-semibold px-4 py-1 rounded-tr-2xl rounded-bl-xl text-sm">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white my-4">
                {pkg.name} Membership
              </h3>
              <div className="text-4xl my-3 font-bold text-primary-600 dark:text-primary-400">
                ${pkg.price}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2"></span>
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

        <div className="sticky bottom-6 mt-5 z-10">
          <div className="max-w-7xl mx-auto bg-white dark:bg-black border-2 border-primary rounded-xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Selected Package:{" "}
                  <span className="font-normal text-primary">
                    {selectedPackage || "None"}
                  </span>
                </h4>
                {selectedPackage && (
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total:{" "}
                    <span className="font-normal text-primary">
                      ${packages.find((p) => p.name === selectedPackage)?.price}
                    </span>
                  </p>
                )}
              </div>
              <button
                onClick={handleProceedToPayment}
                className={`w-full md:w-auto inline-flex border-2 border-black dark:border-white/40 items-center hover:bg-primary justify-center gap-2 px-6 py-3 text-lg font-semibold transition-all 
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
