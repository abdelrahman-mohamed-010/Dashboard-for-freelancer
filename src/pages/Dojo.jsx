import { Search } from "lucide-react";
import UseCases from "../components/useCases";

const Dojo = () => {
  return (
    <section className=" p-6 w-full">
      <div className=" bg-primary rounded-xl w-full p-3">
        <h1 className=" font-poppins font-semibold text-2xl">
          Welcome to the Dôjo Factory
        </h1>
        <p className=" text-gray-400">
          The factory of building or optimizing use cases
        </p>
      </div>
      <div className=" flex justify-between mt-6">
        <div>
          <div className="font-poppins">Pre Defined Use Cases</div>
          <p className=" text-gray-400">
            You can directly leverage or optimize.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center bg-white text-gray-400 border-[1.74px] border-light-gray rounded-lg">
            <Search className="text-inherit mr-2 ml-6" />
            <input
              type="text"
              className="w-[280px] h-[40px] bg-transparent outline-none font-bold font-inter"
              placeholder="search"
            />
          </div>
          <button className="bg-blue cursor-pointer tracking-wide text-white font-semibold text-[14px] rounded-lg p-2  ">
            Optimize Use Case
          </button>
          <button className="bg-second_blue cursor-pointer tracking-wide text-white font-semibold text-[14px] rounded-lg p-2  ">
            Add Use Case to Home
          </button>
        </div>
      </div>
      <ul className=" mt-4 flex list-none gap-2 text-nowrap w-full overflow-y-scroll scrollbar-hide">
        {[...Array(5)].map((_, index) => (
          <li
            key={index}
            className="p-3 pb-5 rounded-xl w-[164px] h-[75px] bg-light_blue border border-light-gray shrink-0"
          >
            <h2 className="font-bold">Sector {index + 1}</h2>
            <p>Custom Name</p>
          </li>
        ))}
      </ul>
      <h1 className=" my-3 font-bold text-[16px] font-poppins">Create and Optimize Use Cases</h1>
      <UseCases/>
    </section>
  );
};

export default Dojo;
