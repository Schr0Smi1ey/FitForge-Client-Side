import { useContext } from "react";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";

const Newsletter = () => {
  const customAxios = useCustomAxios();
  const { Toast } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = e.target;
    const name = formData.name.value;
    const email = formData.email.value;
    try {
      const res = await customAxios.post("/subscribers", { name, email });
      if (res.status === 200) {
        Toast("Subscribed Successfully", "success");
        formData.reset();
      }
    } catch (error) {
      console.log(error);
      Toast(error.response.data, "error");
    }
  };

  return (
    <div className="container mx-auto bg-primary text-white p-8 rounded-lg shadow-lg text-center mt-10">
      <h2 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h2>
      <p className="text-sm mb-5">
        Get the latest updates right in your inbox!
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 justify-center items-center"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="p-3 rounded-md text-black w-full md:w-1/3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="p-3 rounded-md text-black w-full md:w-1/3"
          required
        />
        <button
          type="submit"
          className="bg-white text-primary font-bold px-5 py-3 rounded-md hover:bg-gray-200 transition w-full md:w-auto"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
