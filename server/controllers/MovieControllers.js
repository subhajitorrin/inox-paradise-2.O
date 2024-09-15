async function getAllMovies(req, res) {
  const { id, email, role, name } = req;
  return res.status(200).json({ id, email, role, name });
}

async function addMovie(req,res){

}

export { getAllMovies, addMovie };
