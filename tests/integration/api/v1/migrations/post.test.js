import database from "infra/database.js";

beforeAll(cleanDataBase)
async function cleanDataBase(){
  await database.query('DROP SCHEMA public CASCADE;CREATE SCHEMA public');
}

test("POST to /api/v1/migrations/ should return 200", async () => {

  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response1.status).toBe(201);

  const responseBody = await response1.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);


  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response2.status).toBe(200);

  const responseBody2 = await response2.json();
  
  expect(Array.isArray(responseBody2)).toBe(true);
  expect(responseBody2.length).toBe(0);
});
