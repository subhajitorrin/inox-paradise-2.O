async function getAllMovies(req, res) {
  const { user } = req.user;
  return res.status(200).json({ user });
}
export { getAllMovies };
