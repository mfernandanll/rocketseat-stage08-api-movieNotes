const knex = require("../database/knex")

class MovieNotesController {
  async create(request, response) {
    const { title, description, tags, rating } = request.body
    const user_id = request.user.id;

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })

    await knex("movie_tags").insert(tagsInsert)

    return response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const note = await knex("movie_notes").where({ id }).first()
    const tags = await knex("movie_tags").where({ note_id: id }).orderBy("name")

    return response.json({
      ...note,
      tags
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("movie_notes").where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { search } = request.query

    const user_id = request.user.id;
    
    let notes

    if (search) {
      const keywords = search.split(" ").map((keyword) => `%${keyword}%`);

      notes = await knex("movie_tags")
        .select([
          "movie_notes.id",
          "movie_notes.title",
          "movie_notes.user_id",
          "movie_notes.description",
          "movie_notes.rating",
        ])
        .where("movie_notes.user_id", user_id)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
        .where((builder) => {
          builder.where((builder2) => {
            keywords.forEach((keyword) => {
              builder2.orWhere("movie_tags.name", "like", keyword);
            });
          });
          keywords.forEach((keyword) => {
            builder.orWhere("movie_notes.title", "like", keyword);
            builder.orWhere("movie_notes.description", "like", keyword);
          });
        })
        .groupBy("movie_notes.id")
        .orderBy("movie_notes.title")

    } else {
      notes = await knex("movie_notes")
        .where({ user_id })
        .orderBy("title")
    }

    const userTags = await knex("movie_tags").where({ user_id })
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)
  
      return {
        ...note,
        tags: noteTags
      }
    })

    return response.json(notesWithTags)
  }
}

module.exports = MovieNotesController