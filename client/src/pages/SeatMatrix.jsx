import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useMovie from "../store/Movie";
import { IoChevronBackOutline } from "react-icons/io5";
import Payment from "./Payment";
import useUser from "@/store/User";
const options = { day: "numeric", month: "short" };

function Seat({ num, row, available = true, seatid, categoryName, price }) {
  const { handleSelectSeats, selectedSeats } = useMovie();
  const [onselect, setOnselect] = useState(false);

  useEffect(() => {
    if (selectedSeats.seats.find((s) => s.id === seatid)) {
      setOnselect(true);
    } else {
      setOnselect(false);
    }
  }, [selectedSeats, seatid]);

  return available ? (
    <div
      onClick={() =>
        handleSelectSeats(seatid, categoryName, price, `${row}${num}`)
      }
      style={{
        backgroundColor: onselect ? "black" : "",
        color: onselect ? "white" : ""
      }}
      className="hover:bg-black hover:text-white select-none m-[3px] transition-all duration-200 ease-linear cursor-pointer border border-black h-[22px] w-[22px] rounded-[3px] flex items-center justify-center"
    >
      <p className="font-bold text-[10px]">{num}</p>
    </div>
  ) : (
    <div className="bg-[#c8c8c8] pointer-events-none opacity-[0.5] select-none m-[3px] transition-all duration-200 ease-linear cursor-pointer border border-transparent h-[22px] w-[22px] rounded-[3px] flex items-center justify-center">
      <p className="font-bold text-[10px]">{num}</p>
    </div>
  );
}

function Row({ row, gaps, categoryName, price }) {
  return (
    <div className="flex items-center">
      <p className="uppercase w-[20px] font-bold text-[.9rem] absolute left-[10px]">
        {row.row}
      </p>
      <div className="flex gap-[5px]">
        {row.seats.map((item, index) => {
          // Calculate gaps before the current seat
          const gapCount = gaps.filter((gapIndex) => gapIndex === index).length;

          // Create gap elements
          const gapElements = Array.from(
            { length: gapCount },
            (_, gapIndex) => (
              <div
                className="h-[30px] w-[30px] border border-[#ff005100]  bg-transparent"
                key={`gap-${index}-${gapIndex}`}
              ></div>
            )
          );

          return (
            <React.Fragment key={index}>
              {gapElements}
              <Seat
                seat={item}
                num={index + 1}
                categoryName={categoryName}
                price={price}
                seatid={item}
                row={row.row}
              />
            </React.Fragment>
          );
        })}

        {/* Handle gaps after the last seat */}
        {gaps.includes(row.seats.length) &&
          Array.from({
            length: gaps.filter((gapIndex) => gapIndex === row.seats.length)
              .length
          }).map((_, gapIndex) => (
            <div
              className="h-[30px] w-[30px] border border-[#ff005100] bg-transparent"
              key={`gap-end-${gapIndex}`}
            ></div>
          ))}
      </div>
    </div>
  );
}

function CategoryCard({ category }) {
  return (
    <div className="w-full relative mb-[20px]">
      <div className="flex items-center flex-col">
        <p className="text-center text-[.9rem] font-bold mb-[2px]">
          {category.name} {category.price}&#8377;
        </p>
        <div className="flex flex-col gap-[2px]">
          {category.layout.map((item, index) => {
            return (
              <Row
                key={index}
                row={item}
                gaps={category.gaps}
                categoryName={category.name}
                price={category.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SeatMatrix() {
  const { user, setIsLogin } = useUser();
  const [isPaymentPage, setIsPaymentPage] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const { scheduleid } = useParams();
  const navigate = useNavigate();
  const { seatMatrix, getSeatMatrix, selectedSeats } = useMovie();

  useEffect(() => {
    if (scheduleid) {
      getSeatMatrix(scheduleid);
    }
  }, [getSeatMatrix, scheduleid]);

  async function handleBookTicket() {
    if (user === null) {
      setIsLogin(true);
      return;
    }
    const paymentData = {
      movie: seatMatrix.movie,
      theater: seatMatrix.theater._id,
      title: seatMatrix.movie.title,
      date: seatMatrix.date,
      time: `${seatMatrix.startTime}`,
      screen: seatMatrix.screen,
      seats: selectedSeats.seats,
      seatCategory: selectedSeats.category,
      price: selectedSeats.price,
      language: seatMatrix.language,
      seatCount: selectedSeats.seats.length,
      moviename: seatMatrix.movie.title,
      theatername: seatMatrix.theater.name,
      screenName: `${seatMatrix.screen.screenName} - ${seatMatrix.screen.screenType}`,
      scheduleid
    };
    setPaymentData(paymentData);
    setIsPaymentPage(true);
  }

  return (
    seatMatrix &&
    seatMatrix.movie &&
    (isPaymentPage ? (
      <Payment
        paymentData={paymentData}
        setPaymentData={setPaymentData}
        setIsPaymentPage={setIsPaymentPage}
      />
    ) : (
      <div
        style={{ height: selectedSeats.category !== "" ? "110vh" : "100vh" }}
        className=" w-full flex flex-col"
      >
        {/* top section */}
        <div className="text-white bg-black px-[10%] py-[10px] w-full border-b border-[#00000051] flex justify-between items-center">
          <span
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoChevronBackOutline className=" text-[25px]  cursor-pointer" />
          </span>
          <div className="">
            <h2 className="text-[25px] font-bold">
              {seatMatrix.movie.title} - {seatMatrix.language}
            </h2>
            <p className="text-[85%]">
              {new Date(seatMatrix.date).toLocaleDateString("en-GB", options)}
              ,&nbsp;
              {new Date(seatMatrix.startTime).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
              })}
              &nbsp;at {seatMatrix.theater.name},&nbsp;
              {seatMatrix.theater.city}
            </p>
          </div>
          <div className=""></div>
        </div>

        {/* index */}
        <div className="flex w-full px-[10%] justify-between mt-[10px]">
          <div className="">
            <p className="text-[100%] font-[500] text-[#707070]">
              {new Date(seatMatrix.date).toLocaleDateString("en-IN", {
                weekday: "short"
              })}
            </p>
            <p className="mt-[-7px] text-[1.05rem] font-bold">
              {new Date(seatMatrix.date)
                .toLocaleDateString("en-IN", options)
                .slice(0, -1)}
            </p>
          </div>
          <div className="flex items-center gap-[20px]">
            <div className="font-[500] text-[85%] flex items-center gap-[5px]">
              <div className="h-[18px] w-[18px] rounded-[2px] border border-black"></div>
              <p>Available</p>
            </div>
            <div className="font-[500] text-[85%] flex items-center gap-[5px]">
              <div className="bg-[#bbbbbb] h-[18px] w-[18px] rounded-[2px] border border-transparent"></div>
              <p>Booked</p>
            </div>
            <div className="font-[500] text-[85%] flex items-center gap-[5px]">
              <div className="bg-black h-[18px] w-[18px] rounded-[2px] border border-black"></div>
              <p>Selected</p>
            </div>
          </div>
        </div>

        {/* Seat Matrix */}
        <div className="w-full flex-1 px-[10%] relative">
          {seatMatrix.screen.category.map((item, index) => {
            return <CategoryCard key={index} category={item} />;
          })}
          <div className="w-full flex justify-center">
            <img
              style={{ bottom: selectedSeats.category !== "" ? "15%" : "20px" }}
              className="absolute"
              src="https://assetscdn1.paytm.com/movies_new/_next/static/media/screen-icon.8dd7f126.svg"
            />
          </div>
        </div>

        {/* selected seat display */}
        {selectedSeats &&
          selectedSeats.category !== "" &&
          selectedSeats.price !== "" &&
          selectedSeats.seats.length > 0 && (
            <div className="flex justify-evenly items-center w-full bg-white border-t border-[#00000030] fixed bottom-0 py-[10px]">
              <div className="font-[500] text-[17px]">
                <p className="text-[18px] font-bold">
                  &#8377;{selectedSeats.seats.length * selectedSeats.price}
                </p>
                <p>
                  Tickets {selectedSeats.seats.length} x {selectedSeats.price}
                </p>
              </div>
              <div className="">
                <button
                  onClick={handleBookTicket}
                  className="px-[2rem] py-[10px] bg-black rounded-[7px] text-white font-[500]"
                >
                  Book Ticket
                </button>
              </div>
            </div>
          )}
      </div>
    ))
  );
}

export default SeatMatrix;
