import mailSender from "./SendMail.js";
import puppeteer from "puppeteer";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function HtmlContent(BookingData, poster, qrCodeUrl) {
  const foodItemsHtml =
    BookingData.foods && BookingData.foods.length > 0
      ? `
    <div class="food-container">
      <p class="food-header">
        Food
      </p>
      ${BookingData.foods
        .map((food) => `<p class="food-item">${food} x 1</p>`)
        .join("")}
    </div>`
      : "";

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Movie Ticket</title>
        <style>
          .ticket {
            font-family: sans-serif;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            user-select: none;
            gap: 0.5rem;
            border-radius: 10px;
            padding: 1.5rem;
            height: 550px;
            width: 380px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .ticket img {
            width: 150px;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
          }
          .ticket p {
            margin: 0;
          }
          .ticket .details {
            height: 45%;
            width: 100%;
            display: flex;
            gap: 1rem;
          }
          .ticket .details .info {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .ticket .message {
            background-color: #e4e4e4;
            border-radius: 10px;
            padding: 5px;
            text-align: center;
            margin: 10px 0;
            padding-top: 7px;
            padding-bottom: 7px;
          }
          .ticket .qr-code {
            min-height: 30%;
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            /* border: 1px solid black; */
          }
          .ticket .qr-code img {
            height: 100px;
            width: 100px;
          }
          .ticket .footer {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            font-weight: 600;
          }
          .ticket-bottom {
            display: flex;
            gap: 10px;
            /* border: 1px solid; */
            align-items: center;
            /* justify-content: space-between; */
            /* padding-right: 2rem; */
          }
          .ticketdetails {
            flex-direction: column;
            margin-top: 0;
          }
          .fontBold {
            font-weight: bold;
          }
          .fontsize20 {
            font-size: 20px;
          }
          .fontsize17 {
            font-size: 17px;
          }
          .topinfo {
            display: flex;
            gap: 5rem;
          }
          .textcenter {
            text-align: center;
          }
          .bottomdetails {
            display: flex;
            gap: 1rem;
            justify-content: space-between;
          }
          .food-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
    
          .food-header {
            color: green;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 20px;
          }
    
          .food-item {
            font-size: 12px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="details">
            <div class="image-container">
            <img src="${poster}" alt="Movie Poster" />
            </div>
            <div class="topinfo info">
              <p class="movie-title fontBold fontsize20">${
                BookingData.moviename
              }</p>
              <p>${BookingData.language} 2D</p>
              <p>${new Date(BookingData.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short"
              })} | ${new Date("2024-09-28T04:30:00.000Z").toLocaleString(
    "en-US",
    { hour: "numeric", minute: "numeric", hour12: true }
  )}</p>
              <p>${BookingData.theatername}</p>
              ${foodItemsHtml}
            </div>
          </div>
          <div class="message">Have a great time watching the movie!</div>
          <div class="ticket-bottom">
            <div class="qr-code">
              <img src="${qrCodeUrl}" alt="QR Code" />
            </div>
            <div class="bottomdetails ticketdetails textcenter">
              <p>${BookingData.seatCount}Tickets</p>
              <p class="font-weight-bold fontBold fontsize17">${
                BookingData.screenName
              }</p>
              <p class="uppercase">
                ${BookingData.seatCategory} - ${arrToString(BookingData.seats)}
              </p>
              <p class="font-weight-bold uppercase fontBold">
                Booking ID: ${BookingData.bookingId}
              </p>
            </div>
          </div>
          <div class="footer">
            <p>Total Amount</p>
            <p>Rs.${BookingData.withGstPrice}</p>
          </div>
        </div>
      </body>
    </html>
    `;
}

async function captureHtmlAsImage(htmlContent, imagePath) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent);

  // Wait for the `.ticket` element to be available
  await page.waitForSelector(".ticket");

  // Get the bounding box of the `.ticket` element
  const element = await page.$(".ticket");
  const boundingBox = await element.boundingBox();

  // Capture only the bounding box of the `.ticket` element
  await page.screenshot({
    path: imagePath,
    clip: boundingBox // Define the clip area based on the element's bounding box
  });

  await browser.close();
}

async function BookingSuccessEmailSend(user, BookingData) {
  // const qrCodeData = `BookingID:${BookingData.bookingId}`;
  // const qrCodeUrl = await generateQRCode(qrCodeData);
  // const htmlContent = HtmlContent(BookingData, poster, qrCodeUrl);
  // const imagePath = path.join(
  //   __dirname,
  //   "Temp-Ticket-Images",
  //   `${Date.now()}.png`
  // );
  // await captureHtmlAsImage(htmlContent, imagePath);

  const foodItemsHtml =
    BookingData.foods && BookingData.foods.length > 0
      ? BookingData.foods.map((food) => `<li>${food} x 1</li>`).join("")
      : "<li>None</li>";

  const email = user.email;
  const title = "Ticket Booking Successfull";
  const body = `
            <h1>Booking Confirmation</h1>
            <p>Dear Customer,</p>
            <p>Thank you ${
              user.name
            } for booking with us! Your ticket has been successfully booked. Below are the details of your booking:</p>
            <h2>Booking Id - ${BookingData.bookingId}</h2>
            <h3>Booking Details</h3>
            <ul>
                <li><strong>Movie Name:</strong> ${BookingData.moviename}</li>
                <li><strong>Language:</strong> ${BookingData.language}</li>
                <li><strong>Date:</strong> ${new Date(
                  BookingData.date
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short"
                })}</li>
                <li><strong>Time:</strong> ${new Date(
                  "2024-09-28T04:30:00.000Z"
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true
                })}</li>
                <li><strong>Theater:</strong> ${BookingData.theatername}</li>
                <li><strong>Seat Count:</strong> ${BookingData.seatCount}</li>
                <li><strong>Booked Seats:</strong> ${arrToString(
                  BookingData.seats
                )}</li>
                <li><strong>Seat Category:</strong> ${
                  BookingData.seatCategory
                }</li>
                <li><strong>Price:</strong> ₹${BookingData.withGstPrice}</li>
                <li><strong>Screen:</strong> ${BookingData.screenName}</li>
                <li><strong>Foods:</strong>
                    <ul class="food-container">
                      ${foodItemsHtml}
                    </ul>
                </li>
            </ul>
            <p>We hope you have a great time at the movie!</p>
            <p>If you have any questions or need further assistance, feel free to contact us.</p>
            <p>Best regards,<br>INOXBOOK Team</p>
        `;

  await mailSender(email, title, body);
  // fs.unlink(imagePath, (err) => {
  //   if (err) console.error("Error deleting image:", err);
  //   else console.log("Image deleted successfully");
  // });
}

function arrToString(arr) {
  let str = "";
  arr.forEach((item) => {
    str += `${item.name}, `;
  });
  return str;
}

async function generateQRCode(data) {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
    data
  )}`;
  return qrCodeUrl;
}

export default BookingSuccessEmailSend;
