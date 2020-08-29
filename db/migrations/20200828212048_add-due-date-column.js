exports.up = function(knex) {
  let createQuery = 'ALTER TABLE "Todo" ADD COLUMN "due_date" DATE' 
	return knex.raw(createQuery)
}

exports.down = function(knex) {
  let dropQuery = `ALTER TABLE "Todo" DROP COLUMN "due_date";`
  return knex.raw(dropQuery)
}

