const db = require("../database/db-config.js");

module.exports = {
  getAll,
  addPost,
  getById,
  update,
  remove,
};

function getAll() {
  return db("posts");
}

function getById(id) {
  return db("posts").where({ id }).first();
}

async function addPost(user) {
  try {
    const [id] = await db("posts").insert(user, "id");
    return getById(id);
  } catch (error) {
    throw error;
  }
}

function update(id, changes) {
  return db("posts").where({ id }).update(changes);
}

async function remove(id) {
  try {
    const deletePost = await db("posts").where({ id })
  await db("posts").where({ id }).del()
  return deletePost;
  } catch (error) {
    throw error;
  }
}
