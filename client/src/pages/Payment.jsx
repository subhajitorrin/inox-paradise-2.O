import React, { useEffect, useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoTicketOutline } from "react-icons/io5";
import { PiDeviceMobile } from "react-icons/pi";
import { MdOutlineTimer } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const options = { hour: "numeric", minute: "numeric", hour12: true };

function Payment({ paymentData, setPaymentData }) {
  const [totalPrice, setTotalPrice] = useState(300);
  const [timer, setTimer] = useState(300);
  const [foodList, setFoodList] = useState([
    { name: "Popcorn", price: 100, image: "https://via.placeholder.com/200" },
    { name: "Coke", price: 50, image: "https://via.placeholder.com/200" }
  ]);
  const [foodsCart, setFoodsCart] = useState([]);

  const formatSeconds = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const calculatedPrice =
      Math.floor(paymentData.price * paymentData.seats.length * 0.18) +
      paymentData.price * paymentData.seats.length;
    setTotalPrice(calculatedPrice);
  }, [paymentData]);

  function handleAddFood(name, price) {
    if (foodsCart.length === 3) {
      alert("Max 3 food items");
      return;
    }
    setFoodsCart((prev) => [...prev, { name, price }]);
    setTotalPrice((prev) => prev + parseInt(price));
  }

  function handleRemoveFood(index) {
    const priceToRemove = foodsCart[index].price;
    setTotalPrice((prev) => prev - parseInt(priceToRemove));
    setFoodsCart((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full bg-white flex justify-center gap-[2rem]  py-[2%] relative">
      <div className="w-[50%]">
        <div className="h-full w-full rounded-[10px] shadow-xl border border-[#0000002f]">
          <p className="text-[20px] font-bold text-center mb-[1.5rem] h-[8%] pt-[1rem]">
            You can add<span className="text-[#f84464]"> your meal</span>
          </p>
          <div className="scrollNone h-[85%] w-full flex flex-wrap gap-[2rem] justify-center overflow-y-auto">
            {foodList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="p-[10px] flex flex-col justify-between rounded-[7px] h-[310px] w-[240px] border border-[#0000002f] shadow-lg"
                >
                  <div className="w-full justify-center flex">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[200px] w-[200px] object-cover rounded-[10px]"
                    />
                  </div>
                  <p className="text-[17px] font-[500] text-center">
                    {item.name}
                  </p>
                  <p className="text-[16px] text-center">&#8377;{item.price}</p>
                  <button
                    onClick={() => {
                      handleAddFood(item.name, item.price);
                    }}
                    className="transition-all ease-linear duration-200 mb-[1rem] w-full rounded-[5px] font-[500] text-[#f84464] py-[5px] border border-[#f84464] hover:bg-[#f84464] hover:text-[white]"
                  >
                    Add
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative rounded-[10px] w-[20%] h-[80vh] border border-[#0000002f] flex flex-col gap-[5px] shadow-xl">
        <div className="flex flex-col gap-[15px] p-[1.5rem]">
          <p className="tracking-widest text-[#f84464] font-[500] ">
            BOOKING SUMMARY
          </p>
          <p className="text-[20px] font-[500]">{paymentData.title}</p>
          <p>
            {paymentData.date} |{" "}
            {new Date(paymentData.time).toLocaleTimeString(undefined, options)}
          </p>
          <p className="uppercase ">
            <span className="font-[500]">{paymentData.category}</span> -{" "}
            {paymentData.seats.join(", ")}
          </p>
          <p className="font-[500]">
            {paymentData.seats.length > 1 ? (
              <span>{paymentData.seats.length} Tickets</span>
            ) : (
              <span>{paymentData.seats.length} Ticket</span>
            )}{" "}
            | {paymentData.screen}
          </p>
          <div className="flex justify-between">
            <p>Ticket Price</p>
            <p>Rs. {paymentData.price * paymentData.seats.length}</p>
          </div>
          <div className="flex justify-between items-center ">
            <p className="text-[.8rem]">GST charges @18%</p>
            <p className="text-[.8rem]">
              Rs.{" "}
              {Math.floor(paymentData.price * paymentData.seats.length * 0.18)}
            </p>
          </div>
          {/* Foods section */}
          <div className="text-black border-[#0000004c] flex flex-col gap-[5px] pb-[1rem] border-b">
            {foodsCart.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between w-full text-[.8rem]"
                >
                  <p className="flex gap-[10px] items-center">
                    {item.name}{" "}
                    <RxCross2
                      className="cursor-pointer"
                      onClick={() => {
                        handleRemoveFood(index);
                      }}
                    />
                  </p>
                  <p>Rs. {item.price}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center font-[500]">
            <p>Total</p>
            <p>Rs. {totalPrice}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="flex gap-[5px] items-center mt-[1rem] font-[500] text-[15px]">
            * Get your E-Ticket <PiDeviceMobile className="text-[20px]" />
          </p>
          <p className="flex gap-[5px] items-center mt-[1rem] font-[500] text-[15px]">
            *Complete your payment <span>{formatSeconds(timer)}</span>{" "}
            <MdOutlineTimer className="text-[20px]" />
          </p>
        </div>
        <button
          onClick={() => alert("Payment successful!")}
          className="absolute bottom-0 flex justify-between px-[1rem] w-full bg-[#f84464] py-[10px] rounded-b-[10px] text-white font-[500]"
        >
          <p className="flex gap-[10px] items-center text-[1.1rem]">
            <IoTicketOutline className="text-[25px]" />
            Proceed Payment
          </p>
          <p>Rs. {totalPrice}</p>
        </button>
      </div>
    </div>
  );
}

export default Payment;
