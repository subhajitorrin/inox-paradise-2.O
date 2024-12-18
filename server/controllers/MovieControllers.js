import MovieModel from "../models/Movie.js";
import ScheduleModel from "../models/Schedule.js";
import TheaterModel from "../models/TheaterAdmin.js";
import ReviewModel from "../models/Review.js";

async function getAllMovies(req, res) {
  try {
    const movies = await MovieModel.find({});
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching movies" });
  }
}

async function getUpcomingMovies(req, res) {
  try {
    const today = new Date();
    const movies = await MovieModel.find({ releaseDate: { $gt: today } });
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching upcoming movies" });
  }
}

async function getNewReleaseMovies(req, res) {
  try {
    const today = new Date();
    const threeMonthAgo = new Date();
    threeMonthAgo.setMonth(today.getMonth() - 3);
    const movies = await MovieModel.find({
      releaseDate: { $gte: threeMonthAgo, $lte: today }
    }).sort({ releaseDate: -1 });
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching upcoming movies" });
  }
}

async function getMovieById(req, res) {
  const { id } = req.params;
  try {
    const movie = await MovieModel.findById(id).populate("reviews");
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching movie" });
  }
}

function getStartNEndDate(date) {
  const monthMapping = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  };
  const trimDate = date.slice(4, 15).split(" ");
  const searchDate = new Date();
  searchDate.setDate(trimDate[1]);
  searchDate.setMonth(monthMapping[trimDate[0]]);
  searchDate.setFullYear(trimDate[2]);
  const startOfDay = new Date(searchDate.setUTCHours(0, 0, 0, 0));
  const endOfDay = new Date(searchDate.setUTCHours(23, 59, 59, 999));
  return { startOfDay, endOfDay };
}

async function getSchedulesByMovieId(req, res) {
  const { movieid, date, language, screen } = req.params;
  try {
    const { startOfDay, endOfDay } = getStartNEndDate(date);

    let theaters = await ScheduleModel.find({
      movie: movieid,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      language,
      screenType: screen
    }).select("theater -_id");

    let theaterSet = new Set(theaters.map(item => item.theater.toString()));
    theaterSet = Array.from(theaterSet);

    let list = [];
    for (const theaterId of theaterSet) {
      const scheduleList = await ScheduleModel.find({
        movie: movieid,
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        },
        theater: theaterId,
        language,
        screenType: screen
      });
      const theater = await TheaterModel.findById(theaterId).select(
        "name address -_id"
      );
      list.push({ theater, scheduleList });
    }
    return res.status(200).json({
      message: "Schedules fetched successfully",
      schedules: list
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching schedules" });
  }
}

async function searchMovie(req, res) {
  const { searchQuery } = req.query;

  try {
    if (!searchQuery) {
      return res.status(200).json({ message: "Search result", list: [] });
    }
    let movies = await MovieModel.find({
      title: {
        $regex: searchQuery,
        $options: "i"
      }
    });
    res.status(200).json({ message: "Search result", list: movies });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Error while searching" });
  }
}

async function getSeatMatrix(req, res) {
  const { scheduleid } = req.params;
  try {
    const schedule = await ScheduleModel.findById(scheduleid)
      .select("date startTime language screen theater movie bookedSeats")
      .populate([
        { path: "movie", select: "title poster" },
        {
          path: "screen",
          select: "-schedules",
          populate: { path: "category" }
        },
        { path: "theater", select: "name city" }
      ]);

    return res.status(200).json(schedule);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while fetching seat matrix" });
  }
}

async function getReviews(req, res) {
  const { movieid } = req.params;

  try {
    const reviews = await ReviewModel.find({ movie: movieid });
    const rating = await MovieModel.findById(movieid).select("rating -_id");

    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Error while fetching reviews" });
  }
}

async function getTopMovies(req, res) {
  try {
    const movies = await MovieModel.find({ rating: { $gt: 0 } })
      .sort({ rating: -1 })
      .limit(10);
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while fetching top movies" });
  }
}

export {
  getAllMovies,
  getUpcomingMovies,
  getNewReleaseMovies,
  getMovieById,
  getSchedulesByMovieId,
  searchMovie,
  getSeatMatrix,
  getReviews,
  getTopMovies
};
