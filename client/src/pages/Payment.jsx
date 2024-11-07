import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoTicketOutline } from "react-icons/io5";
import { PiDeviceMobile } from "react-icons/pi";
import { MdOutlineTimer } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import useMovie from "../store/Movie";
import useUser from "@/store/User";
import LoaderPayment from "@/components/Loader/LoaderPayment";
import { BeatLoader } from "react-spinners";

const options = { hour: "numeric", minute: "numeric", hour12: true };

function Payment({ paymentData, setPaymentData, setIsPaymentPage }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { bookTicket } = useUser();
  const { setEmptySelectedSeats } = useMovie();
  const [totalPrice, setTotalPrice] = useState(0);
  const [timer, setTimer] = useState(300);
  const [foodsCart, setFoodsCart] = useState([]);

  const formatSeconds = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timer === 0) {
        clearInterval(timerId);
        setEmptySelectedSeats();
        setIsPaymentPage(false);
      }
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

  function handleAddFood(name) {
    if (foodsCart.length === 3) {
      toast.warn("Max 3 food items");
      return;
    }
    setFoodsCart((prev) => [...prev, name]);
    setTotalPrice((prev) => prev + parseInt(name.price));
  }

  function handleRemoveFood(index) {
    const priceToRemove = foodsCart[index].price;
    setTotalPrice((prev) => prev - parseInt(priceToRemove));
    setFoodsCart((prev) => prev.filter((_, i) => i !== index));
  }

  async function handlePaymentClick() {
    setIsLoading(true);
    // await handlePayment(totalPrice);
    paymentData.withGstPrice = totalPrice;
    paymentData.foods = foodsCart.map((food) => food.name);
    await bookTicket(paymentData);
    toast.success("Payment successful");
    setPaymentData({});
    setEmptySelectedSeats();
    setIsLoading(false);
    navigate("/mybookings");
  }

  async function handlePayment(withGstPrice) {
    return new Promise((resolve, reject) => {
      const options = {
        key: "rzp_test_7cs83Ikm791P0j",
        amount: parseInt(withGstPrice * 100),
        currency: "INR",
        name: "TEST",
        description: "TEST",
        image: "",
        handler: (response) => {
          resolve(true);
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        notes: {
          address: ""
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: () => {
            // Handle payment cancellation
            resolve(false);
          }
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    });
  }

  useEffect(() => {
    // Load Razorpay SDK script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script tag
      document.body.removeChild(script);
    };
  }, []);

  const { getAllFoods, foods } = useMovie();

  useEffect(() => {
    getAllFoods(paymentData.theater);
  }, [paymentData]);

  return (
    <>
      {isLoading && <LoaderPayment />}
      <div className="w-full bg-white h-screen flex justify-center gap-[2rem]  py-[2%] relative">
        <div className="w-[50%]">
          <div className="h-full w-full rounded-[10px] shadow-xl border border-[#0000002f]">
            <p className="text-[20px] font-bold text-center mb-[1.5rem] h-[8%] pt-[1rem]">
              You can add<span className="text-[#f84464]"> your meal</span>
            </p>
            <div className="scrollNone h-[85%] w-full flex flex-wrap gap-[2rem] justify-center overflow-y-auto">
              {foods.map((item, index) => {
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
                    <p className="text-[16px] text-center">
                      &#8377;{item.price}
                    </p>
                    <button
                      onClick={() => {
                        handleAddFood(item);
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
        <div className="relative rounded-[10px] justify-between w-[20%] h-full border border-[#0000002f] flex flex-col gap-[5px] shadow-xl">
          <div className="text-[85%] flex flex-col gap-[15px] p-[1.5rem]">
            <p className="tracking-widest text-[#f84464] font-[500] ">
              BOOKING SUMMARY
            </p>
            <p className="text-[1.1rem] font-bold">{paymentData.title}</p>
            <p>
              {new Date(paymentData.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short"
              })}{" "}
              |{" "}
              {new Date(paymentData.time).toLocaleTimeString(
                undefined,
                options
              )}
            </p>
            <p className="uppercase flex items-center">
              <span className="font-[500]">
                {paymentData.seatCategory}&nbsp;-&nbsp;
              </span>
              <div className="flex gap-[5px]">
                {paymentData.seats.map((item, index) => {
                  return (
                    <p className="" key={index}>
                      {item.name},
                    </p>
                  );
                })}
              </div>
            </p>
            <p className="font-[500]">
              {paymentData.seats.length > 1 ? (
                <span>{paymentData.seats.length} Tickets</span>
              ) : (
                <span>{paymentData.seats.length} Ticket</span>
              )}{" "}
              | {paymentData.screen.screenName}
            </p>
            <div className="flex justify-between">
              <p>Ticket Price</p>
              <p>Rs. {paymentData.price * paymentData.seats.length}</p>
            </div>
            <div className="flex justify-between items-center ">
              <p className="text-[.8rem]">GST charges @18%</p>
              <p className="text-[.8rem]">
                Rs.{" "}
                {Math.floor(
                  paymentData.price * paymentData.seats.length * 0.18
                )}
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
            <div className="flex justify-between items-center font-[500] text-[100%]">
              <p>Total</p>
              <p>Rs. {totalPrice}</p>
            </div>
          </div>
          <div className="mb-[20%] flex flex-col items-center text-[85%]">
            <p className="flex gap-[5px] items-center mt-[1rem] font-[500]">
              * Get your E-Ticket <PiDeviceMobile className="text-[20px]" />
            </p>
            <p className="flex gap-[5px] items-center mt-[10px] font-[500]">
              *Complete your payment <span>{formatSeconds(timer)}</span>{" "}
              <MdOutlineTimer className="text-[20px]" />
            </p>
          </div>
          <button
            onClick={handlePaymentClick}
            disabled={isLoading}
            className="absolute bottom-0 flex justify-between px-[1rem] w-full bg-[#f84464] py-[10px] rounded-b-[10px] text-white font-[500]"
          >
            {isLoading === true ? (
              <BeatLoader color="#ffffff" size={5} />
            ) : (
              <>
                <p className="flex gap-[10px] items-center text-[1rem]">
                  <IoTicketOutline className="text-[25px]" />
                  Proceed Payment
                </p>
                <p>Rs. {totalPrice}</p>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Payment;
