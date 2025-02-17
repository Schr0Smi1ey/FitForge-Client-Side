import React from "react";
import card1 from "../../../../assets/Home/Featured/1.png";
import card2 from "../../../../assets/Home/Featured/2.png";
import card3 from "../../../../assets/Home/Featured/3.png";
import card4 from "../../../../assets/Home/Featured/4.png";
import card5 from "../../../../assets/Home/Featured/5.png";
import card6 from "../../../../assets/Home/Featured/6.png";
const featuredData = [
  {
    title: "Personalized Training Plans",
    description:
      "Get customized workout routines designed specifically for your goals, whether it's strength building, weight loss, or overall fitness.",
    imgSrc: card1,
    link: "#training-plans",
  },
  {
    title: "Expert Coaching",
    description:
      "Work with certified trainers who provide expert guidance and support, ensuring you get the most out of every workout.",
    imgSrc: card2,
    link: "#coaching",
  },
  {
    title: "State-of-the-Art Equipment",
    description:
      "Train with the best tools available. Our gym is equipped with the latest and most advanced fitness equipment to help you reach your peak performance.",
    imgSrc: card3,
    link: "#equipment",
  },
  {
    title: "Group Fitness Classes",
    description:
      "Join our high-energy group fitness classes. Whether it's yoga, spin, or bootcamp, there is something for everyone to enjoy.",
    imgSrc: card4,
    link: "#classes",
  },
  {
    title: "Flexible Membership Options",
    description:
      "Choose a membership that works for you. From month-to-month to yearly plans, we have flexible options to fit any schedule.",
    imgSrc: card5,
    link: "#membership",
  },
  {
    title: "Online Training",
    description:
      "Train from anywhere with our online coaching platform. Get personalized sessions and progress tracking from the comfort of your home.",
    imgSrc: card6,
    link: "#online-training",
  },
];
const Featured = () => {
  return (
    <div>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-primary mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredData.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={feature.imgSrc}
                    alt={feature.title}
                    className="rounded-xl"
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 mb-4">{feature.description}</p>
                <a
                  href={feature.link}
                  className="text-primary font-semibold hover:underline"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Featured;
