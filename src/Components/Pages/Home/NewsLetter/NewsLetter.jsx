const Newsletter = () => {
  return (
    <div className="container mx-auto bg-primary text-white p-8 rounded-lg shadow-lg text-center mt-10">
      <h2 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h2>
      <p className="text-sm mb-5">
        Get the latest updates right in your inbox!
      </p>
      <div className="flex flex-col md:flex-row gap-3 justify-center">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 rounded-md text-black w-full md:w-1/3"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 rounded-md text-black w-full md:w-1/3"
        />
        <button className="bg-white text-primary font-bold px-5 py-3 rounded-md hover:bg-gray-200">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
